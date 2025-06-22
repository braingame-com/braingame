import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

interface ErrorContext {
	level?: string;
	errorBoundary?: boolean;
	errorId?: string;
	componentStack?: string;
	errorCount?: number;
	userId?: string;
	sessionId?: string;
	screen?: string;
	action?: string;
	[key: string]: any;
}

interface ErrorLog {
	id: string;
	timestamp: string;
	message: string;
	stack?: string;
	context: ErrorContext;
	platform: string;
	appVersion: string;
	deviceInfo: {
		os: string;
		osVersion: string;
		device?: string;
	};
}

class ErrorService {
	private static instance: ErrorService;
	private errorLogs: ErrorLog[] = [];
	private maxLocalLogs = 100;
	private sessionId: string;
	private userId?: string;
	private isInitialized = false;

	// In production, these would be your actual error tracking service endpoints
	private readonly SENTRY_DSN = process.env.SENTRY_DSN || "";
	private readonly CRASHLYTICS_ENABLED = process.env.CRASHLYTICS_ENABLED === "true";

	private constructor() {
		this.sessionId = this.generateSessionId();
		this.initialize();
	}

	static getInstance(): ErrorService {
		if (!ErrorService.instance) {
			ErrorService.instance = new ErrorService();
		}
		return ErrorService.instance;
	}

	private generateSessionId(): string {
		return `SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	private async initialize() {
		try {
			// Load stored error logs
			const storedLogs = await AsyncStorage.getItem("@braingame/error_logs");
			if (storedLogs) {
				this.errorLogs = JSON.parse(storedLogs);
			}

			// Initialize third-party services in production
			if (!__DEV__) {
				// Initialize third-party services here when ready
			}

			this.isInitialized = true;
		} catch (error) {
			console.error("Failed to initialize ErrorService:", error);
		}
	}

	setUser(userId: string, attributes?: Record<string, any>) {
		this.userId = userId;

		// Set user in third-party services
		if (!__DEV__ && this.isInitialized) {
			// Set user in third-party services when ready
		}
	}

	clearUser() {
		this.userId = undefined;

		if (!__DEV__ && this.isInitialized) {
			// Clear user in third-party services when ready
		}
	}

	captureException(error: Error, context?: ErrorContext) {
		const errorLog: ErrorLog = {
			id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			timestamp: new Date().toISOString(),
			message: error.message || error.toString(),
			stack: error.stack,
			context: {
				...context,
				userId: this.userId,
				sessionId: this.sessionId,
			},
			platform: Platform.OS,
			appVersion: "1.0.0", // TODO: Get from app config
			deviceInfo: {
				os: Platform.OS,
				osVersion: Platform.Version?.toString() || "unknown",
				// device: Device.modelName, // If using expo-device
			},
		};

		// Store locally
		this.storeErrorLog(errorLog);

		// Log to console in development
		if (__DEV__) {
			console.error("Error captured:", errorLog);
		} else {
			// Send to error tracking services in production
			this.sendToErrorServices(error, errorLog);
		}
	}

	captureMessage(
		message: string,
		level: "info" | "warning" | "error" = "info",
		context?: ErrorContext,
	) {
		const log = {
			id: `MSG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			timestamp: new Date().toISOString(),
			message,
			level,
			context: {
				...context,
				userId: this.userId,
				sessionId: this.sessionId,
			},
		};

		if (__DEV__) {
			console.log(`[${level.toUpperCase()}]`, message, context);
		} else {
			// Send to logging service when ready
		}
	}

	private async storeErrorLog(errorLog: ErrorLog) {
		this.errorLogs.push(errorLog);

		// Keep only the most recent logs
		if (this.errorLogs.length > this.maxLocalLogs) {
			this.errorLogs = this.errorLogs.slice(-this.maxLocalLogs);
		}

		try {
			await AsyncStorage.setItem("@braingame/error_logs", JSON.stringify(this.errorLogs));
		} catch (error) {
			console.error("Failed to store error log:", error);
		}
	}

	private sendToErrorServices(error: Error, errorLog: ErrorLog) {
		// Send to third-party error services when ready

		// Send to custom backend
		this.sendToBackend(errorLog);
	}

	private async sendToBackend(errorLog: ErrorLog) {
		try {
			// In production, send to your error logging endpoint
		} catch (error) {
			console.error("Failed to send error to backend:", error);
		}
	}

	async getStoredErrors(): Promise<ErrorLog[]> {
		return this.errorLogs;
	}

	async clearStoredErrors() {
		this.errorLogs = [];
		await AsyncStorage.removeItem("@braingame/error_logs");
	}

	// Network error handler
	handleNetworkError(error: any, endpoint: string, method: string) {
		const context: ErrorContext = {
			type: "network",
			endpoint,
			method,
			statusCode: error.response?.status,
			responseData: error.response?.data,
		};

		const networkError = new Error(
			`Network request failed: ${method} ${endpoint} - ${error.message}`,
		);

		this.captureException(networkError, context);
	}

	// Promise rejection handler
	handleUnhandledRejection(reason: any, promise: Promise<any>) {
		const error =
			reason instanceof Error
				? reason
				: new Error(`Unhandled Promise Rejection: ${String(reason)}`);

		this.captureException(error, {
			type: "unhandledRejection",
			promise: String(promise),
		});
	}
}

// Export singleton instance
export const errorService = ErrorService.getInstance();

// Export convenience functions
export const captureException = (error: Error, context?: ErrorContext) =>
	errorService.captureException(error, context);

export const captureMessage = (
	message: string,
	level?: "info" | "warning" | "error",
	context?: ErrorContext,
) => errorService.captureMessage(message, level, context);

export const setErrorUser = (userId: string, attributes?: Record<string, any>) =>
	errorService.setUser(userId, attributes);

export const clearErrorUser = () => errorService.clearUser();

// Global error handlers
export const setupGlobalErrorHandlers = () => {
	// Handle unhandled promise rejections
	const originalHandler = global.onunhandledrejection;
	global.onunhandledrejection = (event: any) => {
		errorService.handleUnhandledRejection(event.reason, event.promise);
		if (originalHandler) {
			originalHandler(event);
		}
	};

	// Handle console errors in production
	if (!__DEV__) {
		const originalConsoleError = console.error;
		console.error = (...args) => {
			const error =
				args[0] instanceof Error ? args[0] : new Error(args.map((arg) => String(arg)).join(" "));

			errorService.captureException(error, {
				type: "console.error",
				args: args.slice(1),
			});

			originalConsoleError.apply(console, args);
		};
	}
};
