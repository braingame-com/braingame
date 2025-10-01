import type { Theme, ThemeTokens } from "./types";

/**
 * createTheme
 *
 * Generates the runtime theme object from raw design tokens. This mirrors the
 * current Restyle theme shape so existing imports continue to work, but does so
 * without depending on Restyle.
 */
export function createTheme(tokens: ThemeTokens): Theme {
	return {
		colors: tokens.colors,
		spacing: tokens.spacing,
		borderRadii: tokens.borderRadii,
		radii: tokens.borderRadii,
		textVariants: tokens.textVariants,
		shadows: tokens.shadows,
		breakpoints: tokens.breakpoints,
		fontSizes: tokens.fontSizes,
		fontWeights: tokens.fontWeights,
		lineHeights: tokens.lineHeights,
		components: tokens.components,
	};
}
