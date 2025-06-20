import { Platform } from "react-native";
import { Animation } from "./Animation";
import { BorderRadius } from "./BorderRadius";
import { Colors } from "./Colors";
import { Shadows } from "./Shadows";
import { Tokens } from "./Tokens";
import { Typography } from "./Typography";
import type { ColorToken, PlatformTokens, SpacingToken } from "./types";

/**
 * Get platform-specific token value
 * Allows for different values on iOS, Android, and Web
 */
export function getPlatformToken<T>(tokens: PlatformTokens<T>): T {
	const platform = Platform.OS;

	if (platform === "ios" && tokens.ios) {
		return { ...tokens.default, ...tokens.ios };
	}

	if (platform === "android" && tokens.android) {
		return { ...tokens.default, ...tokens.android };
	}

	if (platform === "web" && tokens.web) {
		return { ...tokens.default, ...tokens.web };
	}

	return tokens.default;
}

/**
 * Multiply a spacing token by a factor
 * Useful for creating dynamic spacing based on base tokens
 */
export function multiplySpacing(token: SpacingToken, factor: number): number {
	return Tokens[token] * factor;
}

/**
 * Create a spacing scale based on a base value
 * Generates a complete spacing system from a single value
 */
export function createSpacingScale(base: number) {
	return {
		xxxs: base * 0.125,
		xxs: base * 0.25,
		xs: base * 0.5,
		s: base * 0.75,
		ms: base * 0.875,
		m: base,
		l: base * 1.25,
		xl: base * 1.5,
		xxl: base * 2,
		xxxl: base * 3,
		xxxxl: base * 4.5,
	};
}

/**
 * Get responsive spacing based on screen size
 * Returns smaller values on smaller screens
 */
export function getResponsiveSpacing(token: SpacingToken, screenWidth: number): number {
	const baseValue = Tokens[token];

	if (screenWidth < 375) {
		// Small phones
		return baseValue * 0.875;
	}

	if (screenWidth < 414) {
		// Regular phones
		return baseValue;
	}

	if (screenWidth < 768) {
		// Large phones / small tablets
		return baseValue * 1.125;
	}

	// Tablets and larger
	return baseValue * 1.25;
}

/**
 * Mix two colors with a given opacity
 * Useful for creating color variations
 */
export function mixColors(color1: string, color2: string, ratio: number): string {
	// Simple implementation - in production, use a proper color library
	return `rgba(${color1}, ${ratio})`;
}

/**
 * Get color with opacity
 * Applies opacity to any color token
 */
export function getColorWithOpacity(color: string, opacity: number): string {
	// Handle hex colors
	if (color.startsWith("#")) {
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	// Handle rgb colors
	if (color.startsWith("rgb")) {
		return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
	}

	return color;
}

/**
 * Create a color palette from a base color
 * Generates tints and shades
 */
export function createColorPalette(baseColor: string) {
	return {
		50: getColorWithOpacity(baseColor, 0.1),
		100: getColorWithOpacity(baseColor, 0.2),
		200: getColorWithOpacity(baseColor, 0.3),
		300: getColorWithOpacity(baseColor, 0.4),
		400: getColorWithOpacity(baseColor, 0.5),
		500: baseColor,
		600: getColorWithOpacity(baseColor, 0.7),
		700: getColorWithOpacity(baseColor, 0.8),
		800: getColorWithOpacity(baseColor, 0.9),
		900: baseColor,
	};
}

/**
 * Combine multiple shadows for complex effects
 */
export function combineShadows(...shadows: Array<keyof typeof Shadows>) {
	const combined = {
		elevation: 0,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
	};

	for (const shadow of shadows) {
		const shadowStyle = Shadows[shadow];
		combined.elevation = Math.max(combined.elevation, shadowStyle.elevation || 0);
		combined.shadowColor = shadowStyle.shadowColor || combined.shadowColor;
		combined.shadowOffset = {
			width: combined.shadowOffset.width + (shadowStyle.shadowOffset?.width || 0),
			height: combined.shadowOffset.height + (shadowStyle.shadowOffset?.height || 0),
		};
		combined.shadowOpacity = Math.max(combined.shadowOpacity, shadowStyle.shadowOpacity || 0);
		combined.shadowRadius = Math.max(combined.shadowRadius, shadowStyle.shadowRadius || 0);
	}

	return combined;
}

/**
 * Create a custom animation timing curve
 */
export function createAnimation(
	duration: keyof typeof Animation.duration,
	easing: keyof typeof Animation.easing,
) {
	return {
		duration: Animation.duration[duration],
		easing: Animation.easing[easing],
	};
}

/**
 * Get a clamped font size that respects min/max bounds
 */
export function getClampedFontSize(
	size: keyof typeof Typography.fontSize,
	min: keyof typeof Typography.fontSize = "xs",
	max: keyof typeof Typography.fontSize = "5xl",
): number {
	const value = Typography.fontSize[size];
	const minValue = Typography.fontSize[min];
	const maxValue = Typography.fontSize[max];

	return Math.min(Math.max(value, minValue), maxValue);
}

/**
 * Create responsive typography that scales with screen size
 */
export function getResponsiveTypography(
	baseSize: keyof typeof Typography.fontSize,
	screenWidth: number,
) {
	const base = Typography.fontSize[baseSize];
	const scaleFactor = Math.min(screenWidth / 375, 1.5); // Cap at 1.5x

	return {
		fontSize: Math.round(base * scaleFactor),
		lineHeight: Typography.lineHeight.normal,
	};
}

/**
 * Token validation helpers
 */
export const TokenValidation = {
	isValidSpacing: (value: unknown): value is SpacingToken => {
		return typeof value === "string" && Object.keys(Tokens).includes(value);
	},

	isValidColor: (value: string): boolean => {
		// Basic validation - check if it's a valid hex or rgb color
		return (
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) ||
			/^rgb\(/.test(value) ||
			/^rgba\(/.test(value)
		);
	},

	isValidOpacity: (value: number): boolean => {
		return value >= 0 && value <= 1;
	},
};

/**
 * Debug helper to log all tokens in a formatted way
 */
export function logTokens() {
	// Only log in development environments
	if (process.env.NODE_ENV === "development") {
		console.log("=== Design Tokens ===");
		console.log("Spacing:", Tokens);
		console.log("Colors:", Colors);
		console.log("Typography:", Typography);
		console.log("Animation:", Animation);
		console.log("BorderRadius:", BorderRadius);
		console.log("Shadows:", Shadows);
	}
}
