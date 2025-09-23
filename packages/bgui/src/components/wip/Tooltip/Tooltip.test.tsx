// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { Tooltip } from "./Tooltip.native";

describe("Tooltip", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Tooltip>Test Tooltip</Tooltip>);

		expect(getByText("Test Tooltip")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Tooltip onClick={handleClick}>Click me</Tooltip>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Tooltip disabled onClick={handleClick}>
				Disabled Tooltip
			</Tooltip>,
		);

		fireEvent.press(getByText("Disabled Tooltip"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Tooltip aria-label="Custom label">Content</Tooltip>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
