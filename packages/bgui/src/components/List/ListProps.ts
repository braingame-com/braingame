import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for List component
 *
 * Lists are continuous, vertical indexes of text or images.
 */
export interface ListProps {
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
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * The component orientation.
	 * @default 'vertical'
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * The marker to use for each list item.
	 * @default 'none'
	 */
	marker?: "disc" | "circle" | "square" | "decimal" | "none";

	/**
	 * The component used for the root node.
	 * @default 'ul'
	 */
	component?: string;

	/**
	 * If `true`, the component will have a margin around it.
	 * @default false
	 */
	wrap?: boolean;

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
	 * @default 'list'
	 */
	role?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the list.
	 */
	"aria-describedby"?: string;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * The id of the element labeling the list.
	 */
	"aria-labelledby"?: string;
}
