import { fireEvent, render } from "@testing-library/react-native";
import { List } from "./List.native";

describe("List", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<List>Test List</List>);

		expect(getByText("Test List")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<List onClick={handleClick}>Click me</List>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<List disabled onClick={handleClick}>
				Disabled List
			</List>,
		);

		fireEvent.press(getByText("Disabled List"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<List aria-label="Custom label">Content</List>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
