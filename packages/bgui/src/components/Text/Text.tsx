import { useThemeColor } from "@braingame/utils";
import { Text as RNText } from "react-native";

import { getFontFamily, getTextColor, getVariantWeight, textVariantStyles } from "./styles";
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
	const baseColor = useThemeColor("text");
	const secondaryColor = useThemeColor("textSecondary");

	const resolvedColor = getTextColor(color, baseColor, secondaryColor);
	const fontWeight = getVariantWeight(variant);
	const fontFamily = getFontFamily(mono, fontWeight);

	// Get variant style, fallback to body if variant doesn't exist
	const variantStyle = textVariantStyles[variant as keyof typeof textVariantStyles] || textVariantStyles.body;

	return (
		<RNText
			numberOfLines={numberOfLines}
			style={[
				{
					color: resolvedColor,
					textAlign: align,
					fontFamily,
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
