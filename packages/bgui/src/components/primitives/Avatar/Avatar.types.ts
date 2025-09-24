import type { ReactNode } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type AvatarColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type AvatarVariant = "plain" | "outlined" | "soft" | "solid";
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
	alt?: string;
	children?: ReactNode;
	color?: AvatarColor;
	onClick?: (event: GestureResponderEvent) => void;
	onPressIn?: (event: GestureResponderEvent) => void;
	onPressOut?: (event: GestureResponderEvent) => void;
	size?: AvatarSize;
	src?: string;
	srcSet?: string;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	variant?: AvatarVariant;
	"aria-label"?: string;
}
