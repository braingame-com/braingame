import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type React from "react";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../AuthContext";
import type { DeepNavigationParams, RootStackParamList } from "../types";

interface NavigationGuardProps {
	children: React.ReactNode;
	requireAuth?: boolean;
	requireSubscription?: boolean;
	requireOnboarding?: boolean;
	redirectTo?: string;
}

export const NavigationGuard: React.FC<NavigationGuardProps> = ({
	children,
	requireAuth = false,
	requireSubscription = false,
	requireOnboarding = false,
	redirectTo,
}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { isAuthenticated, user, isLoading: authLoading } = useAuth();
	const [isChecking, setIsChecking] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

	const checkAccess = useCallback(async () => {
		setIsChecking(true);

		// Check authentication
		if (requireAuth && !isAuthenticated) {
			if (redirectTo) {
				navigation.navigate(redirectTo as never);
			} else {
				navigation.navigate("Auth", { screen: "Login" });
			}
			return;
		}

		// Check subscription
		if (requireSubscription && (!user || !user.isPremium)) {
			navigation.navigate("Main", {
				planId: "premium",
				price: 9.99,
			} as never);
			return;
		}

		// Check onboarding
		if (requireOnboarding) {
			const hasCompletedOnboarding = await AsyncStorage.getItem("onboarding_completed");
			if (!hasCompletedOnboarding) {
				// Navigate to main screen after onboarding
				// Navigate to main screen after onboarding
				navigation.navigate("Main", {
					screen: "HomeTabs",
					params: { screen: "Dashboard", params: { screen: "DashboardHome", params: {} } },
				} as DeepNavigationParams);
				return;
			}
		}

		setHasAccess(true);
		setIsChecking(false);
	}, [
		requireAuth,
		requireSubscription,
		requireOnboarding,
		isAuthenticated,
		user,
		redirectTo,
		navigation,
	]);

	useFocusEffect(
		useCallback(() => {
			checkAccess();
		}, [checkAccess]),
	);

	if (authLoading || isChecking) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#007fff" />
			</View>
		);
	}

	if (!hasAccess) {
		return null;
	}

	return <>{children}</>;
};

// HOC version for wrapping screens
export function withNavigationGuard<P extends object>(
	Component: React.ComponentType<P>,
	guardProps: Omit<NavigationGuardProps, "children">,
) {
	return (props: P) => (
		<NavigationGuard {...guardProps}>
			<Component {...props} />
		</NavigationGuard>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
});
