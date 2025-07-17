import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text as RNText, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { TextProps } from "./TextProps";

/**
 * Native implementation of Text component
 *
 * Text components present your design and content clearly and efficiently.
 * This implementation provides a comprehensive text styling system with theme integration.
 * Supports both Restyle variants (h1, body1, button) and Joy UI levels (body-md, title-lg) for backward compatibility.
 */

export const Text = forwardRef<RNText, TextProps>(
	(
		{
			children,
			color,
			variant,
			level,
			startDecorator,
			endDecorator,
			gutterBottom = false,
			noWrap = false,
			textAlign = "left",
			component,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const textRef = useRef<RNText>(null);

		// Map Restyle variants to Joy UI levels if variant is a typography variant
		const effectiveLevel = (() => {
			if (level) return level;
			
			// Check if variant is a Restyle typography variant
			const restyleVariantMap: Record<string, string> = {
				h1: "h1",
				h2: "h2",
				h3: "h3",
				h4: "h4",
				h5: "title-lg",
				h6: "title-md",
				body1: "body-md",
				body2: "body-sm",
				button: "body-sm",
				caption: "body-xs",
				overline: "body-xs",
				subtitle1: "title-md",
				subtitle2: "title-sm",
			};
			
			if (variant && restyleVariantMap[variant]) {
				return restyleVariantMap[variant];
			}
			
			return "body-md";
		})();

		// Merge refs
		useImperativeHandle(ref, () => textRef.current!);

		// Get typography level styles
		const getLevelStyles = () => {
			const levelStyles = {
				h1: {
					fontSize: theme.fontSizes.xl4,
					fontWeight: "700" as const,
					lineHeight: theme.fontSizes.xl4 * 1.2,
					letterSpacing: -0.5,
				},
				h2: {
					fontSize: theme.fontSizes.xl3,
					fontWeight: "700" as const,
					lineHeight: theme.fontSizes.xl3 * 1.2,
					letterSpacing: -0.25,
				},
				h3: {
					fontSize: theme.fontSizes.xl2,
					fontWeight: "600" as const,
					lineHeight: theme.fontSizes.xl2 * 1.25,
					letterSpacing: 0,
				},
				h4: {
					fontSize: theme.fontSizes.xl,
					fontWeight: "600" as const,
					lineHeight: theme.fontSizes.xl * 1.3,
					letterSpacing: 0,
				},
				"title-lg": {
					fontSize: theme.fontSizes.lg,
					fontWeight: "600" as const,
					lineHeight: theme.fontSizes.lg * 1.4,
					letterSpacing: 0,
				},
				"title-md": {
					fontSize: theme.fontSizes.md,
					fontWeight: "600" as const,
					lineHeight: theme.fontSizes.md * 1.4,
					letterSpacing: 0,
				},
				"title-sm": {
					fontSize: theme.fontSizes.sm,
					fontWeight: "600" as const,
					lineHeight: theme.fontSizes.sm * 1.4,
					letterSpacing: 0,
				},
				"body-lg": {
					fontSize: theme.fontSizes.lg,
					fontWeight: "400" as const,
					lineHeight: theme.fontSizes.lg * 1.5,
					letterSpacing: 0,
				},
				"body-md": {
					fontSize: theme.fontSizes.md,
					fontWeight: "400" as const,
					lineHeight: theme.fontSizes.md * 1.5,
					letterSpacing: 0,
				},
				"body-sm": {
					fontSize: theme.fontSizes.sm,
					fontWeight: "400" as const,
					lineHeight: theme.fontSizes.sm * 1.5,
					letterSpacing: 0,
				},
				"body-xs": {
					fontSize: theme.fontSizes.xs,
					fontWeight: "400" as const,
					lineHeight: theme.fontSizes.xs * 1.5,
					letterSpacing: 0,
				},
				inherit: {
					fontSize: "inherit" as any,
					fontWeight: "inherit" as any,
					lineHeight: "inherit" as any,
					letterSpacing: "inherit" as any,
				},
			};

			return levelStyles[effectiveLevel] || levelStyles["body-md"];
		};

		// Get color styles
		const getColorStyles = () => {
			// Special handling for button variant
			if (variant === "button" && !color) {
				return { color: theme.colors.onPrimary };
			}
			
			if (!color) return { color: theme.colors.onSurface };

			const colorMap = {
				primary: theme.colors.primary,
				neutral: theme.colors.onSurface,
				danger: theme.colors.error,
				success: theme.colors.success,
				warning: theme.colors.warning,
			};

			return { color: colorMap[color] || theme.colors.onSurface };
		};

		// Check if variant is a style variant (not a typography variant)
		const isStyleVariant = (v: string): boolean => {
			return ["plain", "outlined", "soft", "solid"].includes(v);
		};

		// Get variant styles
		const getVariantStyles = () => {
			if (!variant || !color || !isStyleVariant(variant)) return {};

			const variantStyles = {
				plain: {
					backgroundColor: "transparent",
					paddingHorizontal: 0,
					paddingVertical: 0,
				},
				outlined: {
					backgroundColor: "transparent",
					borderWidth: 1,
					borderColor: theme.colors[color] || theme.colors.outline,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
					borderRadius: theme.radii.xs,
				},
				soft: {
					backgroundColor: theme.colors.surfaceVariant,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
					borderRadius: theme.radii.xs,
				},
				solid: {
					backgroundColor: theme.colors[color] || theme.colors.primary,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
					borderRadius: theme.radii.xs,
				},
			};

			return variantStyles[variant] || {};
		};

		const levelStyles = getLevelStyles();
		const colorStyles = getColorStyles();
		const variantStyles = getVariantStyles();

		// Get additional styles for specific Restyle variants
		const getRestyleVariantStyles = () => {
			if (variant === "button") {
				return {
					textTransform: "uppercase" as const,
					letterSpacing: 0.5,
					fontWeight: "600" as const,
				};
			}
			return {};
		};

		// Build text styles
		const textStyles = [
			styles.text,
			levelStyles,
			colorStyles,
			getRestyleVariantStyles(),
			{
				textAlign,
				marginBottom: gutterBottom ? theme.spacing.md : 0,
			},
			noWrap && {
				numberOfLines: 1,
				ellipsizeMode: "tail" as const,
			},
			style,
		];

		// Container styles for variants
		const containerStyles = [
			styles.container,
			variantStyles,
			{
				alignSelf: "flex-start",
			},
		];

		// Determine if we need a container (for style variants)
		const needsContainer = variant && isStyleVariant(variant) && variant !== "plain";

		const textElement = (
			<RNText
				ref={textRef}
				style={textStyles}
				testID={testID}
				accessible={true}
				accessibilityLabel={ariaLabel}
				accessibilityRole="text"
				numberOfLines={noWrap ? 1 : undefined}
				ellipsizeMode={noWrap ? "tail" : undefined}
			>
				{children}
			</Text>
		);

		// If we have decorators or need a container, wrap in Box
		if (startDecorator || endDecorator || needsContainer) {
			return (
				<Box
					flexDirection="row"
					alignItems="center"
					style={needsContainer ? containerStyles : undefined}
				>
					{startDecorator && <Box marginRight="xs">{startDecorator}</Box>}

					{textElement}

					{endDecorator && <Box marginLeft="xs">{endDecorator}</Box>}
				</Box>
			);
		}

		return textElement;
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontFamily: "System",
		includeFontPadding: false,
		textAlignVertical: "center",
	},
});
