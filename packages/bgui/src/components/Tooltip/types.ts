import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface TooltipProps {
	content: ReactNode | string;
	children: ReactNode;
	placement?: "top" | "bottom" | "left" | "right";
	delay?: number;
	variant?: "dark" | "light" | "info";
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
}
