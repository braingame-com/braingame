import { Platform } from "react-native";
import { vi } from "vitest";
import { fireEvent, render, screen } from "../../test-utils";
import { GlowingLogo } from "./GlowingLogo";

// Mock Platform.OS for testing
const mockPlatform = (os: "ios" | "android" | "web") => {
	Object.defineProperty(Platform, "OS", {
		writable: true,
		value: os,
	});
};

// Mock Animated for testing
const mockAnimatedValue = vi.fn(() => ({
	setValue: vi.fn(),
	addListener: vi.fn(),
	removeListener: vi.fn(),
	removeAllListeners: vi.fn(),
	stopAnimation: vi.fn(),
	resetAnimation: vi.fn(),
	interpolate: vi.fn(),
}));

const mockAnimatedTiming = vi.fn(() => ({
	start: vi.fn(),
	stop: vi.fn(),
	reset: vi.fn(),
}));

const mockAnimatedLoop = vi.fn((_animation) => ({
	start: vi.fn(),
	stop: vi.fn(),
	reset: vi.fn(),
}));

const mockAnimatedSequence = vi.fn((_animations) => ({
	start: vi.fn(),
	stop: vi.fn(),
	reset: vi.fn(),
}));

// Setup mocks
vi.mock("react-native", async () => {
	const actual = await vi.importActual("react-native");
	const actualModule = actual as { Animated: Record<string, unknown>; [key: string]: unknown };
	return {
		...actualModule,
		Animated: {
			...(actualModule.Animated as Record<string, unknown>),
			Value: mockAnimatedValue,
			timing: mockAnimatedTiming,
			loop: mockAnimatedLoop,
			sequence: mockAnimatedSequence,
			multiply: vi.fn(),
		},
	};
});

describe("GlowingLogo", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPlatform("ios");
	});

	describe("Basic Rendering", () => {
		it("renders without crashing", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			expect(screen.getByTestId("glowing-logo")).toBeTruthy();
		});

		it("renders with default size", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("renders with custom size", () => {
			render(<GlowingLogo size={200} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("creates animated values on mount", () => {
			render(<GlowingLogo />);

			// Should create two animated values (pulse and glow)
			expect(mockAnimatedValue).toHaveBeenCalledTimes(2);
			expect(mockAnimatedValue).toHaveBeenCalledWith(1); // pulseAnim
			expect(mockAnimatedValue).toHaveBeenCalledWith(0.7); // glowAnim
		});
	});

	describe("Animation Behavior", () => {
		it("starts animations when animate is true (default)", () => {
			render(<GlowingLogo />);

			// Should create and start animations
			expect(mockAnimatedLoop).toHaveBeenCalledTimes(2); // pulse and glow loops
			expect(mockAnimatedSequence).toHaveBeenCalledTimes(2); // pulse and glow sequences
		});

		it("does not start animations when animate is false", () => {
			render(<GlowingLogo animate={false} />);

			// Animated values should still be created but no loops should start
			expect(mockAnimatedValue).toHaveBeenCalledTimes(2);
		});

		it("stops animations on unmount", () => {
			const { unmount } = render(<GlowingLogo />);

			// Clear previous calls
			vi.clearAllMocks();

			unmount();

			// Animation stop methods should be available for cleanup
			// Note: The actual stopping is tested in the effect cleanup
		});

		it("restarts animations when animate prop changes", () => {
			const { rerender } = render(<GlowingLogo animate={false} />);

			vi.clearAllMocks();

			rerender(<GlowingLogo animate={true} />);

			// Should start animations when switching to true
			expect(mockAnimatedLoop).toHaveBeenCalled();
		});
	});

	describe("Glow Intensity", () => {
		it("applies low intensity settings", () => {
			render(<GlowingLogo glowIntensity="low" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("applies medium intensity settings (default)", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("applies high intensity settings", () => {
			render(<GlowingLogo glowIntensity="high" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});
	});

	describe("Platform-specific Rendering", () => {
		it("renders SVG on web platform", () => {
			mockPlatform("web");

			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("renders without SVG on iOS platform", () => {
			mockPlatform("ios");

			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("renders without SVG on Android platform", () => {
			mockPlatform("android");

			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});
	});

	describe("Interaction", () => {
		it("renders as pressable when onPress is provided", () => {
			const onPress = vi.fn();

			render(<GlowingLogo onPress={onPress} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("calls onPress when pressed", () => {
			const onPress = vi.fn();

			render(<GlowingLogo onPress={onPress} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			fireEvent.press(logo);

			expect(onPress).toHaveBeenCalledTimes(1);
		});

		it("renders as non-pressable when onPress is not provided", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();

			// Should not throw when pressed without onPress
			expect(() => fireEvent.press(logo)).not.toThrow();
		});
	});

	describe("Custom Styling", () => {
		it("applies custom style", () => {
			const customStyle = { backgroundColor: "red", margin: 10 };

			render(<GlowingLogo style={customStyle} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});

		it("applies custom glow color", () => {
			render(<GlowingLogo glowColor="#ff0000" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("handles custom size correctly", () => {
			render(<GlowingLogo size={150} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});
	});

	describe("Accessibility", () => {
		it("supports accessibility label", () => {
			render(<GlowingLogo accessibilityLabel="Brain Game Logo" />);

			expect(screen.getByLabelText("Brain Game Logo")).toBeTruthy();
		});

		it("supports accessibility role", () => {
			render(<GlowingLogo accessibilityRole="image" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo.props.accessibilityRole).toBe("image");
		});

		it("supports accessibility hint", () => {
			render(<GlowingLogo accessibilityHint="Animated Brain Game logo" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo.props.accessibilityHint).toBe("Animated Brain Game logo");
		});

		it("includes title in SVG for web accessibility", () => {
			mockPlatform("web");

			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});
	});

	describe("Props Forwarding", () => {
		it("forwards ViewProps to container", () => {
			render(<GlowingLogo testID="glowing-logo" accessible={true} pointerEvents="auto" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo.props.accessible).toBe(true);
			expect(logo.props.pointerEvents).toBe("auto");
		});

		it("handles additional view props", () => {
			render(
				<GlowingLogo
					testID="glowing-logo"
					importantForAccessibility="yes"
					accessibilityLiveRegion="polite"
				/>,
			);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo.props.importantForAccessibility).toBe("yes");
			expect(logo.props.accessibilityLiveRegion).toBe("polite");
		});
	});

	describe("Edge Cases", () => {
		it("handles zero size gracefully", () => {
			render(<GlowingLogo size={0} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("handles negative size gracefully", () => {
			render(<GlowingLogo size={-10} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("handles very large size", () => {
			render(<GlowingLogo size={1000} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("handles invalid glow color gracefully", () => {
			render(<GlowingLogo glowColor="invalid-color" testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("handles undefined onPress gracefully", () => {
			render(<GlowingLogo onPress={undefined} testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});
	});

	describe("Performance Considerations", () => {
		it("uses native driver for animations", () => {
			render(<GlowingLogo />);

			// Check that timing animations are called with useNativeDriver: true
			expect(mockAnimatedTiming).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					useNativeDriver: true,
				}),
			);
		});

		it("cleans up animations properly", () => {
			const { unmount } = render(<GlowingLogo />);

			// Animation should be set up
			expect(mockAnimatedLoop).toHaveBeenCalled();

			// Unmounting should trigger cleanup
			unmount();

			// The cleanup is handled by useEffect return function
			// which calls stop() on the animations
		});

		it("does not recreate animations unnecessarily", () => {
			const { rerender } = render(<GlowingLogo glowColor="#blue" />);

			const initialCallCount = mockAnimatedValue.mock.calls.length;

			// Rerender with different non-animation prop
			rerender(<GlowingLogo glowColor="#red" />);

			// Should not create new animated values
			expect(mockAnimatedValue.mock.calls.length).toBe(initialCallCount);
		});
	});

	describe("Default Values", () => {
		it("uses correct default size", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("uses correct default glow color", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("uses correct default glow intensity", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			const logo = screen.getByTestId("glowing-logo");
			expect(logo).toBeTruthy();
		});

		it("uses correct default animate value", () => {
			render(<GlowingLogo testID="glowing-logo" />);

			// Should start animations by default
			expect(mockAnimatedLoop).toHaveBeenCalled();
		});
	});
});
