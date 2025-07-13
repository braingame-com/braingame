export interface ColorScheme {
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
	error: string;
	onError: string;
	errorContainer: string;
	onErrorContainer: string;
	background: string;
	onBackground: string;
	surface: string;
	onSurface: string;
	surfaceVariant: string;
	onSurfaceVariant: string;
	outline: string;
	outlineVariant: string;
	shadow: string;
	scrim: string;
	inverseSurface: string;
	inverseOnSurface: string;
	inversePrimary: string;
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
	surfaceDim: string;
	surfaceBright: string;
	surfaceContainerLowest: string;
	surfaceContainerLow: string;
	surfaceContainer: string;
	surfaceContainerHigh: string;
	surfaceContainerHighest: string;
}

export interface ExtendedColorScheme extends ColorScheme {
	// Additional semantic colors
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

	// Interactive states
	hover: string;
	pressed: string;
	focus: string;
	disabled: string;
	disabledContainer: string;
	onDisabled: string;

	// Special UI colors
	link: string;
	linkVisited: string;
	linkHover: string;
	linkActive: string;
	divider: string;
	backdrop: string;
	skeleton: string;
	skeletonHighlight: string;
	tooltip: string;
	onTooltip: string;

	// Chart colors (for data visualization)
	chart1: string;
	chart2: string;
	chart3: string;
	chart4: string;
	chart5: string;
	chart6: string;
	chart7: string;
	chart8: string;
}

export interface ColorPalette {
	0: string;
	5: string;
	10: string;
	15: string;
	20: string;
	25: string;
	30: string;
	35: string;
	40: string;
	50: string;
	60: string;
	70: string;
	80: string;
	90: string;
	95: string;
	98: string;
	99: string;
	100: string;
}

export interface ThemeConfig {
	seed: string;
	coreColors: {
		primary: string;
	};
	schemes: {
		light: ExtendedColorScheme;
		"light-medium-contrast": ExtendedColorScheme;
		"light-high-contrast": ExtendedColorScheme;
		dark: ExtendedColorScheme;
		"dark-medium-contrast": ExtendedColorScheme;
		"dark-high-contrast": ExtendedColorScheme;
	};
	palettes: {
		primary: ColorPalette;
		secondary: ColorPalette;
		tertiary: ColorPalette;
		neutral: ColorPalette;
		"neutral-variant": ColorPalette;
		success: ColorPalette;
		warning: ColorPalette;
		info: ColorPalette;
	};
}

export type ThemeMode = keyof ThemeConfig["schemes"];
export type ColorRole = keyof ExtendedColorScheme;
export type PaletteType = keyof ThemeConfig["palettes"];
