import type { ReactNode } from "react";
import type { TextStyle } from "react-native";

export interface LabelProps {
	children: ReactNode;
	htmlFor?: string;
	required?: boolean;
	size?: "sm" | "md" | "lg";
	variant?: "standard" | "floating";
	style?: TextStyle;
}
