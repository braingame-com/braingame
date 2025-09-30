import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type CircularProgressColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type CircularProgressVariant = "plain" | "outlined" | "soft" | "solid";
export type CircularProgressSize = "sm" | "md" | "lg";

export interface CircularProgressProps {
	"aria-label"?: string;
	"aria-labelledby"?: string;
	"aria-valuemax"?: number;
	"aria-valuemin"?: number;
	"aria-valuenow"?: number;
	"aria-valuetext"?: string;
	children?: ReactNode;
	className?: string;
	color?: CircularProgressColor;
	determinate?: boolean;
	size?: CircularProgressSize;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	thickness?: number;
	value?: number;
	variant?: CircularProgressVariant;
}
