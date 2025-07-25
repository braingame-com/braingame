import React, { type ComponentType } from "react";
import { captureException } from "../../services/ErrorService";
import { ErrorBoundary } from "./ErrorBoundary";

export interface WithErrorBoundaryOptions {
	/**
	 * Custom fallback component to show when error occurs
	 */
	fallback?: React.ReactNode;

	/**
	 * Whether to show error details (default: true in dev, false in prod)
	 */
	showDetails?: boolean;

	/**
	 * Error boundary level
	 */
	level?: "screen" | "component" | "app";

	/**
	 * Keys that when changed will reset the error boundary
	 */
	resetKeys?: string[];

	/**
	 * Whether to isolate the error (only show error UI for this component)
	 */
	isolate?: boolean;

	/**
	 * Custom error handler
	 */
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

	/**
	 * Whether to log errors to console
	 */
	logErrors?: boolean;
}

/**
 * HOC to wrap any component with an error boundary
 */
export function withErrorBoundary<P extends object>(
	Component: ComponentType<P>,
	options: WithErrorBoundaryOptions = {},
): ComponentType<P> {
	const {
		fallback,
		showDetails = __DEV__,
		level = "component",
		resetKeys = [],
		isolate = level === "component",
		onError,
		logErrors = __DEV__,
	} = options;

	const WrappedComponent = (props: P) => {
		// Extract reset keys from props
		const currentResetKeys = resetKeys.map((key) => (props as Record<string, unknown>)[key]) as (
			| string
			| number
		)[];

		const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
			if (logErrors) {
				console.error(`Error in ${Component.displayName || Component.name || "Component"}:`, error);
			}

			// Custom error handler
			onError?.(error, errorInfo);

			// Log to error service with component context
			captureException(error, {
				component: Component.displayName || Component.name || "Unknown",
				level,
				props: __DEV__ ? props : undefined, // Only include props in dev
				componentStack: errorInfo.componentStack ?? undefined,
				digest: errorInfo.digest ?? undefined,
			});
		};

		return (
			<ErrorBoundary
				fallback={fallback}
				showDetails={showDetails}
				level={level}
				resetKeys={currentResetKeys}
				isolate={isolate}
				onError={handleError}
			>
				<Component {...props} />
			</ErrorBoundary>
		);
	};

	WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || "Component"})`;

	return WrappedComponent;
}

/**
 * HOC specifically for screens with screen-level error handling
 */
export function withScreenErrorBoundary<P extends object>(
	Screen: ComponentType<P>,
	screenName?: string,
): ComponentType<P> {
	return withErrorBoundary(Screen, {
		level: "screen",
		showDetails: true,
		isolate: false,
		onError: (error, errorInfo) => {
			captureException(error, {
				screen: screenName || Screen.displayName || Screen.name,
				type: "screen_error",
				componentStack: errorInfo.componentStack ?? undefined,
				digest: errorInfo.digest ?? undefined,
			});
		},
	});
}

/**
 * Decorator for class components
 */
export function ErrorBoundaryDecorator(options: WithErrorBoundaryOptions = {}) {
	return <T extends { new (...args: unknown[]): React.Component }>(Component: T) => {
		const WrappedComponent = class extends (Component as {
			new (...args: unknown[]): React.Component<Record<string, unknown>, unknown>;
		}) {
			static displayName = `ErrorBoundary(${Component.name})`;

			render() {
				return (
					<ErrorBoundary {...options}>
						{React.createElement(Component as ComponentType, this.props)}
					</ErrorBoundary>
				);
			}
		};

		return WrappedComponent as unknown as T;
	};
}
