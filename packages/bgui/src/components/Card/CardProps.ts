import type { CSSProperties, ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";

/**
 * Shared props interface for Card component
 *
 * Cards contain content and actions about a single subject.
 */
export interface CardProps {
	/**
	 * The content of the card.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'outlined'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * The orientation of the card.
	 * @default 'vertical'
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * If true, the card colors are inverted.
	 * @default false
	 */
	invertedColors?: boolean;

	/**
	 * Click handler
	 */
	onClick?: (event: any) => void;

	/**
	 * Called when card is pressed in (native only)
	 */
	onPressIn?: (event: GestureResponderEvent) => void;

	/**
	 * Called when card is pressed out (native only)
	 */
	onPressOut?: (event: GestureResponderEvent) => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;
}
