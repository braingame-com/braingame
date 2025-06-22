import { createLogger } from "@braingame/utils";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { View } from "react-native";
import { Text } from "../Text";
import { errorContainerStyle, errorMessageStyle, errorTitleStyle } from "./styles";

/**
 * Props for the SimpleErrorBoundary component
 */
export interface SimpleErrorBoundaryProps {
	/**
	 * Child components to render and protect from errors.
	 */
	children: ReactNode;

	/**
	 * Custom UI to display when an error is caught.
	 * If not provided, displays a default error message.
	 */
	fallback?: ReactNode;

	/**
	 * Callback fired when an error is caught.
	 * Useful for logging errors to external services.
	 * @param error - The error that was thrown
	 * @param errorInfo - Additional error information from React
	 */
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Internal state for the SimpleErrorBoundary component
 */
interface SimpleErrorBoundaryState {
	/**
	 * Whether an error has been caught
	 */
	hasError: boolean;

	/**
	 * The error that was caught, if any
	 */
	error: Error | null;
}

const logger = createLogger({ prefix: "ErrorBoundary" });

/**
 * Simple error boundary component that catches JavaScript errors in child components.
 * Provides basic error handling with minimal UI. For advanced features like
 * clipboard support and error reporting, use the ErrorBoundary component
 * from the product app.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SimpleErrorBoundary>
 *   <MyComponent />
 * </SimpleErrorBoundary>
 *
 * // With custom fallback
 * <SimpleErrorBoundary fallback={<ErrorFallback />}>
 *   <MyComponent />
 * </SimpleErrorBoundary>
 *
 * // With error logging
 * <SimpleErrorBoundary onError={(error, errorInfo) => {
 *   logErrorToService(error, errorInfo);
 * }}>
 *   <MyComponent />
 * </SimpleErrorBoundary>
 * ```
 *
 * @component
 */
export class SimpleErrorBoundary extends Component<
	SimpleErrorBoundaryProps,
	SimpleErrorBoundaryState
> {
	constructor(props: SimpleErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): SimpleErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to error reporting service
		logger.error("SimpleErrorBoundary caught an error:", error, errorInfo);

		// Call custom error handler if provided
		this.props.onError?.(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Return custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<View
					style={errorContainerStyle}
					accessibilityRole="alert"
					accessibilityLabel="An error occurred"
				>
					<Text style={errorTitleStyle}>Something went wrong</Text>
					<Text style={errorMessageStyle}>
						{this.state.error?.message || "An unexpected error occurred"}
					</Text>
				</View>
			);
		}

		return this.props.children;
	}
}
