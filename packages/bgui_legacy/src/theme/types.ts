/**
 * Material 3 Color Scheme Types
 * Based on the bgui-theme.json structure
 */

export interface M3ColorScheme {
	// Core colors
	primary: string;
	surfaceTint: string;
	onPrimary: string;
	primaryContainer: string;
	onPrimaryContainer: string;
	secondary: string;
	onSecondary: string;
	secondaryContainer: string;
	onSecondaryContainer: string;
	tertiary: string;
	onTertiary: string;
	tertiaryContainer: string;
	onTertiaryContainer: string;

	// Semantic colors
	error: string;
	onError: string;
	errorContainer: string;
	onErrorContainer: string;
	success: string;
	onSuccess: string;
	successContainer: string;
	onSuccessContainer: string;
	warning: string;
	onWarning: string;
	warningContainer: string;
	onWarningContainer: string;
	info: string;
	onInfo: string;
	infoContainer: string;
	onInfoContainer: string;

	// Surface colors
	background: string;
	onBackground: string;
	surface: string;
	onSurface: string;
	surfaceVariant: string;
	onSurfaceVariant: string;
	inverseSurface: string;
	inverseOnSurface: string;
	inversePrimary: string;

	// Surface container variations
	surfaceDim: string;
	surfaceBright: string;
	surfaceContainerLowest: string;
	surfaceContainerLow: string;
	surfaceContainer: string;
	surfaceContainerHigh: string;
	surfaceContainerHighest: string;

	// Fixed colors
	primaryFixed: string;
	onPrimaryFixed: string;
	primaryFixedDim: string;
	onPrimaryFixedVariant: string;
	secondaryFixed: string;
	onSecondaryFixed: string;
	secondaryFixedDim: string;
	onSecondaryFixedVariant: string;
	tertiaryFixed: string;
	onTertiaryFixed: string;
	tertiaryFixedDim: string;
	onTertiaryFixedVariant: string;

	// Outline colors
	outline: string;
	outlineVariant: string;

	// Other
	shadow: string;
	scrim: string;
}

export type ColorMode = "light" | "dark";
export type ContrastMode = "standard" | "medium" | "high";

export interface ThemeContextValue {
	colors: M3ColorScheme;
	mode: ColorMode;
	setMode: (mode: ColorMode | "system") => void;
	contrast: ContrastMode;
	setContrast: (contrast: ContrastMode) => void;
}
