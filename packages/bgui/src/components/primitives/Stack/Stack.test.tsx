import { render } from "@testing-library/react-native";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BGUIThemeProvider, theme } from "../../../theme";
import { Stack } from ".";

const renderWithTheme = (component: React.ReactElement) =>
	render(<BGUIThemeProvider forceTheme="light">{component}</BGUIThemeProvider>);

describe("Stack", () => {
	it("renders children correctly", () => {
		const { getByText } = renderWithTheme(
			<Stack>
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Stack>,
		);

		expect(getByText("Child 1")).toBeTruthy();
		expect(getByText("Child 2")).toBeTruthy();
	});

	it("applies column direction by default", () => {
		const { getByTestId } = renderWithTheme(
			<Stack testID="stack">
				<Text>Child</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		const style = StyleSheet.flatten(stack.props.style);
		expect(style).toMatchObject({ flexDirection: "column" });
	});

	it("applies row direction when specified", () => {
		const { getByTestId } = renderWithTheme(
			<Stack testID="stack" direction="row">
				<Text>Child</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		const style = StyleSheet.flatten(stack.props.style);
		expect(style).toMatchObject({ flexDirection: "row" });
	});

	it("applies gap spacing when enabled", () => {
		const { getByTestId } = renderWithTheme(
			<Stack testID="stack" spacing="md" useFlexGap>
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		const style = StyleSheet.flatten(stack.props.style);
		expect(style?.rowGap).toBe(theme.spacing.md);
		expect(style?.columnGap).toBe(theme.spacing.md);
	});

	it("renders dividers between children", () => {
		const { getAllByTestId } = renderWithTheme(
			<Stack divider={<View testID="divider" />}>
				<Text>Child 1</Text>
				<Text>Child 2</Text>
				<Text>Child 3</Text>
			</Stack>,
		);

		const dividers = getAllByTestId("divider");
		expect(dividers).toHaveLength(2);
	});
});
