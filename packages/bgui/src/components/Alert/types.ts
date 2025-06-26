import type { ViewStyle } from "react-native";

export type AlertType = "info" | "success" | "warning" | "error";
export type AlertVariant = "banner" | "inline" | "floating";

export interface AlertProps {
	/** Optional title displayed above the message */
	title?: string;
	/** Main alert message */
	message: string;
	/** Visual type controlling background color */
	type?: AlertType;
	/** Optional actions rendered to the right */
	actions?: React.ReactNode;
	/** Whether the alert can be dismissed */
	dismissible?: boolean;
	/** Callback when the alert is dismissed */
	onDismiss?: () => void;
	/** Visual presentation variant */
	variant?: AlertVariant;
	style?: ViewStyle;
}
