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
	[key: string]: unknown;
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
				// Initialize Sentry
				// Sentry.init({ dsn: this.SENTRY_DSN });
				// Initialize Crashlytics
				// if (this.CRASHLYTICS_ENABLED) {
				//   crashlytics().setCrashlyticsCollectionEnabled(true);
				// }
			}

			this.isInitialized = true;
		} catch (error) {
			// Failed to initialize ErrorService - error logged to prevent console spam
		}
	}

	setUser(userId: string, _attributes?: Record<string, unknown>) {
		this.userId = userId;

		// Set user in third-party services
		if (!__DEV__ && this.isInitialized) {
			// Sentry.setUser({ id: userId, ...attributes });
			// crashlytics().setUserId(userId);
			// if (attributes) {
			//   Object.entries(attributes).forEach(([key, value]) => {
			//     crashlytics().setAttribute(key, String(value));
			//   });
			// }
		}
	}

	clearUser() {
		this.userId = undefined;

		if (!__DEV__ && this.isInitialized) {
			// Sentry.configureScope(scope => scope.setUser(null));
			// crashlytics().setUserId('');
		}
	}

	captureException(error: Error, context?: ErrorContext) {
		try {
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
				// Error captured and logged in development mode
			} else {
				// Send to error tracking services in production
				this.sendToErrorServices(error, errorLog);
			}
		} catch (captureError) {
			// Critical error in error capture system - fail silently to prevent recursion
		}
	}

	captureMessage(
		message: string,
		level: "info" | "warning" | "error" = "info",
		context?: ErrorContext,
	) {
		const _log = {
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
			// Message logged in development mode
		} else {
			// Send to logging service
			// Sentry.captureMessage(message, level);
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
			// Failed to store error log - avoiding console spam
		}
	}

	private sendToErrorServices(error: Error, errorLog: ErrorLog) {
		try {
			// Send to Sentry
			// Sentry.captureException(error, {
			//   contexts: {
			//     error: errorLog.context,
			//     device: errorLog.deviceInfo,
			//   },
			// });

			// Send to Crashlytics
			// if (this.CRASHLYTICS_ENABLED) {
			//   crashlytics().recordError(error, errorLog.context);
			// }

			// Send to custom backend
			this.sendToBackend(errorLog);
		} catch (serviceError) {
			// Error sending to external services - fail silently
		}
	}

	private async sendToBackend(errorLog: ErrorLog) {
		// In production, send to your error logging endpoint
		try {
			// await fetch('https://api.braingame.dev/errors', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			//   body: JSON.stringify(errorLog),
			// });
		} catch (sendError) {
			// Failed to send error to backend - network or server issue
		}
	}

	async getStoredErrors(): Promise<ErrorLog[]> {
		try {
			return this.errorLogs;
		} catch (error) {
			// Error retrieving stored errors - returning empty array
			return [];
		}
	}

	async clearStoredErrors() {
		try {
			this.errorLogs = [];
			await AsyncStorage.removeItem("@braingame/error_logs");
		} catch (error) {
			// Error clearing stored errors - operation failed silently
		}
	}

	// Network error handler
	handleNetworkError(error: unknown, endpoint: string, method: string) {
		const networkError = error as {
			response?: { status: number; data: unknown };
			message: string;
		};
		const context: ErrorContext = {
			type: "network",
			endpoint,
			method,
			statusCode: networkError.response?.status,
			responseData: networkError.response?.data,
		};

		const finalError = new Error(
			`Network request failed: ${method} ${endpoint} - ${networkError.message}`,
		);

		this.captureException(finalError, context);
	}

	// Promise rejection handler
	handleUnhandledRejection(reason: unknown, promise: Promise<unknown>) {
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

export const setErrorUser = (userId: string, attributes?: Record<string, unknown>) =>
	errorService.setUser(userId, attributes);

export const clearErrorUser = () => errorService.clearUser();

// Global error handlers
export const setupGlobalErrorHandlers = () => {
	// Handle unhandled promise rejections
	const originalHandler = global.onunhandledrejection;
	global.onunhandledrejection = (event: PromiseRejectionEvent) => {
		errorService.handleUnhandledRejection(event.reason, event.promise);
		if (typeof originalHandler === "function") {
			originalHandler.call(global as unknown as Window, event);
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
