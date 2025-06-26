import type { ReactNode } from "react";
import type { ViewProps as RNViewProps } from "react-native";

export interface CardProps extends RNViewProps {
	children?: ReactNode;
	variant?: "basic" | "interactive";
	padding?: "none" | "small" | "medium" | "large";
	elevation?: number;
	onPress?: () => void;
	"aria-label"?: string;
	"aria-describedby"?: string;
}
