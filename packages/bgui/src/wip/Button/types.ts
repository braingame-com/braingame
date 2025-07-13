import type { ReactNode } from "react";

/**
 * Available button sizes
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Available button style variants
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";

/**
 * Props for the Button component
 */
export interface ButtonProps {
	/**
	 * The content to display inside the button.
	 * Can be text, icons, or any React node.
	 */
	children?: ReactNode;

	/**
	 * Callback function triggered when the button is pressed.
	 * Required for all buttons to ensure accessibility.
	 */
	onPress: () => void;

	/**
	 * Name of the icon to display in the button.
	 * Uses the Icon component internally.
	 */
	icon?: string;

	/**
	 * Position of the icon relative to the button text.
	 * @default "left"
	 */
	iconPosition?: "left" | "right";

	/**
	 * Size variant of the button affecting padding and font size.
	 * - "sm": Small button with compact padding
	 * - "md": Medium button (default)
	 * - "lg": Large button with extra padding
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Whether the button should expand to fill its container width.
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Whether the button is disabled and cannot be interacted with.
	 * Disabled buttons have reduced opacity and ignore press events.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the button is in a loading state.
	 * Shows a spinner instead of content when true.
	 * @default false
	 */
	loading?: boolean;

	/**
	 * Visual style variant of the button.
	 * - "primary": Primary action button with solid background
	 * - "secondary": Secondary action with lighter background
	 * - "ghost": Minimal button with no background
	 * - "danger": Destructive action button in red
	 * - "icon": Icon-only button with no text
	 * @default "primary"
	 */
	variant?: ButtonVariant;

	/**
	 * Accessible label for the button.
	 * Required when button has no text content or only an icon.
	 */
	"aria-label"?: string;

	/**
	 * ID of element that describes the button.
	 * Use for additional context or help text.
	 */
	"aria-describedby"?: string;
}
