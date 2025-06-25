import type { TextInputProps as RNTextInputProps } from "react-native";

/**
 * Props for the TextInput component
 */
export interface TextInputProps extends RNTextInputProps {
	/**
	 * Current input value.
	 * Should be controlled by parent component state.
	 */
	value: string;

	/**
	 * Callback fired when the input value changes.
	 * Receives the new value as a string.
	 */
	onValueChange: (value: string) => void;

	/**
	 * Icon to display on the left side of the input.
	 * Pass the name of any available icon.
	 */
	leftIcon?: string;

	/**
	 * Icon to display on the right side of the input.
	 * Commonly used for actions like clear or toggle visibility.
	 */
	rightIcon?: string;

	/**
	 * Visual style variant of the input.
	 * - "standard": Default input with underline
	 * - "flat": Filled background style
	 * - "error": Red border/underline for validation errors
	 * @default "standard"
	 */
	variant?: "standard" | "flat" | "error";
}
