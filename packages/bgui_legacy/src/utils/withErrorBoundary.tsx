import type { ComponentType, ErrorInfo, ReactNode } from "react";
import { SimpleErrorBoundary } from "../components/SimpleErrorBoundary";

/**
 * Options for the withErrorBoundary HOC
 */
interface WithErrorBoundaryOptions {
	/**
	 * Custom fallback UI to display when an error is caught
	 */
	fallback?: ReactNode;

	/**
	 * Callback fired when an error is caught
	 */
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary.
 * Provides automatic error handling for any component.
 *
 * @param Component - The component to wrap with error boundary
 * @param options - Optional configuration for the error boundary
 * @returns Wrapped component with error boundary protection
 *
 * @example
 * ```tsx
 * // Basic usage
 * const SafeComponent = withErrorBoundary(MyComponent);
 *
 * // With custom error handling
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   fallback: <CustomErrorUI />,
 *   onError: (error, errorInfo) => {
 *     logErrorToService(error, errorInfo);
 *   }
 * });
 *
 * // Use the wrapped component
 * <SafeComponent {...props} />
 * ```
 */
export function withErrorBoundary<P extends object>(
	Component: ComponentType<P>,
	options?: WithErrorBoundaryOptions,
) {
	const { fallback, onError } = options || {};
	const WrappedComponent = (props: P) => (
		<SimpleErrorBoundary fallback={fallback} onError={onError}>
			<Component {...props} />
		</SimpleErrorBoundary>
	);

	WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

	return WrappedComponent;
}
