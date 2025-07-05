import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: "export", // Commented out for dev server
	trailingSlash: true,
	transpilePackages: [
		"@braingame/bgui", 
		"@braingame/utils", 
		"react-native-web", 
		"@expo/vector-icons",
		"expo-modules-core",
		"expo-font",
		"expo-linking",
		"expo-router",
		"react-native-reanimated",
		"react-native-gesture-handler",
		"react-native-screens",
		"react-native-safe-area-context"
	],
	webpack: (config, { isServer, webpack }) => {
		// Handle React Native Web compatibility
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
			"react-native-svg": "react-native-svg-web",
		};

		// Handle font files from @expo/vector-icons
		config.module.rules.push({
			test: /\.ttf$/,
			type: "asset/resource",
		});
		
		// Exclude unused icon sets to prevent loading AntDesign and others
		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				// Only include MaterialIcons, exclude other icon sets
				"@expo/vector-icons/AntDesign": false,
				"@expo/vector-icons/Entypo": false,
				"@expo/vector-icons/EvilIcons": false,
				"@expo/vector-icons/Feather": false,
				"@expo/vector-icons/FontAwesome": false,
				"@expo/vector-icons/FontAwesome5": false,
				"@expo/vector-icons/FontAwesome6": false,
				"@expo/vector-icons/Foundation": false,
				"@expo/vector-icons/Ionicons": false,
				"@expo/vector-icons/MaterialCommunityIcons": false,
				"@expo/vector-icons/Octicons": false,
				"@expo/vector-icons/SimpleLineIcons": false,
				"@expo/vector-icons/Zocial": false,
			};
		}

		// Handle __DEV__ global
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
			})
		);

		// Handle module resolution for React Native Web
		config.resolve.extensions = [
			".web.tsx",
			".web.ts",
			".web.jsx",
			".web.js",
			".tsx",
			".ts",
			".jsx",
			".js",
			...config.resolve.extensions,
		];

		return config;
	},
};

export default nextConfig;
