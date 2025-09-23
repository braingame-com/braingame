// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { ListItem } from "./ListItem.native";

describe("ListItem", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<ListItem>Test ListItem</ListItem>);

		expect(getByText("Test ListItem")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<ListItem onClick={handleClick}>Click me</ListItem>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<ListItem disabled onClick={handleClick}>
				Disabled ListItem
			</ListItem>,
		);

		fireEvent.press(getByText("Disabled ListItem"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<ListItem aria-label="Custom label">Content</ListItem>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
