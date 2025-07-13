import type { Colors } from "@braingame/utils";
import type { StyleProp, TextStyle } from "react-native";

export type IconVariant = "solid" | "regular" | "brand";
export type IconSize = "sm" | "md" | "lg";
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export interface IconProps {
	name: string;
	variant?: IconVariant;
	size?: IconSize | number;
	color?: ThemeColor | string;
	decorative?: boolean;
	"aria-label"?: string;
	style?: StyleProp<TextStyle>;
}
