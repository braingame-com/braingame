import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Input } from "./Input.native";

describe("Input", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Input>Test Input</Input>);

		expect(getByText("Test Input")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Input onClick={handleClick}>Click me</Input>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Input disabled onClick={handleClick}>
				Disabled Input
			</Input>,
		);

		fireEvent.press(getByText("Disabled Input"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Input aria-label="Custom label">Content</Input>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
