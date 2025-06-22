import type { Theme } from "../types";

export const createComponentStyles = (colors: Theme["colors"]) => ({
	button: {
		primary: {
			background: colors.primary,
			text: colors.onPrimary,
		},
		secondary: {
			background: colors.secondary,
			text: colors.onSecondary,
		},
		outline: {
			background: "transparent",
			text: colors.primary,
			border: colors.primary,
		},
		ghost: {
			background: "transparent",
			text: colors.primary,
		},
	},
	card: {
		background: colors.surface,
		border: colors.border,
		shadow: colors.shadow,
	},
	input: {
		background: colors.surface,
		border: colors.border,
		borderFocus: colors.primary,
		text: colors.text,
		placeholder: colors.textDisabled,
	},
	navigation: {
		background: colors.surface,
		active: colors.primary,
		inactive: colors.textSecondary,
		border: colors.border,
	},
});
