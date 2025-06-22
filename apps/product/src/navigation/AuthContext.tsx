import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ContextErrorBoundary } from "../../../packages/bgui/src/components/ErrorBoundary";

interface User {
	id: string;
	email: string;
	displayName?: string;
	isPremium?: boolean;
}

interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, displayName: string) => Promise<void>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const checkAuthStatus = useCallback(async () => {
		try {
			const token = await AsyncStorage.getItem("auth_token");
			const userData = await AsyncStorage.getItem("user_data");

			if (token && userData) {
				setUser(JSON.parse(userData));
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error("Error checking auth status:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	const login = async (email: string, _password: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock successful login
		const mockUser: User = {
			id: "1",
			email,
			displayName: email.split("@")[0],
			isPremium: false,
		};

		await AsyncStorage.setItem("auth_token", "mock_token");
		await AsyncStorage.setItem("user_data", JSON.stringify(mockUser));

		setUser(mockUser);
		setIsAuthenticated(true);
	};

	const register = async (email: string, _password: string, displayName: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock successful registration
		const mockUser: User = {
			id: "1",
			email,
			displayName,
			isPremium: false,
		};

		await AsyncStorage.setItem("auth_token", "mock_token");
		await AsyncStorage.setItem("user_data", JSON.stringify(mockUser));

		setUser(mockUser);
		setIsAuthenticated(true);
	};

	const logout = async () => {
		await AsyncStorage.multiRemove(["auth_token", "user_data"]);
		setUser(null);
		setIsAuthenticated(false);
	};

	const resetPassword = async (_email: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// In a real app, this would send a password reset email
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				user,
				login,
				register,
				logout,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ContextErrorBoundary contextName="Auth">
			<AuthProviderInner>{children}</AuthProviderInner>
		</ContextErrorBoundary>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
