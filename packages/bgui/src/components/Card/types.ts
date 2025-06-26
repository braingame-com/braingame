import type { ReactNode } from "react";
import type { ViewProps as RNViewProps } from "react-native";

/**
 * Props for the Card component
 */
export interface CardProps extends RNViewProps {
	/**
	 * Content to display inside the card.
	 * Typically includes text, images, or other components.
	 */
	children?: ReactNode;

	/**
	 * Visual variant of the card.
	 * - "basic": Static card for displaying content
	 * - "interactive": Card with hover and press states
	 * @default "basic"
	 */
	variant?: "basic" | "interactive";

	/**
	 * Amount of padding inside the card.
	 * - "none": No padding (0)
	 * - "small": Compact padding (8px)
	 * - "medium": Standard padding (16px)
	 * - "large": Spacious padding (24px)
	 * @default "medium"
	 */
	padding?: "none" | "small" | "medium" | "large";

	/**
	 * Shadow elevation level (0-5).
	 * Higher values create stronger shadows.
	 * Only visible on supported platforms.
	 * @default 0
	 */
	elevation?: number;

	/**
	 * Callback function when the card is pressed.
	 * Automatically makes the card interactive.
	 */
	onPress?: () => void;

	/**
	 * Accessible label for the card.
	 * Important when card is interactive.
	 */
	"aria-label"?: string;

	/**
	 * ID of element that describes the card.
	 * Use for additional context.
	 */
	"aria-describedby"?: string;
}
