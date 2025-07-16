import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Switch } from "./Switch.native";

describe("Switch", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Switch>Test Switch</Switch>);

		expect(getByText("Test Switch")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Switch onClick={handleClick}>Click me</Switch>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Switch disabled onClick={handleClick}>
				Disabled Switch
			</Switch>,
		);

		fireEvent.press(getByText("Disabled Switch"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Switch aria-label="Custom label">Content</Switch>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
