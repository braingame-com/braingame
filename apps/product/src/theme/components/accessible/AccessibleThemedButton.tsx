import React, { useCallback, useMemo } from "react";
import {
	TouchableOpacity as RNTouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAccessibility } from "../../../contexts/AccessibilityContext";
import { getAccessibilityProps, getAccessibilityState, getHint } from "../../../utils/accessibility";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";
import { AccessibleThemedText } from "./AccessibleThemedText";

interface AccessibleThemedButtonProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	children: React.ReactNode;
	accessibilityLabel: string;
	accessibilityHint?: string;
}

export const AccessibleThemedButton = withMemo<AccessibleThemedButtonProps>(
	({
		variant = "primary",
		size = "medium",
		fullWidth = false,
		disabled = false,
		style,
		children,
		onPress,
		accessibilityLabel,
		accessibilityHint,
		...props
	}) => {
		const { theme } = useTheme();
		const { reduceMotionEnabled, announce } = useAccessibility();
		const scaleValue = useSharedValue(1);

		const handlePressIn = useCallback(() => {
			if (!reduceMotionEnabled) {
				scaleValue.value = withTiming(0.95, { duration: 100 });
			}
		}, [scaleValue, reduceMotionEnabled]);

		const handlePressOut = useCallback(() => {
			if (!reduceMotionEnabled) {
				scaleValue.value = withTiming(1, { duration: 100 });
			}
		}, [scaleValue, reduceMotionEnabled]);

		const handlePress = useCallback(
			(e: any) => {
				announce(`${accessibilityLabel} activated`);
				onPress?.(e);
			},
			[onPress, accessibilityLabel, announce],
		);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: reduceMotionEnabled ? [] : [{ scale: scaleValue.value }],
		}));

		const buttonStyle = useMemo<ViewStyle>(() => {
			const sizeStyles = {
				small: {
					paddingVertical: theme.sizes.spacingSM,
					paddingHorizontal: theme.sizes.spacingMD,
				},
				medium: {
					paddingVertical: theme.sizes.spacingSM + 4,
					paddingHorizontal: theme.sizes.spacingLG,
				},
				large: {
					paddingVertical: theme.sizes.spacingMD,
					paddingHorizontal: theme.sizes.spacingLG,
				},
			};

			const variantStyles = theme.components.button[variant];

			return {
				borderRadius: theme.sizes.radiusMD,
				alignItems: "center",
				justifyContent: "center",
				opacity: disabled ? 0.6 : 1,
				width: fullWidth ? "100%" : undefined,
				...sizeStyles[size],
				backgroundColor: variantStyles.background,
				borderWidth: variantStyles.border ? 1 : 0,
				borderColor: variantStyles.border,
				...(style as ViewStyle),
			};
		}, [variant, size, fullWidth, disabled, theme, style]);

		const textColor = theme.components.button[variant].text;
		const textSize = size === "small" ? "sm" : size === "large" ? "lg" : "md";

		const buttonAccessibilityProps = {
			...getAccessibilityProps(
				accessibilityLabel,
				accessibilityHint || getHint.button(accessibilityLabel),
				"button",
			),
			...getAccessibilityState({ disabled }),
		};

		return (
			<RNTouchableOpacity
				disabled={disabled}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...buttonAccessibilityProps}
				{...props}
			>
				<Animated.View style={[buttonStyle, animatedStyle]}>
					{typeof children === "string" ? (
						<AccessibleThemedText
							size={textSize}
							weight="semibold"
							style={{ color: textColor }}
							importantForAccessibility="no"
						>
							{children}
						</AccessibleThemedText>
					) : (
						children
					)}
				</Animated.View>
			</RNTouchableOpacity>
		);
	},
	"AccessibleThemedButton",
);