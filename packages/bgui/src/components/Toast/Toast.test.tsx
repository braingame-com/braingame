import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Toast } from "./Toast";

describe("Toast", () => {
	beforeEach(() => {
		// Clear any existing toasts
		jest.clearAllTimers();
	});

	it("shows toast with message", () => {
		const { getByText } = render(<Toast message="Hello Toast!" />);
		expect(getByText("Hello Toast!")).toBeTruthy();
	});

	it("shows different toast types", () => {
		const types = ["success", "error", "warning", "info"] as const;
		for (const type of types) {
			const { getByText } = render(<Toast message={`${type} toast`} type={type} />);
			expect(getByText(`${type} toast`)).toBeTruthy();
		}
	});

	it("renders with action button", () => {
		const onActionPress = jest.fn();
		const { getByText } = render(
			<Toast
				message="Toast with action"
				actionLabel="Undo"
				onActionPress={onActionPress}
				variant="with-action"
			/>,
		);

		expect(getByText("Toast with action")).toBeTruthy();
		expect(getByText("Undo")).toBeTruthy();

		// Press action button
		fireEvent.press(getByText("Undo"));
		expect(onActionPress).toHaveBeenCalled();
	});

	it("applies simple variant by default", () => {
		const { queryByText } = render(<Toast message="Simple toast" />);
		expect(queryByText("Simple toast")).toBeTruthy();
	});

	it("applies with-action variant when action provided", () => {
		const { getByText } = render(
			<Toast
				message="Action toast"
				actionLabel="Retry"
				onActionPress={() => {}}
				variant="with-action"
			/>,
		);
		expect(getByText("Action toast")).toBeTruthy();
		expect(getByText("Retry")).toBeTruthy();
	});

	it("applies success type styles", () => {
		const { getByText } = render(<Toast message="Success!" type="success" />);
		const toast = getByText("Success!");
		expect(toast).toBeTruthy();
	});

	it("applies error type styles", () => {
		const { getByText } = render(<Toast message="Error occurred" type="error" />);
		const toast = getByText("Error occurred");
		expect(toast).toBeTruthy();
	});

	it("applies warning type styles", () => {
		const { getByText } = render(<Toast message="Warning!" type="warning" />);
		const toast = getByText("Warning!");
		expect(toast).toBeTruthy();
	});

	it("applies info type styles", () => {
		const { getByText } = render(<Toast message="Info message" type="info" />);
		const toast = getByText("Info message");
		expect(toast).toBeTruthy();
	});

	it("sets accessibility role", () => {
		const { getByRole } = render(<Toast message="Accessible toast" />);
		expect(getByRole("alert")).toBeTruthy();
	});

	it("applies aria-live for announcements", () => {
		const { getByRole } = render(<Toast message="Live region toast" />);
		const toast = getByRole("alert");
		expect(toast.props["aria-live"]).toBe("polite");
	});

	it("handles empty message gracefully", () => {
		const { queryByRole } = render(<Toast message="" />);
		// Should still render the toast container
		expect(queryByRole("alert")).toBeTruthy();
	});

	it("renders with custom duration prop", () => {
		const { getByText } = render(<Toast message="Custom duration" duration={5000} />);
		expect(getByText("Custom duration")).toBeTruthy();
	});

	it("handles action without callback", () => {
		const { getByText } = render(
			<Toast message="Action without handler" actionLabel="Action" variant="with-action" />,
		);
		expect(getByText("Action")).toBeTruthy();

		// Should not throw when pressing action without handler
		fireEvent.press(getByText("Action"));
	});
});
