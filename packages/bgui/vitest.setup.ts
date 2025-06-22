import { vi } from "vitest";

// Setup globals
global.__DEV__ = true;

// Mock expo modules
vi.mock("expo-font", () => ({
	loadAsync: vi.fn(),
	isLoaded: vi.fn(() => true),
	isLoading: vi.fn(() => false),
}));

vi.mock("expo-asset", () => ({
	fromModule: vi.fn(() => ({
		downloadAsync: vi.fn(),
		downloaded: true,
		localUri: "mock-local-uri",
	})),
}));

// Mock react-native-reanimated for web
vi.mock("react-native-reanimated", () => ({
	default: {
		createAnimatedComponent: (component: any) => component,
		View: "View",
		Text: "Text",
		Image: "Image",
		ScrollView: "ScrollView",
	},
	useSharedValue: (initial: any) => ({ value: initial }),
	useAnimatedStyle: (fn: any) => fn(),
	withSpring: (value: any) => value,
	withTiming: (value: any) => value,
}));
