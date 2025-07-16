import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Badge component
 *
 * Badges are used to label or provide status information.
 */
export interface BadgeProps {
	/**
	 * The content of the badge (text, number, etc.)
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'primary'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'solid'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If true, renders a dot badge without content
	 * @default false
	 */
	dot?: boolean;

	/**
	 * Max value to display. Shows value+ when exceeded
	 * @default 99
	 */
	max?: number;

	/**
	 * Badge content when displayed as a number
	 */
	badgeContent?: ReactNode;

	/**
	 * If true, the badge is invisible
	 * @default false
	 */
	invisible?: boolean;

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
