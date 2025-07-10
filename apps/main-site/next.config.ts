import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	transpilePackages: ["react-native-web", "@braingame/bgui", "@braingame/utils"],

	// Performance optimizations
	compress: true,
	poweredByHeader: false,

	// Image optimization
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
	},

	// Security headers
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

	// Experimental features for better performance
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ["@braingame/bgui", "@braingame/utils"],
		optimizeServerReact: true,
	},

	webpack: (config, { isServer }) => {
		// Configure React Native Web aliases
		config.resolve.alias = {
			...config.resolve.alias,
			"react-native$": "react-native-web",
		};

		// Optimize bundle size
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				usedExports: true,
				sideEffects: false,
			};
		}

		return config;
	},
};

export default nextConfig;
