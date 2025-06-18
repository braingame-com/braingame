import "@testing-library/react-native/extend-expect";

// Mock React Native modules
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock Platform for tests
jest.mock("react-native/Libraries/Utilities/Platform", () => ({
	OS: "ios",
	select: jest.fn((obj) => obj.ios),
}));

// Set up global mocks
global.__DEV__ = true;