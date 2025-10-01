import { render } from "@testing-library/react-native";
import type React from "react";
import type { Theme } from "../../../theme";
import { BGUIThemeProvider, useTheme } from "../../../theme";
import { Box } from "./Box";

describe("Box", () => {
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

	const renderWithTheme = (ui: React.ReactNode) =>
		render(<BGUIThemeProvider forceTheme="light">{ui}</BGUIThemeProvider>);

	it("renders children", () => {
		const { getByText } = renderWithTheme(<Box>Content</Box>);

		expect(getByText("Content")).toBeTruthy();
	});

	it("applies spacing tokens", () => {
		const { getByTestId } = renderWithTheme(<Box padding="md" margin="sm" testID="box" />);

		expect(getByTestId("box")).toHaveStyle({
			padding: theme.spacing.md,
			margin: theme.spacing.sm,
		});
	});

	it("supports theme color props", () => {
		const { getByTestId } = renderWithTheme(<Box backgroundColor="primary" testID="colored" />);

		expect(getByTestId("colored")).toHaveStyle({
			backgroundColor: theme.colors.primary,
		});
	});
});
