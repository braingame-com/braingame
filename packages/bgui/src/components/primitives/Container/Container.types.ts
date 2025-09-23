import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type ContainerWidth = "xs" | "sm" | "md" | "lg" | "xl" | false;

export interface ContainerProps {
	children?: ReactNode;
	disableGutters?: boolean;
	fixed?: boolean;
	maxWidth?: ContainerWidth;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
