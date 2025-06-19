module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react-jsx",
				},
			},
		],
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!(@testing-library|@braingame)/)"],
	moduleNameMapper: {
		"^react-native$": "react-native-web",
		"^@braingame/utils$": "<rootDir>/../utils/index.ts",
		"^@braingame/utils/(.*)$": "<rootDir>/../utils/$1",
	},
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.test.{ts,tsx}",
		"!src/**/index.{ts,tsx}",
		"!src/**/*.stories.tsx",
	],
};
