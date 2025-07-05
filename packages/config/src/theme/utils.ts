import { theme } from "./colors";
import type { ColorRole, ExtendedColorScheme, ThemeMode } from "./types";

/**
 * Get a color value from the theme
 */
export function getColor(mode: ThemeMode, role: ColorRole): string {
	return theme.schemes[mode][role];
}

/**
 * Generate CSS custom properties from a color scheme
 */
export function generateCSSVariables(
	scheme: ExtendedColorScheme,
	prefix = "--color",
): Record<string, string> {
	const variables: Record<string, string> = {};

	// Convert camelCase to kebab-case for CSS
	const toKebabCase = (str: string) =>
		str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

	for (const [key, value] of Object.entries(scheme)) {
		variables[`${prefix}-${toKebabCase(key)}`] = value;
	}

	return variables;
}

/**
 * Generate a CSS string with all theme variables
 */
export function generateCSSTheme(mode: ThemeMode = "light"): string {
	const scheme = theme.schemes[mode];
	const variables = generateCSSVariables(scheme);

	const cssLines = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`);

	return `:root {\n${cssLines.join("\n")}\n}`;
}

/**
 * Generate CSS for all theme modes
 */
export function generateAllCSSThemes(): string {
	const themes: string[] = [];

	// Generate light theme as default
	const lightVars = generateCSSVariables(theme.schemes.light);
	const lightCSS = Object.entries(lightVars)
		.map(([key, value]) => `  ${key}: ${value};`)
		.join("\n");
	themes.push(`:root {\n${lightCSS}\n}`);

	// Generate other themes with data attributes
	const otherModes: ThemeMode[] = [
		"dark",
		"light-medium-contrast",
		"light-high-contrast",
		"dark-medium-contrast",
		"dark-high-contrast",
	];

	for (const mode of otherModes) {
		const vars = generateCSSVariables(theme.schemes[mode]);
		const css = Object.entries(vars)
			.map(([key, value]) => `  ${key}: ${value};`)
			.join("\n");
		themes.push(`[data-theme="${mode}"] {\n${css}\n}`);
	}

	return themes.join("\n\n");
}

/**
 * Check if a color combination meets WCAG contrast requirements
 */
export function checkContrast(
	foreground: string,
	background: string,
	level: "AA" | "AAA" = "AA",
): boolean {
	// Convert hex to RGB
	const hexToRgb = (hex: string): [number, number, number] => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					Number.parseInt(result[1], 16),
					Number.parseInt(result[2], 16),
					Number.parseInt(result[3], 16),
				]
			: [0, 0, 0];
	};

	// Calculate relative luminance
	const getLuminance = (rgb: [number, number, number]): number => {
		const [r, g, b] = rgb.map((val) => {
			const s = val / 255;
			return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	const l1 = getLuminance(hexToRgb(foreground));
	const l2 = getLuminance(hexToRgb(background));
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	const contrast = (lighter + 0.05) / (darker + 0.05);

	// WCAG requirements: AA = 4.5:1, AAA = 7:1
	return level === "AAA" ? contrast >= 7 : contrast >= 4.5;
}

/**
 * Get a color with opacity
 */
export function withOpacity(color: string, opacity: number): string {
	// Handle hex colors
	if (color.startsWith("#")) {
		const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		if (rgb) {
			const r = Number.parseInt(rgb[1], 16);
			const g = Number.parseInt(rgb[2], 16);
			const b = Number.parseInt(rgb[3], 16);
			return `rgba(${r}, ${g}, ${b}, ${opacity})`;
		}
	}

	// Handle rgb/rgba colors
	if (color.startsWith("rgb")) {
		const match = color.match(/\d+/g);
		if (match) {
			const [r, g, b] = match;
			return `rgba(${r}, ${g}, ${b}, ${opacity})`;
		}
	}

	return color;
}

/**
 * Export theme for React Native usage
 */
export function getReactNativeTheme(mode: ThemeMode = "light") {
	return {
		colors: theme.schemes[mode],
		// Add any React Native specific properties here
	};
}

/**
 * Get all available theme modes
 */
export function getThemeModes(): ThemeMode[] {
	return Object.keys(theme.schemes) as ThemeMode[];
}

/**
 * Check if a theme mode supports high contrast
 */
export function isHighContrast(mode: ThemeMode): boolean {
	return mode.includes("high-contrast");
}

/**
 * Check if a theme mode is dark
 */
export function isDarkMode(mode: ThemeMode): boolean {
	return mode.startsWith("dark");
}
