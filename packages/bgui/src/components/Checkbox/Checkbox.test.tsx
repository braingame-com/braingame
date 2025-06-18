import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
	it("renders with label", () => {
		const { getByText } = render(
			<Checkbox checked={false} onValueChange={() => {}}>
				Accept terms
			</Checkbox>,
		);
		expect(getByText("Accept terms")).toBeTruthy();
	});

	it("calls onValueChange when pressed", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Checkbox checked={false} onValueChange={fn} />);
		fireEvent.press(getByRole("checkbox"));
		expect(fn).toHaveBeenCalledWith(true);
	});

	it("toggles from checked to unchecked", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Checkbox checked={true} onValueChange={fn} />);
		fireEvent.press(getByRole("checkbox"));
		expect(fn).toHaveBeenCalledWith(false);
	});

	it("does not call onValueChange when disabled", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Checkbox checked={false} onValueChange={fn} disabled />);
		fireEvent.press(getByRole("checkbox"));
		expect(fn).not.toHaveBeenCalled();
	});

	it("renders indeterminate state", () => {
		const { getByRole } = render(
			<Checkbox checked={false} onValueChange={() => {}} indeterminate />,
		);
		const checkbox = getByRole("checkbox");
		expect(checkbox.props.accessibilityState.checked).toBe("mixed");
	});

	it("renders with aria-label", () => {
		const { getByRole } = render(
			<Checkbox checked={false} onValueChange={() => {}} aria-label="Subscribe to newsletter" />,
		);
		const checkbox = getByRole("checkbox");
		expect(checkbox.props.accessibilityLabel).toBe("Subscribe to newsletter");
	});

	it("renders with aria-describedby", () => {
		const { getByRole } = render(
			<Checkbox
				checked={false}
				onValueChange={() => {}}
				aria-describedby="terms-description"
			/>,
		);
		const checkbox = getByRole("checkbox");
		expect(checkbox.props["aria-describedby"]).toBe("terms-description");
	});
});