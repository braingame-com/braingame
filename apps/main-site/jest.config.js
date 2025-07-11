module.exports = {
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(t|j)sx?$": "@swc/jest",
	},
	transformIgnorePatterns: [
		"node_modules/(?!.*(@react-native|react-native|@braingame|@expo).*)",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^react-native$": "react-native-web",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testPathIgnorePatterns: ["/node_modules/", "/.next/"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{ts,tsx}",
		"!src/**/index.{ts,tsx}",
	],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	testMatch: [
		"**/__tests__/**/*.{ts,tsx}",
		"**/?(*.)+(spec|test).{ts,tsx}",
	],
};