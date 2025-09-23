import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps {
	children?: ReactNode;
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	disabled?: boolean;
	endDecorator?: ReactNode;
	fullWidth?: boolean;
	size?: "sm" | "md" | "lg";
	startDecorator?: ReactNode;
	variant?: "solid" | "soft" | "outlined" | "plain";
	loading?: boolean;
	loadingIndicator?: ReactNode;
	loadingPosition?: "start" | "end" | "center";
	onClick?: (event: GestureResponderEvent | ReactMouseEvent) => void;
	onPressIn?: (event: GestureResponderEvent) => void;
	onPressOut?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-pressed"?: boolean | "mixed";
	tabIndex?: number;
	type?: "button" | "submit" | "reset";
}
