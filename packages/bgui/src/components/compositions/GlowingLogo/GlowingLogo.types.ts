import type { ReactNode } from "react";
import type { ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from "react-native";

export interface GlowingLogoProps extends Omit<ViewProps, "style"> {
	size?: number;
	glowColor?: string;
	glowIntensity?: "low" | "medium" | "high";
	animate?: boolean;
	source?: string | ImageSourcePropType;
	onPress?: () => void;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
}
