// @ts-nocheck
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Button>Click me</Button>);

		expect(getByText("Click me")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);

		fireEvent.click(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is disabled when disabled prop is true", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		const button = getByText("Disabled").parentElement;
		expect(button).toHaveAttribute("disabled");

		fireEvent.click(getByText("Disabled"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("is disabled when loading prop is true", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Button loading onClick={handleClick}>
				Loading
			</Button>,
		);

		fireEvent.click(getByText("Loading"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders start decorator", () => {
		const { getByText } = render(<Button startDecorator={<span>🚀</span>}>Launch</Button>);

		expect(getByText("🚀")).toBeTruthy();
		expect(getByText("Launch")).toBeTruthy();
	});

	it("renders end decorator", () => {
		const { getByText } = render(<Button endDecorator={<span>→</span>}>Next</Button>);

		expect(getByText("→")).toBeTruthy();
		expect(getByText("Next")).toBeTruthy();
	});

	it("applies test ID", () => {
		const { getByTestId } = render(<Button testID="test-button">Test</Button>);

		expect(getByTestId("test-button")).toBeTruthy();
	});

	it("renders with different variants", () => {
		const variants = ["solid", "soft", "outlined", "plain"] as const;

		variants.forEach((variant) => {
			const { getByText } = render(<Button variant={variant}>{variant}</Button>);

			expect(getByText(variant)).toBeTruthy();
		});
	});

	it("renders with different colors", () => {
		const colors = ["primary", "neutral", "danger", "success", "warning"] as const;

		colors.forEach((color) => {
			const { getByText } = render(<Button color={color}>{color}</Button>);

			expect(getByText(color)).toBeTruthy();
		});
	});

	it("renders with different sizes", () => {
		const sizes = ["sm", "md", "lg"] as const;

		sizes.forEach((size) => {
			const { getByText } = render(<Button size={size}>{size}</Button>);

			expect(getByText(size)).toBeTruthy();
		});
	});

	it("applies fullWidth style", () => {
		const { getByText } = render(<Button fullWidth>Full Width</Button>);

		const button = getByText("Full Width").parentElement;
		const styles = window.getComputedStyle(button || document.createElement("div"));
		expect(styles.width).toBe("100%");
	});

	it("handles keyboard activation", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Button onClick={handleClick}>Keyboard Test</Button>);

		const button = getByText("Keyboard Test").parentElement;
		if (!button) return;

		// Test Enter key
		fireEvent.keyDown(button, { key: "Enter" });
		fireEvent.keyUp(button, { key: "Enter" });

		// Test Space key
		fireEvent.keyDown(button, { key: " " });
		fireEvent.keyUp(button, { key: " " });
	});

	it("applies aria attributes", () => {
		const { getByLabelText, getByRole } = render(
			<Button aria-label="Submit form" aria-pressed={true}>
				Submit
			</Button>,
		);

		expect(getByLabelText("Submit form")).toBeTruthy();
		const button = getByRole("button");
		expect(button).toHaveAttribute("aria-pressed", "true");
	});

	it("shows loading indicator", () => {
		const { container } = render(<Button loading>Loading Button</Button>);

		// Check for SVG loading indicator (web) or ActivityIndicator (native)
		const svg = container.querySelector("svg");
		expect(svg || container.querySelector('[role="progressbar"]')).toBeTruthy();
	});

	it("positions loading indicator correctly", () => {
		const positions = ["start", "center", "end"] as const;

		positions.forEach((position) => {
			const { getByText } = render(
				<Button loading loadingPosition={position}>
					Loading {position}
				</Button>,
			);

			// Content should be hidden when loading position is center
			const content = getByText(`Loading ${position}`);
			const styles = window.getComputedStyle(content);

			if (position === "center") {
				expect(styles.opacity).toBe("0");
			} else {
				expect(styles.opacity).toBe("1");
			}
		});
	});
});
