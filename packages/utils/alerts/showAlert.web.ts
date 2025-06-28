/**
 * Alert utilities for web
 * Provides consistent alert patterns across the application
 */

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
		if (message) {
			window.alert(`${title}\n\n${message}`);
		} else {
			window.alert(title);
		}
		onPress?.();
	},

	/**
	 * Shows a success alert
	 */
	success: (title: string, message?: string, onPress?: () => void) => {
		if (message) {
			window.alert(`${title}\n\n${message}`);
		} else {
			window.alert(title);
		}
		onPress?.();
	},

	/**
	 * Shows an info alert
	 */
	info: (title: string, message?: string, onPress?: () => void) => {
		if (message) {
			window.alert(`${title}\n\n${message}`);
		} else {
			window.alert(title);
		}
		onPress?.();
	},

	/**
	 * Shows a confirmation dialog
	 */
	confirm: ({
		title,
		message,
		onConfirm,
		onCancel,
		confirmText: _confirmText = "OK",
		cancelText: _cancelText = "Cancel",
		destructive: _destructive = false,
	}: ConfirmConfig) => {
		const confirmMessage = message ? `${title}\n\n${message}` : title;
		if (window.confirm(confirmMessage)) {
			onConfirm();
		} else {
			onCancel?.();
		}
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
	 * Shows an alert with custom buttons (falls back to basic alert on web)
	 */
	custom: (title: string, message?: string) => {
		if (message) {
			window.alert(`${title}\n\n${message}`);
		} else {
			window.alert(title);
		}
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
