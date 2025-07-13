import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Select component
 */
export interface SelectProps {
	/**
	 * Select items to render as children.
	 * Must be Select.Item components.
	 * @example
	 * ```tsx
	 * <Select>
	 *   <Select.Item value="1">Option 1</Select.Item>
	 *   <Select.Item value="2">Option 2</Select.Item>
	 * </Select>
	 * ```
	 */
	children: ReactNode;

	/**
	 * Currently selected value(s).
	 * - Single string for single selection
	 * - Array of strings for multiple selection
	 */
	value?: string | string[];

	/**
	 * Callback fired when selection changes.
	 * @param value - New selected value(s)
	 */
	onValueChange: (value: string | string[]) => void;

	/**
	 * Placeholder text shown when no value is selected.
	 * @default "Select..."
	 */
	placeholder?: string;

	/**
	 * Whether the select dropdown includes a search input.
	 * Useful for long lists of options.
	 * @default false
	 */
	searchable?: boolean;

	/**
	 * Whether multiple items can be selected.
	 * When true, value should be an array.
	 * @default false
	 */
	multiple?: boolean;

	/**
	 * Whether the select is disabled.
	 * Prevents interaction and shows disabled styling.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the select is in an error state.
	 * Shows error styling and errorMessage if provided.
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display when error is true.
	 * Shown below the select in error color.
	 */
	errorMessage?: string;

	/**
	 * Helper text shown below the select.
	 * Hidden when errorMessage is shown.
	 */
	helperText?: string;

	/**
	 * Display variant of the select.
	 * - "dropdown": Shows options in a dropdown below the select
	 * - "modal": Shows options in a modal overlay
	 * @default "dropdown"
	 */
	variant?: "dropdown" | "modal";

	/**
	 * Custom styles for the select container.
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Accessible label for the select.
	 * Important for screen readers.
	 */
	"aria-label"?: string;

	/**
	 * Whether the select has invalid input.
	 * Defaults to the value of error prop.
	 */
	"aria-invalid"?: boolean;
}

/**
 * Props for Select.Item component
 */
export interface SelectItemProps {
	/**
	 * Unique value for this option.
	 * Used as the value passed to onValueChange.
	 */
	value: string;

	/**
	 * Display content for the option.
	 * Usually text, but can be any React node.
	 */
	children: ReactNode;

	/**
	 * Whether this item is currently selected.
	 * Managed internally by Select component.
	 * @internal
	 */
	selected?: boolean;

	/**
	 * Callback when this item is selected.
	 * Managed internally by Select component.
	 * @internal
	 */
	onSelect?: (value: string) => void;
}
