import type React from "react";
import { Component, type ReactNode } from "react";
import { Text, View } from "react-native";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
	contextName?: string;
}

interface State {
	hasError: boolean;
	error?: Error;
}

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
