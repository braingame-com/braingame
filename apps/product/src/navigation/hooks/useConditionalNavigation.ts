import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useAuth } from "../AuthContext";

interface NavigationConditions {
	requiresAuth?: boolean;
	requiresOnboarding?: boolean;
	requiresSubscription?: boolean;
	minimumAppVersion?: string;
}

export const useConditionalNavigation = (conditions: NavigationConditions = {}) => {
	const navigation = useNavigation();
	const { isAuthenticated, user } = useAuth();

	const checkConditions = useCallback(async () => {
		// Check authentication
		if (conditions.requiresAuth && !isAuthenticated) {
			navigation.navigate("Auth" as never, { screen: "Login" } as never);
			return;
		}

		// Check onboarding
		if (conditions.requiresOnboarding) {
			const hasCompletedOnboarding = await AsyncStorage.getItem("onboarding_completed");
			if (!hasCompletedOnboarding) {
				navigation.navigate("Onboarding" as never);
				return;
			}
		}

		// Check subscription
		if (conditions.requiresSubscription && user && !user.isPremium) {
			navigation.navigate(
				"Payment" as never,
				{
					planId: "premium",
					price: 9.99,
				} as never,
			);
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
			navigation.navigate("Auth" as never, { screen: "Login" } as never);
			return;
		}

		// Navigate if all conditions pass
		navigation.navigate(screen as never, params);
	};

	return {
		navigateWithConditions,
		checkConditions,
	};
};

// Hook for handling deep links with conditions
export const useDeepLinkNavigation = () => {
	const navigation = useNavigation();
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
			navigation.navigate("Auth" as never, { screen: "Login" } as never);
			return;
		}

		// Navigate to the deep linked screen
		navigation.navigate(route.screen as never, route.params);
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
