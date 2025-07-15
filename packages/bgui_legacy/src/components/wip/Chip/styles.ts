import { StyleSheet } from "react-native";
import type { M3ColorScheme } from "../../theme";
import type { ChipColor, ChipSize, ChipVariant } from "./types";

export const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 16,
		borderWidth: 1,
	},
	pressable: {
		opacity: 1,
	},
	pressed: {
		opacity: 0.8,
	},
	disabled: {
		opacity: 0.5,
	},
	selected: {
		borderWidth: 2,
	},
	label: {
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	icon: {
		marginRight: 4,
	},
	removeButton: {
		marginLeft: 4,
		padding: 2,
	},
});

// Size configurations
export const sizeConfig: Record<
	ChipSize,
	{ paddingHorizontal: number; paddingVertical: number; fontSize: number }
> = {
	sm: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		fontSize: 12,
	},
	md: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		fontSize: 14,
	},
};

// Color configurations for different variants
export const getColorConfig = (
	colors: M3ColorScheme,
): Record<
	ChipVariant,
	Record<ChipColor, { backgroundColor: string; borderColor: string; textColor: string }>
> => ({
	filled: {
		primary: {
			backgroundColor: colors.primary,
			borderColor: colors.primary,
			textColor: colors.onPrimary,
		},
		secondary: {
			backgroundColor: colors.secondary,
			borderColor: colors.secondary,
			textColor: colors.onSecondary,
		},
		success: {
			backgroundColor: colors.success,
			borderColor: colors.success,
			textColor: colors.onSuccess,
		},
		warning: {
			backgroundColor: colors.warning,
			borderColor: colors.warning,
			textColor: colors.onWarning,
		},
		danger: {
			backgroundColor: colors.error,
			borderColor: colors.error,
			textColor: colors.onError,
		},
		neutral: {
			backgroundColor: colors.surfaceContainer,
			borderColor: colors.outlineVariant,
			textColor: colors.onSurface,
		},
	},
	outlined: {
		primary: {
			backgroundColor: "transparent",
			borderColor: colors.primary,
			textColor: colors.primary,
		},
		secondary: {
			backgroundColor: "transparent",
			borderColor: colors.secondary,
			textColor: colors.secondary,
		},
		success: {
			backgroundColor: "transparent",
			borderColor: colors.success,
			textColor: colors.success,
		},
		warning: {
			backgroundColor: "transparent",
			borderColor: colors.warning,
			textColor: colors.warning,
		},
		danger: {
			backgroundColor: "transparent",
			borderColor: colors.error,
			textColor: colors.error,
		},
		neutral: {
			backgroundColor: "transparent",
			borderColor: colors.outlineVariant,
			textColor: colors.onSurface,
		},
	},
});
