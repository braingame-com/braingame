/**
 * Typography system for consistent text styling
 * Line heights, font weights, and semantic text scales
 */
export const Typography = {
	lineHeight: {
		none: 1,
		tight: 1.2, // Headings, display text
		snug: 1.375, // Large text
		normal: 1.5, // Body text, default
		relaxed: 1.625, // Long-form content
		loose: 2, // Very spacious text
	},
	fontWeight: {
		thin: "100",
		extralight: "200",
		light: "300",
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
		extrabold: "800",
		black: "900",
	},
	letterSpacing: {
		tighter: -0.5,
		tight: -0.25,
		normal: 0,
		wide: 0.25,
		wider: 0.5,
		widest: 1,
	},
	// Font size scale (semantic naming)
	fontSize: {
		xs: 12, // Captions, fine print
		sm: 14, // Small text, labels
		base: 16, // Body text, default
		lg: 18, // Large body text
		xl: 20, // Subheadings
		"2xl": 24, // Page headings
		"3xl": 30, // Section headings
		"4xl": 36, // Hero headings
		"5xl": 48, // Display text
		"6xl": 60, // Large display
		"7xl": 72, // Extra large display
		"8xl": 96, // Massive display
		"9xl": 128, // Ultra display
	},
} as const;
