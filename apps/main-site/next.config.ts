import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: [
		"react-native-web",
		"@braingame/bgui",
		"@braingame/utils",
		"@expo/vector-icons",
		"expo-router",
		"expo-modules-core",
		"expo-linking",
		"expo-status-bar",
		"react-native-safe-area-context",
	],
	webpack: (config) => {
		// Configure React Native Web aliases
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
		};

		// Add rule to handle font files
		config.module.rules.push({
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			type: "asset/resource",
		});

		return config;
	},
};

export default nextConfig;
