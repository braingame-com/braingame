/**
 * Font family configuration for BrainGame
 * Uses variable fonts for optimal performance and flexibility
 *
 * Usage:
 * - fontFamily: Fonts.primary with fontWeight for different weights
 * - fontFamily: Fonts.mono for monospace text
 */
export const Fonts = {
	// Primary font family (Lexend variable font)
	primary: "Lexend",

	// Monospace font family (Roboto Mono variable font)
	mono: "Roboto Mono",

	// Font weights (for use with variable fonts)
	weights: {
		light: "300",
		regular: "400",
		medium: "500",
		semiBold: "600",
		bold: "700",
	} as const,
};
