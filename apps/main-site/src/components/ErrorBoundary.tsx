"use client";

import { Button, Text, View } from "@braingame/bgui";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { env } from "../lib/env";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to console in development
		if (env.IS_DEVELOPMENT) {
			console.error("ErrorBoundary caught an error:", error, errorInfo);
		}

		// Update state with error details
		this.setState({
			error,
			errorInfo,
		});

		// Report to error tracking services
		this.reportError(error, errorInfo);
	}

	reportError(error: Error, errorInfo: ErrorInfo) {
		// Report to Sentry if available
		if (typeof window !== "undefined" && "Sentry" in window) {
			// @ts-expect-error - Sentry is added by script tag
			window.Sentry.captureException(error, {
				contexts: {
					react: {
						componentStack: errorInfo.componentStack,
					},
				},
			});
		}

		// Send error to Google Analytics
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics
			window.gtag("event", "exception", {
				description: error.message,
				stack: error.stack,
				component_stack: errorInfo.componentStack,
				fatal: false,
			});
		}
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			// Use custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<View
					style={{
						flex: 1,
						backgroundColor: "#000",
						alignItems: "center",
						justifyContent: "center",
						padding: 20,
						height: "100%",
					}}
				>
					<View
						style={{
							maxWidth: 500,
							width: "100%",
							alignItems: "center",
						}}
					>
						<Text
							variant="displayTitle"
							style={{
								color: "#FF4136",
								marginBottom: 16,
								fontSize: 48,
							}}
						>
							⚠️
						</Text>
						<Text
							variant="displayTitle"
							style={{
								color: "#fff",
								marginBottom: 16,
							}}
						>
							Oops! Something went wrong
						</Text>
						<Text
							variant="body"
							style={{
								color: "#999",
								marginBottom: 32,
								textAlign: "center",
							}}
						>
							We're sorry for the inconvenience. Please try refreshing the page or contact support
							if the problem persists.
						</Text>

						{/* Show error details in development */}
						{env.IS_DEVELOPMENT && this.state.error && (
							<View
								style={{
									backgroundColor: "#111",
									borderRadius: 8,
									padding: 16,
									marginBottom: 24,
									width: "100%",
								}}
							>
								<Text
									variant="small"
									style={{
										color: "#FF4136",
										fontFamily: "monospace",
										marginBottom: 8,
									}}
								>
									{this.state.error.message}
								</Text>
								{this.state.errorInfo && (
									<Text
										variant="small"
										style={{
											color: "#666",
											fontFamily: "monospace",
											fontSize: 12,
										}}
									>
										{this.state.errorInfo.componentStack}
									</Text>
								)}
							</View>
						)}

						<View style={{ flexDirection: "row", gap: 12 }}>
							<Button onPress={() => window.location.reload()} variant="primary" size="lg">
								<Text style={{ color: "#000", fontWeight: "bold" }}>Refresh Page</Text>
							</Button>

							<Button onPress={this.handleReset} variant="ghost" size="lg">
								<Text style={{ color: "#999" }}>Try Again</Text>
							</Button>
						</View>
					</View>
				</View>
			);
		}

		return this.props.children;
	}
}
