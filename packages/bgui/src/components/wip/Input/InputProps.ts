// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Shared props interface for Input component
 *
 * Text inputs allow users to enter text into a UI.
 */
export interface InputProps {
	/**
	 * The value of the input element.
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
	 * If `true`, the `input` will indicate an error.
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
	 * Leading adornment for this input.
	 */
	startDecorator?: ReactNode;

	/**
	 * Trailing adornment for this input.
	 */
	endDecorator?: ReactNode;

	/**
	 * If `true`, the input will take up the full width of its container.
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Type of the input element. It should be a valid HTML5 input type.
	 * @default 'text'
	 */
	type?:
		| "text"
		| "email"
		| "password"
		| "number"
		| "tel"
		| "url"
		| "search"
		| "date"
		| "time"
		| "datetime-local";

	/**
	 * The short hint displayed in the `input` before the user enters a value.
	 */
	placeholder?: string;

	/**
	 * The name of the input element.
	 */
	name?: string;

	/**
	 * The id of the input element.
	 */
	id?: string;

	/**
	 * If `true`, the input element is required.
	 * @default false
	 */
	required?: boolean;

	/**
	 * If `true`, the input element is focused during the first mount.
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * If `true`, the input element is read-only.
	 * @default false
	 */
	readOnly?: boolean;

	/**
	 * This prop helps users to fill forms faster, especially on mobile devices.
	 * The name can be confusing, as it's more like an autofill.
	 */
	autoComplete?: string;

	/**
	 * The maximum number of characters allowed in the input.
	 */
	maxLength?: number;

	/**
	 * The minimum number of characters required in the input.
	 */
	minLength?: number;

	/**
	 * The maximum value (for number inputs).
	 */
	max?: number | string;

	/**
	 * The minimum value (for number inputs).
	 */
	min?: number | string;

	/**
	 * The stepping interval (for number inputs).
	 */
	step?: number | string;

	/**
	 * A regular expression that the input's value must match.
	 */
	pattern?: string;

	/**
	 * Callback fired when the value is changed.
	 */
	onChange?: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| import("react-native").NativeSyntheticEvent<
					import("react-native").TextInputChangeEventData
			  >,
	) => void;

	/**
	 * Callback fired when the input loses focus.
	 */
	onBlur?: (
		event:
			| React.FocusEvent<HTMLInputElement>
			| import("react-native").NativeSyntheticEvent<import("react-native").TextInputFocusEventData>,
	) => void;

	/**
	 * Callback fired when the input receives focus.
	 */
	onFocus?: (
		event:
			| React.FocusEvent<HTMLInputElement>
			| import("react-native").NativeSyntheticEvent<import("react-native").TextInputFocusEventData>,
	) => void;

	/**
	 * Callback fired when a key is pressed.
	 */
	onKeyDown?: (
		event:
			| React.KeyboardEvent<HTMLInputElement>
			| import("react-native").NativeSyntheticEvent<
					import("react-native").TextInputKeyPressEventData
			  >,
	) => void;

	/**
	 * Callback fired when a key is released.
	 */
	onKeyUp?: (
		event:
			| React.KeyboardEvent<HTMLInputElement>
			| import("react-native").NativeSyntheticEvent<
					import("react-native").TextInputKeyPressEventData
			  >,
	) => void;

	/**
	 * Additional styles
	 */
	style?: StyleProp<ViewStyle> | CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * The id of the element describing the input.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the input.
	 */
	"aria-labelledby"?: string;
}
