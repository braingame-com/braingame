import type { ViewStyle } from "react-native";

/**
 * Props for the Switch component
 */
export interface SwitchProps {
	/**
	 * Whether the switch is on (true) or off (false).
	 * Should be controlled by parent component state.
	 */
	checked: boolean;

	/**
	 * Callback fired when the switch is toggled.
	 * Receives the new value (opposite of current).
	 */
	onValueChange: (value: boolean) => void;

	/**
	 * Whether the switch is disabled.
	 * Disabled switches have reduced opacity and ignore interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the switch is in an error state.
	 * Can be used for validation feedback.
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display when in error state.
	 * Typically shown below the switch.
	 */
	errorMessage?: string;

	/**
	 * Helper text to display below the switch.
	 * Provides additional context or instructions.
	 */
	helperText?: string;

	/**
	 * Size variant of the switch.
	 * - "standard": Normal size (50x30)
	 * - "compact": Smaller size (40x24)
	 * @default "standard"
	 */
	variant?: "standard" | "compact";

	/**
	 * Additional styles to apply to the switch track.
	 */
	style?: ViewStyle;

	/**
	 * Accessibility label for the switch.
	 * Describes what the switch controls.
	 */
	"aria-label"?: string;

	/**
	 * ID of element that describes the switch.
	 * Use for additional context.
	 */
	"aria-describedby"?: string;

	/**
	 * Whether the switch value is invalid.
	 * Used for form validation.
	 */
	"aria-invalid"?: boolean;
}
