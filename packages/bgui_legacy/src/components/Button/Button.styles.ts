import type { ViewStyle } from "react-native";
import { Platform, StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";
import type { ButtonSize, M3ButtonVariant } from "./types";

/**
 * Button dimension configuration by size
 */
export const buttonDimensions = {
	small: { height: 32, paddingHorizontal: 16, iconSize: 18, gap: 8 },
	medium: { height: 40, paddingHorizontal: 24, iconSize: 18, gap: 8 },
	large: { height: 48, paddingHorizontal: 32, iconSize: 20, gap: 12 },
} as const;

/**
 * Get text color based on button variant
 */
export function getButtonTextColor(
	variant: M3ButtonVariant,
	colors: M3ColorScheme,
	disabled?: boolean,
): string {
	if (disabled) {
		return `${colors.onSurface}61`; // 38% opacity
	}

	switch (variant) {
		case "filled":
			return colors.onPrimary;
		case "tonal":
			return colors.onSecondaryContainer;
		case "elevated":
		case "outlined":
		case "text":
			return colors.primary;
		default:
			return colors.onSurface;
	}
}

/**
 * Get button container styles based on variant
 */
export function getButtonContainerStyle(
	variant: M3ButtonVariant,
	colors: M3ColorScheme,
	disabled?: boolean,
): ViewStyle {
	const baseStyle: ViewStyle = {
		opacity: disabled ? 0.38 : 1,
	};

	switch (variant) {
		case "filled":
			return {
				...baseStyle,
				backgroundColor: colors.primary,
			};
		case "outlined":
			return {
				...baseStyle,
				backgroundColor: "transparent",
				borderWidth: 1,
				borderColor: disabled ? `${colors.onSurface}1F` : colors.outline,
			};
		case "text":
			return {
				...baseStyle,
				backgroundColor: "transparent",
			};
		case "elevated":
			// Elevated uses Surface component for elevation
			return baseStyle;
		case "tonal":
			return {
				...baseStyle,
				backgroundColor: colors.secondaryContainer,
			};
		default:
			return baseStyle;
	}
}

/**
 * Get ripple configuration for Android
 */
export function getRippleConfig(variant: M3ButtonVariant, colors: M3ColorScheme) {
	if (Platform.OS !== "android") {
		return {};
	}

	const rippleColor = variant === "filled" ? `${colors.onPrimary}33` : `${colors.primary}33`;

	return {
		android_ripple: {
			color: rippleColor,
			borderless: false,
		},
	};
}

/**
 * Create button styles
 */
export function createButtonStyles(
	variant: M3ButtonVariant,
	size: ButtonSize,
	colors: M3ColorScheme,
	fullWidth?: boolean,
	disabled?: boolean,
) {
	const dimensions = buttonDimensions[size];
	const containerStyle = getButtonContainerStyle(variant, colors, disabled);

	return StyleSheet.create({
		root: {
			height: dimensions.height,
			paddingHorizontal: dimensions.paddingHorizontal,
			borderRadius: 20, // M3 pill shape
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: dimensions.gap,
			...(fullWidth && { width: "100%" as any }),
			...(variant === "text" && { paddingHorizontal: 12 }),
			...containerStyle,
		},
		label: {
			fontSize: 14,
			fontWeight: "500",
			letterSpacing: 0.1,
			color: getButtonTextColor(variant, colors, disabled),
		},
		iconStyle: {
			size: dimensions.iconSize,
			color: getButtonTextColor(variant, colors, disabled),
		},
		pressedOverlay: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: colors.onSurface,
			opacity: 0.08,
			borderRadius: 20,
		},
	});
}

/**
 * iOS press feedback styles
 */
export function getIOSPressedStyle(pressed: boolean, disabled?: boolean): ViewStyle | undefined {
	if (Platform.OS === "ios" && pressed && !disabled) {
		return { opacity: 0.8 };
	}
	return undefined;
}
