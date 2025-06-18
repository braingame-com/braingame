import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Switch } from "./Switch";

describe("Switch", () => {
	it("renders in off state", () => {
		const { getByRole } = render(<Switch checked={false} onValueChange={() => {}} />);
		const switchEl = getByRole("switch");
		expect(switchEl.props.accessibilityState.checked).toBe(false);
	});

	it("renders in on state", () => {
		const { getByRole } = render(<Switch checked={true} onValueChange={() => {}} />);
		const switchEl = getByRole("switch");
		expect(switchEl.props.accessibilityState.checked).toBe(true);
	});

	it("calls onValueChange when toggled", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Switch checked={false} onValueChange={fn} />);
		fireEvent.press(getByRole("switch"));
		expect(fn).toHaveBeenCalledWith(true);
	});

	it("toggles from on to off", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Switch checked={true} onValueChange={fn} />);
		fireEvent.press(getByRole("switch"));
		expect(fn).toHaveBeenCalledWith(false);
	});

	it("does not toggle when disabled", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Switch checked={false} onValueChange={fn} disabled />);
		fireEvent.press(getByRole("switch"));
		expect(fn).not.toHaveBeenCalled();
	});

	it("renders with label", () => {
		const { getByText } = render(
			<Switch checked={false} onValueChange={() => {}}>
				Enable notifications
			</Switch>,
		);
		expect(getByText("Enable notifications")).toBeTruthy();
	});

	it("applies disabled state to accessibility", () => {
		const { getByRole } = render(<Switch checked={false} onValueChange={() => {}} disabled />);
		const switchEl = getByRole("switch");
		expect(switchEl.props.accessibilityState.disabled).toBe(true);
	});

	it("supports aria-label", () => {
		const { getByRole } = render(
			<Switch checked={false} onValueChange={() => {}} aria-label="Toggle dark mode" />,
		);
		const switchEl = getByRole("switch");
		expect(switchEl.props.accessibilityLabel).toBe("Toggle dark mode");
	});

	it("supports aria-describedby", () => {
		const { getByRole } = render(
			<Switch
				checked={false}
				onValueChange={() => {}}
				aria-describedby="dark-mode-description"
			/>,
		);
		const switchEl = getByRole("switch");
		expect(switchEl.props["aria-describedby"]).toBe("dark-mode-description");
	});

	it("changes opacity when disabled", () => {
		const { getByRole } = render(<Switch checked={false} onValueChange={() => {}} disabled />);
		const switchEl = getByRole("switch");
		expect(switchEl.props.style).toEqual(
			expect.objectContaining({
				opacity: 0.5,
			}),
		);
	});
});