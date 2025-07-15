import { Tokens } from "@braingame/utils";
import type { M3ColorScheme } from "../../theme";

/**
 * Get error UI styles for ErrorBoundary
 */
export const getErrorStyles = (colors: M3ColorScheme) => ({
	/**
	 * Default error UI styles for ErrorBoundary
	 */
	errorContainerStyle: {
		padding: Tokens.l,
		backgroundColor: colors.errorContainer,
		borderRadius: Tokens.s,
		borderWidth: 1,
		borderColor: colors.error,
	},

	/**
	 * Error title text styles
	 */
	errorTitleStyle: {
		color: colors.onErrorContainer,
		fontWeight: "bold" as const,
		marginBottom: Tokens.s,
	},

	/**
	 * Error message text styles
	 */
	errorMessageStyle: {
		color: colors.onErrorContainer,
		fontSize: Tokens.s,
	},
});
