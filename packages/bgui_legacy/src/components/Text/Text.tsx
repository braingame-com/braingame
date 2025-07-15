"use client";

import { Text as RNText } from "react-native";
import { useTheme } from "../../theme";
import {
	getFontFamily,
	getFontWeightValue,
	getTextColor,
	getVariantWeight,
	textVariantStyles,
} from "./styles";
import type { TextProps } from "./types";

/**
 * Enhanced Text component combining bg1's typography system with current architecture
 * Uses Lexend font family with proper weights, supports monospace variant
 * Maintains backward compatibility while providing improved semantic variants
 */
export const Text = ({
	children,
	variant = "body",
	color,
	align = "left",
	numberOfLines,
	mono = false,
	style,
	...rest
}: TextProps) => {
	const { colors } = useTheme();

	const resolvedColor = getTextColor(color, colors);
	const fontWeight = getVariantWeight(variant);
	const fontFamily = getFontFamily(mono);
	const fontWeightValue = mono ? undefined : getFontWeightValue(fontWeight);

	// Get variant style, fallback to body if variant doesn't exist
	const variantStyle =
		textVariantStyles[variant as keyof typeof textVariantStyles] || textVariantStyles.body;

	return (
		<RNText
			numberOfLines={numberOfLines}
			style={[
				{
					color: resolvedColor,
					textAlign: align,
					fontFamily,
					...(fontWeightValue && { fontWeight: fontWeightValue }),
				},
				variantStyle,
				style,
			]}
			{...rest}
		>
			{children}
		</RNText>
	);
};
