import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	webpack: (config, { webpack }) => {
		// Ignore font files from @expo/vector-icons
		config.module.rules.push({
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			loader: "ignore-loader",
		});

		// Add .web.tsx extension resolution with higher priority
		config.resolve.extensions = [
			".web.tsx",
			".web.ts",
			".web.jsx",
			".web.js",
			...config.resolve.extensions,
		];

		// Alias React Native packages to stubs for web
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
			"react-native-svg": false,
			"@expo/vector-icons": false,
			"react-native-reanimated": false,
			"react-native-gesture-handler": false,
			"expo-router": false,
			"expo-status-bar": false,
			"react-native-safe-area-context": false,
		};

		// Define __DEV__ for React Native compatibility
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
			}),
		);

		return config;
	},
};

export default nextConfig;
