import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Radio component
 *
 * Radio buttons allow users to select a single option from a set.
 */
export interface RadioProps {
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
	 * @default 'outlined'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * The label element next to the radio button.
	 */
	label?: ReactNode;

	/**
	 * The `name` attribute of the input.
	 */
	name?: string;

	/**
	 * The value of the component. The DOM API casts this to a string.
	 */
	value?: string | number;

	/**
	 * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
	 * @default false
	 */
	disableIcon?: boolean;

	/**
	 * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
	 * This prop is useful for composing Radio with ListItem component.
	 * @default false
	 */
	overlay?: boolean;

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
	 * The icon to display when the component is checked.
	 */
	checkedIcon?: ReactNode;

	/**
	 * The icon when `checked` is false.
	 */
	uncheckedIcon?: ReactNode;

	/**
	 * Callback fired when the state is changed.
	 */
	onChange?: (event: any) => void;

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
	 * The id of the element describing the radio button.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the radio button.
	 */
	"aria-labelledby"?: string;
}
