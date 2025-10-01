module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
		"@babel/preset-flow",
		["@babel/preset-typescript", { allowDeclareFields: true, onlyRemoveTypeImports: true }],
		["@babel/preset-react", { runtime: "automatic" }],
	],
	plugins: [
		["@babel/plugin-transform-class-properties", { loose: true }],
		["@babel/plugin-transform-private-methods", { loose: true }],
		["@babel/plugin-transform-private-property-in-object", { loose: true }],
	],
};
