import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TabPanel } from "./TabPanel.native";

describe("TabPanel", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<TabPanel>Test TabPanel</TabPanel>);

		expect(getByText("Test TabPanel")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<TabPanel onClick={handleClick}>Click me</TabPanel>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<TabPanel disabled onClick={handleClick}>
				Disabled TabPanel
			</TabPanel>,
		);

		fireEvent.press(getByText("Disabled TabPanel"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<TabPanel aria-label="Custom label">Content</TabPanel>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
