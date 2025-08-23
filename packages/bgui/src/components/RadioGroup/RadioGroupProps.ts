import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for RadioGroup component
 *
 * RadioGroup is a wrapper used to group multiple Radio components.
 */
export interface RadioGroupProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The value of the selected radio button. The DOM API casts this to a string.
	 */
	value?: string | number;

	/**
	 * The default value. Use when the component is not controlled.
	 */
	defaultValue?: string | number;

	/**
	 * The name used to reference the value of the control.
	 * If you don't provide this prop, it falls back to a randomly generated name.
	 */
	name?: string;

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
	 * If `true`, the user must check a radio button before submitting a form.
	 * @default false
	 */
	required?: boolean;

	/**
	 * If `true`, the component is read-only.
	 * @default false
	 */
	readOnly?: boolean;

	/**
	 * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
	 * @default false
	 */
	disableIcon?: boolean;

	/**
	 * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
	 * This prop is useful for composing RadioGroup with ListItem component.
	 * @default false
	 */
	overlay?: boolean;

	/**
	 * Callback fired when a radio button is selected.
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
	 * The id of the element describing the radio group.
	 */
	"aria-describedby"?: string;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * The id of the element labeling the radio group.
	 */
	"aria-labelledby"?: string;
}
