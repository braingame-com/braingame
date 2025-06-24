import type { ViewStyle } from "react-native";

export type AlertType = "info" | "success" | "warning" | "error";
export type AlertVariant = "banner" | "inline" | "floating";

/**
 * Props for the Alert component
 */
export interface AlertProps {
	/**
	 * Optional title displayed above the message.
	 * Use for brief summary of the alert content.
	 */
	title?: string;

	/**
	 * Main alert message.
	 * Required content that provides details to the user.
	 */
	message: string;

	/**
	 * Visual type controlling background color and icon.
	 * - "info": Blue background for informational messages
	 * - "success": Green background for positive outcomes
	 * - "warning": Yellow background for cautions
	 * - "error": Red background for errors or failures
	 * @default "info"
	 */
	type?: AlertType;

	/**
	 * Optional actions rendered to the right.
	 * Typically buttons or links for user response.
	 */
	actions?: React.ReactNode;

	/**
	 * Whether the alert can be dismissed.
	 * Shows a close button when true.
	 * @default false
	 */
	dismissible?: boolean;

	/**
	 * Callback when the alert is dismissed.
	 * Only called when dismissible is true.
	 */
	onDismiss?: () => void;

	/**
	 * Visual presentation variant.
	 * - "banner": Full-width with rounded corners
	 * - "inline": No rounded corners, fits content
	 * - "floating": Elevated with shadow
	 * @default "banner"
	 */
	variant?: AlertVariant;

	/**
	 * Additional styles to apply to the alert container.
	 */
	style?: ViewStyle;
}
