import { BorderRadius, Tokens } from "@braingame/utils";
import { memo, useMemo } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { useInteractiveState } from "../../hooks";
import { useTheme } from "../../theme";
import { validateProps } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { Icon } from "../Icon";
import {
	getPaddingForSize,
	getVariantColors,
	getVariantIconColors,
	validationRules,
} from "./styles";
import type { ButtonProps } from "./types";

/**
 * Button component for triggering actions in the app.
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button onPress={() => alert('Pressed!')}>Click me</Button>
 *
 * // Button with icon
 * <Button icon="settings" onPress={handleSettings}>Settings</Button>
 *
 * // Loading state
 * <Button loading onPress={handleSubmit}>Submit</Button>
 *
 * // Different variants
 * <Button variant="danger" onPress={handleDelete}>Delete</Button>
 * <Button variant="ghost" onPress={handleCancel}>Cancel</Button>
 * ```
 *
 * @component
 */
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

	const { colors } = useTheme();
	const { isHovered, handleHoverIn, handleHoverOut } = useInteractiveState();

	const variantColors = getVariantColors(colors);
	const variantIconColors = getVariantIconColors(colors);
	const { background, text } = variantColors[variant];
	const iconColor = variantIconColors[variant];

	// Memoize padding calculations
	const { paddingVertical, paddingHorizontal } = useMemo(() => getPaddingForSize(size), [size]);

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
				{
					alignItems: "center",
					gap: Tokens.xs,
					borderRadius: BorderRadius.sm,
					...(variant === "icon"
						? { padding: Tokens.xs }
						: { paddingHorizontal: Tokens.m, paddingVertical: Tokens.xs }),
					backgroundColor: background,
					paddingVertical,
					paddingHorizontal,
					opacity: disabled ? 0.5 : isHovered ? 0.9 : 1,
					width: fullWidth ? "100%" : undefined,
					flexDirection: iconPosition === "right" ? "row-reverse" : "row",
				},
			]}
		>
			{loading ? (
				<ActivityIndicator color={text} />
			) : (
				<>
					{icon && <Icon name={icon} color={iconColor} />}
					{variant !== "icon" && children && <Text style={{ color: text }}>{children}</Text>}
				</>
			)}
		</Pressable>
	);
}

// Wrap with memo and error boundary for optimal performance
const MemoizedButton = memo(ButtonComponent);

/**
 * Button component with error boundary and performance optimization.
 * Supports multiple variants, sizes, icons, and loading states.
 */
export const Button = withErrorBoundary(MemoizedButton);
