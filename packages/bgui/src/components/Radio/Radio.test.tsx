import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Radio } from "./Radio.native";

describe("Radio", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Radio>Test Radio</Radio>);

		expect(getByText("Test Radio")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Radio onClick={handleClick}>Click me</Radio>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Radio disabled onClick={handleClick}>
				Disabled Radio
			</Radio>,
		);

		fireEvent.press(getByText("Disabled Radio"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Radio aria-label="Custom label">Content</Radio>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
