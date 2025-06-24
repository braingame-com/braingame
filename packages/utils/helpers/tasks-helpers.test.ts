import { Platform } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { Colors } from "../constants/Colors";
import { getTaskInputWrapperColor, handleSlashKeyPress } from "./tasks-helpers";

// Mock React Native Platform
vi.mock("react-native", () => ({
	Platform: {
		OS: "web",
	},
}));

describe("Task Helpers", () => {
	describe("handleSlashKeyPress", () => {
		it("should focus input when slash key is pressed on web", () => {
			const mockFocus = vi.fn();
			const inputRef = {
				current: {
					focus: mockFocus,
				},
			};

			const event = {
				key: "/",
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent;

			handleSlashKeyPress(event, inputRef as any);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(mockFocus).toHaveBeenCalled();
		});

		it("should not focus input when other keys are pressed", () => {
			const mockFocus = vi.fn();
			const inputRef = {
				current: {
					focus: mockFocus,
				},
			};

			const event = {
				key: "a",
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent;

			handleSlashKeyPress(event, inputRef as any);

			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(mockFocus).not.toHaveBeenCalled();
		});

		it("should not focus input when inputRef is null", () => {
			const inputRef = {
				current: null,
			};

			const event = {
				key: "/",
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent;

			handleSlashKeyPress(event, inputRef as any);

			expect(event.preventDefault).toHaveBeenCalled();
			// Should not throw error
		});

		it("should handle focus errors gracefully", () => {
			const mockFocus = vi.fn().mockImplementation(() => {
				throw new Error("Focus error");
			});
			const inputRef = {
				current: {
					focus: mockFocus,
				},
			};

			const event = {
				key: "/",
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent;

			// Should not throw
			expect(() => handleSlashKeyPress(event, inputRef as any)).not.toThrow();
			expect(mockFocus).toHaveBeenCalled();
		});

		it("should not handle slash key on non-web platforms", () => {
			// Mock non-web platform
			(Platform as any).OS = "ios";

			const mockFocus = vi.fn();
			const inputRef = {
				current: {
					focus: mockFocus,
				},
			};

			const event = {
				key: "/",
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent;

			handleSlashKeyPress(event, inputRef as any);

			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(mockFocus).not.toHaveBeenCalled();

			// Reset to web
			(Platform as any).OS = "web";
		});
	});

	describe("getTaskInputWrapperColor", () => {
		it("should return negative color when there is an error", () => {
			const color = getTaskInputWrapperColor(true, false);
			expect(color).toBe(Colors.universal.negative);
		});

		it("should return negative color when there is an error even if focused", () => {
			const color = getTaskInputWrapperColor(true, true);
			expect(color).toBe(Colors.universal.negative);
		});

		it("should return primary color when focused without error", () => {
			const color = getTaskInputWrapperColor(false, true);
			expect(color).toBe(Colors.universal.primary);
		});

		it("should return undefined when not focused and no error", () => {
			const color = getTaskInputWrapperColor(false, false);
			expect(color).toBeUndefined();
		});
	});
});
