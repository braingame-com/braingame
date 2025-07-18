import { fireEvent, render } from "@testing-library/react-native";
import { TabList } from "./TabList.native";

describe("TabList", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<TabList>Test TabList</TabList>);

		expect(getByText("Test TabList")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<TabList onClick={handleClick}>Click me</TabList>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<TabList disabled onClick={handleClick}>
				Disabled TabList
			</TabList>,
		);

		fireEvent.press(getByText("Disabled TabList"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<TabList aria-label="Custom label">Content</TabList>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
