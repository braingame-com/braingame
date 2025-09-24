import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "default" | "subtle" | "emphasized";
export type DividerInset = "none" | "context" | DividerSpacingValue;
export type DividerSpacingValue = keyof typeof import("../../../theme").theme.spacing | number;
export type DividerColorToken = keyof typeof import("../../../theme").theme.colors;

export interface DividerProps {
	children?: ReactNode;
	orientation?: DividerOrientation;
	inset?: DividerInset;
	variant?: DividerVariant;
	thickness?: number;
	color?: DividerColorToken | string;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
