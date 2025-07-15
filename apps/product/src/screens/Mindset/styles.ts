import { Tokens } from "@braingame/utils";
import { StyleSheet } from "react-native";

/**
 * Mindset Training Styles
 * Converted from dev-dil CSS to React Native StyleSheet
 */

// Color palette from dev-dil
const colors = {
	background: "#101020",
	card: "#202030",
	border: "#505060",
	fadedBorder: "#303040",
	hoverFade: "rgba(255, 255, 255, 0.05)",
	hoverFade2: "rgba(255, 255, 255, 0.1)",
	bgTrans: "rgba(0, 0, 0, 0.5)",

	green: "#00a550",
	blue: "#007fff",
	orange: "#ff6d00",
	purple: "#7712fa",
	darkPurple: "#1f0247",

	text: "#fff",
	textSecondary: "#aaa",
};

export const mindsetStyles = StyleSheet.create({
	// Main container
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.l,
	},

	// Page width constraint
	pageWidth: {
		width: "100%",
		maxWidth: 480, // ~70ch equivalent
		alignSelf: "center",
	},

	// Card styles
	card: {
		backgroundColor: colors.card,
		borderRadius: Tokens.m,
		padding: Tokens.l * 2, // 2rem equivalent
		marginBottom: Tokens.l,
		borderWidth: 1,
		borderColor: colors.border,
	},

	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: Tokens.m,
	},

	cardTitle: {
		fontSize: Tokens.l * 1.5, // 1.5rem
		fontWeight: "700",
		color: colors.text,
		fontFamily: "Lexend",
	},

	cardDescription: {
		fontSize: Tokens.m,
		color: colors.textSecondary,
		fontFamily: "Lexend",
		fontWeight: "400",
		marginBottom: Tokens.m,
	},

	// Status indicators
	statusBadge: {
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
		borderRadius: Tokens.xs,
		alignItems: "center",
		justifyContent: "center",
	},

	statusCompleted: {
		backgroundColor: colors.green,
	},

	statusPending: {
		backgroundColor: colors.orange,
	},

	statusText: {
		fontSize: Tokens.s,
		fontWeight: "600",
		color: colors.text,
		fontFamily: "Lexend",
	},

	// Form styles
	formContainer: {
		gap: Tokens.m,
	},

	inputGroup: {
		marginBottom: Tokens.m,
	},

	inputLabel: {
		fontSize: Tokens.m,
		fontWeight: "600",
		color: colors.text,
		fontFamily: "Lexend",
		marginBottom: Tokens.xs,
	},

	textInput: {
		backgroundColor: colors.fadedBorder,
		borderRadius: Tokens.xs,
		padding: Tokens.m,
		fontSize: Tokens.m,
		color: colors.text,
		fontFamily: "Lexend",
		fontWeight: "400",
		minHeight: 80, // Multi-line support
		textAlignVertical: "top",
		borderWidth: 1,
		borderColor: colors.border,
	},

	textInputFocused: {
		borderColor: colors.blue,
	},

	// Button styles
	button: {
		backgroundColor: colors.blue,
		borderRadius: Tokens.xs,
		paddingHorizontal: Tokens.l,
		paddingVertical: Tokens.m,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		minHeight: 56, // 3.5rem equivalent
		minWidth: 112, // 7rem equivalent
	},

	buttonLoading: {
		backgroundColor: colors.textSecondary,
	},

	buttonSuccess: {
		backgroundColor: colors.green,
	},

	buttonError: {
		backgroundColor: colors.orange,
	},

	buttonText: {
		fontSize: Tokens.l * 1.25, // 1.25rem
		fontWeight: "700",
		color: colors.text,
		fontFamily: "Lexend",
		marginLeft: Tokens.xs,
	},

	// Error message
	errorText: {
		fontSize: Tokens.s,
		color: colors.orange,
		fontFamily: "Lexend",
		fontWeight: "400",
		marginTop: Tokens.xs,
		textAlign: "center",
	},

	// Success message
	successText: {
		fontSize: Tokens.s,
		color: colors.green,
		fontFamily: "Lexend",
		fontWeight: "400",
		marginTop: Tokens.xs,
		textAlign: "center",
	},

	// Header completion counter
	completionCounter: {
		fontSize: Tokens.m,
		color: colors.text,
		fontFamily: "Lexend",
		textAlign: "center",
		marginBottom: Tokens.l,
	},

	// Section divider
	divider: {
		height: 1,
		backgroundColor: colors.border,
		marginVertical: Tokens.l,
	},
});

export { colors };
