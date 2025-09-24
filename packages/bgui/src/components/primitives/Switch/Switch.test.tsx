import { fireEvent, render } from "@testing-library/react-native";
import { Switch } from "./Switch";

describe("Switch", () => {
	it("renders label text", () => {
		const { getByText } = render(<Switch>Enable feature</Switch>);

		expect(getByText("Enable feature")).toBeTruthy();
	});

	it("toggles state in uncontrolled mode and fires callbacks", () => {
		const handleChange = jest.fn();
		const handleValueChange = jest.fn();

		const { getByRole } = render(
			<Switch defaultChecked={false} onChange={handleChange} onValueChange={handleValueChange}>
				Notifications
			</Switch>,
		);

		const control = getByRole("switch");

		fireEvent.press(control);

		expect(handleValueChange).toHaveBeenCalledWith(true);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({ checked: true }),
				currentTarget: expect.objectContaining({ checked: true }),
			}),
		);
	});

	it("respects disabled state", () => {
		const handleValueChange = jest.fn();
		const { getByRole } = render(
			<Switch disabled onValueChange={handleValueChange}>
				Disabled
			</Switch>,
		);

		fireEvent.press(getByRole("switch"));

		expect(handleValueChange).not.toHaveBeenCalled();
	});
});
