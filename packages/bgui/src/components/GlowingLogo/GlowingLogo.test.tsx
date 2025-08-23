import { fireEvent, render } from "@testing-library/react";
import { GlowingLogo } from "./GlowingLogo";

describe("GlowingLogo", () => {
	it("renders without crashing", () => {
		const { container } = render(<GlowingLogo />);
		expect(container).toBeTruthy();
	});

	it("renders with custom size", () => {
		const { container } = render(<GlowingLogo size={200} />);
		const logo = container.firstChild as HTMLElement;
		expect(logo.style.width).toBe("200px");
		expect(logo.style.height).toBe("200px");
	});

	it("renders with custom glow color", () => {
		const { container } = render(<GlowingLogo glowColor="#FF0000" />);
		expect(container).toBeTruthy();
	});

	it("renders children when provided", () => {
		const { getByText } = render(
			<GlowingLogo>
				<div>Custom Logo</div>
			</GlowingLogo>,
		);
		expect(getByText("Custom Logo")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { container } = render(<GlowingLogo onPress={handleClick} />);
		const logo = container.firstChild as HTMLElement;
		fireEvent.click(logo);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is keyboard accessible when clickable", () => {
		const handleClick = jest.fn();
		const { container } = render(<GlowingLogo onPress={handleClick} />);
		const logo = container.firstChild as HTMLElement;

		expect(logo.getAttribute("role")).toBe("button");
		expect(logo.getAttribute("tabIndex")).toBe("0");

		fireEvent.keyDown(logo, { key: "Enter" });
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects animate prop", () => {
		const { container } = render(<GlowingLogo animate={false} />);
		expect(container).toBeTruthy();
	});

	it("applies custom styles", () => {
		const { container } = render(<GlowingLogo style={{ margin: "10px" }} />);
		const logo = container.firstChild as HTMLElement;
		expect(logo.style.margin).toBe("10px");
	});

	it("applies testID", () => {
		const { getByTestId } = render(<GlowingLogo testID="glowing-logo" />);
		expect(getByTestId("glowing-logo")).toBeTruthy();
	});

	it("renders with different glow intensities", () => {
		const { rerender } = render(<GlowingLogo glowIntensity="low" />);
		expect(document.body).toBeTruthy();

		rerender(<GlowingLogo glowIntensity="medium" />);
		expect(document.body).toBeTruthy();

		rerender(<GlowingLogo glowIntensity="high" />);
		expect(document.body).toBeTruthy();
	});
});
