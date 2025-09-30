import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import type React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { Divider } from ".";

const renderWithTheme = (node: React.ReactElement) =>
	render(<ThemeProvider theme={theme}>{node}</ThemeProvider>);

describe("Divider", () => {
	it("renders a horizontal divider by default", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" thickness={2} />);

		const style = StyleSheet.flatten(getByTestId("divider").props.style);
		expect(style).toMatchObject({
			height: 2,
			width: "100%",
		});
	});

	it("renders a vertical divider when requested", () => {
		const { getByTestId } = renderWithTheme(
			<Divider testID="divider" orientation="vertical" thickness={3} />,
		);

		const style = StyleSheet.flatten(getByTestId("divider").props.style);
		expect(style).toMatchObject({
			width: 3,
			height: "100%",
		});
	});

	it("applies inset spacing tokens", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" inset="lg" />);

		const style = StyleSheet.flatten(getByTestId("divider").props.style);
		expect(style?.marginHorizontal).toBe(theme.spacing.lg);
	});

	it("uses theme colors for variants", () => {
		const { getByTestId } = renderWithTheme(
			<Divider testID="divider" variant="subtle" thickness={4} />,
		);

		const style = StyleSheet.flatten(getByTestId("divider").props.style);
		expect(style?.backgroundColor).toBe(theme.colors.outlineVariant);
	});

	it("renders divider content when children are provided", () => {
		const { getByText } = renderWithTheme(<Divider>OR</Divider>);

		expect(getByText("OR")).toBeTruthy();
	});
});
