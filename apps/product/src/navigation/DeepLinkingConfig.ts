import { DEEP_LINKING_CONFIG } from "../config/env";

export const linking = {
	prefixes: DEEP_LINKING_CONFIG.prefixes,
	config: {
		screens: {
			Auth: {
				screens: {
					Welcome: "welcome",
					Login: "login",
					Register: "register",
					ForgotPassword: "forgot-password",
				},
			},
			Main: {
				screens: {
					HomeTabs: {
						screens: {
							Dashboard: "dashboard",
							Mindset: "mindset",
							Videos: "videos",
							Analytics: "analytics",
							Profile: "profile",
						},
					},
					Settings: "settings",
				},
			},
		},
	},
};
