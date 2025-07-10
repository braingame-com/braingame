/**
 * Network status detection and error handling utilities
 */

interface NetworkInformation extends EventTarget {
	effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
	downlink?: number;
	rtt?: number;
}

export interface NetworkStatus {
	isOnline: boolean;
	effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
	downlink?: number; // Mbps
	rtt?: number; // Round-trip time in ms
}

/**
 * Gets current network status
 */
export function getNetworkStatus(): NetworkStatus {
	if (typeof window === "undefined") {
		return { isOnline: true };
	}

	const status: NetworkStatus = {
		isOnline: navigator.onLine,
	};

	// Get connection info if available
	const nav = navigator as Navigator & {
		connection?: NetworkInformation;
		mozConnection?: NetworkInformation;
		webkitConnection?: NetworkInformation;
	};
	const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

	if (connection) {
		status.effectiveType = connection.effectiveType;
		status.downlink = connection.downlink;
		status.rtt = connection.rtt;
	}

	return status;
}

/**
 * Subscribes to network status changes
 */
export function subscribeToNetworkChanges(callback: (status: NetworkStatus) => void): () => void {
	if (typeof window === "undefined") {
		return () => {};
	}

	const handleChange = () => {
		callback(getNetworkStatus());
	};

	window.addEventListener("online", handleChange);
	window.addEventListener("offline", handleChange);

	// Also listen to connection changes if available
	const nav = navigator as Navigator & {
		connection?: NetworkInformation;
		mozConnection?: NetworkInformation;
		webkitConnection?: NetworkInformation;
	};
	const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
	if (connection) {
		connection.addEventListener("change", handleChange);
	}

	// Cleanup function
	return () => {
		window.removeEventListener("online", handleChange);
		window.removeEventListener("offline", handleChange);
		if (connection) {
			connection.removeEventListener("change", handleChange);
		}
	};
}

/**
 * Retry configuration for network requests
 */
export interface RetryConfig {
	maxAttempts: number;
	initialDelay: number;
	maxDelay: number;
	backoffFactor: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
	maxAttempts: 3,
	initialDelay: 1000,
	maxDelay: 10000,
	backoffFactor: 2,
};

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
	fn: () => Promise<T>,
	config: Partial<RetryConfig> = {},
): Promise<T> {
	const { maxAttempts, initialDelay, maxDelay, backoffFactor } = {
		...DEFAULT_RETRY_CONFIG,
		...config,
	};

	let lastError: Error = new Error("No attempts made");
	let delay = initialDelay;

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;

			// Don't retry on client errors (4xx)
			if (error instanceof Response && error.status >= 400 && error.status < 500) {
				throw error;
			}

			if (attempt === maxAttempts) {
				break;
			}

			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, delay));

			// Increase delay for next attempt
			delay = Math.min(delay * backoffFactor, maxDelay);
		}
	}

	throw lastError;
}

/**
 * Error types for better error handling
 */
export enum ErrorType {
	NETWORK = "NETWORK",
	VALIDATION = "VALIDATION",
	RATE_LIMIT = "RATE_LIMIT",
	SERVER = "SERVER",
	UNKNOWN = "UNKNOWN",
}

/**
 * Classifies an error for appropriate handling
 */
export function classifyError(error: unknown): ErrorType {
	if (!error) return ErrorType.UNKNOWN;

	// Network errors
	if (error instanceof TypeError && error.message.includes("fetch")) {
		return ErrorType.NETWORK;
	}

	// Response errors
	if (error instanceof Response) {
		if (error.status === 429) return ErrorType.RATE_LIMIT;
		if (error.status >= 400 && error.status < 500) return ErrorType.VALIDATION;
		if (error.status >= 500) return ErrorType.SERVER;
	}

	// Custom error messages
	if (error instanceof Error) {
		if (error.message.includes("rate limit")) return ErrorType.RATE_LIMIT;
		if (error.message.includes("validation")) return ErrorType.VALIDATION;
		if (error.message.includes("network")) return ErrorType.NETWORK;
	}

	return ErrorType.UNKNOWN;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown, errorType?: ErrorType): string {
	const type = errorType || classifyError(error);

	switch (type) {
		case ErrorType.NETWORK:
			return "Please check your internet connection and try again.";
		case ErrorType.RATE_LIMIT:
			return "Too many requests. Please wait a moment and try again.";
		case ErrorType.VALIDATION:
			return error instanceof Error ? error.message : "Please check your input and try again.";
		case ErrorType.SERVER:
			return "Our servers are having issues. Please try again later.";
		default:
			return "Something went wrong. Please try again.";
	}
}
