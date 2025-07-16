import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Chip } from "./Chip.native";

describe("Chip", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Chip>Test Chip</Chip>);

		expect(getByText("Test Chip")).toBeTruthy();
	});

	it("handles click events when clickable", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Chip onClick={handleClick}>Click me</Chip>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Chip disabled onClick={handleClick}>
				Disabled Chip
			</Chip>,
		);

		fireEvent.press(getByText("Disabled Chip"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders without click handler (non-clickable)", () => {
		const { getByText } = render(<Chip>Non-clickable</Chip>);

		expect(getByText("Non-clickable")).toBeTruthy();
	});

	it("renders with start decorator", () => {
		const { getByText } = render(<Chip startDecorator="👤">User</Chip>);

		expect(getByText("👤")).toBeTruthy();
		expect(getByText("User")).toBeTruthy();
	});

	it("renders with end decorator", () => {
		const { getByText } = render(<Chip endDecorator="✖">Removable</Chip>);

		expect(getByText("✖")).toBeTruthy();
		expect(getByText("Removable")).toBeTruthy();
	});

	it("renders with both decorators", () => {
		const { getByText } = render(
			<Chip startDecorator="📧" endDecorator="(5)">
				Email
			</Chip>,
		);

		expect(getByText("📧")).toBeTruthy();
		expect(getByText("Email")).toBeTruthy();
		expect(getByText("(5)")).toBeTruthy();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Chip aria-label="Custom label">Content</Chip>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
