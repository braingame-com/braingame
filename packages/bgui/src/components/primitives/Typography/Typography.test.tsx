import { render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { Typography } from "./Typography";

describe("Typography", () => {
	it("renders text content", () => {
		const { getByText } = render(<Typography>Read me</Typography>);

		expect(getByText("Read me")).toBeTruthy();
	});

	it("applies level styles", () => {
		const { getByText } = render(<Typography level="h2">Heading</Typography>);

		const element = getByText("Heading");
		const style = StyleSheet.flatten(element.props.style);

		expect(style?.fontSize).toBe(theme.fontSizes.xl4);
		expect(style?.fontWeight).toBe("700");
	});

	it("wraps content when decorators are provided", () => {
		const { getByTestId } = render(
			<Typography startDecorator="•" testID="typography">
				Decorated
			</Typography>,
		);

		expect(getByTestId("typography")).toBeTruthy();
	});

	it("applies variant container styles", () => {
		const { getByTestId } = render(
			<Typography variant="solid" color="primary" testID="solid">
				Solid
			</Typography>,
		);

		const container = getByTestId("solid");
		const containerStyle = StyleSheet.flatten(container.props.style);

		expect(containerStyle?.backgroundColor).toBe(theme.colors.primary);
	});

	it("respects noWrap prop", () => {
		const { getByText } = render(
			<Typography noWrap numberOfLines={3}>
				One line
			</Typography>,
		);

		const element = getByText("One line");
		expect(element.props.numberOfLines).toBe(1);
	});

	it("sets accessibility role when component is a heading", () => {
		const { getByA11yRole } = render(<Typography component="h3">Accessible Heading</Typography>);

		expect(getByA11yRole("header")).toBeTruthy();
	});
});
