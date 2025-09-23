// @ts-nocheck
import { fireEvent, render } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Card>Card content</Card>);

		expect(getByText("Card content")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Card onClick={handleClick}>Clickable card</Card>);

		fireEvent.click(getByText("Clickable card"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("renders with different variants", () => {
		const variants = ["plain", "outlined", "soft", "solid"] as const;

		variants.forEach((variant) => {
			const { getByText } = render(<Card variant={variant}>{variant}</Card>);

			expect(getByText(variant)).toBeTruthy();
		});
	});

	it("renders with different colors", () => {
		const colors = ["primary", "neutral", "danger", "success", "warning"] as const;

		colors.forEach((color) => {
			const { getByText } = render(<Card color={color}>{color}</Card>);

			expect(getByText(color)).toBeTruthy();
		});
	});

	it("renders with different sizes", () => {
		const sizes = ["sm", "md", "lg"] as const;

		sizes.forEach((size) => {
			const { getByText } = render(<Card size={size}>{size}</Card>);

			expect(getByText(size)).toBeTruthy();
		});
	});

	it("renders with different orientations", () => {
		const { getByText } = render(<Card orientation="horizontal">Horizontal</Card>);

		expect(getByText("Horizontal")).toBeTruthy();
	});

	it("applies test ID", () => {
		const { getByTestId } = render(<Card testID="test-card">Test</Card>);

		expect(getByTestId("test-card")).toBeTruthy();
	});

	it("applies aria attributes", () => {
		const { getByLabelText } = render(<Card aria-label="Product card">Product</Card>);

		expect(getByLabelText("Product card")).toBeTruthy();
	});
});
