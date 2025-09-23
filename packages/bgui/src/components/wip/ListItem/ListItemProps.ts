// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for ListItem component
 *
 * ListItem is a component that represents a single item within a List.
 */
export interface ListItemProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'plain'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * If `true`, the list item is selected.
	 * @default false
	 */
	selected?: boolean;

	/**
	 * If `true`, the list item is a child of a nested list.
	 * @default false
	 */
	nested?: boolean;

	/**
	 * If `true`, the list item will stick to the top of the viewport upon scrolling.
	 * @default false
	 */
	sticky?: boolean;

	/**
	 * The element to display at the start of ListItem.
	 */
	startAction?: ReactNode;

	/**
	 * The element to display at the end of ListItem.
	 */
	endAction?: ReactNode;

	/**
	 * The component used for the root node.
	 * @default 'li'
	 */
	component?: string;

	/**
	 * If `true`, the list item will have interactive styles.
	 * @default false
	 */
	button?: boolean;

	/**
	 * Callback fired when the list item is clicked.
	 */
	onClick?: (event: React.MouseEvent | React.TouchEvent) => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * The ARIA role attribute.
	 * @default 'listitem'
	 */
	role?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the list item.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the list item.
	 */
	"aria-labelledby"?: string;

	/**
	 * If `true`, the list item is selected (for ARIA).
	 */
	"aria-selected"?: boolean;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * If `true`, the list item is disabled (for ARIA).
	 */
	"aria-disabled"?: boolean;
}
