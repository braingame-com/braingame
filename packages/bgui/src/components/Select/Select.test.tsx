import { fireEvent, render } from "@testing-library/react-native";
import { Select } from "./Select.native";

describe("Select", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Select>Test Select</Select>);

		expect(getByText("Test Select")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Select onClick={handleClick}>Click me</Select>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Select disabled onClick={handleClick}>
				Disabled Select
			</Select>,
		);

		fireEvent.press(getByText("Disabled Select"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Select aria-label="Custom label">Content</Select>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
