import { fireEvent, render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { Button } from "./Button";

describe("Button", () => {
	it("renders provided label", () => {
		const { getByText } = render(<Button>Tap me</Button>);

		expect(getByText("Tap me")).toBeTruthy();
	});

	it("invokes onClick handler when pressed", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Button onClick={handleClick}>Action</Button>);

		fireEvent.press(getByText("Action"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("prevents interaction when disabled", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		fireEvent.press(getByText("Disabled"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("prevents interaction when loading", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Button loading onClick={handleClick}>
				Loading
			</Button>,
		);

		fireEvent.press(getByText("Loading"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders decorators around content", () => {
		const { getByText } = render(
			<Button startDecorator="*" endDecorator="!">
				Decorated
			</Button>,
		);

		expect(getByText("Decorated")).toBeTruthy();
	});

	it("applies full width style", () => {
		const { getByA11yRole } = render(<Button fullWidth>Wide</Button>);
		const button = getByA11yRole("button");
		const flattened = StyleSheet.flatten(button.props.style);

		expect(flattened?.width).toBe("100%");
	});

	it("applies variant background and text colors", () => {
		const { getByA11yRole, getByText } = render(
			<Button variant="solid" color="primary">
				Solid
			</Button>,
		);

		const button = getByA11yRole("button");
		const text = getByText("Solid");
		const buttonStyle = StyleSheet.flatten(button.props.style);
		const textStyle = StyleSheet.flatten(text.props.style);

		expect(buttonStyle?.backgroundColor).toBe(theme.colors.primary);
		expect(textStyle?.color).toBe(theme.colors.onPrimary);
	});

	it("shows loading indicator and busy state", () => {
		const { getByA11yRole, getAllByTestId } = render(<Button loading>Load</Button>);

		const button = getByA11yRole("button");
		expect(button.props.accessibilityState?.busy).toBe(true);
		expect(getAllByTestId("bgui-button-loading-indicator")).toHaveLength(1);
	});

	it("marks pressed state when aria-pressed is true", () => {
		const { getByA11yRole } = render(<Button aria-pressed>Toggle</Button>);

		const button = getByA11yRole("button");
		expect(button.props.accessibilityState?.pressed).toBe(true);
	});
});
