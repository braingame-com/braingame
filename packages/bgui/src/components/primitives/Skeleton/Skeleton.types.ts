import type { ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";

export type SkeletonAnimation = "pulse" | "wave" | false;

export type SkeletonVariant = "overlay" | "text" | "circular" | "rectangular" | "inline";

export type SkeletonLevel =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "title-lg"
	| "title-md"
	| "title-sm"
	| "body-lg"
	| "body-md"
	| "body-sm"
	| "body-xs";

export interface SkeletonProps extends Omit<ViewProps, "style"> {
	children?: ReactNode;
	animation?: SkeletonAnimation;
	variant?: SkeletonVariant;
	level?: SkeletonLevel;
	width?: number | string;
	height?: number | string;
	loading?: boolean;
	visible?: boolean;
	style?: StyleProp<ViewStyle>;
	className?: string;
	testID?: string;
	"aria-label"?: string;
	"aria-busy"?: boolean;
}
