import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Checkbox } from "./Checkbox.native";

describe("Checkbox", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Checkbox>Test Checkbox</Checkbox>);

		expect(getByText("Test Checkbox")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Checkbox onClick={handleClick}>Click me</Checkbox>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Checkbox disabled onClick={handleClick}>
				Disabled Checkbox
			</Checkbox>,
		);

		fireEvent.press(getByText("Disabled Checkbox"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Checkbox aria-label="Custom label">Content</Checkbox>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
