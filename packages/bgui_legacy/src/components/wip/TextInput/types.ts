import type { TextInputProps as RNTextInputProps } from "react-native";

export interface TextInputProps extends RNTextInputProps {
	/** Current value */
	value: string;
	/** Callback when value changes */
	onValueChange: (value: string) => void;
	/** Left icon name */
	leftIcon?: string;
	/** Right icon name */
	rightIcon?: string;
	/** Visual variant */
	variant?: "standard" | "flat" | "error";
}
