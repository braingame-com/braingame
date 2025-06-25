/**
 * Common style utilities used across the application
 * Provides consistent styling patterns and reduces code duplication
 */

import { Platform, type TextStyle, type ViewStyle } from "react-native";

/**
 * Shadow presets for consistent elevation effects
 */
export const shadows = {
	none: {
		shadowColor: "transparent",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	} as ViewStyle,
	small: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	} as ViewStyle,
	medium: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	} as ViewStyle,
	large: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 6,
	} as ViewStyle,
	xl: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 8,
	} as ViewStyle,
} as const;

/**
 * Consistent spacing values based on 4px grid
 */
export const spacing = {
	none: 0,
	xs: 4,
	s: 8,
	m: 16,
	l: 24,
	xl: 32,
	xxl: 48,
	xxxl: 64,
} as const;

/**
 * Font family constants
 */
export const fonts = {
	primary: "LexendRegular",
	secondary: "LexendMedium",
	mono: "Courier",
	bold: "LexendBold",
	semiBold: "LexendSemiBold",
	medium: "LexendMedium",
	regular: "LexendRegular",
	light: "LexendLight",
} as const;

/**
 * Common dimensions used throughout the app
 */
export const dimensions = {
	buttonHeight: 48,
	inputHeight: 48,
	borderRadius: 8,
	borderWidth: 1,
	buttonSizes: {
		small: 40,
		medium: 48,
		large: 56,
	},
	inputSizes: {
		small: 40,
		medium: 48,
		large: 56,
	},
	borderRadiusValues: {
		none: 0,
		small: 4,
		medium: 8,
		large: 12,
		xl: 16,
		full: 9999,
	},
	borderWidthValues: {
		thin: 1,
		medium: 2,
		thick: 3,
	},
} as const;

/**
 * Common layout styles
 */
export const layout = {
	flex1: {
		flex: 1,
	} as ViewStyle,
	flexRow: {
		flexDirection: "row",
	} as ViewStyle,
	flexRowCenter: {
		flexDirection: "row",
		alignItems: "center",
	} as ViewStyle,
	flexRowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	} as ViewStyle,
	center: {
		justifyContent: "center",
		alignItems: "center",
	} as ViewStyle,
	centerHorizontal: {
		alignItems: "center",
	} as ViewStyle,
	centerVertical: {
		justifyContent: "center",
	} as ViewStyle,
	absolute: {
		position: "absolute",
	} as ViewStyle,
	absoluteFill: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	} as ViewStyle,
} as const;

/**
 * Common text style presets
 */
export const textPresets = {
	h1: {
		fontFamily: fonts.bold,
		fontSize: 32,
		lineHeight: 40,
	} as TextStyle,
	h2: {
		fontFamily: fonts.bold,
		fontSize: 28,
		lineHeight: 36,
	} as TextStyle,
	h3: {
		fontFamily: fonts.semiBold,
		fontSize: 24,
		lineHeight: 32,
	} as TextStyle,
	h4: {
		fontFamily: fonts.semiBold,
		fontSize: 20,
		lineHeight: 28,
	} as TextStyle,
	h5: {
		fontFamily: fonts.medium,
		fontSize: 18,
		lineHeight: 24,
	} as TextStyle,
	body: {
		fontFamily: fonts.regular,
		fontSize: 16,
		lineHeight: 24,
	} as TextStyle,
	bodySmall: {
		fontFamily: fonts.regular,
		fontSize: 14,
		lineHeight: 20,
	} as TextStyle,
	caption: {
		fontFamily: fonts.regular,
		fontSize: 12,
		lineHeight: 16,
	} as TextStyle,
	button: {
		fontFamily: fonts.semiBold,
		fontSize: 16,
		lineHeight: 24,
	} as TextStyle,
} as const;

/**
 * Platform-specific styles
 */
export const platformStyles = {
	keyboardAvoidingView: {
		behavior: Platform.OS === "ios" ? "padding" : "height",
		style: { flex: 1 },
	} as const,
	statusBarHeight: Platform.OS === "ios" ? 44 : 0,
	navBarHeight: Platform.OS === "ios" ? 64 : 56,
} as const;

/**
 * Helper function to create consistent button styles
 */
export const createButtonStyle = (
	height: number = dimensions.buttonHeight.medium,
	borderRadius: number = dimensions.borderRadius.large,
): ViewStyle => ({
	height,
	borderRadius,
	justifyContent: "center",
	alignItems: "center",
	paddingHorizontal: spacing.l,
});

/**
 * Helper function to create consistent input styles
 */
export const createInputStyle = (
	height: number = dimensions.inputHeight.medium,
	borderRadius: number = dimensions.borderRadius.medium,
): ViewStyle => ({
	height,
	borderRadius,
	paddingHorizontal: spacing.m,
	borderWidth: dimensions.borderWidth.thin,
});

/**
 * Helper function to create consistent container styles
 */
export const createContainerStyle = (
	padding: number = spacing.l,
	backgroundColor?: string,
): ViewStyle => ({
	flex: 1,
	padding,
	backgroundColor,
});

/**
 * Type exports for TypeScript support
 */
export type Shadow = keyof typeof shadows;
export type Spacing = keyof typeof spacing;
export type Font = keyof typeof fonts;
export type TextStylePreset = keyof typeof textPresets;
