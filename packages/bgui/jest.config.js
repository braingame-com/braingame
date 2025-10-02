const path = require("path");
const reactNativePreset = require("react-native/jest-preset");

const babelTransformer = path.resolve(__dirname, "babel-transformer.js");
const assetTransformer =
	reactNativePreset.transform["^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$"];

module.exports = {
	...reactNativePreset,
	testEnvironment: reactNativePreset.testEnvironment,
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": babelTransformer,
		"^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$": assetTransformer,
	},
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|react-native-svg)/)",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupFilesAfterEnv: [
		...(reactNativePreset.setupFilesAfterEnv ?? []),
		"@testing-library/jest-native/extend-expect",
		"<rootDir>/jest.setup.js",
	],
	moduleNameMapper: {
		"^react-native-svg$": "<rootDir>/test/mocks/react-native-svg.tsx",
	},
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.test.{ts,tsx}",
		"!src/**/index.{ts,tsx}",
		"!src/**/*.stories.tsx",
		"!src/types/**",
	],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
};
