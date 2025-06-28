import type { Colors } from "@braingame/utils";
import type { StyleProp, ViewStyle } from "react-native";

export type IconVariant = "solid" | "regular" | "brands" | "light" | "duotone";
export type IconSize = "sm" | "md" | "lg";
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export interface IconProps {
	name: string;
	variant?: IconVariant;
	size?: IconSize | number;
	color?: ThemeColor;
	decorative?: boolean;
	"aria-label"?: string;
	style?: StyleProp<ViewStyle>;
}
