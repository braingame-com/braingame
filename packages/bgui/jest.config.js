module.exports = {
	preset: "@testing-library/react-native",
	testEnvironment: "node",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react",
				},
			},
		],
	},
	transformIgnorePatterns: [
		"node_modules/(?!(react-native|@react-native|react-native-.*|@braingame)/)",
	],
	moduleNameMapper: {
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
