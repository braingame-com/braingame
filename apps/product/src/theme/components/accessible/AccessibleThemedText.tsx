import React, { useMemo } from "react";
import {
	Text as RNText,
	type TextProps,
	type TextStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { getScaledFontSize, useAccessibility } from "../../../contexts/AccessibilityContext";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";

interface AccessibleThemedTextProps extends TextProps {
	variant?: "primary" | "secondary" | "disabled" | "error" | "success";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "regular" | "medium" | "semibold" | "bold";
	animated?: boolean;
	isHeading?: boolean;
}

export const AccessibleThemedText = withMemo<AccessibleThemedTextProps>(
	({
		variant = "primary",
		size = "md",
		weight = "regular",
		animated = false,
		style,
		children,
		isHeading = false,
		accessibilityLabel,
		...props
	}) => {
		const { theme } = useTheme();
		const { fontSize: userFontSize, boldTextEnabled } = useAccessibility();

		const textStyle = useMemo<TextStyle>(() => {
			const colorMap = {
				secondary: theme.colors.textSecondary,
				disabled: theme.colors.textDisabled,
				error: theme.colors.error,
				success: theme.colors.success,
				primary: theme.colors.text,
			};

			const baseSizeMap = {
				xs: theme.sizes.fontSizeXS,
				sm: theme.sizes.fontSizeSM,
				md: theme.sizes.fontSizeMD,
				lg: theme.sizes.fontSizeLG,
				xl: theme.sizes.fontSizeXL,
				"2xl": theme.sizes.fontSize2XL,
				"3xl": theme.sizes.fontSize3XL,
				"4xl": theme.sizes.fontSize4XL,
			};

			const weightMap = {
				regular: "400" as const,
				medium: "500" as const,
				semibold: "600" as const,
				bold: "700" as const,
			};

			// Apply user font size preference
			const scaledFontSize = getScaledFontSize(baseSizeMap[size], userFontSize);

			// Apply bold text preference
			const finalWeight = boldTextEnabled ? "700" : weightMap[weight];

			return {
				color: colorMap[variant] || colorMap.primary,
				fontSize: scaledFontSize,
				fontWeight: finalWeight,
				fontFamily: `Lexend${weight.charAt(0).toUpperCase() + weight.slice(1)}`,
				...(style as TextStyle),
			};
		}, [variant, size, weight, theme, style, userFontSize, boldTextEnabled]);

		const accessibilityProps = {
			accessible: true,
			accessibilityLabel:
				accessibilityLabel || (typeof children === "string" ? children : undefined),
			accessibilityRole: isHeading ? "header" : "text",
		};

		if (animated) {
			return (
				<Animated.Text style={[textStyle]} {...accessibilityProps} {...props}>
					{children}
				</Animated.Text>
			);
		}

		return (
			<RNText style={textStyle} {...accessibilityProps} {...props}>
				{children}
			</RNText>
		);
	},
	"AccessibleThemedText",
);