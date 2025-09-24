import type { ReactNode } from "react";
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from "react-native";

export type CardColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type CardVariant = "plain" | "outlined" | "soft" | "solid";
export type CardSize = "sm" | "md" | "lg";
export type CardOrientation = "vertical" | "horizontal";

export interface CardProps extends Omit<PressableProps, "children" | "style" | "onPress"> {
	children?: ReactNode;
	color?: CardColor;
	variant?: CardVariant;
	size?: CardSize;
	orientation?: CardOrientation;
	disabled?: boolean;
	elevated?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	onClick?: (event: GestureResponderEvent) => void;
	onPressIn?: (event: GestureResponderEvent) => void;
	onPressOut?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	"aria-describedby"?: string;
}

export interface CardHeaderProps {
	children?: ReactNode;
	title?: ReactNode;
	subtitle?: ReactNode;
	leading?: ReactNode;
	trailing?: ReactNode;
	style?: StyleProp<ViewStyle>;
}

export interface CardContentProps {
	children?: ReactNode;
	padding?: boolean;
	style?: StyleProp<ViewStyle>;
}

export interface CardActionsProps {
	children?: ReactNode;
	align?: "start" | "center" | "end" | "space-between";
	direction?: CardOrientation;
	style?: StyleProp<ViewStyle>;
}
