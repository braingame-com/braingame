import { Tokens } from "@braingame/utils";
import type { TextStyle } from "react-native";
import type { LabelProps } from "./types";

/**
 * Size mapping for Label component
 */
export const sizeMap: Record<NonNullable<LabelProps["size"]>, number> = {
	sm: Tokens.s,
	md: Tokens.m,
	lg: Tokens.l,
};

/**
 * Get base label styles
 */
export const getBaseStyle = (size: NonNullable<LabelProps["size"]>): TextStyle => ({
	fontSize: sizeMap[size],
});

/**
 * Get floating label styles
 */
export const getFloatingStyle = (): TextStyle => ({
	position: "absolute",
	top: -Tokens.s,
	left: Tokens.s,
	pointerEvents: "none",
});

/**
 * Required asterisk styles
 */
export const requiredStyle = {
	color: "red",
};
