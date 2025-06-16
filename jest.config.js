/** @type {import('jest').Config} */
module.exports = {
	// Use jest-expo preset for React Native compatibility
	preset: "jest-expo",

	// Setup files
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

	// Test environment
	testEnvironment: "jsdom",

	// Module paths
	moduleNameMapper: {
		"^@braingame/(.*)$": "<rootDir>/packages/$1/src",
	},

	// Transform files
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},

	// Test match patterns
	testMatch: ["**/__tests__/**/*.(js|jsx|ts|tsx)", "**/*.(test|spec).(js|jsx|ts|tsx)"],

	// Coverage configuration
	collectCoverageFrom: [
		"apps/*/src/**/*.{js,jsx,ts,tsx}",
		"packages/*/src/**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/.turbo/**",
		"!**/dist/**",
		"!**/.next/**",
		"!**/.expo/**",
	],

	// Coverage thresholds
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},

	// Ignore patterns
	testPathIgnorePatterns: ["/node_modules/", "/.turbo/", "/dist/", "/.next/", "/.expo/"],

	// Module file extensions
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

	// Projects configuration for monorepo
	projects: ["<rootDir>/apps/*/jest.config.js", "<rootDir>/packages/*/jest.config.js"],
};
