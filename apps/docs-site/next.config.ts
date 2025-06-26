import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	experimental: {
		optimizePackageImports: ['@braingame/bgui', '@braingame/utils'],
	},
	webpack: (config) => {
		// Enable tree shaking
		config.optimization.usedExports = true;
		config.optimization.sideEffects = false;

		// Split chunks for better caching
		config.optimization.splitChunks = {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: 20,
				},
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'all',
					priority: 10,
					reuseExistingChunk: true,
				},
			},
		};

		return config;
	},
};

export default withBundleAnalyzer(nextConfig);
