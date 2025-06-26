import { useThemeColor } from "@braingame/utils";
import { Text as RNText } from "react-native";
import { getFontFamily, getTextColor, getVariantWeight, textVariantStyles } from "./styles";
import type { TextProps } from "./types";

/**
 * Enhanced Text component combining bg1's typography system with current architecture.
 * Uses Lexend font family with proper weights, supports monospace variant.
 * Maintains backward compatibility while providing improved semantic variants.
 *
 * @example
 * ```tsx
 * // Basic text
 * <Text>Hello World</Text>
 *
 * // Different variants
 * <Text variant="displayTitle">Hero Title</Text>
 * <Text variant="heading">Section Heading</Text>
 * <Text variant="caption">Small caption text</Text>
 *
 * // With color
 * <Text color="primary">Primary colored text</Text>
 * <Text color="danger">Error message</Text>
 *
 * // Monospace text
 * <Text mono>const code = 'example';</Text>
 *
 * // Truncated text
 * <Text numberOfLines={2}>Very long text that will be truncated...</Text>
 *
 * // Centered text
 * <Text align="center">Centered content</Text>
 * ```
 *
 * @component
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
