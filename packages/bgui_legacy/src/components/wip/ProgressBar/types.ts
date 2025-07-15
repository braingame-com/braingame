import type { StyleProp, ViewStyle } from "react-native";

export interface ProgressBarProps {
	value: number; // 0-100
	color?: string;
	backgroundColor?: string;
	variant?: "linear" | "circular";
	animated?: boolean;
	size?: number; // diameter for circular variant
	style?: StyleProp<ViewStyle>;
}
