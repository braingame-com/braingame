// Jest setup for React Native/Expo testing
import "@testing-library/react-native/extend-expect";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
	const Reanimated = require("react-native-reanimated/mock");
	Reanimated.default.call = () => {};
	return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// Mock expo modules that might cause issues in tests
jest.mock("expo-font", () => ({
	loadAsync: jest.fn(),
	isLoaded: jest.fn(() => true),
	isLoading: jest.fn(() => false),
}));

jest.mock("expo-asset", () => ({
	fromModule: jest.fn(() => ({
		downloadAsync: jest.fn(),
		downloaded: true,
		localUri: "mock-local-uri",
	})),
}));

// Setup global mocks
global.__DEV__ = true;
