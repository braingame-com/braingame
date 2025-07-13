"use client";

import { useThemeColor } from "@braingame/utils";
import { getFontFamily, getTextColor, getVariantWeight, textVariantStyles } from "./styles";
import type { TextProps } from "./types";

/**
 * Enhanced Text component combining bg1's typography system with current architecture
 * Web version for Next.js compatibility
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

	const webStyle: React.CSSProperties = {
		color: resolvedColor as string,
		textAlign: align,
		fontFamily,
		...((variantStyle as React.CSSProperties) || {}),
		...(numberOfLines && {
			overflow: "hidden",
			textOverflow: "ellipsis",
			display: "-webkit-box",
			WebkitLineClamp: numberOfLines,
			WebkitBoxOrient: "vertical",
		}),
		...((style as React.CSSProperties) || {}),
	};

	// Determine appropriate HTML element based on variant
	const getElement = () => {
		switch (variant) {
			case "h1":
				return "h1";
			case "h2":
				return "h2";
			case "h3":
				return "h3";
			case "title":
				return "h2";
			case "subtitle":
				return "h3";
			case "caption":
				return "span";
			default:
				return "p";
		}
	};

	const Element = getElement();

	return (
		<Element style={webStyle} {...rest}>
			{children}
		</Element>
	);
};
