import { forwardRef } from "react";
import { type TextProps as RNTextProps, StyleSheet, Text, type TextStyle } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import type { TypographyLevel, TypographyProps } from "./Typography.types";

const levelStyles: Record<TypographyLevel, TextStyle> = {
	h1: {
		fontSize: theme.fontSizes.xl5,
		fontWeight: "700",
		lineHeight: theme.fontSizes.xl5 * 1.2,
	},
	h2: {
		fontSize: theme.fontSizes.xl4,
		fontWeight: "700",
		lineHeight: theme.fontSizes.xl4 * 1.2,
	},
	h3: {
		fontSize: theme.fontSizes.xl3,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl3 * 1.25,
	},
	h4: {
		fontSize: theme.fontSizes.xl2,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl2 * 1.3,
	},
	"title-lg": {
		fontSize: theme.fontSizes.xl,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl * 1.35,
	},
	"title-md": {
		fontSize: theme.fontSizes.lg,
		fontWeight: "600",
		lineHeight: theme.fontSizes.lg * 1.35,
	},
	"title-sm": {
		fontSize: theme.fontSizes.md,
		fontWeight: "600",
		lineHeight: theme.fontSizes.md * 1.35,
	},
	"body-lg": {
		fontSize: theme.fontSizes.lg,
		fontWeight: "400",
		lineHeight: theme.fontSizes.lg * 1.45,
	},
	"body-md": {
		fontSize: theme.fontSizes.md,
		fontWeight: "400",
		lineHeight: theme.fontSizes.md * 1.5,
	},
	"body-sm": {
		fontSize: theme.fontSizes.sm,
		fontWeight: "400",
		lineHeight: theme.fontSizes.sm * 1.45,
	},
	"body-xs": {
		fontSize: theme.fontSizes.xs,
		fontWeight: "400",
		lineHeight: theme.fontSizes.xs * 1.45,
	},
	inherit: {},
};

type ColorKey = "primary" | "neutral" | "danger" | "success" | "warning";

const resolveThemeColor = (color?: string) => {
	if (!color) return undefined;
	const themeColor = theme.colors[color as keyof typeof theme.colors];
	return themeColor ?? color;
};

const resolveTextColor = (variant: string | undefined, color: ColorKey | undefined) => {
	if (variant === "solid" && color) {
		switch (color) {
			case "primary":
				return theme.colors.onPrimary;
			case "neutral":
				return theme.colors.onSurface;
			case "danger":
				return theme.colors.onError;
			case "success":
				return theme.colors.onSuccess;
			case "warning":
				return theme.colors.onWarning;
			default:
				return theme.colors.onSurface;
		}
	}

	return color ? (resolveThemeColor(color) ?? theme.colors.onSurface) : theme.colors.onSurface;
};

const buildVariantContainerStyle = (variant: string | undefined, color: ColorKey | undefined) => {
	if (!variant) return undefined;

	const colorValue = resolveThemeColor(color);

	switch (variant) {
		case "soft":
			return {
				backgroundColor: `${resolveThemeColor(color) ?? theme.colors.surface}33`,
				paddingHorizontal: theme.spacing.sm,
				paddingVertical: theme.spacing.xs,
				borderRadius: theme.radii.sm,
			};
		case "outlined":
			return {
				borderWidth: 1,
				borderColor: colorValue ?? theme.colors.outline,
				paddingHorizontal: theme.spacing.sm,
				paddingVertical: theme.spacing.xs,
				borderRadius: theme.radii.xs,
			};
		case "solid":
			return {
				backgroundColor: colorValue ?? theme.colors.primary,
				paddingHorizontal: theme.spacing.sm,
				paddingVertical: theme.spacing.xs,
				borderRadius: theme.radii.sm,
			};
		default:
			return undefined;
	}
};

export const Typography = forwardRef<Text, TypographyProps>(
	(
		{
			children,
			color,
			variant,
			level = "body-md",
			startDecorator,
			endDecorator,
			gutterBottom,
			noWrap,
			textAlign = "left",
			component,
			textColor,
			style,
			numberOfLines,
			ellipsizeMode,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const effectiveLevel = level in levelStyles ? level : "body-md";

		const textStyle = StyleSheet.flatten<TextStyle>([
			levelStyles[effectiveLevel as TypographyLevel],
			{ color: textColor ?? resolveTextColor(variant, color) },
			gutterBottom ? { marginBottom: theme.spacing.xs } : null,
			textAlign ? { textAlign } : null,
			style,
		]);

		const containerStyle = buildVariantContainerStyle(variant, color);

		const accessibilityRole: RNTextProps["accessibilityRole"] = component?.startsWith("h")
			? "header"
			: undefined;

		const content = (
			<Text
				ref={ref}
				style={textStyle}
				testID={containerStyle ? undefined : testID}
				numberOfLines={noWrap ? 1 : numberOfLines}
				ellipsizeMode={noWrap ? "tail" : ellipsizeMode}
				accessibilityLabel={ariaLabel}
				accessibilityRole={accessibilityRole}
			>
				{children}
			</Text>
		);

		if (!startDecorator && !endDecorator && !containerStyle) {
			return content;
		}

		return (
			<Box
				style={StyleSheet.flatten([{ flexDirection: "row", alignItems: "center" }, containerStyle])}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityRole={accessibilityRole}
			>
				{startDecorator ? <Box style={styles.decorator}>{startDecorator}</Box> : null}
				{content}
				{endDecorator ? <Box style={styles.decorator}>{endDecorator}</Box> : null}
			</Box>
		);
	},
);

Typography.displayName = "Typography";

const styles = StyleSheet.create({
	decorator: {
		marginLeft: theme.spacing.xs / 2,
		marginRight: theme.spacing.xs / 2,
	},
});
