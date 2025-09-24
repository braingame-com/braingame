import { render, screen } from "@testing-library/react";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";

describe("AnimatedGradientBackground", () => {
	it("renders a container", () => {
		render(<AnimatedGradientBackground testID="gradient" />);
		expect(screen.getByTestId("gradient")).toBeInTheDocument();
	});

	it("renders the expected number of blobs", () => {
		const { getAllByTestId } = render(
			<AnimatedGradientBackground blobCount={4} animate={false} testID="gradient" />,
		);
		expect(getAllByTestId(/bgui-animated-gradient-blob-/i)).toHaveLength(4);
	});

	it("renders children", () => {
		render(
			<AnimatedGradientBackground>
				<span>Gradient Content</span>
			</AnimatedGradientBackground>,
		);
		expect(screen.getByText("Gradient Content")).toBeInTheDocument();
	});

	it("respects custom colors", () => {
		const colors = ["#ff0000", "#00ff00"];
		expect(() => render(<AnimatedGradientBackground colors={colors} />)).not.toThrow();
	});
});
