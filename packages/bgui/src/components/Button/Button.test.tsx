import { fireEvent, render, screen } from "../../test-utils";
import { Button } from "./Button";

describe("Button", () => {
	it("renders correctly with text", () => {
		render(<Button onPress={jest.fn()}>Click me</Button>);

		expect(screen.getByText("Click me")).toBeTruthy();
	});

	it("calls onPress when pressed", () => {
		const onPress = jest.fn();
		render(<Button onPress={onPress}>Press me</Button>);

		const button = screen.getByText("Press me");
		fireEvent.press(button);

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("does not call onPress when disabled", () => {
		const onPress = jest.fn();
		render(
			<Button onPress={onPress} disabled>
				Disabled Button
			</Button>,
		);

		const button = screen.getByText("Disabled Button");
		fireEvent.press(button);

		expect(onPress).not.toHaveBeenCalled();
	});

	it("renders with icon on the left by default", () => {
		render(
			<Button onPress={jest.fn()} icon="home" aria-label="Home">
				Home
			</Button>,
		);

		const button = screen.getByLabelText("Home");
		const children = button.props.children;

		// Check that there are multiple children (icon and text)
		expect(Array.isArray(children)).toBe(true);
	});

	it("renders with icon on the right when specified", () => {
		render(
			<Button onPress={jest.fn()} icon="arrow-right" iconPosition="right" aria-label="Next">
				Next
			</Button>,
		);

		const button = screen.getByLabelText("Next");
		const styles = button.props.style;

		// Check that flexDirection is row-reverse for right icon
		expect(styles).toMatchObject(
			expect.objectContaining({
				flexDirection: "row-reverse",
			}),
		);
	});

	it("shows loading state", () => {
		render(
			<Button onPress={jest.fn()} loading aria-label="Loading Button">
				Loading
			</Button>,
		);

		// Should show spinner instead of text
		expect(screen.queryByText("Loading")).toBeNull();
		expect(screen.getByLabelText("Loading Button")).toBeTruthy();
	});

	it("applies different variants correctly", () => {
		const variants = ["primary", "secondary", "ghost", "danger", "icon"] as const;

		variants.forEach((variant) => {
			const { rerender } = render(
				<Button onPress={jest.fn()} variant={variant}>
					{variant}
				</Button>,
			);

			const button = screen.getByText(variant);
			expect(button).toBeTruthy();

			rerender(<Button onPress={jest.fn()}>Clear</Button>);
		});
	});

	it("applies different sizes correctly", () => {
		const sizes = ["sm", "md", "lg"] as const;

		sizes.forEach((size) => {
			const { rerender } = render(
				<Button onPress={jest.fn()} size={size}>
					{size}
				</Button>,
			);

			const button = screen.getByText(size);
			expect(button).toBeTruthy();

			rerender(<Button onPress={jest.fn()}>Clear</Button>);
		});
	});

	it("expands to full width when specified", () => {
		render(
			<Button onPress={jest.fn()} fullWidth>
				Full Width
			</Button>,
		);

		const button = screen.getByLabelText("Full Width");
		const styles = button.props.style;

		// Check if width style is applied
		expect(styles).toMatchObject(
			expect.objectContaining({
				width: "100%",
			}),
		);
	});

	it("uses aria-label when provided", () => {
		render(
			<Button onPress={jest.fn()} aria-label="Submit form">
				Submit
			</Button>,
		);

		expect(screen.getByLabelText("Submit form")).toBeTruthy();
	});

	it("uses aria-describedby when provided", () => {
		render(
			<Button onPress={jest.fn()} aria-describedby="helper-text">
				Help
			</Button>,
		);

		const button = screen.getByText("Help");
		expect(button.props.accessibilityDescribedBy).toContain("helper-text");
	});

	it("has correct accessibility state when disabled", () => {
		render(
			<Button onPress={jest.fn()} disabled>
				Disabled
			</Button>,
		);

		const button = screen.getByText("Disabled");
		expect(button.props.accessibilityState).toMatchObject({
			disabled: true,
		});
	});

	it("renders icon-only button with proper accessibility", () => {
		render(<Button onPress={jest.fn()} variant="icon" icon="settings" aria-label="Settings" />);

		expect(screen.getByLabelText("Settings")).toBeTruthy();
	});
});
