import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export type ToastTone = "info" | "success" | "warning" | "error" | "neutral";
export type ToastVariant = "solid" | "soft" | "outlined";
export type ToastAriaRole = "alert" | "none";

export interface ToastProps {
	title?: ReactNode;
	message: ReactNode;
	variant?: ToastVariant;
	tone?: ToastTone;
	icon?: IconName | ReactNode;
	action?: ReactNode;
	onDismiss?: () => void;
	dismissLabel?: string;
	role?: ToastAriaRole;
	liveRegion?: "none" | "polite" | "assertive";
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
