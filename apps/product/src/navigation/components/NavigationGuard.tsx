import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../AuthContext";

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
	const navigation = useNavigation();
	const { isAuthenticated, user, isLoading: authLoading } = useAuth();
	const [isChecking, setIsChecking] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);

	useFocusEffect(
		React.useCallback(() => {
			checkAccess();
		}, [isAuthenticated, user]),
	);

	const checkAccess = async () => {
		setIsChecking(true);

		// Check authentication
		if (requireAuth && !isAuthenticated) {
			if (redirectTo) {
				navigation.navigate(redirectTo as never);
			} else {
				navigation.navigate("Auth" as never, { screen: "Login" } as never);
			}
			return;
		}

		// Check subscription
		if (requireSubscription && (!user || !user.isPremium)) {
			navigation.navigate(
				"Payment" as never,
				{
					planId: "premium",
					price: 9.99,
				} as never,
			);
			return;
		}

		// Check onboarding
		if (requireOnboarding) {
			const hasCompletedOnboarding = await AsyncStorage.getItem("onboarding_completed");
			if (!hasCompletedOnboarding) {
				navigation.navigate("Onboarding" as never, { step: 0 } as never);
				return;
			}
		}

		setHasAccess(true);
		setIsChecking(false);
	};

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
