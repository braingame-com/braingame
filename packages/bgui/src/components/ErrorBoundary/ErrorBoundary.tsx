import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { View } from "react-native";
import { Text } from "../Text";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to error reporting service
		console.error("ErrorBoundary caught an error:", error, errorInfo);

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
					style={{
						padding: 20,
						backgroundColor: "#fee",
						borderRadius: 8,
						borderWidth: 1,
						borderColor: "#fcc",
					}}
					accessibilityRole="alert"
					accessibilityLabel="An error occurred"
				>
					<Text style={{ color: "#c00", fontWeight: "bold", marginBottom: 8 }}>
						Something went wrong
					</Text>
					<Text style={{ color: "#600", fontSize: 12 }}>
						{this.state.error?.message || "An unexpected error occurred"}
					</Text>
				</View>
			);
		}

		return this.props.children;
	}
}
