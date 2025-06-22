/**
 * Comprehensive theme color constants
 * This file consolidates all color values used throughout the application
 * to ensure consistency and make theme changes easier.
 */

// Brand Colors
export const BrandColors = {
	primary: "#007fff",
	primaryLight: "#4da3ff",
	primaryDark: "#0059b3",
	primaryHalfFaded: "rgba(59, 115, 245, .4)",
	primaryFaded: "rgba(59, 115, 245, .2)",
} as const;

// Neutral Colors
export const NeutralColors = {
	// Pure neutrals
	white: "#ffffff",
	black: "#000000",

	// Gray scale - Light theme
	gray50: "#f8f9fa",
	gray100: "#f5f5f5",
	gray200: "#e9ecef",
	gray300: "#e1e1e1",
	gray400: "#dee2e6",
	gray500: "#adb5bd",
	gray600: "#6c757d",
	gray700: "#495057",
	gray800: "#343a40",
	gray900: "#212529",

	// Gray scale - Dark theme
	darkGray50: "#505060",
	darkGray100: "#444444",
	darkGray200: "#3A3A3A",
	darkGray300: "#2d2d2d",
	darkGray400: "#202030",
	darkGray500: "#202020",
	darkGray600: "#1e1e1e",
	darkGray700: "#1a1a1a",
	darkGray800: "#151718",
	darkGray900: "#121212",
	darkGray950: "#101020",
} as const;

// Semantic Colors
export const SemanticColors = {
	// Success
	success: "#28a745",
	successLight: "#52c41a",
	successDark: "#00a550",
	successHalfFaded: "rgba(39, 173, 117, .4)",
	successFaded: "rgba(39, 173, 117, .2)",

	// Warning
	warning: "#ffc107",
	warningLight: "#faad14",
	warningDark: "#ff9800",
	warnHalfFaded: "rgba(233, 179, 0, .4)",
	warnFaded: "rgba(233, 179, 0, .2)",

	// Error
	error: "#dc3545",
	errorLight: "#ff4d4f",
	errorDark: "#ff3b30",
	negativeHalfFaded: "rgba(240, 97, 109, .4)",
	negativeFaded: "rgba(240, 97, 109, .2)",

	// Info
	info: "#17a2b8",
	infoLight: "#1890ff",
	infoDark: "#0091ea",
} as const;

// Theme Accent Colors
export const AccentColors = {
	// Blues
	blue: "#007fff",
	blueLight: "#4da3ff",
	blueDark: "#0059b3",
	oceanBlue: "#006994",
	skyBlue: "#0a7ea4",

	// Purples
	purple: "#7c3aed",
	purpleLight: "#b47cff",
	purpleDark: "#7712fa",
	midnightPurple: "#3f51b5",

	// Oranges
	orange: "#ff6d00",
	orangeLight: "#ff9e40",
	orangeDark: "#c43e00",

	// Greens
	green: "#2e7d32",
	greenLight: "#60ad5e",
	greenDark: "#005005",
	forestGreen: "#558b2f",

	// Reds/Pinks
	red: "#ff6b6b",
	redLight: "#ff9999",
	redDark: "#cc5555",
	pink: "#e91e63",
} as const;

// Special Effect Colors
export const EffectColors = {
	// Shadows
	shadow: "#000000",
	shadowLight: "rgba(0, 0, 0, 0.08)",
	shadowMedium: "rgba(0, 0, 0, 0.2)",
	shadowDark: "rgba(0, 0, 0, 0.33)",

	// Overlays
	overlayLight: "rgba(255, 255, 255, 0.05)",
	overlayMedium: "rgba(255, 255, 255, 0.1)",
	overlayDark: "rgba(0, 0, 0, 0.5)",

	// Borders
	borderLight: "rgb(239, 243, 244)",
	borderDark: "rgb(47, 51, 54)",

	// Special effects
	errorOverlay: "rgba(255, 0, 0, 0.1)",
	hoverWhite: "rgba(255, 255, 255, 0.05)",
} as const;

// Text Colors
export const TextColors = {
	// Light theme
	lightPrimary: "#11181C",
	lightSecondary: "#5B656B",
	lightTertiary: "#666",
	lightDisabled: "#aaa",

	// Dark theme
	darkPrimary: "#ECEDEE",
	darkSecondary: "#A9ADB0",
	darkTertiary: "#adb5bd",
	darkDisabled: "#6c757d",

	// Special
	onPrimary: "#ffffff",
	onDark: "#ffffff",
	onLight: "#000000",
} as const;

// Component-specific Colors
export const ComponentColors = {
	// Navigation
	tabIconDefault: "#687076",
	tabIconDefaultDark: "#9BA1A6",
	headerTint: "#007fff",

	// Buttons
	buttonLight: "#F0F0F0",
	buttonLightHovered: "#E6E6E6",
	buttonDark: "#3A3A3A",
	buttonDarkHovered: "#444444",

	// Cards
	cardLight: "#fff",
	cardDark: "#202020",

	// Inputs
	inputBorder: "#e1e1e1",
	inputBorderDark: "#343a40",
	inputBackground: "#ffffff",
	inputBackgroundDark: "#1e1e1e",
} as const;

// Consolidated Theme Colors Export
export const ThemeColors = {
	brand: BrandColors,
	neutral: NeutralColors,
	semantic: SemanticColors,
	accent: AccentColors,
	effect: EffectColors,
	text: TextColors,
	component: ComponentColors,
} as const;

// Type exports for TypeScript support
export type BrandColor = keyof typeof BrandColors;
export type NeutralColor = keyof typeof NeutralColors;
export type SemanticColor = keyof typeof SemanticColors;
export type AccentColor = keyof typeof AccentColors;
export type EffectColor = keyof typeof EffectColors;
export type TextColor = keyof typeof TextColors;
export type ComponentColor = keyof typeof ComponentColors;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number): string => {
	// Handle hex colors
	if (color.startsWith("#")) {
		const hex = color.replace("#", "");
		const r = Number.parseInt(hex.substring(0, 2), 16);
		const g = Number.parseInt(hex.substring(2, 4), 16);
		const b = Number.parseInt(hex.substring(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}
	// Handle rgb colors
	if (color.startsWith("rgb(")) {
		return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
	}
	// Already rgba, replace opacity
	if (color.startsWith("rgba(")) {
		return color.replace(/,\s*[\d.]+\)/, `, ${opacity})`);
	}
	return color;
};
