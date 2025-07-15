import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * StyleSheet for ProgressBar component
 */
export const styles = StyleSheet.create({
	track: {
		width: "100%",
		height: Tokens.s,
		borderRadius: Tokens.s,
		overflow: "hidden",
	},
	bar: {
		height: "100%",
	},
});

/**
 * Calculate circular progress properties
 */
export const getCircularProgressProps = (size: number) => {
	const radius = size / 2;
	const strokeWidth = Tokens.xs;
	const circumference = 2 * Math.PI * (radius - strokeWidth / 2);

	return {
		radius,
		strokeWidth,
		circumference,
	};
};
