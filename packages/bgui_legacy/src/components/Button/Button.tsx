"use client";

import React from "react";
import { ActivityIndicator, Animated, Pressable } from "react-native";
import { useTheme } from "../../theme";
import { Icon } from "../Icon";
import { Surface } from "../Surface";
import { Text } from "../Text";
import { createButtonStyles, getIOSPressedStyle, getRippleConfig } from "./Button.styles";
import {
	getButtonAccessibilityProps,
	useButtonAnimation,
	validateButtonProps,
} from "./Button.utils";
import type { ButtonProps } from "./types";

/**
 * Material 3 Button Component
 *
 * A complete implementation of Material Design 3 buttons with all 5 variants.
 * Features ripple effects, proper animations, and full accessibility support.
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="filled" onPress={handleSubmit}>
 *   Submit
 * </Button>
 *
 * // Secondary action with icon
 * <Button
 *   variant="outlined"
 *   icon="edit"
 *   onPress={handleEdit}
 * >
 *   Edit Profile
 * </Button>
 *
 * // Text button for low emphasis
 * <Button variant="text" onPress={handleCancel}>
 *   Cancel
 * </Button>
 * ```
 */
export function Button({
	variant = "filled",
	size = "medium",
	label,
	icon,
	iconPosition = "start",
	fullWidth = false,
	loading = false,
	disabled = false,
	children,
	style,
	onPress,
	onPressIn,
	onPressOut,
	...pressableProps
}: ButtonProps) {
	const { colors } = useTheme();
	const animation = useButtonAnimation();

	// Validate props for accessibility
	React.useEffect(() => {
		validateButtonProps({ label, children, accessibilityLabel: pressableProps.accessibilityLabel });
	}, [label, children, pressableProps.accessibilityLabel]);

	// Create styles
	const styles = createButtonStyles(variant, size, colors, fullWidth, disabled);
	const rippleConfig = getRippleConfig(variant, colors);
	const accessibilityProps = getButtonAccessibilityProps({
		label,
		disabled,
		loading,
		...pressableProps,
	});

	// Handle press animations
	const handlePressIn = (event: any) => {
		animation.handlePressIn();
		onPressIn?.(event);
	};

	const handlePressOut = (event: any) => {
		animation.handlePressOut();
		onPressOut?.(event);
	};

	// Content to render
	const buttonContent = (
		<>
			{loading ? (
				<ActivityIndicator size="small" color={styles.iconStyle.color} />
			) : (
				<>
					{icon && iconPosition === "start" && (
						<Icon name={icon} size={styles.iconStyle.size} color={styles.iconStyle.color} />
					)}
					{children || (
						<Text variant="labelLarge" style={styles.label}>
							{label}
						</Text>
					)}
					{icon && iconPosition === "end" && (
						<Icon name={icon} size={styles.iconStyle.size} color={styles.iconStyle.color} />
					)}
				</>
			)}
		</>
	);

	// Common animated container style
	const animatedStyle = {
		transform: [{ scale: animation.scaleAnim }],
	};

	// Render elevated variant with Surface
	if (variant === "elevated") {
		return (
			<Animated.View style={[animatedStyle, style]}>
				<Pressable
					onPress={disabled || loading ? undefined : onPress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					disabled={disabled || loading}
					{...rippleConfig}
					{...accessibilityProps}
					{...pressableProps}
				>
					<Surface level={disabled ? 0 : 1} style={styles.root}>
						{buttonContent}
					</Surface>
				</Pressable>
			</Animated.View>
		);
	}

	// Render other variants
	return (
		<Animated.View style={[animatedStyle, style]}>
			<Pressable
				onPress={disabled || loading ? undefined : onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={disabled || loading}
				style={({ pressed }) => [styles.root, getIOSPressedStyle(pressed, disabled)]}
				{...rippleConfig}
				{...accessibilityProps}
				{...pressableProps}
			>
				{buttonContent}
			</Pressable>
		</Animated.View>
	);
}
