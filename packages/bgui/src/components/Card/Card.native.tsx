import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { type GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { CardProps } from "./CardProps";

/**
 * Native implementation of Card component
 *
 * Cards contain content and actions about a single subject.
 * Uses Pressable for touch interactions.
 */

export const Card = forwardRef<View, CardProps>(
	(
		{
			children,
			color = "neutral",
			variant = "outlined",
			size = "md",
			orientation = "vertical",
			invertedColors = false,
			onClick,
			onPressIn,
			onPressOut,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const cardRef = useRef<View>(null);

		// Merge refs
		useImperativeHandle(ref, () => cardRef.current!);

		// Get card variant style from theme
		const getCardVariantStyle = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Card.variants;
			const variantStyle = theme.components.Card.variants[variantKey];

			if (!variantStyle) {
				// Fallback to outlined neutral
				return theme.components.Card.variants["outlined-neutral"];
			}

			return variantStyle;
		};

		// Get size-based padding
		const getSizePadding = () => {
			const paddingMap = {
				sm: "sm",
				md: "md",
				lg: "lg",
			};
			return paddingMap[size] as keyof typeof theme.spacing;
		};

		// Get border radius based on size
		const getBorderRadius = () => {
			const radiusMap = {
				sm: theme.radii.sm,
				md: theme.radii.md,
				lg: theme.radii.lg,
			};
			return radiusMap[size];
		};

		// Handle press events
		const handlePress = (event: GestureResponderEvent) => {
			if (onClick) {
				onClick(event);
			}
		};

		const handlePressIn = (event: GestureResponderEvent) => {
			onPressIn?.(event);
		};

		const handlePressOut = (event: GestureResponderEvent) => {
			onPressOut?.(event);
		};

		// Get card styles
		const cardVariantStyle = getCardVariantStyle();
		const padding = getSizePadding();
		const borderRadius = getBorderRadius();

		// Build shadow style for outlined variant
		const shadowStyle =
			variant === "outlined"
				? {
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 1 },
						shadowOpacity: 0.1,
						shadowRadius: 3,
						elevation: 2, // Android shadow
					}
				: {};

		const cardStyle = [
			styles.base,
			cardVariantStyle,
			{
				borderRadius,
				flexDirection: orientation === "horizontal" ? "row" : "column",
			},
			shadowStyle,
			style,
		];

		// If card is clickable, use Pressable
		if (onClick) {
			return (
				<Pressable
					ref={cardRef}
					onPress={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					testID={testID}
					accessibilityRole="button"
					accessibilityLabel={ariaLabel}
					style={({ pressed }) => [
						cardStyle,
						{
							opacity: pressed ? 0.8 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						},
					]}
					{...props}
				>
					<Box padding={padding} flex={1}>
						{children}
					</Box>
				</Pressable>
			);
		}

		// Non-clickable card
		return (
			<View
				ref={cardRef}
				style={cardStyle}
				testID={testID}
				accessibilityLabel={ariaLabel}
				{...props}
			>
				<Box padding={padding} flex={1}>
					{children}
				</Box>
			</View>
		);
	},
);

const styles = StyleSheet.create({
	base: {
		overflow: "hidden",
		position: "relative",
	},
});
