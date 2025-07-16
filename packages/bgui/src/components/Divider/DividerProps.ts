import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Divider component
 *
 * Divider is used to visually separate content with a thin line.
 * It can be horizontal or vertical and optionally contain text/content.
 */
export interface DividerProps {
	/**
	 * The content to display within the divider (optional).
	 * When provided, the divider splits with content in the middle.
	 */
	children?: ReactNode;

	/**
	 * The orientation of the divider.
	 * @default 'horizontal'
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * Controls the inset behavior of the divider.
	 * - 'none': No inset, full width/height
	 * - 'context': Respects parent's padding/inset
	 * @default 'none'
	 */
	inset?: "none" | "context";

	/**
	 * The thickness of the divider line in pixels.
	 * @default 1
	 */
	thickness?: number;

	/**
	 * The color of the divider line.
	 * Can be a theme color key or any valid color.
	 * @default 'divider' (theme.colors.divider)
	 */
	color?: string;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;
}
