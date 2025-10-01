import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";
import type { Theme } from "../../../theme";

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type SpacingValue = keyof Theme["spacing"] | number;

export interface StackProps {
	children?: ReactNode;
	direction?: FlexDirection;
	spacing?: SpacingValue;
	divider?: ReactNode;
	useFlexGap?: boolean;
	style?: ViewStyle;
	testID?: string;
}
