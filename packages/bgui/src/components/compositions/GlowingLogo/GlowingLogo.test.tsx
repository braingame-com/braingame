import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { GlowingLogo } from "./GlowingLogo";

describe("GlowingLogo", () => {
	it("renders with default content", () => {
		const { getByTestId } = render(<GlowingLogo testID="logo" />);
		expect(getByTestId("logo")).toBeTruthy();
	});

	it("renders provided children", () => {
		const { getByText } = render(
			<GlowingLogo>
				<Text>Custom Logo</Text>
			</GlowingLogo>,
		);
		expect(getByText("Custom Logo")).toBeTruthy();
	});

	it("handles press interactions", () => {
		const handlePress = jest.fn();
		const { getByRole } = render(<GlowingLogo onPress={handlePress} aria-label="Brand" />);
		fireEvent.press(getByRole("button"));
		expect(handlePress).toHaveBeenCalledTimes(1);
	});
});
