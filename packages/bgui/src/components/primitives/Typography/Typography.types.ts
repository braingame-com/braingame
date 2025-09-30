import type { ReactNode } from "react";
import type { TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";

export type TypographyLevel =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "title-lg"
	| "title-md"
	| "title-sm"
	| "body-lg"
	| "body-md"
	| "body-sm"
	| "body-xs"
	| "inherit";

export interface TypographyProps extends Omit<RNTextProps, "style"> {
	children?: ReactNode;
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	variant?: "plain" | "outlined" | "soft" | "solid";
	level?: TypographyLevel;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	gutterBottom?: boolean;
	noWrap?: boolean;
	textAlign?: "left" | "center" | "right" | "justify";
	component?: string;
	textColor?: string;
	className?: string;
	style?: StyleProp<TextStyle>;
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}
