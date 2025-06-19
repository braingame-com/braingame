import "@testing-library/jest-dom";

// Declare global __DEV__ variable
declare global {
	namespace NodeJS {
		interface Global {
			__DEV__: boolean;
		}
	}
}

// Set up global mocks
// @ts-expect-error - Adding __DEV__ to global for testing
global.__DEV__ = true;

// Mock console methods to reduce noise in tests
global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};
