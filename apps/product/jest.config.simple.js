module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)",
		"<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)",
	],
};
