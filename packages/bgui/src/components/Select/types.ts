import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface SelectProps {
	children: ReactNode;
	value?: string | string[];
	onValueChange: (value: string | string[]) => void;
	placeholder?: string;
	searchable?: boolean;
	multiple?: boolean;
	disabled?: boolean;
	error?: boolean;
	errorMessage?: string;
	helperText?: string;
	variant?: "dropdown" | "modal";
	style?: StyleProp<ViewStyle>;
	"aria-label"?: string;
	"aria-invalid"?: boolean;
}

export interface SelectItemProps {
	value: string;
	children: ReactNode;
}
