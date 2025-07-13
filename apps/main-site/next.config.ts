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
	// Image optimization for static export
	images: {
		unoptimized: true,
	},

	// Production optimizations
	poweredByHeader: false,
	compress: true,
	generateEtags: true,

	// Security headers (Note: headers don't work with static export, apply these in Firebase hosting)
	// Environment variables validation
	env: {
		NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
		NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || "local",
	},

	// Webpack configuration
	webpack: (config, { isServer, dev }) => {
		// Configure React Native Web aliases
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
			"@expo/vector-icons": false,
			"expo-router": false,
			"expo-modules-core": false,
			"expo-linking": false,
			"expo-status-bar": false,
			"react-native-safe-area-context": false,
		};

		// Configure extensions to prefer .web.tsx files
		config.resolve.extensions = [
			".web.tsx",
			".web.ts",
			".web.jsx",
			".web.js",
			...config.resolve.extensions,
		];
		// Production optimizations
		if (!dev && !isServer) {
			// Enable tree shaking for ES modules
			config.optimization.usedExports = true;

			// Minimize bundle size
			config.optimization.minimize = true;

			// Split chunks for better caching
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					default: false,
					vendors: false,
					// Vendor chunk
					vendor: {
						name: "vendor",
						chunks: "all",
						test: /node_modules/,
						priority: 20,
					},
					// Common chunk
					common: {
						name: "common",
						minChunks: 2,
						chunks: "all",
						priority: 10,
						reuseExistingChunk: true,
						enforce: true,
					},
					// BGUI components chunk
					bgui: {
						name: "bgui",
						test: /[\\/]packages[\\/]bgui[\\/]/,
						chunks: "all",
						priority: 30,
					},
				},
			};
		}

		// Add rule to handle font files
		config.module.rules.push({
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			type: "asset/resource",
		});

		return config;
	},

	// Experimental features for production
	experimental: {
		// Enable optimized package imports
		optimizePackageImports: ["@braingame/bgui", "@braingame/utils"],
	},
};

export default nextConfig;
