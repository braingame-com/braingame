"use client";

import { Button, Text, View } from "@braingame/bgui";
import { Component, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log to error reporting service (Sentry is already configured)
		console.error("Error caught by boundary:", error, errorInfo);

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
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
						backgroundColor: "#000",
					}}
				>
					<Text
						variant="displayTitle"
						style={{
							color: "#ef4444",
							marginBottom: 16,
							textAlign: "center",
						}}
					>
						Oops!
					</Text>
					<Text
						variant="body"
						style={{
							color: "#999",
							marginBottom: 32,
							textAlign: "center",
							maxWidth: 400,
						}}
					>
						Something went wrong. We've been notified and are working on it.
					</Text>
					<Button onPress={this.handleReset} variant="primary">
						<Text variant="bold" style={{ color: "#fff" }}>
							Try Again
						</Text>
					</Button>
				</View>
			);
		}

		return this.props.children;
	}
}
