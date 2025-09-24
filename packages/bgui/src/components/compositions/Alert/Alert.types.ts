import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type AlertStatus = "info" | "success" | "warning" | "error" | "neutral";
export type AlertVariant = "plain" | "outlined" | "soft" | "solid";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
	status?: AlertStatus;
	variant?: AlertVariant;
	size?: AlertSize;
	title?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode | ReactNode[];
	icon?: ReactNode;
	showIcon?: boolean;
	onDismiss?: () => void;
	dismissLabel?: string;
	autoFocusDismiss?: boolean;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	role?: "alert" | "status";
	"aria-label"?: string;
}
