import { Colors, Tokens } from "@braingame/utils";
import { validators } from "../../utils/validation";
import type { ThemeColor } from "../Icon/types";
import type { ButtonVariant } from "./types";

/**
 * Color configuration for each button variant
 */
export const VARIANT_COLORS: Record<ButtonVariant, { background: string; text: string }> = {
	primary: { background: Colors.universal.primary, text: "#fff" },
	secondary: { background: Colors.universal.primaryFaded, text: Colors.light.text },
	ghost: { background: "transparent", text: Colors.light.text },
	danger: { background: Colors.universal.negative, text: "#fff" },
	icon: { background: "transparent", text: Colors.light.text },
};

/**
 * Icon color mapping for each button variant
 */
export const VARIANT_ICON_COLORS: Record<ButtonVariant, ThemeColor> = {
	primary: "background",
	secondary: "text",
	ghost: "text",
	danger: "background",
	icon: "text",
};

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
