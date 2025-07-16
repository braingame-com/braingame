import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Textarea component
 *
 * Textareas allow users to enter multiple lines of text into a UI.
 */
export interface TextareaProps {
	/**
	 * The value of the textarea element.
	 */
	value?: string | number | readonly string[];

	/**
	 * The default value. Use when the component is not controlled.
	 */
	defaultValue?: string | number | readonly string[];

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * If `true`, the `textarea` will indicate an error.
	 * @default false
	 */
	error?: boolean;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'outlined'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Leading adornment for this textarea.
	 */
	startDecorator?: ReactNode;

	/**
	 * Trailing adornment for this textarea.
	 */
	endDecorator?: ReactNode;

	/**
	 * If `true`, the textarea will take up the full width of its container.
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Minimum number of rows to display.
	 * @default 2
	 */
	minRows?: number;

	/**
	 * Maximum number of rows to display.
	 */
	maxRows?: number;

	/**
	 * The short hint displayed in the `textarea` before the user enters a value.
	 */
	placeholder?: string;

	/**
	 * The name of the textarea element.
	 */
	name?: string;

	/**
	 * The id of the textarea element.
	 */
	id?: string;

	/**
	 * If `true`, the textarea element is required.
	 * @default false
	 */
	required?: boolean;

	/**
	 * If `true`, the textarea element is focused during the first mount.
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * If `true`, the textarea element is read-only.
	 * @default false
	 */
	readOnly?: boolean;

	/**
	 * The maximum number of characters allowed in the textarea.
	 */
	maxLength?: number;

	/**
	 * The minimum number of characters required in the textarea.
	 */
	minLength?: number;

	/**
	 * Number of rows to display when multiline option is set to true.
	 */
	rows?: number;

	/**
	 * Number of columns to display.
	 */
	cols?: number;

	/**
	 * Indicates how the control wraps text.
	 * @default 'soft'
	 */
	wrap?: "soft" | "hard" | "off";

	/**
	 * Callback fired when the value is changed.
	 */
	onChange?: (event: any) => void;

	/**
	 * Callback fired when the textarea loses focus.
	 */
	onBlur?: (event: any) => void;

	/**
	 * Callback fired when the textarea receives focus.
	 */
	onFocus?: (event: any) => void;

	/**
	 * Callback fired when a key is pressed.
	 */
	onKeyDown?: (event: any) => void;

	/**
	 * Callback fired when a key is released.
	 */
	onKeyUp?: (event: any) => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the textarea.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the textarea.
	 */
	"aria-labelledby"?: string;
}
