import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Tabs } from "./Tabs.native";

describe("Tabs", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Tabs>Test Tabs</Tabs>);

		expect(getByText("Test Tabs")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Tabs onClick={handleClick}>Click me</Tabs>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Tabs disabled onClick={handleClick}>
				Disabled Tabs
			</Tabs>,
		);

		fireEvent.press(getByText("Disabled Tabs"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Tabs aria-label="Custom label">Content</Tabs>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
