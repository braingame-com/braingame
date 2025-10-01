import { render } from "@testing-library/react-native";
import type React from "react";
import { StyleSheet, Text } from "react-native";
import type { Theme } from "../../../theme";
import { BGUIThemeProvider, useTheme } from "../../../theme";
import { Grid } from ".";

const renderWithTheme = (node: React.ReactElement) =>
	render(<BGUIThemeProvider forceTheme="light">{node}</BGUIThemeProvider>);

describe("Grid", () => {
	let theme!: Theme;

	beforeAll(() => {
		const Capture = () => {
			theme = useTheme();
			return null;
		};
		const { unmount } = render(
			<BGUIThemeProvider forceTheme="light">
				<Capture />
			</BGUIThemeProvider>,
		);
		unmount();
	});

	it("renders container and items", () => {
		const { getByText } = renderWithTheme(
			<Grid container>
				<Grid item>
					<Text>Item content</Text>
				</Grid>
			</Grid>,
		);

		expect(getByText("Item content")).toBeTruthy();
	});

	it("applies spacing and column spans", () => {
		const { getByTestId } = renderWithTheme(
			<Grid container spacing="md" testID="container">
				<Grid item xs={6} testID="item">
					<Text>Half</Text>
				</Grid>
			</Grid>,
		);

		const containerStyle = StyleSheet.flatten(getByTestId("container").props.style);
		expect(containerStyle).toMatchObject({
			flexDirection: "row",
			flexWrap: "wrap",
			marginHorizontal: -(theme.spacing.md / 2),
		});

		const itemStyle = StyleSheet.flatten(getByTestId("item").props.style);
		expect(itemStyle).toMatchObject({
			paddingHorizontal: theme.spacing.md / 2,
			width: "50%",
		});
	});
});
