// Vitest setup for utils package
import { vi } from "vitest";

// Mock React Native modules
vi.mock("react-native", () => ({
	Platform: {
		OS: "ios",
		select: vi.fn((obj: any) => obj.ios || obj.default),
	},
	Dimensions: {
		get: vi.fn(() => ({ width: 375, height: 812 })),
	},
	Alert: {
		alert: vi.fn(),
	},
	StyleSheet: {
		create: (styles: any) => styles,
		flatten: (style: any) => style,
	},
}));

// Mock expo modules
vi.mock("expo-haptics", () => ({
	impactAsync: vi.fn(),
	ImpactFeedbackStyle: {
		Light: "Light",
		Medium: "Medium",
		Heavy: "Heavy",
	},
}));

// Mock async storage
vi.mock("@react-native-async-storage/async-storage", () => ({
	setItem: vi.fn(() => Promise.resolve()),
	getItem: vi.fn(() => Promise.resolve(null)),
	removeItem: vi.fn(() => Promise.resolve()),
	clear: vi.fn(() => Promise.resolve()),
	getAllKeys: vi.fn(() => Promise.resolve([])),
	multiGet: vi.fn(() => Promise.resolve([])),
	multiSet: vi.fn(() => Promise.resolve()),
	multiRemove: vi.fn(() => Promise.resolve()),
}));

// Mock console methods for cleaner test output
global.console = {
	...console,
	log: vi.fn(),
	debug: vi.fn(),
	info: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
};

// Add missing global fetch for jsdom
global.fetch = vi.fn();
