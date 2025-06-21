import React from "react";
import { fireEvent, render } from "../../test-utils";
import { Alert } from "./Alert";

describe("Alert", () => {
	it("renders message and title", () => {
		const { getByText } = render(<Alert title="Info" message="hello" />);
		expect(getByText("Info")).toBeTruthy();
		expect(getByText("hello")).toBeTruthy();
	});

	it("calls onDismiss when dismiss button pressed", () => {
		const onDismiss = jest.fn();
		const { getByLabelText } = render(<Alert message="bye" dismissible onDismiss={onDismiss} />);
		fireEvent.press(getByLabelText("Dismiss"));
		expect(onDismiss).toHaveBeenCalled();
	});
});
