import { StyleSheet, type ViewStyle } from "react-native";
import { Colors } from "./Colors";
import { Tokens } from "./Tokens";

// Utility styles
export const styles = StyleSheet.create({
	center: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	flexTop: {
		flex: 1,
		alignItems: "center",
	},
	flexCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	flexRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	pageWidth: {
		width: "100%",
		maxWidth: 480, // "60ch"
		padding: 0,
	},
	textInput: {
		width: "100%",
		height: "100%",
		fontSize: Tokens.m,
	},
	squareMedium: {
		width: Tokens.m,
		height: Tokens.m,
	},
});

// View styles
const baseViewStyles = {
	padding: Tokens.m,
};

export const viewStyles = StyleSheet.create({
	background: { ...baseViewStyles },
	card: {
		...baseViewStyles,
		borderRadius: Tokens.m,
	},
	"mini-card": {
		...baseViewStyles,
		padding: Tokens.s,
		borderRadius: Tokens.s,
	},
});

// Text styles
export const textStyles = StyleSheet.create({
	displayTitle: {
		fontFamily: "SohneStrong",
		fontSize: Tokens.xxxl,
		marginBottom: Tokens.m,
	},
	title: {
		fontFamily: "SohneBook",
		fontSize: Tokens.xxl,
		marginBottom: Tokens.m,
	},
	subtitle: {
		fontFamily: "SohneBook",
		fontSize: Tokens.l,
		marginBottom: Tokens.m,
	},
	default: {
		fontSize: Tokens.m,
		lineHeight: Tokens.xl,
	},
	small: {
		fontSize: Tokens.s,
		opacity: 0.5,
	},
	link: {
		fontSize: Tokens.m,
		color: Colors.universal.primary,
		cursor: "pointer",
	},
});

// Button styles
const baseButtonStyles: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	gap: Tokens.xs,
	borderRadius: Tokens.xs,
};

export const buttonStyles = StyleSheet.create({
	button: {
		...baseButtonStyles,
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.xs,
	},
	iconButton: {
		...baseButtonStyles,
		padding: Tokens.xs,
	},
});
