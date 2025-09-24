import { fireEvent, render } from "@testing-library/react-native";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
	it("renders label content", () => {
		const { getByText } = render(<Checkbox label="Accept" />);
		expect(getByText("Accept")).toBeTruthy();
	});

	it("triggers onChange when pressed", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = render(
			<Checkbox label="Notify" onChange={handleChange} aria-label="notify" />,
		);

		fireEvent.press(getByLabelText("notify"));
		expect(handleChange).toHaveBeenCalled();
	});

	it("does not trigger onChange when disabled", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = render(
			<Checkbox label="Disabled" disabled onChange={handleChange} aria-label="disabled" />,
		);

		fireEvent.press(getByLabelText("disabled"));
		expect(handleChange).not.toHaveBeenCalled();
	});
});
