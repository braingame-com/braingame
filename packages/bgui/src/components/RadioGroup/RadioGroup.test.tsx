import { fireEvent, render } from "@testing-library/react-native";
import { RadioGroup } from "./RadioGroup.native";

describe("RadioGroup", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<RadioGroup>Test RadioGroup</RadioGroup>);

		expect(getByText("Test RadioGroup")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<RadioGroup onClick={handleClick}>Click me</RadioGroup>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<RadioGroup disabled onClick={handleClick}>
				Disabled RadioGroup
			</RadioGroup>,
		);

		fireEvent.press(getByText("Disabled RadioGroup"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<RadioGroup aria-label="Custom label">Content</RadioGroup>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
