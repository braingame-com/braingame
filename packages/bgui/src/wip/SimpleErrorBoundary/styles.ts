import { Colors, Tokens } from "@braingame/utils";

/**
 * Default error UI styles for ErrorBoundary
 */
export const errorContainerStyle = {
	padding: Tokens.l,
	backgroundColor: Colors.universal.negativeFaded,
	borderRadius: Tokens.s,
	borderWidth: 1,
	borderColor: Colors.universal.negative,
};

/**
 * Error title text styles
 */
export const errorTitleStyle = {
	color: Colors.universal.negative,
	fontWeight: "bold" as const,
	marginBottom: Tokens.s,
};

/**
 * Error message text styles
 */
export const errorMessageStyle = {
	color: Colors.universal.negative,
	fontSize: Tokens.s,
};
