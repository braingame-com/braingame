import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: [
		"@braingame/bgui",
		"@braingame/utils",
		"react-native-web",
		"react-native-svg-web",
	],
	webpack: (config, { isServer, dev }) => {
		// Configure React Native Web compatibility
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			// React Native web compatibility
			"react-native$": "react-native-web",
			"react-native-svg": "react-native-svg-web",
			"react-native/Libraries/Utilities/codegenNativeComponent": "react-native-web/dist/cjs/modules/UnimplementedView",
			"react-native-safe-area-context$": path.resolve(__dirname, "../../packages/bgui/src/web-shims/SafeAreaContext.tsx"),
		};

		// Add React Native web extensions
		config.resolve.extensions = [
			".web.js",
			".web.jsx", 
			".web.ts",
			".web.tsx",
			...config.resolve.extensions,
		];

		// Define React Native globals for web
		const { DefinePlugin } = require("webpack");
		config.plugins.push(
			new DefinePlugin({
				__DEV__: JSON.stringify(dev),
			})
		);

		// Handle font files and other assets
		config.module.rules.push({
			test: /\.(ttf|eot|woff|woff2)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					outputPath: "static/fonts/",
				},
			},
		});

		// Exclude problematic packages from server-side rendering
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				path: false,
				os: false,
				"react-native-reanimated": false,
			};
		}

		return config;
	},
};

export default nextConfig;