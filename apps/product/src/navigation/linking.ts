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
					HomeTabs: {
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
									AnalyticsOverview: "analytics",
								},
							},
							Mindset: "mindset",
							Profile: "profile",
						},
					},
					Settings: "settings",
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
	// Remove getStateFromPath to use default implementation
};
