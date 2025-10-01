import { fireEvent } from "@testing-library/react-native";
import React from "react";
import { StyleSheet, Text, type TextInput } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Input } from "./Input";

describe("Input", () => {
	it("renders placeholder and value", () => {
		const { getByPlaceholderText } = renderWithTheme(
			<Input value="Hello" placeholder="Your name" testID="input" />,
		);

		const input = getByPlaceholderText("Your name");
		expect(input.props.value).toBe("Hello");
	});

	it("calls focus and blur handlers", () => {
		const handleFocus = jest.fn();
		const handleBlur = jest.fn();

		const { getByTestId } = renderWithTheme(
			<Input name="email" onFocus={handleFocus} onBlur={handleBlur} placeholder="Email" />,
		);

		const input = getByTestId("email-input");
		fireEvent(input, "focus");
		fireEvent(input, "blur");

		expect(handleFocus).toHaveBeenCalledTimes(1);
		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it("invokes onChange handler", () => {
		const handleChange = jest.fn();

		const { getByPlaceholderText } = renderWithTheme(
			<Input onChange={handleChange} placeholder="Email" />,
		);

		const input = getByPlaceholderText("Email");
		fireEvent(input, "change", { nativeEvent: { text: "A" } });

		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it("applies disabled styles", () => {
		const { getByTestId } = renderWithTheme(
			<Input disabled name="disabled" testID="input" placeholder="Disabled" />,
		);

		const style = StyleSheet.flatten(getByTestId("input").props.style);
		expect(style.opacity).toBe(0.6);
	});

	it("renders decorators", () => {
		const { getByText } = renderWithTheme(
			<Input
				startDecorator={<Text>Start</Text>}
				endDecorator={<Text>End</Text>}
				placeholder="Decorators"
			/>,
		);

		expect(getByText("Start")).toBeTruthy();
		expect(getByText("End")).toBeTruthy();
	});

	it("expands to full width when requested", () => {
		const { getByTestId } = renderWithTheme(
			<Input fullWidth name="full" testID="input" placeholder="Full width" />,
		);

		const style = StyleSheet.flatten(getByTestId("input").props.style);
		expect(style.width).toBe("100%");
	});

	it("forwards refs to the native input", () => {
		const ref = React.createRef<TextInput>();

		renderWithTheme(<Input ref={ref} placeholder="Ref" />);

		expect(ref.current).toBeTruthy();
	});
});
