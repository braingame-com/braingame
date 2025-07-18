import { createTheme } from "@shopify/restyle";
import m3Theme from "./m3-theme.json";
import { generateComponentVariants } from "./variants";

/**
 * BGUI Restyle Theme
 *
 * This theme merges:
 * 1. Material 3 colors from m3-theme.json (primary source of truth)
 * 2. Joy UI design tokens (spacing, typography, radii, etc.)
 * 3. Component variants mapping Joy UI patterns
 */

// Extract light theme colors from M3
const lightColors = m3Theme.schemes.light;
const darkColors = m3Theme.schemes.dark;

// Joy UI spacing scale (in pixels)
const spacing = {
	none: 0,
	xs: 4, // 0.25rem
	sm: 8, // 0.5rem
	md: 12, // 0.75rem
	lg: 16, // 1rem
	xl: 24, // 1.5rem
	xl2: 32, // 2rem
	xl3: 40, // 2.5rem
	xl4: 48, // 3rem
} as const;

// Joy UI radius scale
const radii = {
	none: 0,
	xs: 2,
	sm: 6,
	md: 8,
	lg: 12,
	xl: 16,
} as const;

// Typography scale based on Joy UI
const fontSizes = {
	xs: 12, // 0.75rem
	sm: 14, // 0.875rem
	md: 16, // 1rem (base)
	lg: 18, // 1.125rem
	xl: 20, // 1.25rem
	xl2: 24, // 1.5rem
	xl3: 30, // 1.875rem
	xl4: 36, // 2.25rem
	xl5: 48, // 3rem
	xl6: 60, // 3.75rem
	xl7: 72, // 4.5rem
} as const;

const fontWeights = {
	sm: "300", // light
	md: "400", // regular
	lg: "500", // medium
	xl: "700", // bold
} as const;

const lineHeights = {
	xs: 1.33,
	sm: 1.43,
	md: 1.5,
	lg: 1.55,
	xl: 1.63,
} as const;

// Joy UI shadow scale
const shadows = {
	xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
	sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
	md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
	lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
	xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
} as const;

// Create base theme
const theme = createTheme({
	colors: {
		// Core M3 colors
		primary: lightColors.primary,
		onPrimary: lightColors.onPrimary,
		primaryContainer: lightColors.primaryContainer,
		onPrimaryContainer: lightColors.onPrimaryContainer,

		secondary: lightColors.secondary,
		onSecondary: lightColors.onSecondary,
		secondaryContainer: lightColors.secondaryContainer,
		onSecondaryContainer: lightColors.onSecondaryContainer,

		tertiary: lightColors.tertiary,
		onTertiary: lightColors.onTertiary,
		tertiaryContainer: lightColors.tertiaryContainer,
		onTertiaryContainer: lightColors.onTertiaryContainer,

		// Semantic colors
		error: lightColors.error,
		onError: lightColors.onError,
		errorContainer: lightColors.errorContainer,
		onErrorContainer: lightColors.onErrorContainer,

		success: lightColors.success,
		onSuccess: lightColors.onSuccess,
		successContainer: lightColors.successContainer,
		onSuccessContainer: lightColors.onSuccessContainer,

		warning: lightColors.warning,
		onWarning: lightColors.onWarning,
		warningContainer: lightColors.warningContainer,
		onWarningContainer: lightColors.onWarningContainer,

		info: lightColors.info,
		onInfo: lightColors.onInfo,
		infoContainer: lightColors.infoContainer,
		onInfoContainer: lightColors.onInfoContainer,

		// Surface colors
		background: lightColors.background,
		onBackground: lightColors.onBackground,
		surface: lightColors.surface,
		onSurface: lightColors.onSurface,
		surfaceVariant: lightColors.surfaceVariant,
		onSurfaceVariant: lightColors.onSurfaceVariant,

		// Additional M3 colors
		outline: lightColors.outline,
		outlineVariant: lightColors.outlineVariant,
		inverseSurface: lightColors.inverseSurface,
		inverseOnSurface: lightColors.inverseOnSurface,
		inversePrimary: lightColors.inversePrimary,

		// Map Joy UI color names to M3
		neutral: lightColors.surface,
		danger: lightColors.error,
	},

	spacing,

	borderRadii: radii,

	textVariants: {
		// Display variants (Joy UI typography scale)
		h1: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.xl,
			fontSize: fontSizes.xl5,
			lineHeight: lineHeights.xs,
			color: "onSurface",
		},
		h2: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.xl,
			fontSize: fontSizes.xl4,
			lineHeight: lineHeights.xs,
			color: "onSurface",
		},
		h3: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.lg,
			fontSize: fontSizes.xl3,
			lineHeight: lineHeights.xs,
			color: "onSurface",
		},
		h4: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.lg,
			fontSize: fontSizes.xl2,
			lineHeight: lineHeights.sm,
			color: "onSurface",
		},

		// Body variants
		body1: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.md,
			lineHeight: lineHeights.md,
			color: "onSurface",
		},
		body2: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.sm,
			lineHeight: lineHeights.md,
			color: "onSurface",
		},
		body3: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.xs,
			lineHeight: lineHeights.md,
			color: "onSurface",
		},

		// UI variants
		button: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.lg,
			fontSize: fontSizes.sm,
			lineHeight: lineHeights.md,
			color: "onPrimary",
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},
		caption: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.xs,
			lineHeight: lineHeights.sm,
			color: "onSurfaceVariant",
		},
		overline: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.lg,
			fontSize: fontSizes.xs,
			lineHeight: lineHeights.md,
			color: "onSurfaceVariant",
			textTransform: "uppercase" as const,
			letterSpacing: 1,
		},

		// Code variant
		code: {
			fontFamily: "Roboto Mono",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.sm,
			lineHeight: lineHeights.md,
			color: "onSurface",
		},

		// Defaults
		defaults: {
			fontFamily: "Lexend",
			fontWeight: fontWeights.md,
			fontSize: fontSizes.md,
			lineHeight: lineHeights.md,
			color: "onSurface",
		},
	},

	// Component variants mapping Joy UI patterns
	components: {
		Button: {
			variants: {
				solid: {
					primary: {
						backgroundColor: "primary",
						color: "onPrimary",
					},
					neutral: {
						backgroundColor: "surface",
						color: "onSurface",
					},
					danger: {
						backgroundColor: "error",
						color: "onError",
					},
					success: {
						backgroundColor: "success",
						color: "onSuccess",
					},
					warning: {
						backgroundColor: "warning",
						color: "onWarning",
					},
				},
				soft: {
					primary: {
						backgroundColor: "primaryContainer",
						color: "onPrimaryContainer",
					},
					neutral: {
						backgroundColor: "surfaceVariant",
						color: "onSurfaceVariant",
					},
					danger: {
						backgroundColor: "errorContainer",
						color: "onErrorContainer",
					},
					success: {
						backgroundColor: "successContainer",
						color: "onSuccessContainer",
					},
					warning: {
						backgroundColor: "warningContainer",
						color: "onWarningContainer",
					},
				},
				outlined: {
					primary: {
						backgroundColor: "transparent" as const,
						borderColor: "primary",
						borderWidth: 1,
						color: "primary",
					},
					neutral: {
						backgroundColor: "transparent" as const,
						borderColor: "outline",
						borderWidth: 1,
						color: "onSurface",
					},
					danger: {
						backgroundColor: "transparent" as const,
						borderColor: "error",
						borderWidth: 1,
						color: "error",
					},
					success: {
						backgroundColor: "transparent" as const,
						borderColor: "success",
						borderWidth: 1,
						color: "success",
					},
					warning: {
						backgroundColor: "transparent" as const,
						borderColor: "warning",
						borderWidth: 1,
						color: "warning",
					},
				},
				plain: {
					primary: {
						backgroundColor: "transparent" as const,
						color: "primary",
					},
					neutral: {
						backgroundColor: "transparent" as const,
						color: "onSurface",
					},
					danger: {
						backgroundColor: "transparent" as const,
						color: "error",
					},
					success: {
						backgroundColor: "transparent" as const,
						color: "success",
					},
					warning: {
						backgroundColor: "transparent" as const,
						color: "warning",
					},
				},
			},
			sizes: {
				sm: {
					paddingHorizontal: "sm",
					paddingVertical: "xs",
					minHeight: 32,
				},
				md: {
					paddingHorizontal: "md",
					paddingVertical: "sm",
					minHeight: 40,
				},
				lg: {
					paddingHorizontal: "lg",
					paddingVertical: "md",
					minHeight: 48,
				},
			},
		},
		Card: {
			variants: {
				"plain-primary": {
					backgroundColor: "transparent" as const,
					color: "primary",
				},
				"plain-neutral": {
					backgroundColor: "transparent" as const,
					color: "onSurface",
				},
				"plain-danger": {
					backgroundColor: "transparent" as const,
					color: "error",
				},
				"plain-success": {
					backgroundColor: "transparent" as const,
					color: "success",
				},
				"plain-warning": {
					backgroundColor: "transparent" as const,
					color: "warning",
				},
				"outlined-primary": {
					backgroundColor: "surface",
					borderColor: "primary",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-neutral": {
					backgroundColor: "surface",
					borderColor: "outline",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-danger": {
					backgroundColor: "surface",
					borderColor: "error",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-success": {
					backgroundColor: "surface",
					borderColor: "success",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-warning": {
					backgroundColor: "surface",
					borderColor: "warning",
					borderWidth: 1,
					color: "onSurface",
				},
				"soft-primary": {
					backgroundColor: "primaryContainer",
					color: "onPrimaryContainer",
				},
				"soft-neutral": {
					backgroundColor: "surfaceVariant",
					color: "onSurfaceVariant",
				},
				"soft-danger": {
					backgroundColor: "errorContainer",
					color: "onErrorContainer",
				},
				"soft-success": {
					backgroundColor: "successContainer",
					color: "onSuccessContainer",
				},
				"soft-warning": {
					backgroundColor: "warningContainer",
					color: "onWarningContainer",
				},
				"solid-primary": {
					backgroundColor: "primary",
					color: "onPrimary",
				},
				"solid-neutral": {
					backgroundColor: "surface",
					color: "onSurface",
				},
				"solid-danger": {
					backgroundColor: "error",
					color: "onError",
				},
				"solid-success": {
					backgroundColor: "success",
					color: "onSuccess",
				},
				"solid-warning": {
					backgroundColor: "warning",
					color: "onWarning",
				},
			},
		},
		Avatar: {
			variants: {
				"plain-primary": {
					backgroundColor: "transparent" as const,
					color: "primary",
				},
				"plain-neutral": {
					backgroundColor: "transparent" as const,
					color: "onSurface",
				},
				"plain-danger": {
					backgroundColor: "transparent" as const,
					color: "error",
				},
				"plain-success": {
					backgroundColor: "transparent" as const,
					color: "success",
				},
				"plain-warning": {
					backgroundColor: "transparent" as const,
					color: "warning",
				},
				"outlined-primary": {
					backgroundColor: "surface",
					borderColor: "primary",
					borderWidth: 1,
					color: "primary",
				},
				"outlined-neutral": {
					backgroundColor: "surface",
					borderColor: "outline",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-danger": {
					backgroundColor: "surface",
					borderColor: "error",
					borderWidth: 1,
					color: "error",
				},
				"outlined-success": {
					backgroundColor: "surface",
					borderColor: "success",
					borderWidth: 1,
					color: "success",
				},
				"outlined-warning": {
					backgroundColor: "surface",
					borderColor: "warning",
					borderWidth: 1,
					color: "warning",
				},
				"soft-primary": {
					backgroundColor: "primaryContainer",
					color: "onPrimaryContainer",
				},
				"soft-neutral": {
					backgroundColor: "surfaceVariant",
					color: "onSurfaceVariant",
				},
				"soft-danger": {
					backgroundColor: "errorContainer",
					color: "onErrorContainer",
				},
				"soft-success": {
					backgroundColor: "successContainer",
					color: "onSuccessContainer",
				},
				"soft-warning": {
					backgroundColor: "warningContainer",
					color: "onWarningContainer",
				},
				"solid-primary": {
					backgroundColor: "primary",
					color: "onPrimary",
				},
				"solid-neutral": {
					backgroundColor: "surface",
					color: "onSurface",
				},
				"solid-danger": {
					backgroundColor: "error",
					color: "onError",
				},
				"solid-success": {
					backgroundColor: "success",
					color: "onSuccess",
				},
				"solid-warning": {
					backgroundColor: "warning",
					color: "onWarning",
				},
			},
		},
		Badge: {
			variants: {
				"plain-primary": {
					backgroundColor: "transparent" as const,
					color: "primary",
				},
				"plain-neutral": {
					backgroundColor: "transparent" as const,
					color: "onSurface",
				},
				"plain-danger": {
					backgroundColor: "transparent" as const,
					color: "error",
				},
				"plain-success": {
					backgroundColor: "transparent" as const,
					color: "success",
				},
				"plain-warning": {
					backgroundColor: "transparent" as const,
					color: "warning",
				},
				"outlined-primary": {
					backgroundColor: "surface",
					borderColor: "primary",
					borderWidth: 1,
					color: "primary",
				},
				"outlined-neutral": {
					backgroundColor: "surface",
					borderColor: "outline",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-danger": {
					backgroundColor: "surface",
					borderColor: "error",
					borderWidth: 1,
					color: "error",
				},
				"outlined-success": {
					backgroundColor: "surface",
					borderColor: "success",
					borderWidth: 1,
					color: "success",
				},
				"outlined-warning": {
					backgroundColor: "surface",
					borderColor: "warning",
					borderWidth: 1,
					color: "warning",
				},
				"soft-primary": {
					backgroundColor: "primaryContainer",
					color: "onPrimaryContainer",
				},
				"soft-neutral": {
					backgroundColor: "surfaceVariant",
					color: "onSurfaceVariant",
				},
				"soft-danger": {
					backgroundColor: "errorContainer",
					color: "onErrorContainer",
				},
				"soft-success": {
					backgroundColor: "successContainer",
					color: "onSuccessContainer",
				},
				"soft-warning": {
					backgroundColor: "warningContainer",
					color: "onWarningContainer",
				},
				"solid-primary": {
					backgroundColor: "primary",
					color: "onPrimary",
				},
				"solid-neutral": {
					backgroundColor: "surface",
					color: "onSurface",
				},
				"solid-danger": {
					backgroundColor: "error",
					color: "onError",
				},
				"solid-success": {
					backgroundColor: "success",
					color: "onSuccess",
				},
				"solid-warning": {
					backgroundColor: "warning",
					color: "onWarning",
				},
			},
		},
		Chip: {
			variants: {
				"plain-primary": {
					backgroundColor: "transparent" as const,
					color: "primary",
				},
				"plain-neutral": {
					backgroundColor: "transparent" as const,
					color: "onSurface",
				},
				"plain-danger": {
					backgroundColor: "transparent" as const,
					color: "error",
				},
				"plain-success": {
					backgroundColor: "transparent" as const,
					color: "success",
				},
				"plain-warning": {
					backgroundColor: "transparent" as const,
					color: "warning",
				},
				"outlined-primary": {
					backgroundColor: "surface",
					borderColor: "primary",
					borderWidth: 1,
					color: "primary",
				},
				"outlined-neutral": {
					backgroundColor: "surface",
					borderColor: "outline",
					borderWidth: 1,
					color: "onSurface",
				},
				"outlined-danger": {
					backgroundColor: "surface",
					borderColor: "error",
					borderWidth: 1,
					color: "error",
				},
				"outlined-success": {
					backgroundColor: "surface",
					borderColor: "success",
					borderWidth: 1,
					color: "success",
				},
				"outlined-warning": {
					backgroundColor: "surface",
					borderColor: "warning",
					borderWidth: 1,
					color: "warning",
				},
				"soft-primary": {
					backgroundColor: "primaryContainer",
					color: "onPrimaryContainer",
				},
				"soft-neutral": {
					backgroundColor: "surfaceVariant",
					color: "onSurfaceVariant",
				},
				"soft-danger": {
					backgroundColor: "errorContainer",
					color: "onErrorContainer",
				},
				"soft-success": {
					backgroundColor: "successContainer",
					color: "onSuccessContainer",
				},
				"soft-warning": {
					backgroundColor: "warningContainer",
					color: "onWarningContainer",
				},
				"solid-primary": {
					backgroundColor: "primary",
					color: "onPrimary",
				},
				"solid-neutral": {
					backgroundColor: "surface",
					color: "onSurface",
				},
				"solid-danger": {
					backgroundColor: "error",
					color: "onError",
				},
				"solid-success": {
					backgroundColor: "success",
					color: "onSuccess",
				},
				"solid-warning": {
					backgroundColor: "warning",
					color: "onWarning",
				},
			},
		},
		Alert: {
			variants: generateComponentVariants(),
		},
		Checkbox: {
			variants: generateComponentVariants(),
		},
		Radio: {
			variants: generateComponentVariants(),
		},
		RadioGroup: {
			variants: generateComponentVariants(),
		},
		Switch: {
			variants: generateComponentVariants(),
		},
		Input: {
			variants: generateComponentVariants(),
		},
		Textarea: {
			variants: generateComponentVariants(),
		},
		Select: {
			variants: generateComponentVariants(),
		},
		CircularProgress: {
			variants: generateComponentVariants(),
		},
		LinearProgress: {
			variants: generateComponentVariants(),
		},
		Skeleton: {
			variants: generateComponentVariants(),
		},
		Link: {
			variants: generateComponentVariants(),
		},
		Tabs: {
			variants: generateComponentVariants(),
		},
		TabList: {
			variants: generateComponentVariants(),
		},
		Tab: {
			variants: generateComponentVariants(),
		},
		TabPanel: {
			variants: generateComponentVariants(),
		},
		Typography: {
			variants: generateComponentVariants(),
		},
		List: {
			variants: generateComponentVariants(),
		},
		ListItem: {
			variants: generateComponentVariants(),
		},
		Grid: {
			variants: generateComponentVariants(),
		},
		Tooltip: {
			variants: generateComponentVariants(),
		},
		Modal: {
			variants: generateComponentVariants(),
		},
		IconButton: {
			variants: generateComponentVariants(),
		},
	},

	breakpoints: {
		xs: 0,
		sm: 480,
		md: 768,
		lg: 1024,
		xl: 1280,
	},

	// Export fontSizes, fontWeights, shadows, and radii at top level for component access
	fontSizes,
	fontWeights,
	shadows,
	radii,
});

export type Theme = typeof theme;

// Dark theme variant
export const darkTheme: Theme = {
	...theme,
	colors: {
		// Core M3 colors (dark)
		primary: darkColors.primary,
		onPrimary: darkColors.onPrimary,
		primaryContainer: darkColors.primaryContainer,
		onPrimaryContainer: darkColors.onPrimaryContainer,

		secondary: darkColors.secondary,
		onSecondary: darkColors.onSecondary,
		secondaryContainer: darkColors.secondaryContainer,
		onSecondaryContainer: darkColors.onSecondaryContainer,

		tertiary: darkColors.tertiary,
		onTertiary: darkColors.onTertiary,
		tertiaryContainer: darkColors.tertiaryContainer,
		onTertiaryContainer: darkColors.onTertiaryContainer,

		// Semantic colors (dark)
		error: darkColors.error,
		onError: darkColors.onError,
		errorContainer: darkColors.errorContainer,
		onErrorContainer: darkColors.onErrorContainer,

		success: darkColors.success,
		onSuccess: darkColors.onSuccess,
		successContainer: darkColors.successContainer,
		onSuccessContainer: darkColors.onSuccessContainer,

		warning: darkColors.warning,
		onWarning: darkColors.onWarning,
		warningContainer: darkColors.warningContainer,
		onWarningContainer: darkColors.onWarningContainer,

		info: darkColors.info,
		onInfo: darkColors.onInfo,
		infoContainer: darkColors.infoContainer,
		onInfoContainer: darkColors.onInfoContainer,

		// Surface colors (dark)
		background: darkColors.background,
		onBackground: darkColors.onBackground,
		surface: darkColors.surface,
		onSurface: darkColors.onSurface,
		surfaceVariant: darkColors.surfaceVariant,
		onSurfaceVariant: darkColors.onSurfaceVariant,

		// Additional M3 colors (dark)
		outline: darkColors.outline,
		outlineVariant: darkColors.outlineVariant,
		inverseSurface: darkColors.inverseSurface,
		inverseOnSurface: darkColors.inverseOnSurface,
		inversePrimary: darkColors.inversePrimary,

		// Map Joy UI color names to M3 (dark)
		neutral: darkColors.surface,
		danger: darkColors.error,
	},
};

export default theme;
