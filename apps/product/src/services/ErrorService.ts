import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { APP_CONFIG, ERROR_CONFIG, STORAGE_KEYS } from "../config/env";

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
	networkFailureType?: string;
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
	private maxLocalLogs = ERROR_CONFIG.maxLocalLogs;
	private sessionId: string;
	private userId?: string;
	private isInitialized = false;

	// Error tracking service configuration
	private readonly SENTRY_DSN = ERROR_CONFIG.sentryDsn || "";
	private readonly ERROR_REPORTING_ENABLED = ERROR_CONFIG.enabled;

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
			const storedLogs = await AsyncStorage.getItem(STORAGE_KEYS.errors.logs);
			if (storedLogs) {
				this.errorLogs = JSON.parse(storedLogs);
			}

			// Initialize third-party services in production
			if (APP_CONFIG.isProduction && this.ERROR_REPORTING_ENABLED) {
				// Initialize Sentry
				if (this.SENTRY_DSN) {
					// Sentry.init({ dsn: this.SENTRY_DSN });
				}
				// Initialize other error tracking services
				// if (this.ERROR_REPORTING_ENABLED) {
				//   crashlytics().setCrashlyticsCollectionEnabled(true);
				// }
			}

			this.isInitialized = true;
		} catch (_error) {
			// Failed to initialize ErrorService - error logged to prevent console spam
		}
	}

	setUser(userId: string, _attributes?: Record<string, unknown>) {
		this.userId = userId;

		// Set user in third-party services
		if (APP_CONFIG.isProduction && this.isInitialized && this.ERROR_REPORTING_ENABLED) {
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

		if (APP_CONFIG.isProduction && this.isInitialized && this.ERROR_REPORTING_ENABLED) {
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
				appVersion: APP_CONFIG.version,
				deviceInfo: {
					os: Platform.OS,
					osVersion:
						Platform.Version !== null && Platform.Version !== undefined
							? Platform.Version.toString()
							: (() => {
									console.error("Platform.Version is not available - check React Native setup");
									return "unknown";
								})(),
					// device: Device.modelName, // If using expo-device
				},
			};

			// Store locally
			this.storeErrorLog(errorLog);

			// Log to console in development
			if (APP_CONFIG.isDevelopment) {
				console.error("Error captured:", errorLog);
			} else if (APP_CONFIG.isProduction && this.ERROR_REPORTING_ENABLED) {
				// Send to error tracking services in production
				this.sendToErrorServices(error, errorLog);
			}
		} catch (_captureError) {
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

		if (APP_CONFIG.isDevelopment) {
			console.log(`[${level.toUpperCase()}]`, message, context);
		} else if (APP_CONFIG.isProduction && this.ERROR_REPORTING_ENABLED) {
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
			await AsyncStorage.setItem(STORAGE_KEYS.errors.logs, JSON.stringify(this.errorLogs));
		} catch (_error) {
			// Failed to store error log - avoiding console spam
		}
	}

	private sendToErrorServices(_error: Error, errorLog: ErrorLog) {
		try {
			// Send to Sentry
			// Sentry.captureException(error, {
			//   contexts: {
			//     error: errorLog.context,
			//     device: errorLog.deviceInfo,
			//   },
			// });

			// Send to Crashlytics
			// if (this.ERROR_REPORTING_ENABLED) {
			//   crashlytics().recordError(error, errorLog.context);
			// }

			// Send to custom backend
			this.sendToBackend(errorLog);
		} catch (_serviceError) {
			// Error sending to external services - fail silently
		}
	}

	private async sendToBackend(_errorLog: ErrorLog) {
		// In production, send to your error logging endpoint
		try {
			// await fetch('https://api.braingame.dev/errors', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			//   body: JSON.stringify(errorLog),
			// });
		} catch (_sendError) {
			// Failed to send error to backend - network or server issue
		}
	}

	async getStoredErrors(): Promise<ErrorLog[]> {
		try {
			return this.errorLogs;
		} catch (_error) {
			// Error retrieving stored errors - returning empty array
			return [];
		}
	}

	async clearStoredErrors() {
		try {
			this.errorLogs = [];
			await AsyncStorage.removeItem(STORAGE_KEYS.errors.logs);
		} catch (_error) {
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
		};

		// Explicitly handle network error response data
		if (networkError.response) {
			context.statusCode = networkError.response.status;
			context.responseData = networkError.response.data;
		} else {
			// Log when network response is missing for debugging
			console.warn("Network error has no response data - possible network failure or timeout");
			context.networkFailureType = "no_response";
		}

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
