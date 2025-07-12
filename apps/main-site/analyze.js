// Bundle analyzer for production builds
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const nextConfig = require("./next.config");

// Add bundle analyzer to webpack config
module.exports = {
	...nextConfig,
	webpack: (config, options) => {
		// Run the original webpack config
		const originalConfig = nextConfig.webpack ? nextConfig.webpack(config, options) : config;

		// Add bundle analyzer in production build
		if (!options.dev && !options.isServer) {
			originalConfig.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: "static",
					reportFilename: "../bundle-report.html",
					openAnalyzer: false,
					generateStatsFile: true,
					statsFilename: "../bundle-stats.json",
				}),
			);
		}

		return originalConfig;
	},
};
