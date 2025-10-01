import { forwardRef, useMemo } from "react";
import { Platform, StyleSheet, Text, type TextStyle } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../Box";
import type { TypographyLevel, TypographyProps } from "./Typography.types";

type VariantStyle = {
	backgroundColor?: string;
	borderColor?: string;
	borderWidth?: number;
	color?: string;
};

const createLevelStyles = (theme: Theme): Record<TypographyLevel, TextStyle> => ({
	h1: {
		fontSize: theme.fontSizes.xl5,
		fontWeight: "700",
		lineHeight: theme.fontSizes.xl5 * 1.2,
		fontFamily: "Lexend",
	},
	h2: {
		fontSize: theme.fontSizes.xl4,
		fontWeight: "700",
		lineHeight: theme.fontSizes.xl4 * 1.2,
		fontFamily: "Lexend",
	},
	h3: {
		fontSize: theme.fontSizes.xl3,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl3 * 1.25,
		fontFamily: "Lexend",
	},
	h4: {
		fontSize: theme.fontSizes.xl2,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl2 * 1.3,
		fontFamily: "Lexend",
	},
	"title-lg": {
		fontSize: theme.fontSizes.xl,
		fontWeight: "600",
		lineHeight: theme.fontSizes.xl * 1.35,
		fontFamily: "Lexend",
	},
	"title-md": {
		fontSize: theme.fontSizes.lg,
		fontWeight: "600",
		lineHeight: theme.fontSizes.lg * 1.35,
		fontFamily: "Lexend",
	},
	"title-sm": {
		fontSize: theme.fontSizes.md,
		fontWeight: "600",
		lineHeight: theme.fontSizes.md * 1.35,
		fontFamily: "Lexend",
	},
	"body-lg": {
		fontSize: theme.fontSizes.lg,
		fontWeight: "400",
		lineHeight: theme.fontSizes.lg * 1.45,
		fontFamily: "Lexend",
	},
	"body-md": {
		fontSize: theme.fontSizes.md,
		fontWeight: "400",
		lineHeight: theme.fontSizes.md * 1.5,
		fontFamily: "Lexend",
	},
	"body-sm": {
		fontSize: theme.fontSizes.sm,
		fontWeight: "400",
		lineHeight: theme.fontSizes.sm * 1.45,
		fontFamily: "Lexend",
	},
	"body-xs": {
		fontSize: theme.fontSizes.xs,
		fontWeight: "400",
		lineHeight: theme.fontSizes.xs * 1.45,
		fontFamily: "Lexend",
	},
	inherit: {},
});

const resolveThemeColor = (theme: Theme, color?: string) => {
	if (!color) return undefined;
	const themeColor = theme.colors[color as keyof Theme["colors"]];
	return themeColor ?? color;
};

const resolveVariantTokens = (
	theme: Theme,
	variant: TypographyProps["variant"],
	color: TypographyProps["color"],
): VariantStyle | undefined => {
	if (!variant) return undefined;

	const variantMap = theme.components.Typography?.variants as
		| Record<string, VariantStyle>
		| undefined;
	if (!variantMap) return undefined;

	const key = `${variant}-${color ?? "neutral"}`;
	return variantMap[key];
};

export const Typography = forwardRef<Text, TypographyProps>(
	(
		{
			children,
			color = "neutral",
			variant = "plain",
			level = "body-md",
			startDecorator,
			endDecorator,
			gutterBottom = false,
			noWrap = false,
			textAlign = "left",
			component,
			textColor,
			style,
			numberOfLines,
			ellipsizeMode,
			testID,
			className,
			accessibilityRole: accessibilityRoleProp,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
			...rest
		},
		ref,
	) => {
		const theme = useTheme();
		const levelStyles = useMemo(() => createLevelStyles(theme), [theme]);
		const decoratorStyle = useMemo(
			() => ({
				marginLeft: theme.spacing.xs / 2,
				marginRight: theme.spacing.xs / 2,
			}),
			[theme],
		);
		const effectiveLevel = level in levelStyles ? level : "body-md";
		const variantTokens = resolveVariantTokens(theme, variant, color);

		const resolvedTextColor =
			textColor ??
			(variantTokens?.color
				? resolveThemeColor(theme, variantTokens.color)
				: (resolveThemeColor(theme, color) ?? theme.colors.onSurface));

		const textStyles = StyleSheet.flatten<TextStyle>([
			levelStyles[effectiveLevel as TypographyLevel],
			{ color: resolvedTextColor, textAlign },
			gutterBottom ? { marginBottom: theme.spacing.xs } : null,
			style,
		]);

		const containerStyle =
			variant !== "plain" && variantTokens
				? {
						backgroundColor: resolveThemeColor(theme, variantTokens.backgroundColor),
						borderColor: resolveThemeColor(theme, variantTokens.borderColor),
						borderWidth: variantTokens.borderWidth ?? (variant === "outlined" ? 1 : 0),
						borderRadius: theme.radii.xs,
						paddingHorizontal: theme.spacing.sm,
						paddingVertical: theme.spacing.xs,
					}
				: undefined;

		const decoratorsPresent = Boolean(startDecorator || endDecorator);
		const shouldWrap = decoratorsPresent || Boolean(containerStyle);

		const resolvedNumberOfLines = noWrap ? 1 : numberOfLines;
		const resolvedEllipsizeMode = noWrap ? "tail" : ellipsizeMode;

		const derivedRole =
			accessibilityRoleProp ?? (component?.startsWith("h") ? "header" : undefined);

		const accessibilityProps = {
			accessibilityLabel: ariaLabel,
			accessibilityHint: ariaDescribedby,
			accessibilityLabelledBy: ariaLabelledby,
			accessibilityRole: derivedRole,
		} as const;

		const webProps =
			Platform.OS === "web"
				? {
						className,
						...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
						...(ariaLabelledby ? { "aria-labelledby": ariaLabelledby } : {}),
					}
				: {};

		const textElement = (
			<Text
				ref={ref}
				style={textStyles}
				testID={shouldWrap ? undefined : testID}
				numberOfLines={resolvedNumberOfLines}
				ellipsizeMode={resolvedEllipsizeMode}
				{...accessibilityProps}
				{...webProps}
				{...rest}
			>
				{children}
			</Text>
		);

		if (!shouldWrap) {
			return textElement;
		}

		return (
			<Box
				style={StyleSheet.flatten([{ flexDirection: "row", alignItems: "center" }, containerStyle])}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityRole={derivedRole}
			>
				{startDecorator ? <Box style={decoratorStyle}>{startDecorator}</Box> : null}
				{textElement}
				{endDecorator ? <Box style={decoratorStyle}>{endDecorator}</Box> : null}
			</Box>
		);
	},
);

Typography.displayName = "Typography";
