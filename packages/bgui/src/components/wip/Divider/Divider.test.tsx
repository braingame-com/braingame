// @ts-nocheck
import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import type React from "react";
import { theme } from "../../../theme";
import { Divider } from "./Divider.native";

const renderWithTheme = (component: React.ReactElement) => {
	return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Divider", () => {
	it("renders a horizontal divider by default", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" />);

		const divider = getByTestId("divider");
		expect(divider.props.style).toMatchObject({
			height: 1,
			width: "100%",
		});
	});

	it("renders a vertical divider when specified", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" orientation="vertical" />);

		const divider = getByTestId("divider");
		expect(divider.props.style).toMatchObject({
			height: "100%",
			width: 1,
		});
	});

	it("applies custom thickness", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" thickness={3} />);

		const divider = getByTestId("divider");
		expect(divider.props.style).toMatchObject({
			height: 3,
		});
	});

	it("renders with children", () => {
		const { getByText } = renderWithTheme(<Divider>OR</Divider>);

		expect(getByText("OR")).toBeTruthy();
	});

	it("applies inset when context is specified", () => {
		const { getByTestId } = renderWithTheme(<Divider testID="divider" inset="context" />);

		const divider = getByTestId("divider");
		expect(divider.props.style).toBeDefined();
	});
});
