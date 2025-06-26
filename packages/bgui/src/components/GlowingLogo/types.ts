import type { ViewProps } from "react-native";

export interface GlowingLogoProps extends ViewProps {
	size?: number;
	glowColor?: string;
	glowIntensity?: "low" | "medium" | "high";
	animate?: boolean;
	onPress?: () => void;
}
