import type { ViewStyle } from "react-native";

export interface SwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	disabled?: boolean;
	variant?: "standard" | "compact";
	style?: ViewStyle;
	"aria-label"?: string;
	"aria-describedby"?: string;
}
