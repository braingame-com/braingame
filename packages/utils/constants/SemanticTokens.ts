import { Animation } from "./Animation";
import { BorderRadius } from "./BorderRadius";
import { Tokens } from "./Tokens";
import { Typography } from "./Typography";

/**
 * Semantic spacing tokens that map to base spacing values
 * These provide more meaningful names for common spacing patterns
 */
export const SemanticSpacing = {
	// Layout spacing
	layoutNone: 0,
	layoutTight: Tokens.xs, // 8px
	layoutCompact: Tokens.s, // 12px
	layoutNormal: Tokens.m, // 16px
	layoutComfortable: Tokens.l, // 20px
	layoutLoose: Tokens.xl, // 24px
	layoutSpacer: Tokens.xxl, // 32px
	layoutSection: Tokens.xxxl, // 48px

	// Component spacing
	componentPaddingXs: Tokens.xxs, // 4px
	componentPaddingS: Tokens.xs, // 8px
	componentPaddingM: Tokens.s, // 12px
	componentPaddingL: Tokens.m, // 16px
	componentPaddingXl: Tokens.l, // 20px

	// Gap spacing for flex layouts
	gapXs: Tokens.xxs, // 4px
	gapS: Tokens.xs, // 8px
	gapM: Tokens.s, // 12px
	gapL: Tokens.m, // 16px
	gapXl: Tokens.l, // 20px

	// Icon spacing
	iconMarginTight: Tokens.xxs, // 4px
	iconMarginNormal: Tokens.xs, // 8px
	iconMarginLoose: Tokens.s, // 12px
} as const;

/**
 * Semantic border radius tokens for common UI patterns
 */
export const SemanticBorderRadius = {
	// Component shapes
	input: BorderRadius.xs,
	button: BorderRadius.sm,
	card: BorderRadius.md,
	modal: BorderRadius.lg,
	sheet: BorderRadius.xl,
	pill: BorderRadius.full,

	// Specific use cases
	avatar: BorderRadius.full,
	badge: BorderRadius.full,
	chip: BorderRadius.full,
	toast: BorderRadius.sm,
	dropdown: BorderRadius.sm,
	tab: BorderRadius.sm,
} as const;

/**
 * Semantic animation tokens for consistent motion
 */
export const SemanticAnimation = {
	// Interaction timings
	hover: Animation.duration.fast,
	press: Animation.duration.fast,
	transition: Animation.duration.normal,
	pageTransition: Animation.duration.slow,
	complexAnimation: Animation.duration.slower,

	// Common easing curves
	interaction: Animation.easing.smooth,
	enter: Animation.easing.easeOut,
	exit: Animation.easing.easeIn,
	move: Animation.easing.easeInOut,
} as const;

/**
 * Semantic typography scales for common text patterns
 */
export const SemanticTypography = {
	// Headings
	h1: {
		fontSize: Typography.fontSize["5xl"],
		fontWeight: Typography.fontWeight.bold,
		lineHeight: Typography.lineHeight.tight,
	},
	h2: {
		fontSize: Typography.fontSize["4xl"],
		fontWeight: Typography.fontWeight.bold,
		lineHeight: Typography.lineHeight.tight,
	},
	h3: {
		fontSize: Typography.fontSize["3xl"],
		fontWeight: Typography.fontWeight.semibold,
		lineHeight: Typography.lineHeight.snug,
	},
	h4: {
		fontSize: Typography.fontSize["2xl"],
		fontWeight: Typography.fontWeight.semibold,
		lineHeight: Typography.lineHeight.snug,
	},
	h5: {
		fontSize: Typography.fontSize.xl,
		fontWeight: Typography.fontWeight.medium,
		lineHeight: Typography.lineHeight.normal,
	},
	h6: {
		fontSize: Typography.fontSize.lg,
		fontWeight: Typography.fontWeight.medium,
		lineHeight: Typography.lineHeight.normal,
	},

	// Body text
	bodyLarge: {
		fontSize: Typography.fontSize.lg,
		fontWeight: Typography.fontWeight.normal,
		lineHeight: Typography.lineHeight.relaxed,
	},
	bodyNormal: {
		fontSize: Typography.fontSize.base,
		fontWeight: Typography.fontWeight.normal,
		lineHeight: Typography.lineHeight.normal,
	},
	bodySmall: {
		fontSize: Typography.fontSize.sm,
		fontWeight: Typography.fontWeight.normal,
		lineHeight: Typography.lineHeight.normal,
	},

	// UI text
	label: {
		fontSize: Typography.fontSize.sm,
		fontWeight: Typography.fontWeight.medium,
		lineHeight: Typography.lineHeight.tight,
	},
	caption: {
		fontSize: Typography.fontSize.xs,
		fontWeight: Typography.fontWeight.normal,
		lineHeight: Typography.lineHeight.tight,
	},
	button: {
		fontSize: Typography.fontSize.base,
		fontWeight: Typography.fontWeight.medium,
		lineHeight: Typography.lineHeight.tight,
		letterSpacing: Typography.letterSpacing.tight,
	},
} as const;
