import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between",
	},

	brandSection: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 60,
	},

	logo: {
		fontSize: 80,
		marginBottom: 20,
	},

	brandName: {
		fontSize: 36,
		fontWeight: "700",
		fontFamily: "LexendBold",
		color: "#1a1a1a",
		marginBottom: 12,
	},

	tagline: {
		fontSize: 16,
		color: "#666",
		fontFamily: "LexendRegular",
		textAlign: "center",
		paddingHorizontal: 40,
		lineHeight: 24,
	},

	buttonSection: {
		paddingBottom: 20,
	},

	button: {
		height: 56,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
	},

	primaryButton: {
		backgroundColor: "#007fff",
	},

	primaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "LexendSemiBold",
	},

	secondaryButton: {
		backgroundColor: "#f0f0f0",
	},

	secondaryButtonText: {
		color: "#1a1a1a",
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "LexendSemiBold",
	},

	skipButton: {
		marginTop: 8,
		paddingVertical: 12,
		alignItems: "center",
	},

	skipButtonText: {
		color: "#007fff",
		fontSize: 14,
		fontFamily: "LexendRegular",
	},

	footer: {
		paddingBottom: 20,
		paddingTop: 20,
	},

	footerText: {
		fontSize: 12,
		color: "#999",
		fontFamily: "LexendRegular",
		textAlign: "center",
		lineHeight: 18,
	},

	footerLink: {
		color: "#007fff",
		textDecorationLine: "underline",
	},

	// Form styles for login/register screens
	formContainer: {
		flex: 1,
		paddingTop: 40,
	},

	formTitle: {
		fontSize: 28,
		fontWeight: "700",
		fontFamily: "LexendBold",
		color: "#1a1a1a",
		marginBottom: 8,
	},

	formSubtitle: {
		fontSize: 16,
		color: "#666",
		fontFamily: "LexendRegular",
		marginBottom: 32,
	},

	inputContainer: {
		marginBottom: 16,
	},

	inputLabel: {
		fontSize: 14,
		fontWeight: "500",
		fontFamily: "LexendMedium",
		color: "#1a1a1a",
		marginBottom: 8,
	},

	input: {
		height: 48,
		borderWidth: 1,
		borderColor: "#e1e1e1",
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		fontFamily: "LexendRegular",
		color: "#1a1a1a",
	},

	inputFocused: {
		borderColor: "#007fff",
	},

	inputError: {
		borderColor: "#ff3b30",
	},

	errorText: {
		fontSize: 12,
		color: "#ff3b30",
		fontFamily: "LexendRegular",
		marginTop: 4,
	},

	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 24,
	},

	forgotPasswordText: {
		fontSize: 14,
		color: "#007fff",
		fontFamily: "LexendRegular",
	},

	divider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
	},

	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#e1e1e1",
	},

	dividerText: {
		marginHorizontal: 16,
		fontSize: 14,
		color: "#999",
		fontFamily: "LexendRegular",
	},

	socialButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 48,
		borderWidth: 1,
		borderColor: "#e1e1e1",
		borderRadius: 8,
		marginBottom: 12,
	},

	socialIcon: {
		fontSize: 20,
		marginRight: 12,
	},

	socialButtonText: {
		fontSize: 14,
		fontFamily: "LexendRegular",
		color: "#1a1a1a",
	},
});
