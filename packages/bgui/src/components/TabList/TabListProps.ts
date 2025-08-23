import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for TabList component
 *
 * TabList is a component that contains Tab components.
 */
export interface TabListProps {
	/**
	 * The content of the component (typically Tab components).
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
	 * If `true`, the TabList component will stick to the top of the viewport.
	 * @default false
	 */
	sticky?: "top" | "bottom" | false;

	/**
	 * The positioning type for the tab indicator.
	 * @default 'top'
	 */
	tabIndicatorInset?: boolean;

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Click handler for tab selection
	 */
	onClick?: (event: any) => void;

	/**
	 * If `true`, the underline is disabled.
	 * @default false
	 */
	disableUnderline?: boolean;

	/**
	 * The placement of the underline.
	 * @default 'bottom'
	 */
	underlinePlacement?: "top" | "bottom" | "left" | "right";

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * The ARIA role attribute.
	 * @default 'tablist'
	 */
	role?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the tab list.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the tab list.
	 */
	"aria-labelledby"?: string;

	/**
	 * Determines the direction. It is used to compute the styles that control the scroll direction.
	 * @default 'horizontal'
	 */
	"aria-orientation"?: "horizontal" | "vertical";
}
