import type { ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";

export interface AnimatedGradientBackgroundProps extends Omit<ViewProps, "style"> {
	colors?: string[];
	duration?: number;
	animate?: boolean;
	blobCount?: number;
	blobOpacity?: number;
	blurRadius?: number;
	children?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
