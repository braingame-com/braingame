import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { Theme } from "../../../theme";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "default" | "subtle" | "emphasized";
export type DividerInset = "none" | "context" | DividerSpacingValue;
export type DividerSpacingValue = keyof Theme["spacing"] | number;
export type DividerColorToken = keyof Theme["colors"];

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
