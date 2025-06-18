import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface CheckboxProps {
	checked: boolean;
	onValueChange: (value: boolean) => void;
	children?: ReactNode;
	indeterminate?: boolean;
	disabled?: boolean;
	error?: boolean;
	errorMessage?: string;
	helperText?: string;
	style?: StyleProp<ViewStyle>;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
}
