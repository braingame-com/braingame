export const linking = {
	prefixes: ["braingame://", "https://braingame.com"],
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
