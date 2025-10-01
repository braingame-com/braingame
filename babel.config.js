module.exports = (api) => {
	api.cache(true);
	return {
		presets: [["@babel/preset-env", { targets: { node: "current" } }], ["@babel/preset-react", { runtime: "automatic" }]],
		plugins: ["@babel/plugin-transform-class-properties"],
		overrides: [
			{
				test: ["**/*.ts", "**/*.tsx"],
				presets: ["@babel/preset-typescript"],
			},
			{
				test: ["**/*.js", "**/*.jsx"],
				presets: ["@babel/preset-flow"],
			},
		],
	};
};
