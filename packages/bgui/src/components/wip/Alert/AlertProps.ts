// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";
import type { ViewStyle } from "react-native";

/**
 * Shared props interface for Alert component
 *
 * Alerts display brief messages for the user without interrupting their workflow.
 */
export interface AlertProps {
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
	 * Element placed before the children.
	 */
	startDecorator?: ReactNode;

	/**
	 * Element placed after the children.
	 */
	endDecorator?: ReactNode;

	/**
	 * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
	 * @default false
	 */
	invertedColors?: boolean;

	/**
	 * The ARIA role attribute of the element.
	 * @default 'alert'
	 */
	role?: string;

	/**
	 * Additional styles
	 * Platform-specific: CSSProperties on web, ViewStyle on native
	 */
	style?: CSSProperties | ViewStyle;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;
}
