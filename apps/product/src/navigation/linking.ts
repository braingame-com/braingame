/**
 * Deep Linking Configuration
 * Handles URL navigation for the app
 */

import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import type { RootStackParamList } from "./types";

const prefix = Linking.createURL("/");

export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [prefix, "braingame://", "https://app.braingame.dev"],
	config: {
		screens: {
			Main: {
				screens: {
					Dashboard: {
						screens: {
							DashboardHome: "dashboard",
							TaskDetails: "dashboard/task/:taskId",
						},
					},
					Videos: {
						screens: {
							VideosList: "videos",
						},
					},
					Analytics: {
						screens: {
							AnalyticsHome: "analytics",
							AnalyticsDetails: "analytics/:metricType",
						},
					},
					Settings: {
						screens: {
							SettingsHome: "settings",
							CloudSettings: "settings/cloud",
							PrivacySettings: "settings/privacy",
							AccountSettings: "settings/account",
						},
					},
				},
			},
			VideoPlayer: {
				path: "video/:videoId",
				parse: {
					videoId: (videoId: string) => videoId,
				},
			},
			Auth: {
				screens: {
					Welcome: "welcome",
					Login: "login",
					Register: "register",
					ForgotPassword: "forgot-password",
				},
			},
		},
	},
	async getStateFromPath(path, _config) {
		// Custom logic for handling special paths
		console.log("Deep link received:", path);

		// You can add custom logic here to handle special cases
		// For example, redirecting old URLs to new ones

		// Use the default implementation
		return undefined;
	},
};
