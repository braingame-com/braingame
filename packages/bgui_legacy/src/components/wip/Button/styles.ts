import { Tokens } from "@braingame/utils";
import type { M3ColorScheme } from "../../theme";
import { validators } from "../../utils/validation";
import type { ButtonVariant } from "./types";

/**
 * Get color configuration for each button variant
 */
export const getVariantColors = (
	colors: M3ColorScheme,
): Record<ButtonVariant, { background: string; text: string }> => ({
	primary: { background: colors.primary, text: colors.onPrimary },
	secondary: { background: colors.secondaryContainer, text: colors.onSecondaryContainer },
	ghost: { background: "transparent", text: colors.onSurface },
	danger: { background: colors.error, text: colors.onError },
	icon: { background: "transparent", text: colors.onSurface },
});

/**
 * Get icon color mapping for each button variant
 */
export const getVariantIconColors = (colors: M3ColorScheme): Record<ButtonVariant, string> => ({
	primary: colors.onPrimary,
	secondary: colors.onSecondaryContainer,
	ghost: colors.onSurface,
	danger: colors.onError,
	icon: colors.onSurface,
});

/**
 * Validation rules for Button props
 */
export const validationRules = {
	onPress: validators.required,
	variant: validators.oneOf(["primary", "secondary", "ghost", "danger", "icon"] as const),
	size: validators.oneOf(["sm", "md", "lg"] as const),
	iconPosition: validators.oneOf(["left", "right"] as const),
};

/**
 * Calculate padding based on button size
 */
export const getPaddingForSize = (size: "sm" | "md" | "lg") => ({
	paddingVertical: size === "lg" ? Tokens.m : size === "sm" ? Tokens.xs : Tokens.s,
	paddingHorizontal: size === "lg" ? Tokens.xl : size === "sm" ? Tokens.s : Tokens.m,
});
