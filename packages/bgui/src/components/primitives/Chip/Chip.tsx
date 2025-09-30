import { forwardRef, useMemo } from "react";
import {
	type GestureResponderEvent,
	Platform,
	Pressable,
	type PressableStateCallbackType,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import { useInteractiveState } from "../../../hooks";
import { theme } from "../../../theme";
import type { VariantStyle } from "../../../theme/variants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import type { ChipProps, ChipSize } from "./Chip.types";

const resolveColorToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig: Record<
	ChipSize,
	{
		minHeight: number;
		paddingHorizontal: number;
		paddingVertical: number;
		decoratorGap: number;
		textLevel: "body-xs" | "body-sm" | "body-md";
		dismissIconSize: number;
	}
> = {
	sm: {
		minHeight: 24,
		paddingHorizontal: theme.spacing.xs,
		paddingVertical: 4,
		decoratorGap: theme.spacing.xs / 2,
		textLevel: "body-xs",
		dismissIconSize: 14,
	},
	md: {
		minHeight: 32,
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: 6,
		decoratorGap: theme.spacing.xs,
		textLevel: "body-sm",
		dismissIconSize: 16,
	},
	lg: {
		minHeight: 40,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: 8,
		decoratorGap: theme.spacing.sm,
		textLevel: "body-md",
		dismissIconSize: 18,
	},
};

const baseStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-start",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		flexShrink: 1,
	},
	decorator: {
		justifyContent: "center",
		alignItems: "center",
	},
	dismissPressable: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export const Chip = forwardRef<View, ChipProps>(
	(
		{
			children,
			color = "neutral",
			variant = "soft",
			size = "md",
			disabled = false,
			startDecorator,
			endDecorator,
			onClick,
			onDismiss,
			dismissLabel = "Dismiss",
			dismissIconName = "close",
			style,
			contentStyle,
			testID,
			"aria-label": ariaLabel,
			onFocus,
			onBlur,
			onHoverIn,
			onHoverOut,
			onPressIn,
			onPressOut,
			...rest
		},
		ref,
	) => {
		const clickable = typeof onClick === "function" && !disabled;
		const interactiveState = useInteractiveState();

		const variantKey = `${variant}-${color}` as keyof typeof theme.components.Chip.variants;
		const variantStyles = (theme.components.Chip.variants[variantKey] ??
			theme.components.Chip.variants["soft-neutral"]) as VariantStyle;

		const sizeStyles = sizeConfig[size];

		const resolvedBackground =
			resolveColorToken(variantStyles.backgroundColor) ?? theme.colors.surfaceVariant;
		const resolvedTextColor = resolveColorToken(variantStyles.color) ?? theme.colors.onSurface;
		const resolvedBorderColor = resolveColorToken(variantStyles.borderColor);
		const resolvedBorderWidth = variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0);

		const handlePress = (event: GestureResponderEvent) => {
			if (disabled || !onClick) return;
			onClick(event);
		};

		const handleDismiss = (event: GestureResponderEvent) => {
			event.stopPropagation?.();
			if (disabled || !onDismiss) return;
			onDismiss();
		};

		const containerStyle = useMemo<ViewStyle>(() => {
			const calculatedRadius = sizeStyles.minHeight / 2;
			return StyleSheet.flatten([
				baseStyles.container,
				{
					minHeight: sizeStyles.minHeight,
					paddingHorizontal: sizeStyles.paddingHorizontal,
					paddingVertical: sizeStyles.paddingVertical,
					borderRadius: calculatedRadius,
					backgroundColor: resolvedBackground,
					borderColor: resolvedBorderColor,
					borderWidth: resolvedBorderWidth,
					opacity: disabled ? 0.5 : 1,
				},
				style,
			]) as ViewStyle;
		}, [
			disabled,
			resolvedBackground,
			resolvedBorderColor,
			resolvedBorderWidth,
			sizeStyles.minHeight,
			sizeStyles.paddingHorizontal,
			sizeStyles.paddingVertical,
			style,
		]);

		const focusRingStyle: ViewStyle | undefined = useMemo(() => {
			if (!interactiveState.isFocused) return undefined;
			if (Platform.OS === "web") {
				return {
					outlineColor: theme.colors.primary,
					outlineWidth: 2,
					outlineStyle: "solid",
					outlineOffset: 2,
				} as ViewStyle;
			}
			return {
				shadowColor: theme.colors.primary,
				shadowOpacity: 0.3,
				shadowRadius: 6,
				elevation: 2,
			} as ViewStyle;
		}, [interactiveState.isFocused]);

		const resolvePressableStyle = ({ pressed }: PressableStateCallbackType) =>
			StyleSheet.flatten<ViewStyle>([
				containerStyle,
				focusRingStyle,
				pressed || interactiveState.isPressed ? { transform: [{ scale: 0.97 }] } : null,
				pressed && !disabled ? { opacity: 0.9 } : null,
			]);

		const contentSpacing = sizeStyles.decoratorGap;

		const content = (
			<Box style={StyleSheet.flatten([baseStyles.content, contentStyle])}>
				{startDecorator ? (
					<Box style={StyleSheet.flatten([baseStyles.decorator, { marginRight: contentSpacing }])}>
						{startDecorator}
					</Box>
				) : null}
				{typeof children === "string" || typeof children === "number" ? (
					<Typography
						level={sizeStyles.textLevel}
						numberOfLines={1}
						style={{ color: resolvedTextColor }}
					>
						{children}
					</Typography>
				) : (
					children
				)}
				{endDecorator ? (
					<Box style={StyleSheet.flatten([baseStyles.decorator, { marginLeft: contentSpacing }])}>
						{endDecorator}
					</Box>
				) : null}
				{onDismiss ? (
					<Pressable
						accessibilityRole="button"
						accessibilityLabel={dismissLabel}
						hitSlop={8}
						style={StyleSheet.flatten([
							baseStyles.dismissPressable,
							{ marginLeft: contentSpacing },
						])}
						onPress={handleDismiss}
						disabled={disabled}
					>
						<Icon
							name={dismissIconName}
							size={sizeStyles.dismissIconSize}
							color={resolvedTextColor}
						/>
					</Pressable>
				) : null}
			</Box>
		);

		if (!clickable) {
			return (
				<Box
					ref={ref}
					style={containerStyle}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityRole="text"
				>
					{content}
				</Box>
			);
		}

		return (
			<Pressable
				ref={ref}
				style={resolvePressableStyle}
				onPress={handlePress}
				accessibilityRole="button"
				accessibilityState={{ disabled }}
				accessibilityLabel={ariaLabel}
				testID={testID}
				disabled={disabled}
				onFocus={(event) => {
					interactiveState.handleFocus();
					onFocus?.(event);
				}}
				onBlur={(event) => {
					interactiveState.handleBlur();
					onBlur?.(event);
				}}
				onHoverIn={(event) => {
					interactiveState.handleHoverIn();
					onHoverIn?.(event);
				}}
				onHoverOut={(event) => {
					interactiveState.handleHoverOut();
					onHoverOut?.(event);
				}}
				onPressIn={(event) => {
					interactiveState.handlePressIn();
					onPressIn?.(event);
				}}
				onPressOut={(event) => {
					interactiveState.handlePressOut();
					onPressOut?.(event);
				}}
				{...rest}
			>
				{content}
			</Pressable>
		);
	},
);

Chip.displayName = "Chip";
