import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface RadioGroupProps {
	children: ReactNode;
	value?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
	disabled?: boolean;
	error?: boolean;
	errorMessage?: string;
	helperText?: string;
	variant?: "standard" | "card";
	"aria-label"?: string;
	"aria-invalid"?: boolean;
	style?: StyleProp<ViewStyle>;
}

export interface RadioGroupItemProps {
	value: string;
	children: ReactNode;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
}
