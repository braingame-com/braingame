module.exports = {
	testEnvironment: "jsdom",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!(react-native|@react-native|react-native-.*)/)"],
	moduleNameMapper: {
		"^../utils/(.*)$": "<rootDir>/../utils/$1",
	},
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*.d.ts", "!**/node_modules/**", "!**/jest.config.js"],
};
