import type { NextConfig } from "next";
import path from "path";
import webpack from "webpack";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: ["@braingame/bgui", "@braingame/utils"],
	webpack: (config, { isServer }) => {
		// Handle font files
		config.module.rules.push({
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			type: "asset/resource",
			generator: {
				filename: "static/fonts/[name].[hash][ext]",
			},
		});

		// Resolve React Native for Web
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
			"react-native/Libraries/Utilities/codegenNativeComponent": "react-native-web/dist/cjs/modules/UnimplementedView",
			"react-native-safe-area-context$": path.resolve(__dirname, "../../packages/bgui/src/web-shims/SafeAreaContext.tsx"),
		};

		// Ignore problematic modules that are mobile-only
		config.resolve.fallback = {
			...config.resolve.fallback,
			"react-native-reanimated": false,
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
