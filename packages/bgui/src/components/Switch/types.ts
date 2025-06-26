import type { ViewStyle } from "react-native";

export interface SwitchProps {
	checked: boolean;
	onValueChange: (value: boolean) => void;
	disabled?: boolean;
	error?: boolean;
	errorMessage?: string;
	helperText?: string;
	variant?: "standard" | "compact";
	style?: ViewStyle;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
}
