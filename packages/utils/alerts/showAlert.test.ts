import { Alert, Platform } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { formatErrorMessage, showAlert, showErrorAlert } from "./showAlert";

// Mock React Native Alert
vi.mock("react-native", () => ({
	Alert: {
		alert: vi.fn(),
	},
	Platform: {
		OS: "ios",
	},
}));

describe("Alert Utilities", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("showAlert.error", () => {
		it("should show error alert with title only", () => {
			showAlert.error("Error Title");

			expect(Alert.alert).toHaveBeenCalledWith("Error Title", undefined, [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});

		it("should show error alert with title and message", () => {
			showAlert.error("Error Title", "Error message");

			expect(Alert.alert).toHaveBeenCalledWith("Error Title", "Error message", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});

		it("should handle onPress callback", () => {
			const onPress = vi.fn();
			showAlert.error("Error", "Message", onPress);

			expect(Alert.alert).toHaveBeenCalledWith("Error", "Message", [
				{ text: "OK", onPress, style: "default" },
			]);
		});
	});

	describe("showAlert.success", () => {
		it("should show success alert", () => {
			showAlert.success("Success!", "Operation completed");

			expect(Alert.alert).toHaveBeenCalledWith("Success!", "Operation completed", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});

		it("should handle onPress callback", () => {
			const onPress = vi.fn();
			showAlert.success("Success", undefined, onPress);

			expect(Alert.alert).toHaveBeenCalledWith("Success", undefined, [
				{ text: "OK", onPress, style: "default" },
			]);
		});
	});

	describe("showAlert.info", () => {
		it("should show info alert", () => {
			showAlert.info("Information", "Here is some info");

			expect(Alert.alert).toHaveBeenCalledWith("Information", "Here is some info", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});
	});

	describe("showAlert.confirm", () => {
		it("should show confirmation dialog with default buttons", () => {
			const onConfirm = vi.fn();
			showAlert.confirm({
				title: "Confirm Action",
				message: "Are you sure?",
				onConfirm,
			});

			expect(Alert.alert).toHaveBeenCalledWith("Confirm Action", "Are you sure?", [
				{
					text: "Cancel",
					style: "cancel",
					onPress: undefined,
				},
				{
					text: "OK",
					style: "default",
					onPress: onConfirm,
				},
			]);
		});

		it("should show confirmation with custom button text", () => {
			const onConfirm = vi.fn();
			const onCancel = vi.fn();

			showAlert.confirm({
				title: "Delete Item",
				message: "This cannot be undone",
				onConfirm,
				onCancel,
				confirmText: "Delete",
				cancelText: "Keep",
			});

			expect(Alert.alert).toHaveBeenCalledWith("Delete Item", "This cannot be undone", [
				{
					text: "Keep",
					style: "cancel",
					onPress: onCancel,
				},
				{
					text: "Delete",
					style: "default",
					onPress: onConfirm,
				},
			]);
		});

		it("should show destructive confirmation", () => {
			const onConfirm = vi.fn();

			showAlert.confirm({
				title: "Delete",
				onConfirm,
				destructive: true,
			});

			const buttons = (Alert.alert as any).mock.calls[0][2];
			expect(buttons[1].style).toBe("destructive");
		});

		it("should reverse button order on Android", () => {
			// Mock Android platform
			(Platform as any).OS = "android";

			const onConfirm = vi.fn();
			showAlert.confirm({
				title: "Confirm",
				onConfirm,
			});

			const buttons = (Alert.alert as any).mock.calls[0][2];
			// On Android, OK should come first
			expect(buttons[0].text).toBe("OK");
			expect(buttons[1].text).toBe("Cancel");

			// Reset to iOS
			(Platform as any).OS = "ios";
		});
	});

	describe("showAlert.confirmDestructive", () => {
		it("should show destructive confirmation with default Delete button", () => {
			const onConfirm = vi.fn();
			const onCancel = vi.fn();

			showAlert.confirmDestructive({
				title: "Delete Item",
				message: "Are you sure?",
				onConfirm,
				onCancel,
			});

			expect(Alert.alert).toHaveBeenCalled();
			const buttons = (Alert.alert as any).mock.calls[0][2];
			expect(buttons[1].text).toBe("Delete");
			expect(buttons[1].style).toBe("destructive");
		});

		it("should allow custom destructive button text", () => {
			const onConfirm = vi.fn();

			showAlert.confirmDestructive({
				title: "Remove",
				onConfirm,
				confirmText: "Remove",
			});

			const buttons = (Alert.alert as any).mock.calls[0][2];
			expect(buttons[1].text).toBe("Remove");
			expect(buttons[1].style).toBe("destructive");
		});
	});

	describe("showAlert.custom", () => {
		it("should show alert with custom buttons", () => {
			const button1Press = vi.fn();
			const button2Press = vi.fn();

			const customButtons = [
				{ text: "Option 1", onPress: button1Press },
				{ text: "Option 2", onPress: button2Press, style: "destructive" as const },
			];

			showAlert.custom("Choose Option", "Select one:", customButtons);

			expect(Alert.alert).toHaveBeenCalledWith("Choose Option", "Select one:", customButtons);
		});

		it("should handle no buttons", () => {
			showAlert.custom("Title", "Message");

			expect(Alert.alert).toHaveBeenCalledWith("Title", "Message", undefined);
		});
	});

	describe("formatErrorMessage", () => {
		it("should format Error instances", () => {
			const error = new Error("Something went wrong");
			expect(formatErrorMessage(error)).toBe("Something went wrong");
		});

		it("should format string errors", () => {
			expect(formatErrorMessage("Error string")).toBe("Error string");
		});

		it("should format unknown error types", () => {
			expect(formatErrorMessage(null)).toBe("An unexpected error occurred");
			expect(formatErrorMessage(undefined)).toBe("An unexpected error occurred");
			expect(formatErrorMessage(123)).toBe("An unexpected error occurred");
			expect(formatErrorMessage({})).toBe("An unexpected error occurred");
			expect(formatErrorMessage([])).toBe("An unexpected error occurred");
		});

		it("should handle custom error objects", () => {
			const customError = {
				message: "Custom error",
				toString: () => "Custom error string",
			};
			// Since it's not an Error instance and not a string, should return default
			expect(formatErrorMessage(customError)).toBe("An unexpected error occurred");
		});
	});

	describe("showErrorAlert", () => {
		it("should show error alert with formatted message", () => {
			const error = new Error("Test error");
			showErrorAlert(error);

			expect(Alert.alert).toHaveBeenCalledWith("Error", "Test error", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});

		it("should use custom title", () => {
			showErrorAlert("String error", "Custom Error Title");

			expect(Alert.alert).toHaveBeenCalledWith("Custom Error Title", "String error", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});

		it("should handle unknown error types", () => {
			showErrorAlert({ some: "object" });

			expect(Alert.alert).toHaveBeenCalledWith("Error", "An unexpected error occurred", [
				{ text: "OK", onPress: undefined, style: "default" },
			]);
		});
	});
});
