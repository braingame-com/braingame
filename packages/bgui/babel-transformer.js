const { createTransformer } = require("babel-jest");
const flowRemoveTypes = require("flow-remove-types");
const path = require("path");

const transformer = createTransformer({
	configFile: path.resolve(__dirname, "babel.jest.config.js"),
});

const flowModulePattern = new RegExp(
	`node_modules[\\\\/](@react-native|react-native|@react-native-community)[\\\\/]`,
);

module.exports = {
	process(src, filename, options) {
		let code = src;
		if (flowModulePattern.test(filename)) {
			code = flowRemoveTypes(code, { pretty: true }).toString();
		}
		return transformer.process(code, filename, options);
	},
};
