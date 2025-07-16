import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Grid } from "./Grid.native";

describe("Grid", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Grid>Test Grid</Grid>);

		expect(getByText("Test Grid")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Grid onClick={handleClick}>Click me</Grid>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Grid disabled onClick={handleClick}>
				Disabled Grid
			</Grid>,
		);

		fireEvent.press(getByText("Disabled Grid"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Grid aria-label="Custom label">Content</Grid>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
