import { waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";

describe("AnimatedGradientBackground", () => {
	it("renders a container", () => {
		const { getByTestId } = renderWithTheme(<AnimatedGradientBackground testID="gradient" />);
		expect(getByTestId("gradient")).toBeTruthy();
	});

	it("renders the expected number of blobs", async () => {
		const { getAllByTestId } = renderWithTheme(
			<AnimatedGradientBackground blobCount={4} animate={false} testID="gradient" />,
		);
		await waitFor(() => {
			expect(getAllByTestId(/bgui-animated-gradient-blob-/i)).toHaveLength(4);
		});
	});

	it("renders children", () => {
		const { getByText } = renderWithTheme(
			<AnimatedGradientBackground>
				<Text>Gradient Content</Text>
			</AnimatedGradientBackground>,
		);
		expect(getByText("Gradient Content")).toBeTruthy();
	});

	it("respects custom colors", () => {
		const colors = ["#ff0000", "#00ff00"];
		expect(() => renderWithTheme(<AnimatedGradientBackground colors={colors} />)).not.toThrow();
	});
});
