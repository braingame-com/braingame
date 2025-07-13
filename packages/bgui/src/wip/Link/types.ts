import type React from "react";
import type { PressableProps, ViewStyle } from "react-native";

export interface LinkProps
	extends Omit<PressableProps, "children" | "onPress" | "disabled" | "style"> {
	children: React.ReactNode;
	href?: string;
	onPress?: () => void;
	external?: boolean;
	disabled?: boolean;
	variant?: "inline" | "standalone";
	"aria-label"?: string;
	style?: ViewStyle;
}
