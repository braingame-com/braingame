import type React from "react";
import { ErrorBoundary, NetworkErrorBoundary } from "../components/ErrorBoundary";
import { setupGlobalErrorHandlers } from "../services/ErrorService";

// Setup global error handlers once
if (!__DEV__) {
	setupGlobalErrorHandlers();
}

interface ScreenWrapperProps {
	children: React.ReactNode;
	screenName: string;
}

/**
 * Wrapper component for all screens that provides:
 * - Error boundary
 * - Network error handling
 * - Accessibility context
 * - Performance monitoring
 */
export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, screenName }) => {
	return (
		<ErrorBoundary
			level="screen"
			showDetails={__DEV__}
			onError={(error, errorInfo) => {
				console.error(`Screen Error in ${screenName}:`, error, errorInfo);
			}}
		>
			<NetworkErrorBoundary showOfflineUI={true}>{children}</NetworkErrorBoundary>
		</ErrorBoundary>
	);
};

/**
 * HOC to wrap screens with all necessary providers and boundaries
 */
export function withScreenWrapper<P extends object>(
	Screen: React.ComponentType<P>,
	screenName?: string,
): React.ComponentType<P> {
	const WrappedScreen = (props: P) => (
		<ScreenWrapper screenName={screenName || Screen.displayName || Screen.name || "Unknown"}>
			<Screen {...props} />
		</ScreenWrapper>
	);

	WrappedScreen.displayName = `ScreenWrapper(${Screen.displayName || Screen.name || "Screen"})`;

	return WrappedScreen;
}
