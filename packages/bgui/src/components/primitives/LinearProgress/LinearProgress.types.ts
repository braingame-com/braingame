import type { ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";

export interface LinearProgressProps extends Omit<ViewProps, "style"> {
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	variant?: "plain" | "outlined" | "soft" | "solid";
	size?: "sm" | "md" | "lg";
	determinate?: boolean;
	value?: number;
	thickness?: number;
	"aria-label"?: string;
	"aria-valuenow"?: number;
	"aria-valuemin"?: number;
	"aria-valuemax"?: number;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
