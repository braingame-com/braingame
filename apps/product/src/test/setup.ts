/**
 * Vitest setup file for the product app
 *
 * This file runs before all tests and sets up the test environment
 */

import { vi } from "vitest";
import "@testing-library/jest-native/extend-expect";

// Mock modules that don't work in test environment
vi.mock("react-native-reanimated", () => ({
	default: {
		createAnimatedComponent: (component: any) => component,
		Value: vi.fn(),
		event: vi.fn(),
		add: vi.fn(),
		eq: vi.fn(),
		set: vi.fn(),
		cond: vi.fn(),
		interpolate: vi.fn(),
		View: vi.fn(),
		Extrapolate: { CLAMP: vi.fn() },
		Transition: {
			Together: "Together",
			Out: "Out",
			In: "In",
		},
	},
}));

// Mock expo modules
vi.mock("expo-router", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
	}),
	useLocalSearchParams: () => ({}),
	Stack: {
		Screen: vi.fn(),
	},
}));

// Global test setup
global.alert = vi.fn();
