import { createBox, createText, useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable, type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import type { Theme } from "../../theme/theme";
import type { ChipProps } from "./ChipProps";

const _Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of Chip using Shopify Restyle
 *
 * Chips represent complex entities in small blocks, such as a contact.
 */
export function Chip({
	children,
	color = "neutral",
	variant = "soft",
	size = "md",
	disabled = false,
	onClick,
	startDecorator,
	endDecorator,
	style,
	"aria-label": ariaLabel,
	testID,
}: ChipProps) {
	const _theme = useTheme<Theme>();
	const clickable = !!onClick;
	const [pressed, setPressed] = React.useState(false);

	// Size configurations
	const sizeConfig = {
		sm: {
			paddingHorizontal: 12,
			minHeight: 20,
			gap: 3,
			fontSize: 12,
		},
		md: {
			paddingHorizontal: 16,
			minHeight: 24,
			gap: 4,
			fontSize: 14,
		},
		lg: {
			paddingHorizontal: 24,
			minHeight: 28,
			gap: 6,
			fontSize: 16,
		},
	};

	const config = sizeConfig[size];
	const _variantKey = `${variant}-${color}` as keyof Theme["components"]["Chip"]["variants"];

	// Get theme-based colors for the variant
	const getVariantColors = () => {
		const themeColors = _theme.colors;
		switch (variant) {
			case "solid":
				return {
					backgroundColor: themeColors[color],
					color:
						themeColors[
							`on${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof themeColors
						] || "#fff",
				};
			case "soft":
				return {
					backgroundColor:
						themeColors[`${color}Container` as keyof typeof themeColors] ||
						`${themeColors[color]}20`,
					color: themeColors[color],
				};
			case "outlined":
				return {
					backgroundColor: "transparent",
					borderColor: themeColors[color],
					borderWidth: 1,
					color: themeColors[color],
				};
			default:
				return {
					backgroundColor: "transparent",
					color: themeColors[color],
				};
		}
	};

	const variantColors = getVariantColors();

	const rootStyles: ViewStyle = {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		minHeight: config.minHeight,
		paddingHorizontal: config.paddingHorizontal,
		borderRadius: config.minHeight / 2, // Full pill shape
		opacity: disabled ? 0.6 : 1,
		transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
		...variantColors,
	};

	const contentContainerStyles: ViewStyle = {
		flexDirection: "row",
		alignItems: "center",
		gap: config.gap,
	};

	const handlePressIn = () => {
		if (clickable && !disabled) {
			setPressed(true);
		}
	};

	const handlePressOut = () => {
		setPressed(false);
	};

	const renderContent = () => (
		<View style={contentContainerStyles}>
			{startDecorator && <View>{startDecorator}</View>}
			<ThemedText
				style={{
					fontSize: config.fontSize,
					fontWeight: "500",
					textAlign: "center",
					color: variantColors.color,
				}}
				numberOfLines={1}
			>
				{children}
			</ThemedText>
			{endDecorator && <View>{endDecorator}</View>}
		</View>
	);

	// Convert style to ViewStyle compatible format
	const nativeStyle = style
		? (StyleSheet.flatten(style as StyleProp<ViewStyle>) as ViewStyle)
		: undefined;

	if (clickable) {
		return (
			<Pressable
				onPress={disabled ? undefined : onClick}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={disabled}
				accessible
				accessibilityLabel={ariaLabel}
				accessibilityRole="button"
				accessibilityState={{ disabled }}
				testID={testID}
				style={nativeStyle}
			>
				<View style={rootStyles}>{renderContent()}</View>
			</Pressable>
		);
	}

	return (
		<View
			style={[rootStyles, nativeStyle]}
			accessible
			accessibilityLabel={ariaLabel}
			testID={testID}
		>
			{renderContent()}
		</View>
	);
}
