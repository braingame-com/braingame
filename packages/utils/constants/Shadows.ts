import type { ViewStyle } from "react-native";

/**
 * Consistent shadow system for both iOS and Android
 * Provides elevation and shadow properties that work across platforms
 */
export const Shadows = {
	none: {
		elevation: 0,
		shadowOpacity: 0,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 0,
		shadowColor: "transparent",
	} as ViewStyle,

	xs: {
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
	} as ViewStyle,

	sm: {
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
	} as ViewStyle,

	md: {
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 4,
	} as ViewStyle,

	lg: {
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
	} as ViewStyle,

	xl: {
		elevation: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.18,
		shadowRadius: 12,
	} as ViewStyle,

	xxl: {
		elevation: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.22,
		shadowRadius: 16,
	} as ViewStyle,
};
