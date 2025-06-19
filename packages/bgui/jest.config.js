module.exports = {
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	transformIgnorePatterns: [
		// Very permissive pattern to transform all React Native modules
		"node_modules/(?!.*(@react-native|react-native|@braingame|@testing-library|@expo).*)",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^react-native$": "react-native-web",
		"^react-native-reanimated$": "<rootDir>/__mocks__/react-native-reanimated.js",
		"^react-native-gesture-handler$": "<rootDir>/__mocks__/react-native-gesture-handler.js",
		"^@expo/vector-icons$": "<rootDir>/__mocks__/expo-vector-icons.js",
		"^@braingame/utils$": "<rootDir>/../utils/index.ts",
		"^@braingame/utils/(.*)$": "<rootDir>/../utils/$1",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
	},
	setupFiles: ["<rootDir>/jest-setup.js"],
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.test.{ts,tsx}",
		"!src/**/index.{ts,tsx}",
		"!src/**/*.stories.tsx",
		"!src/types/**",
		"!src/test-utils.tsx",
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	globals: {
		__DEV__: true,
	},
};
