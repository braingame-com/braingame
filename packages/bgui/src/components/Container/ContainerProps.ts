import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Container component
 *
 * Container centers your content horizontally and provides
 * responsive max-width constraints and padding.
 */
export interface ContainerProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * If `true`, the left and right padding is removed.
	 * @default false
	 */
	disableGutters?: boolean;

	/**
	 * Set the max-width to match the min-width of the current breakpoint.
	 * This is useful if you'd prefer to design for a fixed set of sizes
	 * instead of trying to accommodate a fully fluid viewport.
	 * It's fluid by default.
	 * @default false
	 */
	fixed?: boolean;

	/**
	 * Determine the max-width of the container.
	 * The container width grows with the size of the screen.
	 * Set to `false` to disable `maxWidth`.
	 * @default 'lg'
	 */
	maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;
}
