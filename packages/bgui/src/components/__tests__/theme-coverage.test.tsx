import { StyleSheet } from "react-native";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import lightTheme, { darkTheme } from "../../theme/theme";
import { Alert } from "../compositions/Alert";
import { Box } from "../primitives/Box";
import { Button } from "../primitives/Button";

describe("Theme coverage", () => {
	it("Button solid primary uses themed colors", () => {
		const { getByTestId: getLight } = renderWithTheme(<Button testID="button">Action</Button>, {
			theme: "light",
		});
		const lightStyleProp = getLight("button").props.style;
		const lightStyles = StyleSheet.flatten(
			typeof lightStyleProp === "function"
				? lightStyleProp({ pressed: false, hovered: false, focused: false })
				: lightStyleProp,
		);

		expect(lightStyles?.backgroundColor).toBe(lightTheme.colors.primary);

		const { getByTestId: getDark } = renderWithTheme(<Button testID="button">Action</Button>, {
			theme: "dark",
		});
		const darkStyleProp = getDark("button").props.style;
		const darkStyles = StyleSheet.flatten(
			typeof darkStyleProp === "function"
				? darkStyleProp({ pressed: false, hovered: false, focused: false })
				: darkStyleProp,
		);

		expect(darkStyles?.backgroundColor).toBe(darkTheme.colors.primary);
		expect(darkStyles?.backgroundColor).not.toBe(lightStyles?.backgroundColor);
	});

	it("Alert soft info matches scheme", () => {
		const { getByTestId: getLight } = renderWithTheme(
			<Alert testID="alert" status="info" variant="soft" title="Info" description="Details" />,
			{ theme: "light" },
		);
		const lightAlertStyle = StyleSheet.flatten(getLight("alert").props.style);
		expect(lightAlertStyle?.backgroundColor).toBe(lightTheme.colors.primaryContainer);

		const { getByTestId: getDark } = renderWithTheme(
			<Alert testID="alert" status="info" variant="soft" title="Info" description="Details" />,
			{ theme: "dark" },
		);
		const darkAlertStyle = StyleSheet.flatten(getDark("alert").props.style);
		expect(darkAlertStyle?.backgroundColor).toBe(darkTheme.colors.primaryContainer);
		expect(darkAlertStyle?.backgroundColor).not.toBe(lightAlertStyle?.backgroundColor);
	});

	it("Box token background resolves per theme", () => {
		const { getByTestId: getLight } = renderWithTheme(
			<Box testID="box" backgroundColor="surface" padding="md" />,
			{ theme: "light" },
		);
		const lightBoxStyle = StyleSheet.flatten(getLight("box").props.style);
		expect(lightBoxStyle?.backgroundColor).toBe(lightTheme.colors.surface);

		const { getByTestId: getDark } = renderWithTheme(
			<Box testID="box" backgroundColor="surface" padding="md" />,
			{ theme: "dark" },
		);
		const darkBoxStyle = StyleSheet.flatten(getDark("box").props.style);
		expect(darkBoxStyle?.backgroundColor).toBe(darkTheme.colors.surface);
		expect(darkBoxStyle?.backgroundColor).not.toBe(lightBoxStyle?.backgroundColor);
	});
});
