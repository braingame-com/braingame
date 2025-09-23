// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Select component
 *
 * Select components are used for collecting user provided information from a list of options.
 */
export interface SelectProps {
	/**
	 * The value of the select element.
	 */
	value?: string | number | string[] | number[];

	/**
	 * The default value. Use when the component is not controlled.
	 */
	defaultValue?: string | number | string[] | number[];

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * If `true`, the `select` will indicate an error.
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
	 * Leading adornment for this select.
	 */
	startDecorator?: ReactNode;

	/**
	 * Trailing adornment for this select.
	 */
	endDecorator?: ReactNode;

	/**
	 * The indicator to display. By default, uses arrow icon.
	 */
	indicator?: ReactNode;

	/**
	 * If `true`, the select will take up the full width of its container.
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * The placeholder text.
	 */
	placeholder?: string;

	/**
	 * The name of the select element.
	 */
	name?: string;

	/**
	 * The id of the select element.
	 */
	id?: string;

	/**
	 * If `true`, the select element is required.
	 * @default false
	 */
	required?: boolean;

	/**
	 * If `true`, the select element is focused during the first mount.
	 * @default false
	 */
	autoFocus?: boolean;

	/**
	 * If `true`, the user can select multiple options.
	 * @default false
	 */
	multiple?: boolean;

	/**
	 * Controls the open state of the select's listbox.
	 */
	listboxOpen?: boolean;

	/**
	 * The default open state. Use when the component is not controlled.
	 */
	defaultListboxOpen?: boolean;

	/**
	 * Function that customizes the rendering of the selected value.
	 */
	renderValue?: (option: string | number | string[] | number[] | null) => ReactNode;

	/**
	 * Callback fired when the value is changed.
	 */
	onChange?: (
		event: React.SyntheticEvent | null,
		value: string | number | string[] | number[] | null,
	) => void;

	/**
	 * Callback fired when the listbox is opened or closed.
	 */
	onListboxOpenChange?: (open: boolean) => void;

	/**
	 * Callback fired when the component requests to be closed.
	 */
	onClose?: () => void;

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
	 * The id of the element describing the select.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the select.
	 */
	"aria-labelledby"?: string;

	/**
	 * The content of the component.
	 * Usually contains Option components.
	 */
	children?: ReactNode;
}
