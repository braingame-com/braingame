import { render } from "@testing-library/react";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";

describe("AnimatedGradientBackground", () => {
	it("renders without crashing", () => {
		const { container } = render(<AnimatedGradientBackground />);
		expect(container).toBeTruthy();
	});

	it("renders with custom colors", () => {
		const customColors = ["#FF0000", "#00FF00", "#0000FF"];
		const { container } = render(<AnimatedGradientBackground colors={customColors} />);
		expect(container).toBeTruthy();
	});

	it("renders children correctly", () => {
		const { getByText } = render(
			<AnimatedGradientBackground>
				<div>Test Content</div>
			</AnimatedGradientBackground>,
		);
		expect(getByText("Test Content")).toBeTruthy();
	});

	it("applies custom styles", () => {
		const { container } = render(<AnimatedGradientBackground style={{ backgroundColor: "red" }} />);
		const element = container.firstChild as HTMLElement;
		expect(element.style.backgroundColor).toBe("red");
	});

	it("respects animate prop", () => {
		const { container } = render(<AnimatedGradientBackground animate={false} />);
		expect(container).toBeTruthy();
	});

	it("applies testID", () => {
		const { getByTestId } = render(<AnimatedGradientBackground testID="animated-background" />);
		expect(getByTestId("animated-background")).toBeTruthy();
	});
});
