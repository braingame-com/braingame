/**
 * Alert utilities
 * Provides consistent alert patterns across the application
 */

import { Alert, type AlertButton, Platform } from "react-native";

export interface AlertConfig {
	title: string;
	message?: string;
	onPress?: () => void;
}

export interface ConfirmConfig extends AlertConfig {
	onConfirm: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	destructive?: boolean;
}

/**
 * Collection of alert utilities for consistent user feedback
 */
export const showAlert = {
	/**
	 * Shows an error alert
	 */
	error: (title: string, message?: string, onPress?: () => void) => {
		Alert.alert(title, message, [{ text: "OK", onPress, style: "default" }]);
	},

	/**
	 * Shows a success alert
	 */
	success: (title: string, message?: string, onPress?: () => void) => {
		Alert.alert(title, message, [{ text: "OK", onPress, style: "default" }]);
	},

	/**
	 * Shows an info alert
	 */
	info: (title: string, message?: string, onPress?: () => void) => {
		Alert.alert(title, message, [{ text: "OK", onPress, style: "default" }]);
	},

	/**
	 * Shows a confirmation dialog
	 */
	confirm: ({
		title,
		message,
		onConfirm,
		onCancel,
		confirmText = "OK",
		cancelText = "Cancel",
		destructive = false,
	}: ConfirmConfig) => {
		const buttons: AlertButton[] = [
			{
				text: cancelText,
				style: "cancel",
				onPress: onCancel,
			},
			{
				text: confirmText,
				style: destructive ? "destructive" : "default",
				onPress: onConfirm,
			},
		];

		// On Android, reverse button order for platform consistency
		if (Platform.OS === "android") {
			buttons.reverse();
		}

		Alert.alert(title, message, buttons);
	},

	/**
	 * Shows a destructive confirmation dialog
	 */
	confirmDestructive: ({
		title,
		message,
		onConfirm,
		onCancel,
		confirmText = "Delete",
		cancelText = "Cancel",
	}: ConfirmConfig) => {
		showAlert.confirm({
			title,
			message,
			onConfirm,
			onCancel,
			confirmText,
			cancelText,
			destructive: true,
		});
	},

	/**
	 * Shows an alert with custom buttons
	 */
	custom: (title: string, message?: string, buttons?: AlertButton[]) => {
		Alert.alert(title, message, buttons);
	},
};

/**
 * Helper function to create consistent error messages
 */
export const formatErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === "string") {
		return error;
	}
	return "An unexpected error occurred";
};

/**
 * Shows an error alert from an unknown error type
 */
export const showErrorAlert = (error: unknown, title = "Error") => {
	const message = formatErrorMessage(error);
	showAlert.error(title, message);
};
