/**
 * Default error UI styles for ErrorBoundary
 */
export const errorContainerStyle = {
	padding: 20,
	backgroundColor: "#fee",
	borderRadius: 8,
	borderWidth: 1,
	borderColor: "#fcc",
};

/**
 * Error title text styles
 */
export const errorTitleStyle = {
	color: "#c00",
	fontWeight: "bold" as const,
	marginBottom: 8,
};

/**
 * Error message text styles
 */
export const errorMessageStyle = {
	color: "#600",
	fontSize: 12,
};
