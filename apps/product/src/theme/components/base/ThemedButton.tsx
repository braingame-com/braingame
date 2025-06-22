import React, { useCallback, useMemo } from "react";
import {
	TouchableOpacity as RNTouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";
import { ThemedText } from "./ThemedText";

interface ThemedButtonProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	children: React.ReactNode;
}

export const ThemedButton = withMemo<ThemedButtonProps>(
	({
		variant = "primary",
		size = "medium",
		fullWidth = false,
		disabled = false,
		style,
		children,
		onPress,
		...props
	}) => {
		const { theme } = useTheme();
		const scaleValue = useSharedValue(1);

		const handlePressIn = useCallback(() => {
			scaleValue.value = withTiming(0.95, { duration: 100 });
		}, [scaleValue]);

		const handlePressOut = useCallback(() => {
			scaleValue.value = withTiming(1, { duration: 100 });
		}, [scaleValue]);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [{ scale: scaleValue.value }],
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

		return (
			<RNTouchableOpacity
				disabled={disabled}
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...props}
			>
				<Animated.View style={[buttonStyle, animatedStyle]}>
					{typeof children === "string" ? (
						<ThemedText size={textSize} weight="semibold" style={{ color: textColor }}>
							{children}
						</ThemedText>
					) : (
						children
					)}
				</Animated.View>
			</RNTouchableOpacity>
		);
	},
	"ThemedButton",
);