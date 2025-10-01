import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
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

		fireEvent(input, "change", { nativeEvent: { text: "Hello world" } });

		expect(handleValueChange).toHaveBeenCalledWith("Hello world");
		expect(handleChange).toHaveBeenCalled();
	});

	it("renders helper content when non-string children are provided", () => {
		const { getByText } = render(
			<Textarea>
				<Text>Helper text</Text>
			</Textarea>,
		);

		expect(getByText("Helper text")).toBeTruthy();
	});
});
