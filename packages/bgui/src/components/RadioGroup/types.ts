import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
	/**
	 * Radio items to display.
	 * Should contain RadioGroup.Item components.
	 */
	children: ReactNode;

	/**
	 * Currently selected value (controlled).
	 * Must match one of the Item value props.
	 */
	value?: string;

	/**
	 * Callback fired when selection changes.
	 * Receives the value of the selected item.
	 */
	onValueChange?: (value: string) => void;

	/**
	 * Default selected value (uncontrolled).
	 * Used when component is not controlled.
	 */
	defaultValue?: string;

	/**
	 * Whether all radio items are disabled.
	 * Individual items can override this.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the group is in an error state.
	 * Shows error styling and message.
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display when in error state.
	 * Shown below the radio group.
	 */
	errorMessage?: string;

	/**
	 * Helper text displayed below the group.
	 * Provides additional context or instructions.
	 */
	helperText?: string;

	/**
	 * Visual style variant.
	 * - "standard": Basic radio buttons
	 * - "card": Card-style selection
	 * @default "standard"
	 */
	variant?: "standard" | "card";

	/**
	 * Accessibility label for the group.
	 * Describes the radio group purpose.
	 */
	"aria-label"?: string;

	/**
	 * Whether the group value is invalid.
	 * Used for form validation.
	 */
	"aria-invalid"?: boolean;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;
}

/**
 * Props for the RadioGroup.Item component
 */
export interface RadioGroupItemProps {
	/**
	 * Unique value for this radio option.
	 * Used to identify selection.
	 */
	value: string;

	/**
	 * Label content for the radio item.
	 * Can be text or custom React elements.
	 */
	children: ReactNode;

	/**
	 * Whether this specific item is disabled.
	 * Overrides group-level disabled state.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Additional styles to apply to the item.
	 */
	style?: StyleProp<ViewStyle>;
}
