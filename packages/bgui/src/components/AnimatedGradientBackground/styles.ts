import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: "hidden",
	},
	blobLayer: {
		position: "absolute",
		borderRadius: 999,
	},
	blurContainer: {
		position: "absolute",
		top: "-20%",
		left: "-20%",
		right: "-20%",
		bottom: "-20%",
	},
});
