// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { Tab } from "./Tab.native";

describe("Tab", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Tab>Test Tab</Tab>);

		expect(getByText("Test Tab")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Tab onClick={handleClick}>Click me</Tab>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Tab disabled onClick={handleClick}>
				Disabled Tab
			</Tab>,
		);

		fireEvent.press(getByText("Disabled Tab"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Tab aria-label="Custom label">Content</Tab>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
