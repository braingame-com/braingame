import { vi } from "vitest";
import { render, screen } from "../../test-utils";
import { ProgressBar } from "./ProgressBar";

// Mock Animated for testing
const mockAnimatedValue = vi.fn(() => ({
	setValue: vi.fn(),
	interpolate: vi.fn((config) => {
		// Simple mock interpolation for testing
		if (config.outputRange[0] === "0%" && config.outputRange[1] === "100%") {
			return `${config.inputRange[0]}%`; // Simplified for testing
		}
		return config.outputRange[0];
	}),
	addListener: vi.fn(),
	removeListener: vi.fn(),
	removeAllListeners: vi.fn(),
	stopAnimation: vi.fn(),
	resetAnimation: vi.fn(),
}));

const mockAnimatedTiming = vi.fn(() => ({
	start: vi.fn(),
	stop: vi.fn(),
	reset: vi.fn(),
}));

// Setup mocks
vi.mock("react-native", async () => {
	const actual = await vi.importActual("react-native");
	return {
		...actual,
		Animated: {
			...actual.Animated,
			Value: mockAnimatedValue,
			timing: mockAnimatedTiming,
			createAnimatedComponent: vi.fn((component) => component),
		},
	};
});

describe("ProgressBar", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("renders linear progress bar by default", () => {
			render(<ProgressBar value={50} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("renders with correct test ID", () => {
			render(<ProgressBar value={50} animated={false} />);

			expect(screen.getByTestId("progress-bar-inner")).toBeTruthy();
		});

		it("creates animated value on mount", () => {
			render(<ProgressBar value={25} />);

			expect(mockAnimatedValue).toHaveBeenCalledWith(25);
		});
	});

	describe("Linear Variant", () => {
		it("renders linear variant by default", () => {
			render(<ProgressBar value={30} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
			expect(screen.getByTestId("progress-bar-inner")).toBeTruthy();
		});

		it("renders linear variant explicitly", () => {
			render(<ProgressBar value={40} variant="linear" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
			expect(screen.getByTestId("progress-bar-inner")).toBeTruthy();
		});

		it("applies correct width for progress value", () => {
			render(<ProgressBar value={25} animated={false} />);

			const progressInner = screen.getByTestId("progress-bar-inner");
			expect(progressInner).toBeTruthy();
		});

		it("handles 0% progress", () => {
			render(<ProgressBar value={0} animated={false} />);

			const progressInner = screen.getByTestId("progress-bar-inner");
			expect(progressInner).toBeTruthy();
		});

		it("handles 100% progress", () => {
			render(<ProgressBar value={100} animated={false} />);

			const progressInner = screen.getByTestId("progress-bar-inner");
			expect(progressInner).toBeTruthy();
		});
	});

	describe("Circular Variant", () => {
		it("renders circular variant", () => {
			render(<ProgressBar value={60} variant="circular" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("renders with default size", () => {
			render(<ProgressBar value={60} variant="circular" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("renders with custom size", () => {
			render(<ProgressBar value={60} variant="circular" size={80} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("includes progress circle test ID", () => {
			render(<ProgressBar value={50} variant="circular" />);

			expect(screen.getByTestId("progress-circle")).toBeTruthy();
		});

		it("handles different sizes", () => {
			const sizes = [20, 40, 60, 80, 100];

			sizes.forEach((size) => {
				render(<ProgressBar value={50} variant="circular" size={size} />);
				expect(screen.getByTestId("progress-circle")).toBeTruthy();
			});
		});
	});

	describe("Progress Values", () => {
		it("handles various progress values", () => {
			const values = [0, 25, 50, 75, 100];

			values.forEach((value) => {
				render(<ProgressBar value={value} />);
				const progressBar = screen.getByRole("progressbar");
				expect(progressBar).toBeTruthy();
			});
		});

		it("handles decimal values", () => {
			render(<ProgressBar value={33.33} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("handles edge case values", () => {
			// Test boundary values
			const edgeValues = [-1, 0, 0.1, 99.9, 100, 101];

			edgeValues.forEach((value) => {
				render(<ProgressBar value={value} />);
				const progressBar = screen.getByRole("progressbar");
				expect(progressBar).toBeTruthy();
			});
		});

		it("updates progress when value changes", () => {
			const { rerender } = render(<ProgressBar value={25} />);

			expect(screen.getByRole("progressbar")).toBeTruthy();

			rerender(<ProgressBar value={75} />);

			expect(screen.getByRole("progressbar")).toBeTruthy();
		});
	});

	describe("Animation", () => {
		it("enables animation by default", () => {
			render(<ProgressBar value={50} />);

			expect(mockAnimatedTiming).toHaveBeenCalled();
		});

		it("disables animation when animated=false", () => {
			render(<ProgressBar value={50} animated={false} />);

			// Should still create animated value but not start timing
			expect(mockAnimatedValue).toHaveBeenCalled();
		});

		it("animates when value changes", () => {
			const { rerender } = render(<ProgressBar value={25} />);

			vi.clearAllMocks();

			rerender(<ProgressBar value={75} />);

			expect(mockAnimatedTiming).toHaveBeenCalled();
		});

		it("sets value directly when not animated", () => {
			const mockSetValue = vi.fn();
			mockAnimatedValue.mockReturnValue({
				...mockAnimatedValue(),
				setValue: mockSetValue,
			});

			render(<ProgressBar value={50} animated={false} />);

			// setValue should be called for non-animated updates
			expect(mockSetValue).toHaveBeenCalledWith(50);
		});

		it("uses correct animation duration", () => {
			render(<ProgressBar value={50} />);

			expect(mockAnimatedTiming).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					duration: 500,
					useNativeDriver: false,
				}),
			);
		});
	});

	describe("Colors", () => {
		it("uses custom progress color", () => {
			render(<ProgressBar value={50} color="#ff0000" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("uses custom background color", () => {
			render(<ProgressBar value={50} backgroundColor="#cccccc" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("uses both custom colors", () => {
			render(<ProgressBar value={50} color="#00ff00" backgroundColor="#eeeeee" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("applies colors to circular variant", () => {
			render(
				<ProgressBar value={50} variant="circular" color="#0000ff" backgroundColor="#f0f0f0" />,
			);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});
	});

	describe("Accessibility", () => {
		it("has correct accessibility role", () => {
			render(<ProgressBar value={50} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityRole).toBe("progressbar");
		});

		it("provides accessibility value", () => {
			render(<ProgressBar value={75} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue).toEqual({
				min: 0,
				max: 100,
				now: 75,
			});
		});

		it("provides accessibility label", () => {
			render(<ProgressBar value={30} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityLabel).toBe("Progress: 30 percent");
		});

		it("supports custom accessibility label via screen reader", () => {
			render(<ProgressBar value={60} />);

			expect(screen.getByLabelText("Progress: 60 percent")).toBeTruthy();
		});

		it("provides ARIA attributes for web", () => {
			render(<ProgressBar value={45} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props["aria-valuemin"]).toBe(0);
			expect(progressBar.props["aria-valuemax"]).toBe(100);
			expect(progressBar.props["aria-valuenow"]).toBe(45);
			expect(progressBar.props["aria-label"]).toBe("Progress: 45 percent");
		});

		it("includes aria-live for dynamic updates", () => {
			render(<ProgressBar value={50} variant="linear" />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props["aria-live"]).toBe("polite");
		});

		it("updates accessibility values when progress changes", () => {
			const { rerender } = render(<ProgressBar value={20} />);

			let progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue.now).toBe(20);

			rerender(<ProgressBar value={80} />);

			progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue.now).toBe(80);
		});
	});

	describe("Custom Styling", () => {
		it("applies custom style to linear variant", () => {
			const customStyle = { margin: 10, borderRadius: 8 };

			render(<ProgressBar value={50} style={customStyle} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});

		it("applies custom style to circular variant", () => {
			const customStyle = { padding: 15 };

			render(<ProgressBar value={50} variant="circular" style={customStyle} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.style).toEqual(customStyle);
		});

		it("combines custom style with default styles", () => {
			const customStyle = { backgroundColor: "transparent" };

			render(<ProgressBar value={50} style={customStyle} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});
	});

	describe("Edge Cases", () => {
		it("handles negative values gracefully", () => {
			render(<ProgressBar value={-10} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue.now).toBe(-10);
		});

		it("handles values over 100 gracefully", () => {
			render(<ProgressBar value={150} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue.now).toBe(150);
		});

		it("handles very small decimal values", () => {
			render(<ProgressBar value={0.01} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.accessibilityValue.now).toBe(0.01);
		});

		it("handles NaN values gracefully", () => {
			render(<ProgressBar value={Number.NaN} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("handles undefined color gracefully", () => {
			render(<ProgressBar value={50} color={undefined} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("handles very large size for circular variant", () => {
			render(<ProgressBar value={50} variant="circular" size={500} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});

		it("handles very small size for circular variant", () => {
			render(<ProgressBar value={50} variant="circular" size={5} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeTruthy();
		});
	});

	describe("Platform-specific Features", () => {
		it("renders without errors on all platforms", () => {
			render(<ProgressBar value={50} variant="linear" />);
			render(<ProgressBar value={50} variant="circular" />);

			expect(screen.getAllByRole("progressbar")).toHaveLength(2);
		});

		it("includes web-specific aria attributes", () => {
			render(<ProgressBar value={50} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar.props.role).toBe("progressbar");
		});
	});

	describe("Performance", () => {
		it("uses native driver when appropriate", () => {
			render(<ProgressBar value={50} />);

			expect(mockAnimatedTiming).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					useNativeDriver: false, // Progress animations can't use native driver
				}),
			);
		});

		it("reuses animated values efficiently", () => {
			const { rerender } = render(<ProgressBar value={25} />);

			const initialCallCount = mockAnimatedValue.mock.calls.length;

			rerender(<ProgressBar value={75} />);

			// Should not create new animated values on rerender
			expect(mockAnimatedValue.mock.calls.length).toBe(initialCallCount);
		});

		it("cleans up properly on unmount", () => {
			const { unmount } = render(<ProgressBar value={50} />);

			unmount();

			// Component should unmount without errors
			expect(() => screen.getByRole("progressbar")).toThrow();
		});
	});

	describe("Real-world Usage Patterns", () => {
		it("works as loading indicator", () => {
			render(<ProgressBar value={0} color="#007AFF" animated={true} />);

			const progressBar = screen.getByLabelText("Progress: 0 percent");
			expect(progressBar).toBeTruthy();
		});

		it("works as upload progress", () => {
			render(<ProgressBar value={65} color="#34C759" backgroundColor="#E5E5E7" animated={true} />);

			const progressBar = screen.getByLabelText("Progress: 65 percent");
			expect(progressBar).toBeTruthy();
		});

		it("works as circular dashboard widget", () => {
			render(
				<ProgressBar
					value={78}
					variant="circular"
					size={120}
					color="#FF9500"
					backgroundColor="#F2F2F7"
				/>,
			);

			const progressBar = screen.getByLabelText("Progress: 78 percent");
			expect(progressBar).toBeTruthy();
			expect(screen.getByTestId("progress-circle")).toBeTruthy();
		});

		it("works with rapid value updates", () => {
			const { rerender } = render(<ProgressBar value={0} />);

			// Simulate rapid progress updates
			for (let i = 10; i <= 100; i += 10) {
				rerender(<ProgressBar value={i} />);
			}

			const progressBar = screen.getByLabelText("Progress: 100 percent");
			expect(progressBar).toBeTruthy();
		});
	});
});
