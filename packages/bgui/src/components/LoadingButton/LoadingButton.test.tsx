import { vi } from "vitest";
import { fireEvent, render, screen } from "../../test-utils";
import { LoadingButton } from "./LoadingButton";

describe("LoadingButton", () => {
	describe("Basic Rendering", () => {
		it("renders correctly with title", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} />);

			expect(screen.getByText("Submit")).toBeTruthy();
		});

		it("renders with custom test ID", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} testID="submit-button" />);

			expect(screen.getByTestId("submit-button")).toBeTruthy();
		});

		it("renders with default variant (primary)", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} />);

			const button = screen.getByText("Submit").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						backgroundColor: expect.any(String),
					}),
				]),
			);
		});
	});

	describe("Variants", () => {
		const variants = ["primary", "secondary", "danger", "ghost"] as const;

		variants.forEach((variant) => {
			it(`renders ${variant} variant correctly`, () => {
				render(<LoadingButton title="Test" variant={variant} onPress={vi.fn()} />);

				const button = screen.getByText("Test").parent;
				expect(button).toBeTruthy();
			});
		});

		it("applies ghost variant border correctly", () => {
			render(<LoadingButton title="Ghost" variant="ghost" onPress={vi.fn()} />);

			const button = screen.getByText("Ghost").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						borderWidth: 1,
						backgroundColor: "transparent",
					}),
				]),
			);
		});
	});

	describe("Sizes", () => {
		const sizes = ["small", "medium", "large"] as const;

		sizes.forEach((size) => {
			it(`renders ${size} size correctly`, () => {
				render(<LoadingButton title="Test" size={size} onPress={vi.fn()} />);

				const button = screen.getByText("Test").parent;
				expect(button).toBeTruthy();
			});
		});

		it("applies correct height for small size", () => {
			render(<LoadingButton title="Small" size="small" onPress={vi.fn()} />);

			const button = screen.getByText("Small").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						height: 40,
					}),
				]),
			);
		});

		it("applies correct height for large size", () => {
			render(<LoadingButton title="Large" size="large" onPress={vi.fn()} />);

			const button = screen.getByText("Large").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						height: 56,
					}),
				]),
			);
		});
	});

	describe("Loading State", () => {
		it("shows loading spinner when loading is true", () => {
			render(<LoadingButton title="Submit" loading={true} onPress={vi.fn()} />);

			// Text should not be visible when loading
			expect(() => screen.getByText("Submit")).toThrow();

			// ActivityIndicator should be present (can't easily test in RNTL but we verify loading prop behavior)
			const button = screen.getByRole("button");
			expect(button.props.disabled).toBe(true);
		});

		it("shows title when loading is false", () => {
			render(<LoadingButton title="Submit" loading={false} onPress={vi.fn()} />);

			expect(screen.getByText("Submit")).toBeTruthy();
		});

		it("shows title when loading is undefined", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} />);

			expect(screen.getByText("Submit")).toBeTruthy();
		});
	});

	describe("Interaction", () => {
		it("calls onPress when pressed and not loading", () => {
			const onPress = vi.fn();
			render(<LoadingButton title="Submit" loading={false} onPress={onPress} />);

			const button = screen.getByText("Submit");
			fireEvent.press(button);

			expect(onPress).toHaveBeenCalledTimes(1);
		});

		it("does not call onPress when loading", () => {
			const onPress = vi.fn();
			render(<LoadingButton title="Submit" loading={true} onPress={onPress} />);

			const button = screen.getByRole("button");
			fireEvent.press(button);

			expect(onPress).not.toHaveBeenCalled();
		});

		it("does not call onPress when disabled", () => {
			const onPress = vi.fn();
			render(<LoadingButton title="Submit" disabled={true} onPress={onPress} />);

			const button = screen.getByText("Submit");
			fireEvent.press(button);

			expect(onPress).not.toHaveBeenCalled();
		});

		it("does not call onPress when both loading and disabled", () => {
			const onPress = vi.fn();
			render(<LoadingButton title="Submit" loading={true} disabled={true} onPress={onPress} />);

			const button = screen.getByRole("button");
			fireEvent.press(button);

			expect(onPress).not.toHaveBeenCalled();
		});
	});

	describe("Disabled State", () => {
		it("applies disabled opacity when loading", () => {
			render(<LoadingButton title="Submit" loading={true} onPress={vi.fn()} />);

			const button = screen.getByRole("button");
			expect(button.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						opacity: 0.6,
					}),
				]),
			);
		});

		it("applies disabled opacity when disabled prop is true", () => {
			render(<LoadingButton title="Submit" disabled={true} onPress={vi.fn()} />);

			const button = screen.getByText("Submit").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						opacity: 0.6,
					}),
				]),
			);
		});

		it("does not apply disabled opacity when not disabled or loading", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} />);

			const button = screen.getByText("Submit").parent;
			const hasDisabledOpacity = button?.props.style.some(
				(style: any) => style && typeof style === "object" && style.opacity === 0.6,
			);
			expect(hasDisabledOpacity).toBeFalsy();
		});
	});

	describe("Custom Styling", () => {
		it("applies custom button style", () => {
			const customStyle = { marginTop: 20, backgroundColor: "red" };
			render(<LoadingButton title="Submit" style={customStyle} onPress={vi.fn()} />);

			const button = screen.getByText("Submit").parent;
			expect(button?.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});

		it("applies custom text style", () => {
			const customTextStyle = { fontStyle: "italic", color: "blue" };
			render(<LoadingButton title="Submit" textStyle={customTextStyle} onPress={vi.fn()} />);

			const text = screen.getByText("Submit");
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customTextStyle)]),
			);
		});
	});

	describe("Accessibility", () => {
		it("is accessible by role", () => {
			render(<LoadingButton title="Submit" onPress={vi.fn()} />);

			expect(screen.getByRole("button")).toBeTruthy();
		});

		it("supports accessibility label", () => {
			render(<LoadingButton title="Submit" accessibilityLabel="Submit form" onPress={vi.fn()} />);

			expect(screen.getByLabelText("Submit form")).toBeTruthy();
		});

		it("supports accessibility hint", () => {
			render(
				<LoadingButton
					title="Submit"
					accessibilityHint="Submits the form data"
					onPress={vi.fn()}
				/>,
			);

			const button = screen.getByRole("button");
			expect(button.props.accessibilityHint).toBe("Submits the form data");
		});

		it("indicates disabled state to accessibility services", () => {
			render(<LoadingButton title="Submit" disabled={true} onPress={vi.fn()} />);

			const button = screen.getByRole("button");
			expect(button.props.disabled).toBe(true);
		});

		it("indicates loading state to accessibility services", () => {
			render(<LoadingButton title="Submit" loading={true} onPress={vi.fn()} />);

			const button = screen.getByRole("button");
			expect(button.props.disabled).toBe(true);
		});
	});

	describe("Edge Cases", () => {
		it("handles empty title gracefully", () => {
			render(<LoadingButton title="" onPress={vi.fn()} />);

			expect(screen.getByText("")).toBeTruthy();
		});

		it("handles undefined onPress gracefully", () => {
			// @ts-expect-error Testing edge case
			render(<LoadingButton title="Submit" />);

			const button = screen.getByText("Submit");
			expect(() => fireEvent.press(button)).not.toThrow();
		});

		it("forwards additional TouchableOpacity props", () => {
			render(
				<LoadingButton
					title="Submit"
					onPress={vi.fn()}
					activeOpacity={0.5}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
				/>,
			);

			const button = screen.getByRole("button");
			expect(button.props.activeOpacity).toBe(0.5);
			expect(button.props.hitSlop).toEqual({ top: 10, bottom: 10, left: 10, right: 10 });
		});
	});
});
