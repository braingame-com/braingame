import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider } from "../theme";
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
		<ErrorBoundary level="app" onError={(error, errorInfo) => {
			// Critical navigation error - log with high priority
			console.error('Critical navigation error:', error, errorInfo);
		}}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isAuthenticated ? (
					<Stack.Screen name="Main" component={DrawerNavigator} />
				) : (
					<Stack.Screen name="Auth" component={AuthNavigator} />
				)}
			</Stack.Navigator>
		</ErrorBoundary>
	);
};

export const RootNavigator: React.FC = () => {
	React.useEffect(() => {
		return () => {
			isReadyRef.current = false;
		};
	}, []);

	return (
		<ErrorBoundary level="app" onError={(error, errorInfo) => {
			// Critical app-level error - log with maximum priority
			console.error('Critical app error:', error, errorInfo);
		}}>
			<ThemeProvider>
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
			</ThemeProvider>
		</ErrorBoundary>
	);
};
