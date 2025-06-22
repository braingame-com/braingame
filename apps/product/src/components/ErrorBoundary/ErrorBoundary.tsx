import * as Clipboard from "expo-clipboard";
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Linking, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { captureException } from "../../services/ErrorService";
import {
	AccessibleThemedButton,
	AccessibleThemedText,
} from "../../theme/components/AccessibleThemedComponents";
import { announceForAccessibility } from "../../utils/accessibility";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	showDetails?: boolean;
	resetKeys?: Array<string | number>;
	resetOnPropsChange?: boolean;
	isolate?: boolean;
	level?: "screen" | "component" | "app";
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
	errorCount: number;
	errorId: string;
}

// Error Fallback Component
const ErrorFallback: React.FC<{
	error: Error;
	errorInfo: ErrorInfo;
	resetError: () => void;
	showDetails: boolean;
	level: Props["level"];
	errorId: string;
}> = ({ error, errorInfo, resetError, showDetails, level, errorId }) => {
	const [detailsVisible, setDetailsVisible] = React.useState(false);
	const [copied, setCopied] = React.useState(false);

	const handleCopyError = async () => {
		const errorText = `
Error ID: ${errorId}
Error: ${error.toString()}
Stack: ${error.stack}
Component Stack: ${errorInfo.componentStack}
Platform: ${Platform.OS}
Time: ${new Date().toISOString()}
    `.trim();

		await Clipboard.setStringAsync(errorText);
		setCopied(true);
		announceForAccessibility("Error details copied to clipboard");

		setTimeout(() => setCopied(false), 3000);
	};

	const handleReportError = () => {
		const subject = `Brain Game Error Report - ${errorId}`;
		const body = `
Please describe what you were doing when this error occurred:

---
Error Details:
${error.toString()}

Platform: ${Platform.OS}
Time: ${new Date().toISOString()}
    `.trim();

		const mailto = `mailto:support@braingame.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		Linking.openURL(mailto);
	};

	React.useEffect(() => {
		announceForAccessibility(`An error occurred. ${error.message}. Press retry to continue.`);
	}, [error]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#101020" }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<View style={{ alignItems: "center", maxWidth: 400 }}>
					<AccessibleThemedText
						variant="error"
						size="4xl"
						weight="bold"
						style={{ marginBottom: 20, textAlign: "center" }}
						isHeading
					>
						{level === "app" ? "💥" : level === "screen" ? "⚠️" : "❌"}
					</AccessibleThemedText>

					<AccessibleThemedText
						variant="primary"
						size="2xl"
						weight="semibold"
						style={{ marginBottom: 10, textAlign: "center" }}
						isHeading
					>
						{level === "app"
							? "App Crashed"
							: level === "screen"
								? "Screen Error"
								: "Component Error"}
					</AccessibleThemedText>

					<AccessibleThemedText
						variant="secondary"
						size="md"
						style={{ marginBottom: 30, textAlign: "center" }}
					>
						{level === "app"
							? "We're sorry, but the app has encountered a critical error."
							: level === "screen"
								? "This screen has encountered an error and cannot be displayed."
								: "A component on this page has encountered an error."}
					</AccessibleThemedText>

					{showDetails && (
						<TouchableOpacity
							onPress={() => setDetailsVisible(!detailsVisible)}
							accessibilityRole="button"
							accessibilityLabel="Toggle error details"
							style={{ marginBottom: 20 }}
						>
							<AccessibleThemedText
								variant="primary"
								size="sm"
								style={{ textDecorationLine: "underline" }}
							>
								{detailsVisible ? "Hide" : "Show"} Error Details
							</AccessibleThemedText>
						</TouchableOpacity>
					)}

					{detailsVisible && (
						<View
							style={{
								backgroundColor: "rgba(255, 0, 0, 0.1)",
								padding: 15,
								borderRadius: 8,
								marginBottom: 20,
								width: "100%",
							}}
						>
							<AccessibleThemedText
								variant="error"
								size="sm"
								weight="semibold"
								style={{ marginBottom: 5 }}
							>
								Error ID: {errorId}
							</AccessibleThemedText>

							<AccessibleThemedText
								variant="secondary"
								size="xs"
								style={{ fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }) }}
							>
								{error.toString()}
							</AccessibleThemedText>

							{__DEV__ && (
								<AccessibleThemedText
									variant="secondary"
									size="xs"
									style={{
										marginTop: 10,
										fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
									}}
								>
									{error.stack}
								</AccessibleThemedText>
							)}
						</View>
					)}

					<View style={{ gap: 10, width: "100%" }}>
						<AccessibleThemedButton
							variant="primary"
							size="large"
							fullWidth
							onPress={resetError}
							accessibilityLabel="Retry"
							accessibilityHint="Try to recover from the error"
						>
							Retry
						</AccessibleThemedButton>

						{showDetails && (
							<>
								<AccessibleThemedButton
									variant="outline"
									size="medium"
									fullWidth
									onPress={handleCopyError}
									accessibilityLabel={copied ? "Copied" : "Copy Error Details"}
									disabled={copied}
								>
									{copied ? "✓ Copied" : "Copy Error Details"}
								</AccessibleThemedButton>

								<AccessibleThemedButton
									variant="ghost"
									size="medium"
									fullWidth
									onPress={handleReportError}
									accessibilityLabel="Report Error"
									accessibilityHint="Send error report via email"
								>
									Report Error
								</AccessibleThemedButton>
							</>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

// Error Boundary Class Component
export class ErrorBoundary extends Component<Props, State> {
	static defaultProps = {
		showDetails: __DEV__,
		resetOnPropsChange: true,
		isolate: true,
		level: "component" as const,
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
			errorCount: 0,
			errorId: "",
		};
	}

	static getDerivedStateFromError(error: Error): Partial<State> {
		const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		return {
			hasError: true,
			error,
			errorId,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { onError, level } = this.props;
		const { errorCount, errorId } = this.state;

		// Log to console in development
		if (__DEV__) {
			console.error("Error Boundary Caught:", error, errorInfo);
		}

		// Update state with error info
		this.setState({
			errorInfo,
			errorCount: errorCount + 1,
		});

		// Call custom error handler
		onError?.(error, errorInfo);

		// Validate and log component stack information
		if (!errorInfo.componentStack) {
			console.warn(
				"Error boundary: Component stack missing from errorInfo - React error boundary may not be providing expected debug info",
			);
		}

		// Report to error service
		captureException(error, {
			level,
			errorBoundary: true,
			errorId,
			componentStack: errorInfo.componentStack || "Component stack not available",
			errorCount: errorCount + 1,
		});
	}

	componentDidUpdate(prevProps: Props) {
		const { resetKeys, resetOnPropsChange } = this.props;
		const { hasError } = this.state;

		if (hasError && prevProps.resetKeys !== resetKeys && resetOnPropsChange) {
			// Check if any reset keys changed
			const hasResetKeyChanged = resetKeys?.some(
				(key, index) => key !== prevProps.resetKeys?.[index],
			);

			if (hasResetKeyChanged) {
				this.resetError();
			}
		}
	}

	resetError = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});

		announceForAccessibility("Error cleared, retrying");
	};

	render() {
		const { hasError, error, errorInfo, errorId } = this.state;
		const { children, fallback, showDetails, isolate, level } = this.props;

		if (hasError && error && errorInfo) {
			// If we have a custom fallback, use it
			if (fallback) {
				return <>{fallback}</>;
			}

			// For component-level errors in production, try to isolate the error
			if (!__DEV__ && level === "component" && isolate) {
				return (
					<View
						style={{
							padding: 20,
							backgroundColor: "rgba(255, 0, 0, 0.1)",
							borderRadius: 8,
						}}
					>
						<AccessibleThemedText variant="error" size="sm">
							This component encountered an error
						</AccessibleThemedText>
						<TouchableOpacity onPress={this.resetError}>
							<AccessibleThemedText
								variant="primary"
								size="sm"
								style={{ textDecorationLine: "underline", marginTop: 10 }}
							>
								Try Again
							</AccessibleThemedText>
						</TouchableOpacity>
					</View>
				);
			}

			// Show full error UI
			return (
				<ErrorFallback
					error={error}
					errorInfo={errorInfo}
					resetError={this.resetError}
					showDetails={showDetails || false}
					level={level || "component"}
					errorId={errorId}
				/>
			);
		}

		return children;
	}
}

// Hook for using error boundary
export const useErrorHandler = () => {
	const [error, setError] = React.useState<Error | null>(null);

	const resetError = React.useCallback(() => {
		setError(null);
	}, []);

	const captureError = React.useCallback((error: Error) => {
		setError(error);
	}, []);

	// Throw error to be caught by nearest error boundary
	if (error) {
		throw error;
	}

	return { captureError, resetError };
};
