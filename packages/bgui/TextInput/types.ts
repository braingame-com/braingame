import type { TextInputProps as RNTextInputProps, StyleProp, ViewStyle } from "react-native";

/**
 * Props for the {@link TextInput} component with variants and accessibility features.
 */
export interface TextInputProps extends Omit<RNTextInputProps, "onChangeText" | "style"> {
	value: string;
	onValueChange: (value: string) => void;
	variant?: "standard" | "flat" | "error";
	leftIcon?: string;
	rightIcon?: string;
	containerStyle?: StyleProp<ViewStyle>;
	style?: RNTextInputProps["style"];
	"aria-label"?: string;
	"aria-describedby"?: string;
}
