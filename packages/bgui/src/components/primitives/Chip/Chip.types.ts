import type { ReactNode } from "react";
import type { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from "react-native";
import type { IconName } from "../../../icons";

export type ChipColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type ChipVariant = "plain" | "outlined" | "soft" | "solid";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends Omit<PressableProps, "onPress" | "style"> {
	children?: ReactNode;
	color?: ChipColor;
	variant?: ChipVariant;
	size?: ChipSize;
	disabled?: boolean;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	onClick?: (event: GestureResponderEvent) => void;
	onDismiss?: () => void;
	dismissLabel?: string;
	dismissIconName?: IconName;
	style?: StyleProp<ViewStyle>;
	contentStyle?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
}
