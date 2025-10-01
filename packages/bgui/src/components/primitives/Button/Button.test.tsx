import { fireEvent, render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import type { Theme } from "../../../theme";
import { BGUIThemeProvider, useTheme } from "../../../theme";
import { Button } from "./Button";

describe("Button", () => {
	let theme!: Theme;

	beforeAll(() => {
		const Capture = () => {
			theme = useTheme();
			return null;
		};
		const { unmount } = render(
			<BGUIThemeProvider>
				<Capture />
			</BGUIThemeProvider>,
		);
		unmount();
	});

	const renderWithProviders = (ui: React.ReactElement) =>
		render(<BGUIThemeProvider>{ui}</BGUIThemeProvider>);

	it("renders provided label", () => {
		const { getByText } = renderWithProviders(<Button>Tap me</Button>);

		expect(getByText("Tap me")).toBeTruthy();
	});

	it("invokes onClick handler when pressed", () => {
		const handleClick = jest.fn();
		const { getByText } = renderWithProviders(<Button onClick={handleClick}>Action</Button>);

		fireEvent.press(getByText("Action"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("prevents interaction when disabled", () => {
		const handleClick = jest.fn();
		const { getByText } = renderWithProviders(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		fireEvent.press(getByText("Disabled"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("prevents interaction when loading", () => {
		const handleClick = jest.fn();
		const { getByText } = renderWithProviders(
			<Button loading onClick={handleClick}>
				Loading
			</Button>,
		);

		fireEvent.press(getByText("Loading"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders decorators around content", () => {
		const { getByText } = renderWithProviders(
			<Button startDecorator="*" endDecorator="!">
				Decorated
			</Button>,
		);

		expect(getByText("Decorated")).toBeTruthy();
	});

	it("applies full width style", () => {
		const { getByRole } = renderWithProviders(<Button fullWidth>Wide</Button>);
		const button = getByRole("button");
		const flattened = StyleSheet.flatten(button.props.style);

		expect(flattened?.width).toBe("100%");
	});

	it("applies variant background and text colors", () => {
		const { getByRole, getByText } = renderWithProviders(
			<Button variant="solid" color="primary">
				Solid
			</Button>,
		);

		const button = getByRole("button");
		const text = getByText("Solid");
		const buttonStyle = StyleSheet.flatten(button.props.style);
		const textStyle = StyleSheet.flatten(text.props.style);

		expect(buttonStyle?.backgroundColor).toBe(theme.colors.primary);
		expect(textStyle?.color).toBe(theme.colors.onPrimary);
	});

	it("shows loading indicator and busy state", () => {
		const { getByRole, getAllByTestId } = renderWithProviders(<Button loading>Load</Button>);

		const button = getByRole("button");
		expect(button).toHaveAccessibilityState({ busy: true });
		expect(getAllByTestId("bgui-button-loading-indicator")).toHaveLength(1);
	});

	it("marks pressed state when aria-pressed is true", () => {
		const { getByRole } = renderWithProviders(<Button aria-pressed>Toggle</Button>);

		const button = getByRole("button");
		expect(button).toHaveAccessibilityState({ pressed: true });
	});
});
