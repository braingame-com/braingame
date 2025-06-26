import type { NextConfig } from "next";
import path from "path";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

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

		// Handle font files - use asset/resource instead of file-loader for Next.js 15
		config.module.rules.push({
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			type: "asset/resource",
			generator: {
				filename: "static/fonts/[hash][ext][query]",
			},
		});

		// Create fallback for Expo packages
		const { IgnorePlugin } = require("webpack");
		config.plugins.push(
			new IgnorePlugin({
				resourceRegExp: /(expo-.*|@expo\/.*)/,
			}),
		);

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

export default withBundleAnalyzer(nextConfig);
