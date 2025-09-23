// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Switch component
 *
 * Switches toggle the state of a single setting on or off.
 */
export interface SwitchProps {
	/**
	 * If `true`, the component is checked.
	 */
	checked?: boolean;

	/**
	 * The default checked state. Use when the component is not controlled.
	 */
	defaultChecked?: boolean;

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

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
	 * The label element at the start of the switch.
	 */
	startDecorator?: ReactNode;

	/**
	 * The label element at the end of the switch.
	 */
	endDecorator?: ReactNode;

	/**
	 * The element that appears on the track.
	 */
	trackChild?: ReactNode;

	/**
	 * The `name` attribute of the input.
	 */
	name?: string;

	/**
	 * The value of the component. The DOM API casts this to a string.
	 * The browser uses "on" as the default value.
	 */
	value?: string | number | readonly string[];

	/**
	 * If `true`, the component is required.
	 * @default false
	 */
	required?: boolean;

	/**
	 * If `true`, the input element is focused during the first mount.
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * If `true`, the component is read-only.
	 * @default false
	 */
	readOnly?: boolean;

	/**
	 * Callback fired when the state is changed.
	 */
	onChange?: (event: any) => void;

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
	 * The content of the component
	 */
	children?: ReactNode;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * The id of the element describing the switch.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the switch.
	 */
	"aria-labelledby"?: string;
}
