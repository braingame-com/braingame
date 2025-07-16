import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Modal } from "./Modal.native";

describe("Modal", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Modal>Test Modal</Modal>);

		expect(getByText("Test Modal")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Modal onClick={handleClick}>Click me</Modal>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Modal disabled onClick={handleClick}>
				Disabled Modal
			</Modal>,
		);

		fireEvent.press(getByText("Disabled Modal"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Modal aria-label="Custom label">Content</Modal>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
