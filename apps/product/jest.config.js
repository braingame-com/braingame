module.exports = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper: {
		"^@braingame/(.*)$": "<rootDir>/../../packages/$1/src",
	},
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)",
		"<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)",
	],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!**/node_modules/**",
		"!**/.expo/**",
	],
};
