import { fireEvent, render } from "@testing-library/react-native";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
	it("uses children string as default value", () => {
		const { getByDisplayValue } = render(<Textarea>Prefilled text</Textarea>);

		expect(getByDisplayValue("Prefilled text")).toBeTruthy();
	});

	it("calls change callbacks when text updates", () => {
		const handleChange = jest.fn();
		const handleValueChange = jest.fn();

		const { getByPlaceholderText } = render(
			<Textarea
				placeholder="Write something"
				onChange={handleChange}
				onValueChange={handleValueChange}
			/>,
		);

		const input = getByPlaceholderText("Write something");

		fireEvent.changeText(input, "Hello world");

		expect(handleValueChange).toHaveBeenCalledWith("Hello world");
		expect(handleChange).toHaveBeenCalled();
	});

	it("renders helper content when non-string children are provided", () => {
		const { getByText } = render(<Textarea>Helper text</Textarea>);

		expect(getByText("Helper text")).toBeTruthy();
	});
});
