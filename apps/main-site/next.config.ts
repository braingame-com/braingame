import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	webpack: (config) => {
		// Handle .web.tsx extensions
		config.resolve.extensions = [
			".web.js",
			".web.jsx",
			".web.ts",
			".web.tsx",
			...config.resolve.extensions,
		];

		// Ignore React Native specific modules
		config.resolve.alias = {
			...config.resolve.alias,
			"@expo/vector-icons": false,
			"react-native$": "react-native-web",
			"react-native-reanimated": false,
			"react-native-gesture-handler": false,
			"react-native-safe-area-context": false,
			"react-native-screens": false,
		};

		return config;
	},
};

export default nextConfig;
