import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: ["react-native-web", "@braingame/bgui", "@braingame/utils"],
	webpack: (config) => {
		// Configure React Native Web aliases
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
		};

		return config;
	},
};

export default nextConfig;
