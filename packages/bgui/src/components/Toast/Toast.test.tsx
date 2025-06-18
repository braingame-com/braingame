import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Toast, showToast } from "./Toast";

describe("Toast", () => {
	beforeEach(() => {
		// Clear any existing toasts
		jest.clearAllTimers();
	});

	it("shows toast with message", async () => {
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({ message: "Hello Toast!" });
		});
		
		await waitFor(() => {
			expect(getByText("Hello Toast!")).toBeTruthy();
		});
	});

	it("shows toast with title and message", async () => {
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({
				title: "Success",
				message: "Operation completed",
			});
		});
		
		await waitFor(() => {
			expect(getByText("Success")).toBeTruthy();
			expect(getByText("Operation completed")).toBeTruthy();
		});
	});

	it("shows different toast types", async () => {
		const types = ["success", "error", "warning", "info"] as const;
		const { getByText } = render(<Toast />);
		
		for (const type of types) {
			act(() => {
				showToast({
					message: `${type} toast`,
					type,
				});
			});
			
			await waitFor(() => {
				expect(getByText(`${type} toast`)).toBeTruthy();
			});
		}
	});

	it("auto dismisses after duration", async () => {
		jest.useFakeTimers();
		const { getByText, queryByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Auto dismiss",
				duration: 3000,
			});
		});
		
		await waitFor(() => {
			expect(getByText("Auto dismiss")).toBeTruthy();
		});
		
		act(() => {
			jest.advanceTimersByTime(3000);
		});
		
		await waitFor(() => {
			expect(queryByText("Auto dismiss")).toBeNull();
		});
		
		jest.useRealTimers();
	});

	it("dismisses on press when dismissible", async () => {
		const { getByText, queryByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Dismissible toast",
				dismissible: true,
			});
		});
		
		await waitFor(() => {
			const toast = getByText("Dismissible toast");
			fireEvent.press(toast);
		});
		
		await waitFor(() => {
			expect(queryByText("Dismissible toast")).toBeNull();
		});
	});

	it("shows action button", async () => {
		const onAction = jest.fn();
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Toast with action",
				action: {
					label: "Undo",
					onPress: onAction,
				},
			});
		});
		
		await waitFor(() => {
			const actionButton = getByText("Undo");
			fireEvent.press(actionButton);
		});
		
		expect(onAction).toHaveBeenCalled();
	});

	it("shows multiple toasts", async () => {
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({ message: "First toast" });
			showToast({ message: "Second toast" });
		});
		
		await waitFor(() => {
			expect(getByText("First toast")).toBeTruthy();
			expect(getByText("Second toast")).toBeTruthy();
		});
	});

	it("respects position prop", () => {
		const positions = ["top", "bottom", "center"] as const;
		positions.forEach((position) => {
			const { getByTestId } = render(<Toast position={position} testID={`toast-${position}`} />);
			const container = getByTestId(`toast-${position}`);
			expect(container.props.style).toBeDefined();
		});
	});

	it("calls onShow callback", async () => {
		const onShow = jest.fn();
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Show callback",
				onShow,
			});
		});
		
		await waitFor(() => {
			expect(getByText("Show callback")).toBeTruthy();
			expect(onShow).toHaveBeenCalled();
		});
	});

	it("calls onHide callback", async () => {
		jest.useFakeTimers();
		const onHide = jest.fn();
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Hide callback",
				duration: 1000,
				onHide,
			});
		});
		
		await waitFor(() => {
			expect(getByText("Hide callback")).toBeTruthy();
		});
		
		act(() => {
			jest.advanceTimersByTime(1000);
		});
		
		await waitFor(() => {
			expect(onHide).toHaveBeenCalled();
		});
		
		jest.useRealTimers();
	});

	it("shows icon for toast types", async () => {
		const { getByLabelText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Success with icon",
				type: "success",
				showIcon: true,
			});
		});
		
		await waitFor(() => {
			expect(getByLabelText("success icon")).toBeTruthy();
		});
	});

	it("applies custom styles", async () => {
		const { getByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Styled toast",
				style: { backgroundColor: "purple" },
			});
		});
		
		await waitFor(() => {
			const toast = getByText("Styled toast").parent;
			expect(toast?.props.style).toEqual(
				expect.objectContaining({ backgroundColor: "purple" }),
			);
		});
	});

	it("prevents duplicate toasts", async () => {
		const { getAllByText } = render(<Toast />);
		
		act(() => {
			showToast({ message: "Duplicate", id: "unique-id" });
			showToast({ message: "Duplicate", id: "unique-id" });
		});
		
		await waitFor(() => {
			const toasts = getAllByText("Duplicate");
			expect(toasts).toHaveLength(1);
		});
	});

	it("limits maximum toasts", async () => {
		const { queryByText } = render(<Toast maxToasts={2} />);
		
		act(() => {
			showToast({ message: "Toast 1" });
			showToast({ message: "Toast 2" });
			showToast({ message: "Toast 3" });
		});
		
		await waitFor(() => {
			expect(queryByText("Toast 1")).toBeNull(); // First toast removed
			expect(queryByText("Toast 2")).toBeTruthy();
			expect(queryByText("Toast 3")).toBeTruthy();
		});
	});

	it("applies swipe to dismiss", async () => {
		const { getByText, queryByText } = render(<Toast />);
		
		act(() => {
			showToast({
				message: "Swipeable",
				swipeable: true,
			});
		});
		
		await waitFor(() => {
			const toast = getByText("Swipeable");
			// Simulate swipe gesture
			fireEvent(toast, "swipe", { direction: "right" });
		});
		
		await waitFor(() => {
			expect(queryByText("Swipeable")).toBeNull();
		});
	});
});