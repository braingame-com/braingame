import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		position: "relative",
	},
	glowLayer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	logo: {
		zIndex: 1,
	},
});
