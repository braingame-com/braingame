import type { ReactNode } from "react";
import type { TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";

export type ThemeColor = "primary" | "secondary" | "danger" | "neutral" | "success" | "warning";

export type TextVariant = "h1" | "h2" | "h3" | "body" | "caption";

export interface TextProps extends Omit<RNTextProps, "style"> {
	children: ReactNode;
	variant?: TextVariant;
	color?: ThemeColor;
	align?: "left" | "center" | "right";
	numberOfLines?: number;
	style?: StyleProp<TextStyle>;
}
