// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { IconButton } from "./IconButton.native";

describe("IconButton", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<IconButton>Test IconButton</IconButton>);

		expect(getByText("Test IconButton")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<IconButton onClick={handleClick}>Click me</IconButton>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<IconButton disabled onClick={handleClick}>
				Disabled IconButton
			</IconButton>,
		);

		fireEvent.press(getByText("Disabled IconButton"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<IconButton aria-label="Custom label">Content</IconButton>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
