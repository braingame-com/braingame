import { fireEvent, render } from "@testing-library/react-native";
import { Option, Select } from "./Select";

describe("Select", () => {
	it("renders placeholder and selects an option", () => {
		const handleValueChange = jest.fn();

		const { getByTestId, getByText } = render(
			<Select testID="select" placeholder="Pick one" onValueChange={handleValueChange}>
				<Option value="one">One</Option>
				<Option value="two">Two</Option>
			</Select>,
		);

		const trigger = getByTestId("select");
		expect(getByText("Pick one")).toBeTruthy();

		fireEvent.press(trigger);
		fireEvent.press(getByText("Two"));

		expect(handleValueChange).toHaveBeenCalledWith("two");
		expect(getByText("Two")).toBeTruthy();
	});

	it("supports multiple selections", () => {
		const handleValueChange = jest.fn();

		const { getByTestId, getByText } = render(
			<Select
				testID="select"
				multiple
				placeholder="Select values"
				onValueChange={handleValueChange}
			>
				<Option value="apples">Apples</Option>
				<Option value="bananas">Bananas</Option>
			</Select>,
		);

		fireEvent.press(getByTestId("select"));
		fireEvent.press(getByText("Apples"));
		fireEvent.press(getByText("Bananas"));

		expect(handleValueChange).toHaveBeenLastCalledWith(["apples", "bananas"]);
	});
});
