import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import type React from "react";
import { Text, View } from "react-native";
import { theme } from "../../theme";
import { Stack } from "./Stack.native";

const renderWithTheme = (component: React.ReactElement) => {
	return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

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
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		expect(stack.props.style).toMatchObject({ flexDirection: "column" });
	});

	it("applies row direction when specified", () => {
		const { getByTestId } = renderWithTheme(
			<Stack testID="stack" direction="row">
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		expect(stack.props.style).toMatchObject({ flexDirection: "row" });
	});

	it("applies spacing when specified", () => {
		const { getByTestId } = renderWithTheme(
			<Stack testID="stack" spacing="md">
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Stack>,
		);

		const stack = getByTestId("stack");
		expect(stack.props.style).toMatchObject({ gap: theme.spacing.md });
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
		expect(dividers).toHaveLength(2); // 2 dividers for 3 children
	});
});
