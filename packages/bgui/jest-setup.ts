import "@testing-library/react-native/extend-expect";

// Declare global __DEV__ variable
declare global {
	namespace NodeJS {
		interface Global {
			__DEV__: boolean;
		}
	}
}

// Mock React Native modules
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock Platform for tests
jest.mock("react-native/Libraries/Utilities/Platform", () => ({
	OS: "ios",
	select: jest.fn((obj) => obj.ios),
}));

// Set up global mocks
// @ts-expect-error - Adding __DEV__ to global for testing
global.__DEV__ = true;
