/**
 * Error Boundary Context
 * Provides global error handling configuration and utilities
 */

import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import { captureException } from "../../services/ErrorService";
import { announceForAccessibility } from "../../utils/accessibility";

interface ErrorBoundaryContextValue {
	/**
	 * Global error handler
	 */
	captureError: (error: Error, context?: Record<string, unknown>) => void;

	/**
	 * Clear all errors
	 */
	clearErrors: () => void;

	/**
	 * Current errors
	 */
	errors: Array<{ error: Error; context?: Record<string, unknown>; timestamp: Date }>;

	/**
	 * Global error boundary configuration
	 */
	config: {
		showDetails: boolean;
		enableLogging: boolean;
		enableReporting: boolean;
		maxErrors: number;
	};
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextValue | undefined>(undefined);

interface ErrorBoundaryProviderProps {
	children: ReactNode;
	showDetails?: boolean;
	enableLogging?: boolean;
	enableReporting?: boolean;
	maxErrors?: number;
}

export function ErrorBoundaryProvider({
	children,
	showDetails = __DEV__,
	enableLogging = true,
	enableReporting = !__DEV__,
	maxErrors = 10,
}: ErrorBoundaryProviderProps) {
	const [errors, setErrors] = useState<ErrorBoundaryContextValue["errors"]>([]);

	const captureError = useCallback(
		(error: Error, context?: Record<string, unknown>) => {
			// Log error
			if (enableLogging) {
				console.error("Error captured:", error, context);
			}

			// Report error
			if (enableReporting) {
				captureException(error, {
					...context,
					errorBoundaryContext: true,
				});
			}

			// Store error
			setErrors((prev) => {
				const newErrors = [
					{ error, context, timestamp: new Date() },
					...prev.slice(0, maxErrors - 1),
				];
				return newErrors;
			});

			// Announce for accessibility
			announceForAccessibility(`Error: ${error.message}`);
		},
		[enableLogging, enableReporting, maxErrors],
	);

	const clearErrors = useCallback(() => {
		setErrors([]);
		announceForAccessibility("All errors cleared");
	}, []);

	const value: ErrorBoundaryContextValue = {
		captureError,
		clearErrors,
		errors,
		config: {
			showDetails,
			enableLogging,
			enableReporting,
			maxErrors,
		},
	};

	return <ErrorBoundaryContext.Provider value={value}>{children}</ErrorBoundaryContext.Provider>;
}

export function useErrorBoundaryContext() {
	const context = useContext(ErrorBoundaryContext);
	if (!context) {
		throw new Error("useErrorBoundaryContext must be used within ErrorBoundaryProvider");
	}
	return context;
}

/**
 * Hook to capture errors programmatically
 */
export function useCaptureError() {
	const { captureError } = useErrorBoundaryContext();
	return captureError;
}
