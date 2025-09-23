// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Tooltip component
 *
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */
export interface TooltipProps {
	/**
	 * The content of the component.
	 */
	children: ReactNode;

	/**
	 * Tooltip title. Zero-length titles string are never displayed.
	 */
	title: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
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
	 * If `true`, the component is shown.
	 */
	open?: boolean;

	/**
	 * If `true`, the tooltip is shown.
	 * @default false
	 */
	defaultOpen?: boolean;

	/**
	 * Tooltip placement.
	 * @default 'bottom'
	 */
	placement?:
		| "top"
		| "top-start"
		| "top-end"
		| "right"
		| "right-start"
		| "right-end"
		| "bottom"
		| "bottom-start"
		| "bottom-end"
		| "left"
		| "left-start"
		| "left-end";

	/**
	 * If `true`, adds an arrow to the tooltip.
	 * @default false
	 */
	arrow?: boolean;

	/**
	 * The number of milliseconds to wait before showing the tooltip.
	 * @default 0
	 */
	enterDelay?: number;

	/**
	 * The number of milliseconds to wait before hiding the tooltip.
	 * @default 0
	 */
	leaveDelay?: number;

	/**
	 * Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the `leaveDelay` is expired.
	 * @default false
	 */
	disableInteractive?: boolean;

	/**
	 * If `true`, the tooltip follow the cursor over the wrapped element.
	 * @default false
	 */
	followCursor?: boolean;

	/**
	 * Do not respond to focus-visible events.
	 * @default false
	 */
	disableFocusListener?: boolean;

	/**
	 * Do not respond to hover events.
	 * @default false
	 */
	disableHoverListener?: boolean;

	/**
	 * Do not respond to long press touch events.
	 * @default false
	 */
	disableTouchListener?: boolean;

	/**
	 * The number of milliseconds a user must touch the element before showing the tooltip.
	 * @default 700
	 */
	enterTouchDelay?: number;

	/**
	 * The number of milliseconds after the user stops touching an element before hiding the tooltip.
	 * @default 1500
	 */
	leaveTouchDelay?: number;

	/**
	 * Callback fired when the component requests to be open.
	 */
	onOpen?: (event: any) => void;

	/**
	 * Callback fired when the component requests to be closed.
	 */
	onClose?: (event: any) => void;

	/**
	 * If true, the tooltip is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Click handler for the tooltip trigger
	 */
	onClick?: () => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * This prop is used to help implement the accessibility logic.
	 * If you don't provide this prop, it falls back to a randomly generated id.
	 */
	id?: string;
}
