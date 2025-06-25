import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Colors } from "../constants/Colors";
import { useThemeColor } from "./useThemeColor";

// Mock useColorScheme
vi.mock("./useColorScheme", () => ({
	useColorScheme: vi.fn(() => "light"),
}));

import { useColorScheme } from "./useColorScheme";

describe("useThemeColor", () => {
	it("should return light theme color when color scheme is light", () => {
		(useColorScheme as any).mockReturnValue("light");

		const { result } = renderHook(() => useThemeColor("text"));

		expect(result.current).toBe(Colors.light.text);
	});

	it("should return dark theme color when color scheme is dark", () => {
		(useColorScheme as any).mockReturnValue("dark");

		const { result } = renderHook(() => useThemeColor("text"));

		expect(result.current).toBe(Colors.dark.text);
	});

	it("should default to dark theme when color scheme is null", () => {
		(useColorScheme as any).mockReturnValue(null);

		const { result } = renderHook(() => useThemeColor("background"));

		expect(result.current).toBe(Colors.dark.background);
	});

	it("should return correct color for different color names", () => {
		(useColorScheme as any).mockReturnValue("light");

		// Test various color names
		const { result: bgResult } = renderHook(() => useThemeColor("background"));
		expect(bgResult.current).toBe(Colors.light.background);

		const { result: primaryResult } = renderHook(() => useThemeColor("tint"));
		expect(primaryResult.current).toBe(Colors.light.tint);

		const { result: iconResult } = renderHook(() => useThemeColor("icon"));
		expect(iconResult.current).toBe(Colors.light.icon);
	});

	it("should update when color scheme changes", () => {
		const mockUseColorScheme = useColorScheme as any;

		// Start with light theme
		mockUseColorScheme.mockReturnValue("light");
		const { result, rerender } = renderHook(() => useThemeColor("text"));

		expect(result.current).toBe(Colors.light.text);

		// Change to dark theme
		mockUseColorScheme.mockReturnValue("dark");
		rerender();

		expect(result.current).toBe(Colors.dark.text);
	});
});
