// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";

/**
 * Shared props interface for Button component
 *
 * Button triggers an action or event when activated.
 */
export interface ButtonProps {
	/**
	 * The content of the button.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'primary'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Element placed after the children.
	 */
	endDecorator?: ReactNode;

	/**
	 * If `true`, the button will take up the full width of its container.
	 * @default false
	 */
	fullWidth?: boolean;

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
	 * The variant to use.
	 * @default 'solid'
	 */
	variant?: "solid" | "soft" | "outlined" | "plain";

	/**
	 * If `true`, the loading indicator is shown and the button becomes disabled.
	 * @default false
	 */
	loading?: boolean;

	/**
	 * The node should contain an element with `role="progressbar"`.
	 * By default we render a CircularProgress.
	 */
	loadingIndicator?: ReactNode;

	/**
	 * The loading indicator can be positioned on the start, end, or the center of the button.
	 * @default 'center'
	 */
	loadingPosition?: "start" | "end" | "center";

	/**
	 * Click handler
	 * Web: MouseEvent
	 * Native: GestureResponderEvent
	 */
	onClick?: (event: React.MouseEvent | GestureResponderEvent) => void;

	/**
	 * Called when button is pressed in (native only)
	 */
	onPressIn?: (event: GestureResponderEvent) => void;

	/**
	 * Called when button is pressed out (native only)
	 */
	onPressOut?: (event: GestureResponderEvent) => void;

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
	 * Accessibility pressed state
	 */
	"aria-pressed"?: boolean | "mixed";

	/**
	 * Tab index for web
	 */
	tabIndex?: number;

	/**
	 * Type of button (web only)
	 */
	type?: "button" | "submit" | "reset";
}
