import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
	/**
	 * Content to display in the tooltip.
	 * Can be text or custom React elements.
	 */
	content: ReactNode | string;

	/**
	 * Target element that triggers the tooltip.
	 * Tooltip appears on hover or focus.
	 */
	children: ReactNode;

	/**
	 * Position of tooltip relative to target.
	 * @default "top"
	 */
	placement?: "top" | "bottom" | "left" | "right";

	/**
	 * Delay in milliseconds before showing tooltip.
	 * Prevents tooltips from appearing too quickly.
	 * @default 500
	 */
	delay?: number;

	/**
	 * Visual style variant.
	 * - "dark": Dark background with light text
	 * - "light": Light background with dark text
	 * - "info": Blue background for informational tooltips
	 * @default "dark"
	 */
	variant?: "dark" | "light" | "info";

	/**
	 * Whether the tooltip is disabled.
	 * Disabled tooltips never appear.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;
}
