/**
 * Authentication Navigator
 * Handles login, registration, and password reset flows
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { ForgotPasswordScreen } from "../screens/Auth/ForgotPasswordScreen";
import { LoginScreen } from "../screens/Auth/LoginScreen";
import { RegisterScreen } from "../screens/Auth/RegisterScreen";
import { WelcomeScreen } from "../screens/Auth/WelcomeScreen";
import type { AuthStackParamList } from "./types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
	return (
		<ErrorBoundary
			level="screen"
			onError={(error) => {
				console.error("Auth navigator error:", error);
			}}
		>
			<AuthStack.Navigator
				screenOptions={{
					headerShown: true,
					headerTransparent: true,
					headerTitle: "",
					headerTintColor: "#007fff",
					contentStyle: {
						backgroundColor: "#f5f5f5",
					},
				}}
			>
				<AuthStack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{ headerShown: false }}
				/>
				<AuthStack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerTitle: "Sign In",
						headerTransparent: false,
					}}
				/>
				<AuthStack.Screen
					name="Register"
					component={RegisterScreen}
					options={{
						headerTitle: "Create Account",
						headerTransparent: false,
					}}
				/>
				<AuthStack.Screen
					name="ForgotPassword"
					component={ForgotPasswordScreen}
					options={{
						headerTitle: "Reset Password",
						headerTransparent: false,
					}}
				/>
			</AuthStack.Navigator>
		</ErrorBoundary>
	);
};
