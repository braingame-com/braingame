const defaultConfig = require("./jest.config");

module.exports = {
	...defaultConfig,
	// Use minimal test environment for performance tests
	testEnvironment: "node",
	// Run tests serially for consistent performance measurements
	maxWorkers: 1,
	// Disable coverage for performance tests
	collectCoverage: false,
	// Use different cache directory to avoid conflicts
	cacheDirectory: "<rootDir>/.jest-perf",
	// Specific setup for performance tests
	setupFilesAfterEnv: [...defaultConfig.setupFilesAfterEnv, "<rootDir>/.reassure/jest-setup.ts"],
};
