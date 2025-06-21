import type { ViewProps } from "react-native";

export interface GlowingLogoProps extends Omit<ViewProps, "style"> {
	size?: number;
	glowColor?: string;
	glowIntensity?: "low" | "medium" | "high";
	animate?: boolean;
	onPress?: () => void;
}
