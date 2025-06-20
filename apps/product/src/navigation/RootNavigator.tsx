import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { AuthNavigator } from "./AuthNavigator";
import { linking } from "./DeepLinkingConfig";
import { DrawerNavigator } from "./DrawerNavigator";
import { isReadyRef, navigationRef } from "./NavigationService";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		// You could return a splash screen here
		return null;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthenticated ? (
				<Stack.Screen name="Main" component={DrawerNavigator} />
			) : (
				<Stack.Screen name="Auth" component={AuthNavigator} />
			)}
		</Stack.Navigator>
	);
};

export const RootNavigator: React.FC = () => {
	React.useEffect(() => {
		return () => {
			isReadyRef.current = false;
		};
	}, []);

	return (
		<AuthProvider>
			<NavigationContainer
				ref={navigationRef}
				onReady={() => {
					isReadyRef.current = true;
				}}
				linking={linking}
			>
				<RootStack />
			</NavigationContainer>
		</AuthProvider>
	);
};
