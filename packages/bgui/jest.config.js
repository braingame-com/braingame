module.exports = {
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
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
