import React, { useMemo } from "react";
import { Text as RNText, type TextProps, type TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";

interface ThemedTextProps extends TextProps {
	variant?: "primary" | "secondary" | "disabled" | "error" | "success";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "regular" | "medium" | "semibold" | "bold";
	animated?: boolean;
}

export const ThemedText = withMemo<ThemedTextProps>(
	({
		variant = "primary",
		size = "md",
		weight = "regular",
		animated = false,
		style,
		children,
		...props
	}) => {
		const { theme } = useTheme();

		const textStyle = useMemo<TextStyle>(() => {
			const colorMap = {
				secondary: theme.colors.textSecondary,
				disabled: theme.colors.textDisabled,
				error: theme.colors.error,
				success: theme.colors.success,
				primary: theme.colors.text,
			};

			const sizeMap = {
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

			return {
				color: colorMap[variant] || colorMap.primary,
				fontSize: sizeMap[size],
				fontWeight: weightMap[weight],
				fontFamily: `Lexend${weight.charAt(0).toUpperCase() + weight.slice(1)}`,
				...(style as TextStyle),
			};
		}, [variant, size, weight, theme, style]);

		if (animated) {
			return (
				<Animated.Text style={[textStyle]} {...props}>
					{children}
				</Animated.Text>
			);
		}

		return (
			<RNText style={textStyle} {...props}>
				{children}
			</RNText>
		);
	},
	"ThemedText",
);
