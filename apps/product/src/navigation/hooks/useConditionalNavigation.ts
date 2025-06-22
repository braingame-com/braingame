import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useAuth } from "../AuthContext";
import type { DeepNavigationParams, RootStackParamList } from "../types";

interface NavigationConditions {
	requiresAuth?: boolean;
	requiresOnboarding?: boolean;
	requiresSubscription?: boolean;
	minimumAppVersion?: string;
}

export const useConditionalNavigation = (conditions: NavigationConditions = {}) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { isAuthenticated, user } = useAuth();

	const checkConditions = useCallback(async () => {
		// Check authentication
		if (conditions.requiresAuth && !isAuthenticated) {
			navigation.navigate("Auth", { screen: "Login" });
			return;
		}

		// Check onboarding
		if (conditions.requiresOnboarding) {
			const hasCompletedOnboarding = await AsyncStorage.getItem("onboarding_completed");
			if (!hasCompletedOnboarding) {
				// Navigate to main screen for onboarding
				// Navigate to main screen for onboarding
				navigation.navigate("Main", {
					screen: "HomeTabs",
					params: { screen: "Dashboard", params: { screen: "DashboardHome", params: {} } },
				} as DeepNavigationParams);
				return;
			}
		}

		// Check subscription
		if (conditions.requiresSubscription && user && !user.isPremium) {
			// Navigate to main screen for subscription
			navigation.navigate("Main", { screen: "Settings" });
			return;
		}
	}, [conditions, isAuthenticated, user, navigation]);

	useEffect(() => {
		checkConditions();
	}, [checkConditions]);

	const navigateWithConditions = (
		screen: string,
		params?: unknown,
		additionalConditions?: NavigationConditions,
	) => {
		const allConditions = { ...conditions, ...additionalConditions };

		// Perform checks before navigation
		if (allConditions.requiresAuth && !isAuthenticated) {
			// Store intended destination for post-login redirect
			AsyncStorage.setItem("post_login_redirect", JSON.stringify({ screen, params }));
			navigation.navigate("Auth", { screen: "Login" });
			return;
		}

		// Navigate if all conditions pass
		// @ts-expect-error - Dynamic navigation typing
		navigation.navigate(screen as keyof RootStackParamList, params);
	};

	return {
		navigateWithConditions,
		checkConditions,
	};
};

// Hook for handling deep links with conditions
export const useDeepLinkNavigation = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { isAuthenticated } = useAuth();

	const handleDeepLink = async (url: string) => {
		// Parse the URL
		const route = parseDeepLink(url);

		if (!route) return;

		// Check if route requires authentication
		const protectedRoutes = ["profile", "settings", "premium"];
		const requiresAuth = protectedRoutes.includes(route.screen);

		if (requiresAuth && !isAuthenticated) {
			// Store deep link for post-login
			await AsyncStorage.setItem("pending_deep_link", url);
			navigation.navigate("Auth", { screen: "Login" });
			return;
		}

		// Navigate to the deep linked screen
		// @ts-expect-error - Dynamic route navigation typing
		navigation.navigate(route.screen as keyof RootStackParamList, route.params);
	};

	const parseDeepLink = (url: string): { screen: string; params?: unknown } | null => {
		// Simple URL parsing logic
		const path = url.replace(/.*?:\/\//g, "");
		const parts = path.split("/");

		const routeMap: Record<string, { screen: string; params?: unknown }> = {
			videos: { screen: "Videos" },
			video: { screen: "VideoPlayer" },
			analytics: { screen: "Analytics" },
			profile: { screen: "Profile" },
			settings: { screen: "Settings" },
		};

		const route = routeMap[parts[0]];

		if (route && parts[1]) {
			// Add ID parameter if present
			route.params = { id: parts[1] };
		}

		return route || null;
	};

	return { handleDeepLink };
};
