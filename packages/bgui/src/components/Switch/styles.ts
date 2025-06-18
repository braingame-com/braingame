import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

const PADDING = 2;

/**
 * StyleSheet for Switch component
 */
export const styles = StyleSheet.create({
	track: {
		height: Tokens.l,
		borderRadius: Tokens.l / 2,
		padding: PADDING,
		justifyContent: "center",
	},
	knob: {
		width: Tokens.m,
		height: Tokens.m,
		borderRadius: Tokens.m / 2,
	},
	compactTrack: {
		height: Tokens.m,
		borderRadius: Tokens.m / 2,
		padding: PADDING,
		justifyContent: "center",
	},
	compactKnob: {
		width: Tokens.s,
		height: Tokens.s,
		borderRadius: Tokens.s / 2,
	},
});

/**
 * Get switch dimensions based on variant
 */
export const getSwitchDimensions = (variant: "standard" | "compact") => {
	const width = variant === "compact" ? Tokens.xl : Tokens.xxl;
	const knobSize = variant === "compact" ? Tokens.s : Tokens.m;
	const translateX = width - knobSize - PADDING * 2;

	return { width, knobSize, translateX };
};
