import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Box } from "./Box.native";

describe("Box", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Box>Test Box</Box>);

		expect(getByText("Test Box")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Box onClick={handleClick}>Click me</Box>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Box disabled onClick={handleClick}>
				Disabled Box
			</Box>,
		);

		fireEvent.press(getByText("Disabled Box"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Box aria-label="Custom label">Content</Box>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
