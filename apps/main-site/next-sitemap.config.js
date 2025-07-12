/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://braingame.dev",
	generateRobotsTxt: false, // We generate it manually for more control
	outDir: "./out",
	exclude: ["/dev/*", "/404", "/500"],
	generateIndexSitemap: false,
	changefreq: "weekly",
	priority: 0.7,
	transform: async (config, path) => {
		// Set custom priority for important pages
		const customPriority = {
			"/": 1.0,
			"/privacy": 0.5,
			"/terms": 0.5,
			"/cookies": 0.5,
		};

		return {
			loc: path,
			changefreq: config.changefreq,
			priority: customPriority[path] || config.priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		};
	},
};