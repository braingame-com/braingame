import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Typography } from "./Typography.native";

describe("Typography", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Typography>Test Typography</Typography>);

		expect(getByText("Test Typography")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Typography onClick={handleClick}>Click me</Typography>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Typography disabled onClick={handleClick}>
				Disabled Typography
			</Typography>,
		);

		fireEvent.press(getByText("Disabled Typography"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Typography aria-label="Custom label">Content</Typography>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
