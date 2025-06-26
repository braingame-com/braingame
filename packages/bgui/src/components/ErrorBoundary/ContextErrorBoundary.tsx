import type React from "react";
import { Component, type ReactNode } from "react";
import { Text, View } from "react-native";

/**
 * Props for the ContextErrorBoundary component
 */
interface Props {
	/**
	 * Children components to wrap with error boundary.
	 * Errors from these components will be caught.
	 */
	children: ReactNode;

	/**
	 * Custom fallback UI to display when error occurs.
	 * If not provided, shows default error message.
	 */
	fallback?: ReactNode;

	/**
	 * Callback fired when an error is caught.
	 * Useful for error logging or reporting.
	 */
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

	/**
	 * Name of the context for error messages.
	 * Helps identify which provider failed.
	 */
	contextName?: string;
}

interface State {
	hasError: boolean;
	error?: Error;
}

/**
 * ContextErrorBoundary component for catching errors in context providers.
 * Prevents entire app crashes when context providers encounter errors.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ContextErrorBoundary contextName="Theme">
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 * </ContextErrorBoundary>
 *
 * // With custom fallback
 * <ContextErrorBoundary
 *   contextName="Auth"
 *   fallback={<Text>Authentication failed</Text>}
 * >
 *   <AuthProvider>
 *     <SecureContent />
 *   </AuthProvider>
 * </ContextErrorBoundary>
 *
 * // With error logging
 * <ContextErrorBoundary
 *   contextName="Data"
 *   onError={(error, info) => {
 *     logErrorToService(error, info);
 *   }}
 * >
 *   <DataProvider>
 *     <Dashboard />
 *   </DataProvider>
 * </ContextErrorBoundary>
 *
 * // Nested providers
 * <ContextErrorBoundary contextName="App">
 *   <ThemeProvider>
 *     <ContextErrorBoundary contextName="User">
 *       <UserProvider>
 *         <AppContent />
 *       </UserProvider>
 *     </ContextErrorBoundary>
 *   </ThemeProvider>
 * </ContextErrorBoundary>
 * ```
 *
 * @component
 */
export class ContextErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error(`Error in ${this.props.contextName || "Context"} provider:`, error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<View
					style={{
						padding: 16,
						backgroundColor: "#fee",
						borderWidth: 1,
						borderColor: "#fcc",
						borderRadius: 4,
						margin: 8,
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: "bold", color: "#c33", marginBottom: 8 }}>
						Context Provider Error
					</Text>
					<Text style={{ color: "#c33", marginBottom: 8 }}>
						An error occurred in the {this.props.contextName || "context"} provider. Please refresh
						the page or contact support if the problem persists.
					</Text>
					{__DEV__ && this.state.error && (
						<Text style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
							Error: {this.state.error.message}
						</Text>
					)}
				</View>
			);
		}

		return this.props.children;
	}
}
