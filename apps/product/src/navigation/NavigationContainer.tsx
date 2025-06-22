/**
 * Main Navigation Container
 * Sets up the navigation structure with authentication flow
 */

import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { ActivityIndicator, View } from "react-native";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { VideoPlayerScreen } from "../screens/Videos/VideoPlayerScreen";
import { useAuth } from "./AuthContext";
import { AuthNavigator } from "./AuthNavigator";
import { linking } from "./linking";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const NavigationContainer: React.FC = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#007fff" />
			</View>
		);
	}

	return (
		<ErrorBoundary level="screen" onError={(error, errorInfo) => {
			// Navigation container error - critical for app functionality
			console.error('Navigation container error:', error, errorInfo);
		}}>
			<RNNavigationContainer linking={linking}>
				<ErrorBoundary level="component" onError={(error, errorInfo) => {
					// Stack navigator error - isolate to prevent app-wide crash
					console.error('Stack navigator error:', error, errorInfo);
				}}>
					<RootStack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						{isAuthenticated ? (
							<>
								<RootStack.Screen name="Main" component={TabNavigator} />
								<RootStack.Screen
									name="VideoPlayer"
									component={VideoPlayerScreen}
									options={{
										presentation: "modal",
										headerShown: true,
										headerTitle: "Video Player",
										headerTintColor: "#007fff",
									}}
								/>
							</>
						) : (
							<RootStack.Screen
								name="Auth"
								component={AuthNavigator}
								options={{
									animationTypeForReplace: "pop",
								}}
							/>
						)}
					</RootStack.Navigator>
				</ErrorBoundary>
			</RNNavigationContainer>
		</ErrorBoundary>
	);
};
