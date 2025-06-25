import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
	/**
	 * Whether the checkbox is checked.
	 * Controlled by parent component state.
	 */
	checked: boolean;

	/**
	 * Callback fired when checkbox is toggled.
	 * Receives the new checked state.
	 */
	onValueChange: (value: boolean) => void;

	/**
	 * Label text displayed next to the checkbox.
	 * Can be any React node for custom formatting.
	 */
	children?: ReactNode;

	/**
	 * Shows indeterminate state (dash instead of checkmark).
	 * Used for parent checkboxes with mixed child states.
	 * @default false
	 */
	indeterminate?: boolean;

	/**
	 * Whether the checkbox is disabled.
	 * Disabled checkboxes have reduced opacity and ignore interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the checkbox is in an error state.
	 * Visual indicator for validation errors.
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display when in error state.
	 * Typically shown below the checkbox.
	 */
	errorMessage?: string;

	/**
	 * Helper text displayed below the checkbox.
	 * Provides additional context or instructions.
	 */
	helperText?: string;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Accessibility label for the checkbox.
	 * Describes what the checkbox controls.
	 */
	"aria-label"?: string;

	/**
	 * ID of element that describes the checkbox.
	 * Used for additional context.
	 */
	"aria-describedby"?: string;

	/**
	 * Whether the checkbox value is invalid.
	 * Used for form validation.
	 */
	"aria-invalid"?: boolean;
}
