"use client";

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
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
						backgroundColor: "#000",
						alignItems: "center",
						justifyContent: "center",
						padding: 20,
						height: "100%",
					}}
				>
					<div
						style={{
							maxWidth: 500,
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h1
							style={{
								color: "#FF4136",
								marginBottom: 16,
								fontSize: 48,
								margin: 0,
							}}
						>
							⚠️
						</h1>
						<h1
							style={{
								color: "#fff",
								marginBottom: 16,
								fontSize: "2rem",
								fontWeight: "bold",
								margin: 0,
							}}
						>
							Oops! Something went wrong
						</h1>
						<p
							style={{
								color: "#999",
								marginBottom: 32,
								textAlign: "center",
								margin: "0 0 32px 0",
							}}
						>
							We're sorry for the inconvenience. Please try refreshing the page or contact support
							if the problem persists.
						</p>

						{/* Show error details in development */}
						{env.IS_DEVELOPMENT && this.state.error && (
							<div
								style={{
									backgroundColor: "#111",
									borderRadius: 8,
									padding: 16,
									marginBottom: 24,
									width: "100%",
								}}
							>
								<pre
									style={{
										color: "#FF4136",
										fontFamily: "monospace",
										marginBottom: 8,
										fontSize: "0.8rem",
										margin: "0 0 8px 0",
									}}
								>
									{this.state.error.message}
								</pre>
								{this.state.errorInfo && (
									<pre
										style={{
											color: "#666",
											fontFamily: "monospace",
											fontSize: 12,
											margin: 0,
										}}
									>
										{this.state.errorInfo.componentStack}
									</pre>
								)}
							</div>
						)}

						<div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
							<button
								onClick={() => window.location.reload()}
								style={{
									backgroundColor: "#0074D9",
									color: "#000",
									fontWeight: "bold",
									padding: "12px 24px",
									borderRadius: 8,
									border: "none",
									cursor: "pointer",
									fontSize: "16px",
								}}
							>
								Refresh Page
							</button>

							<button
								onClick={this.handleReset}
								style={{
									backgroundColor: "transparent",
									color: "#999",
									padding: "12px 24px",
									borderRadius: 8,
									border: "1px solid #333",
									cursor: "pointer",
									fontSize: "16px",
								}}
							>
								Try Again
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
