import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: [
		"react-native-web",
		"@braingame/bgui",
		"@braingame/utils",
		"expo-router",
		"expo-modules-core",
		"expo-linking",
		"expo-status-bar",
		"react-native-safe-area-context",
	],

	// Performance optimizations
	compress: true,
	poweredByHeader: false,
	generateEtags: true,

	// Image optimization with performance settings
	images: {
		unoptimized: true, // Required for static export
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
	},

	// Security headers (Note: headers don't work with static export, apply these in Firebase hosting)
	headers: async () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "X-DNS-Prefetch-Control",
					value: "on",
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff",
				},
				{
					key: "X-Frame-Options",
					value: "DENY",
				},
				{
					key: "X-XSS-Protection",
					value: "1; mode=block",
				},
				{
					key: "Referrer-Policy",
					value: "strict-origin-when-cross-origin",
				},
				{
					key: "Permissions-Policy",
					value: "camera=(), microphone=(), geolocation=()",
				},
			],
		},
		{
			source: "/(.*)",
			headers: [
				{
					key: "Cache-Control",
					value: "public, max-age=31536000, immutable",
				},
			],
		},
	],

	// Environment variables validation
	env: {
		NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
		NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || "local",
	},

	// Experimental features for better performance
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ["@braingame/bgui", "@braingame/utils"],
		optimizeServerReact: true,
		externalDir: true,
	},

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
			config.optimization.sideEffects = false;

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
};

export default nextConfig;
