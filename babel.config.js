module.exports = (api) => {
	api.cache(true);
	return {
		presets: [
			["@babel/preset-env", { targets: { node: "current" } }],
			"@babel/preset-flow",
			"@babel/preset-typescript",
			["@babel/preset-react", { runtime: "automatic" }],
		],
		plugins: ["@babel/plugin-transform-class-properties"],
	};
};
