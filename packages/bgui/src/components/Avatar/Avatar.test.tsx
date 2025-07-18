import { fireEvent, render } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("renders children (initials)", () => {
		const { getByText } = render(<Avatar>JD</Avatar>);

		expect(getByText("JD")).toBeTruthy();
	});

	it("renders with image src", () => {
		const { container } = render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />);

		const img = container.querySelector("img");
		expect(img).toBeTruthy();
		expect(img?.src).toBe("https://example.com/avatar.jpg");
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Avatar onClick={handleClick}>JD</Avatar>);

		fireEvent.click(getByText("JD"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("renders with different variants", () => {
		const variants = ["plain", "outlined", "soft", "solid"] as const;

		variants.forEach((variant) => {
			const { getByText } = render(<Avatar variant={variant}>V</Avatar>);

			expect(getByText("V")).toBeTruthy();
		});
	});

	it("renders with different colors", () => {
		const colors = ["primary", "neutral", "danger", "success", "warning"] as const;

		colors.forEach((color) => {
			const { getByText } = render(<Avatar color={color}>C</Avatar>);

			expect(getByText("C")).toBeTruthy();
		});
	});

	it("renders with different sizes", () => {
		const sizes = ["sm", "md", "lg"] as const;

		sizes.forEach((size) => {
			const { getByText } = render(<Avatar size={size}>S</Avatar>);

			expect(getByText("S")).toBeTruthy();
		});
	});

	it("applies test ID", () => {
		const { getByTestId } = render(<Avatar testID="test-avatar">Test</Avatar>);

		expect(getByTestId("test-avatar")).toBeTruthy();
	});

	it("applies aria attributes", () => {
		const { getByLabelText } = render(<Avatar aria-label="User profile">UP</Avatar>);

		expect(getByLabelText("User profile")).toBeTruthy();
	});

	it("falls back to children when image fails", () => {
		const { getByText, container } = render(
			<Avatar src="invalid-url.jpg" alt="User">
				JD
			</Avatar>,
		);

		const img = container.querySelector("img");

		// Simulate image error
		if (img) {
			fireEvent.error(img);
		}

		expect(getByText("JD")).toBeTruthy();
	});

	it("has circular shape", () => {
		const { container } = render(<Avatar>JD</Avatar>);

		const avatar = container.firstChild as HTMLElement;
		const styles = window.getComputedStyle(avatar);

		expect(styles.borderRadius).toBe("50%");
	});
});
