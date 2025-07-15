import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";

export const THUMB_SIZE = Tokens.l;
export const TRACK_HEIGHT = Tokens.xs;

/**
 * Get StyleSheet for Slider component
 */
export const getSliderStyles = (colors: M3ColorScheme) =>
	StyleSheet.create({
		container: {
			height: THUMB_SIZE,
			justifyContent: "center",
		},
		track: {
			height: TRACK_HEIGHT,
			backgroundColor: colors.primaryContainer,
			borderRadius: TRACK_HEIGHT / 2,
			width: "100%",
		},
		range: {
			position: "absolute",
			height: TRACK_HEIGHT,
			backgroundColor: colors.primary,
			borderRadius: TRACK_HEIGHT / 2,
			top: 0,
		},
		thumb: {
			position: "absolute",
			width: THUMB_SIZE,
			height: THUMB_SIZE,
			borderRadius: THUMB_SIZE / 2,
			backgroundColor: colors.primary,
			marginTop: -THUMB_SIZE / 2 + TRACK_HEIGHT / 2,
		},
	});
