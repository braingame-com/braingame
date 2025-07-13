import { Colors, Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

export const THUMB_SIZE = Tokens.l;
export const TRACK_HEIGHT = Tokens.xs;

/**
 * StyleSheet for Slider component
 */
export const styles = StyleSheet.create({
	container: {
		height: THUMB_SIZE,
		justifyContent: "center",
	},
	track: {
		height: TRACK_HEIGHT,
		backgroundColor: Colors.universal.primaryFaded,
		borderRadius: TRACK_HEIGHT / 2,
		width: "100%",
	},
	range: {
		position: "absolute",
		height: TRACK_HEIGHT,
		backgroundColor: Colors.universal.primary,
		borderRadius: TRACK_HEIGHT / 2,
		top: 0,
	},
	thumb: {
		position: "absolute",
		width: THUMB_SIZE,
		height: THUMB_SIZE,
		borderRadius: THUMB_SIZE / 2,
		backgroundColor: Colors.universal.primary,
		marginTop: -THUMB_SIZE / 2 + TRACK_HEIGHT / 2,
	},
});
