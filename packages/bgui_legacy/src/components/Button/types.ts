import type { PressableProps } from "react-native";
import type { IconName } from "../Icon/iconRegistry";

/**
 * Material 3 Button Variants
 * @see https://m3.material.io/components/buttons/overview
 */
export type M3ButtonVariant =
	| "filled" // High emphasis - primary actions
	| "outlined" // Medium emphasis - secondary actions
	| "text" // Low emphasis - tertiary actions
	| "elevated" // Filled button with shadow
	| "tonal"; // Filled with secondary color

/**
 * Button sizes affect height and padding
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * Button component properties
 */
export interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
	/**
	 * Material 3 button variant
	 * @default "filled"
	 */
	variant?: M3ButtonVariant;

	/**
	 * Button size
	 * - small: 32dp height
	 * - medium: 40dp height (default)
	 * - large: 48dp height
	 * @default "medium"
	 */
	size?: ButtonSize;

	/**
	 * Button label text
	 * Required for accessibility unless using children
	 */
	label?: string;

	/**
	 * Icon to display in the button
	 * Uses Material Symbols Rounded
	 */
	icon?: IconName;

	/**
	 * Position of icon relative to label
	 * @default "start"
	 */
	iconPosition?: "start" | "end";

	/**
	 * Whether button should fill its container width
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Loading state - shows spinner instead of content
	 * @default false
	 */
	loading?: boolean;

	/**
	 * For custom content (advanced use)
	 * If provided, overrides label and icon
	 */
	children?: React.ReactNode;

	/**
	 * Custom styles (use sparingly)
	 */
	style?: any;
}
