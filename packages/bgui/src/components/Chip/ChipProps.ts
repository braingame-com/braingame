import type { CSSProperties, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Shared props interface for Chip component
 *
 * Chips represent complex entities in small blocks, such as a contact.
 * They can be clickable and include decorators for icons or actions.
 */
export interface ChipProps {
	/**
	 * The content of the component
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'soft'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If true, the component is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Click handler
	 */
	onClick?: (event: React.MouseEvent | import("react-native").GestureResponderEvent) => void;

	/**
	 * Element placed before the children.
	 */
	startDecorator?: ReactNode;

	/**
	 * Element placed after the children.
	 */
	endDecorator?: ReactNode;

	/**
	 * Additional styles
	 */
	style?: StyleProp<ViewStyle> | CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * Component reference - can be HTMLButtonElement for clickable chips or HTMLSpanElement for static chips
	 */
	ref?: React.Ref<HTMLButtonElement | HTMLSpanElement | import("react-native").View>;
}
