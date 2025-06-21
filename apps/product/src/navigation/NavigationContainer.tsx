/**
 * Main Navigation Container
 * Sets up the navigation structure with authentication flow
 */

import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { ActivityIndicator, View } from "react-native";
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
		<RNNavigationContainer linking={linking}>
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
		</RNNavigationContainer>
	);
};
