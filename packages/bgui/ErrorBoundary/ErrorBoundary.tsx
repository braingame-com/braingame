import React, { Component } from "react";
import { Button } from "../Button";
import { Text } from "../Text";
import { View } from "../View";
import type { ErrorBoundaryProps, ErrorBoundaryState, ErrorInfo } from "./types";

/**
 * React component that captures rendering errors in its child tree.
 *
 * Use this around critical areas to prevent the entire app from crashing.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	private resetTimeoutId: number | null = null;

	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			errorId: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		// Generate unique error ID for tracking
		const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		return {
			hasError: true,
			error,
			errorId,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Enterprise-grade error logging
		const enhancedError = {
			message: error.message,
			stack: error.stack,
			name: error.name,
			timestamp: new Date().toISOString(),
			url: typeof window !== "undefined" ? window.location.href : "N/A",
			userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
			errorBoundary: this.constructor.name,
			errorId: this.state.errorId,
			componentStack: errorInfo.componentStack,
		};

		// Update state with error info
		this.setState({ errorInfo });

		// Call custom error handler if provided
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}

		// Log to console in development
		if (process.env.NODE_ENV === "development") {
			console.group("🚨 ErrorBoundary caught an error");
			console.error("Error:", error);
			console.error("Error Info:", errorInfo);
			console.error("Enhanced Error:", enhancedError);
			console.groupEnd();
		}

		// In production, you would typically send this to your error reporting service
		// Example: Sentry, Bugsnag, LogRocket, etc.
		if (process.env.NODE_ENV === "production") {
			// Sentry.captureException(error, { extra: enhancedError });
		}
	}

	componentDidUpdate(prevProps: ErrorBoundaryProps) {
		const { resetOnPropsChange, resetKeys } = this.props;
		const { hasError } = this.state;

		// Reset error boundary when resetKeys change
		if (hasError && resetKeys && prevProps.resetKeys) {
			const hasResetKeyChanged = resetKeys.some(
				(resetKey, index) => prevProps.resetKeys?.[index] !== resetKey,
			);

			if (hasResetKeyChanged) {
				this.resetErrorBoundary();
			}
		}

		// Reset error boundary when any prop changes (if enabled)
		if (hasError && resetOnPropsChange && prevProps !== this.props) {
			this.resetErrorBoundary();
		}
	}

	resetErrorBoundary = () => {
		if (this.resetTimeoutId) {
			clearTimeout(this.resetTimeoutId);
		}

		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
			errorId: null,
		});
	};

	handleRetry = () => {
		this.resetErrorBoundary();
	};

	render() {
		if (this.state.hasError) {
			// Use custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default enterprise-grade error UI
			return (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
						backgroundColor: "#f8f9fa",
					}}
				>
					<View
						style={{
							maxWidth: 400,
							padding: 24,
							backgroundColor: "#ffffff",
							borderRadius: 12,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 8,
							elevation: 4,
						}}
					>
						<Text
							style={{
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 12,
								textAlign: "center",
								color: "#dc3545",
							}}
						>
							Something went wrong
						</Text>

						<Text
							style={{
								fontSize: 16,
								marginBottom: 20,
								textAlign: "center",
								color: "#6c757d",
								lineHeight: 24,
							}}
						>
							We're sorry, but something unexpected happened. Our team has been notified.
						</Text>

						{process.env.NODE_ENV === "development" && this.state.error && (
							<View
								style={{
									marginBottom: 20,
									padding: 12,
									backgroundColor: "#f8f9fa",
									borderRadius: 6,
									borderLeftWidth: 4,
									borderLeftColor: "#dc3545",
								}}
							>
								<Text
									style={{
										fontFamily: "monospace",
										fontSize: 12,
										color: "#dc3545",
									}}
								>
									{this.state.error.message}
								</Text>
								{this.state.errorId && (
									<Text
										style={{
											fontFamily: "monospace",
											fontSize: 10,
											color: "#6c757d",
											marginTop: 4,
										}}
									>
										Error ID: {this.state.errorId}
									</Text>
								)}
							</View>
						)}

						<Button text="Try Again" onPress={this.handleRetry} />
					</View>
				</View>
			);
		}

		return this.props.children;
	}
}
