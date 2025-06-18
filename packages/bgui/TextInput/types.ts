import type { TextInputProps as RNTextInputProps } from "react-native";

// Enterprise-grade TypeScript interfaces
export interface TextInputProps extends Omit<RNTextInputProps, "onChangeText"> {
	value: string;
	onValueChange: (value: string) => void;
	variant?: "standard" | "flat" | "error";
	leftIcon?: string;
	rightIcon?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
}
