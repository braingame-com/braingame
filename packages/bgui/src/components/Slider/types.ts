import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Slider component
 */
export interface SliderProps {
	/**
	 * Current value(s) of the slider.
	 * - Single number for single thumb
	 * - [min, max] tuple for range slider
	 */
	value: number | [number, number];

	/**
	 * Callback fired when slider value changes.
	 * Receives new value(s) as the user drags.
	 */
	onValueChange: (value: number | [number, number]) => void;

	/**
	 * Minimum allowed value.
	 * @default 0
	 */
	min?: number;

	/**
	 * Maximum allowed value.
	 * @default 100
	 */
	max?: number;

	/**
	 * Step increment between values.
	 * Values snap to nearest step.
	 * @default 1
	 */
	step?: number;

	/**
	 * Whether the slider is disabled.
	 * Disabled sliders have reduced opacity and ignore interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the slider is in an error state.
	 * Visual indicator for validation errors.
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display when in error state.
	 * Typically shown below the slider.
	 */
	errorMessage?: string;

	/**
	 * Helper text displayed below the slider.
	 * Provides additional context or instructions.
	 */
	helperText?: string;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * Accessibility label for the slider.
	 * Describes what value is being adjusted.
	 */
	"aria-label"?: string;

	/**
	 * ID of element that describes the slider.
	 * Used for additional context.
	 */
	"aria-describedby"?: string;

	/**
	 * Whether the slider value is invalid.
	 * Used for form validation.
	 */
	"aria-invalid"?: boolean;
}
