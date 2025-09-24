import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type TooltipPlacement =
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

export interface TooltipProps {
	/**
	 * Element that the tooltip is attached to.
	 */
	children: ReactNode;
	/**
	 * Content displayed inside the tooltip.
	 */
	title: ReactNode;
	/**
	 * Color variant used for the surface and text tokens.
	 * @default "neutral"
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	/**
	 * Visual treatment for the tooltip surface.
	 * @default "solid"
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";
	/**
	 * Density of the tooltip paddings and typography.
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * Controls the open state when provided.
	 */
	open?: boolean;
	/**
	 * Initial visibility when uncontrolled.
	 * @default false
	 */
	defaultOpen?: boolean;
	/**
	 * Preferred placement relative to the trigger element.
	 * @default "bottom"
	 */
	placement?: TooltipPlacement;
	/**
	 * Renders a directional arrow that points to the trigger.
	 * @default false
	 */
	arrow?: boolean;
	/**
	 * Delay in milliseconds before showing after hover/focus.
	 * @default 0
	 */
	enterDelay?: number;
	/**
	 * Delay in milliseconds before hiding after hover/focus leaves.
	 * @default 0
	 */
	leaveDelay?: number;
	/**
	 * Prevents the tooltip from capturing pointer events.
	 * @default false
	 */
	disableInteractive?: boolean;
	/**
	 * Positions the tooltip near the cursor instead of the trigger bounds.
	 * @default false
	 */
	followCursor?: boolean;
	/**
	 * Skip reacting to focus-visible events.
	 * @default false
	 */
	disableFocusListener?: boolean;
	/**
	 * Skip reacting to pointer hover events.
	 * @default false
	 */
	disableHoverListener?: boolean;
	/**
	 * Skip reacting to touch/press interactions.
	 * @default false
	 */
	disableTouchListener?: boolean;
	/**
	 * Long press duration before the tooltip appears.
	 * @default 700
	 */
	enterTouchDelay?: number;
	/**
	 * Delay before hiding after a touch/press interaction ends.
	 * @default 1500
	 */
	leaveTouchDelay?: number;
	/**
	 * Fired when the tooltip requests to open.
	 */
	onOpen?: (event: unknown) => void;
	/**
	 * Fired when the tooltip requests to close.
	 */
	onClose?: (event: unknown) => void;
	/**
	 * Disables all event handlers.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Custom styles for the tooltip surface.
	 */
	style?: StyleProp<ViewStyle>;
	/**
	 * Test identifier forwarded to the tooltip surface.
	 */
	testID?: string;
	/**
	 * Optional id used for accessibility bindings.
	 */
	id?: string;
	/**
	 * Accessible label override for screen readers.
	 */
	"aria-label"?: string;
}
