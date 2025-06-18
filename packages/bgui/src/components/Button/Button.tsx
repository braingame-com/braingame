import { Colors, Tokens, buttonStyles } from "@braingame/utils";
import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, type View } from "react-native";
import { Icon } from "../../../Icon";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import type { ButtonProps, ButtonVariant } from "./types";

const VARIANT_COLORS: Record<ButtonVariant, { background: string; text: string }> = {
	primary: { background: Colors.universal.primary, text: "#fff" },
	secondary: { background: Colors.universal.primaryFaded, text: Colors.light.text },
	ghost: { background: "transparent", text: Colors.light.text },
	danger: { background: Colors.universal.negative, text: "#fff" },
	icon: { background: "transparent", text: Colors.light.text },
};

// Memoize validation rules to avoid recreating on every render
const validationRules = {
	onPress: validators.required,
	variant: validators.oneOf(["primary", "secondary", "ghost", "danger", "icon"] as const),
	size: validators.oneOf(["sm", "md", "lg"] as const),
	iconPosition: validators.oneOf(["left", "right"] as const),
};

function ButtonComponent({
	children,
	onPress,
	icon,
	iconPosition = "left",
	size = "md",
	fullWidth,
	disabled,
	loading,
	variant = "primary",
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
}: ButtonProps) {
	// Validate props only in development
	if (__DEV__) {
		validateProps({ onPress, variant, size, iconPosition }, validationRules, "Button");
	}

	const [hovered, setHovered] = useState(false);

	const handleHoverIn = useCallback(() => setHovered(true), []);
	const handleHoverOut = useCallback(() => setHovered(false), []);

	const { background, text } = VARIANT_COLORS[variant];

	// Memoize padding calculations
	const { paddingVertical, paddingHorizontal } = useMemo(
		() => ({
			paddingVertical: size === "lg" ? Tokens.m : size === "sm" ? Tokens.xs : Tokens.s,
			paddingHorizontal: size === "lg" ? Tokens.xl : size === "sm" ? Tokens.s : Tokens.m,
		}),
		[size],
	);

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={ariaLabel}
			accessibilityHint={ariaDescribedBy}
			disabled={disabled || loading}
			onPress={onPress}
			onHoverIn={handleHoverIn}
			onHoverOut={handleHoverOut}
			style={[
				variant === "icon" ? buttonStyles.iconButton : buttonStyles.button,
				{
					backgroundColor: background,
					paddingVertical,
					paddingHorizontal,
					opacity: disabled ? 0.5 : 1,
					width: fullWidth ? "100%" : undefined,
					flexDirection: iconPosition === "right" ? "row-reverse" : "row",
				},
			]}
		>
			{loading ? (
				<ActivityIndicator color={text} />
			) : (
				<>
					{icon && <Icon name={icon} color={text} />}
					{variant !== "icon" && children && <Text style={{ color: text }}>{children}</Text>}
				</>
			)}
		</Pressable>
	);
}

// Wrap with memo and error boundary for optimal performance
const MemoizedButton = memo(ButtonComponent);
export const Button = withErrorBoundary(MemoizedButton);
