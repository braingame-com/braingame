import { fireEvent, render } from "@testing-library/react-native";
import { Radio } from "./Radio";

describe("Radio", () => {
	it("renders label", () => {
		const { getByText } = render(<Radio label="Option" value="one" />);
		expect(getByText("Option")).toBeTruthy();
	});

	it("invokes onChange when selected", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = render(
			<Radio label="Email" value="email" onChange={handleChange} aria-label="email" />,
		);

		fireEvent.press(getByLabelText("email"));
		expect(handleChange).toHaveBeenCalled();
	});

	it("does not toggle when already checked", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = render(
			<Radio
				label="Newsletter"
				value="news"
				onChange={handleChange}
				aria-label="news"
				defaultChecked
			/>,
		);

		fireEvent.press(getByLabelText("news"));
		expect(handleChange).not.toHaveBeenCalled();
	});
});
