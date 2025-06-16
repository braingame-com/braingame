// Add custom jest matchers
import "@testing-library/jest-dom";

// Mock React Native modules if needed
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Global test utilities
global.testUtils = {
	// Add any global test utilities here
};

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
	console.warn = (...args) => {
		if (typeof args[0] === "string" && args[0].includes("Please update the following components")) {
			return;
		}
		originalWarn.call(console, ...args);
	};
});

afterAll(() => {
	console.warn = originalWarn;
});
