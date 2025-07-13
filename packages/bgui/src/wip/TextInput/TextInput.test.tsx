import { fireEvent, render } from "../../test-utils";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
	it("calls onValueChange", () => {
		const onChange = jest.fn();
		const { getByDisplayValue } = render(<TextInput value="hi" onValueChange={onChange} />);
		const input = getByDisplayValue("hi");
		fireEvent.changeText(input, "bye");
		expect(onChange).toHaveBeenCalledWith("bye");
	});

	it("renders icons", () => {
		const { getAllByRole } = render(
			<TextInput value="" onValueChange={() => {}} leftIcon="user" rightIcon="x" />,
		);
		expect(getAllByRole("image").length).toBe(2);
	});
});
