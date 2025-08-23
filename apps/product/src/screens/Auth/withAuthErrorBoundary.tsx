/**
 * Error boundary wrapper specifically for auth screens
 * Provides consistent error handling for authentication flows
 */

import { useNavigation } from "@react-navigation/native";
import React, { type ComponentType } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { withErrorBoundary, withScreenErrorBoundary } from "../../components/ErrorBoundary";

interface AuthErrorFallbackProps {
	error: Error;
	resetError: () => void;
	screenName: string;
}

/**
 * Custom error fallback for auth screens
 */
const AuthErrorFallback: React.FC<AuthErrorFallbackProps> = ({ error, resetError, screenName }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleRetry = () => {
		resetError();
	};

	React.useEffect(() => {
		// Log auth-specific errors
		console.error(`Auth error in ${screenName}:`, error);
	}, [error, screenName]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 20,
				backgroundColor: "#f5f5f5",
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 10,
					color: "#333",
				}}
			>
				Authentication Error
			</Text>

			<Text
				style={{
					fontSize: 16,
					color: "#666",
					textAlign: "center",
					marginBottom: 30,
				}}
			>
				We encountered an issue with authentication. Please try again.
			</Text>

			<View style={{ gap: 10, width: "100%" }}>
				<TouchableOpacity
					style={{
						backgroundColor: "#007fff",
						paddingVertical: 15,
						paddingHorizontal: 30,
						borderRadius: 8,
						alignItems: "center",
					}}
					onClick={handleRetry}
				>
					<Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Try Again</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						paddingVertical: 15,
						paddingHorizontal: 30,
						alignItems: "center",
					}}
					onClick={handleGoBack}
				>
					<Text style={{ color: "#007fff", fontSize: 16 }}>Go Back</Text>
				</TouchableOpacity>
			</View>

			{__DEV__ && (
				<Text
					style={{
						marginTop: 20,
						fontSize: 12,
						color: "#999",
						fontFamily: "Roboto Mono",
					}}
				>
					{error.message}
				</Text>
			)}
		</View>
	);
};

/**
 * HOC to wrap auth screens with specialized error handling
 */
export function withAuthErrorBoundary<P extends object>(
	Screen: ComponentType<P>,
	screenName: string,
): ComponentType<P> {
	// First wrap with standard error boundary, then add custom handling
	const ScreenWithBoundary = withScreenErrorBoundary(Screen, screenName);

	// Wrap again with custom auth error handling
	return withErrorBoundary(ScreenWithBoundary, {
		level: "screen",
		showDetails: __DEV__,
		fallback: (
			<AuthErrorFallback
				error={new Error("Authentication failed")}
				resetError={() => {}}
				screenName={screenName}
			/>
		),
		onError: (error: Error, _errorInfo: React.ErrorInfo) => {
			// Special handling for auth errors
			if (error.message.includes("network")) {
				Alert.alert("Network Error", "Please check your internet connection and try again.");
			} else if (error.message.includes("unauthorized")) {
				Alert.alert("Authentication Failed", "Please check your credentials and try again.");
			}
		},
	});
}
