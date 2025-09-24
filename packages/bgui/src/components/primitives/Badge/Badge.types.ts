import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export type BadgeColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type BadgeVariant = "plain" | "outlined" | "soft" | "solid";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
	children?: ReactNode;
	color?: BadgeColor;
	variant?: BadgeVariant;
	size?: BadgeSize;
	dot?: boolean;
	max?: number;
	badgeContent?: ReactNode;
	invisible?: boolean;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	onDismiss?: () => void;
	dismissLabel?: string;
	dismissIconName?: IconName;
	style?: StyleProp<ViewStyle>;
	badgeStyle?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
}
