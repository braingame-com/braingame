import { textStyles } from "@braingame/utils";
import type { TextProps, TextVariant } from "./types";

// Map legacy and extended variants to available styles
const variantMap: Record<TextVariant, keyof typeof textStyles> = {
	// Legacy variants
	h1: "displayTitle",
	h2: "title",
	h3: "subtitle",
	body: "default",
	caption: "small",
	// Enhanced variants
	displayTitle: "displayTitle",
	title: "title",
	heading: "subtitle",
	subtitle: "subtitle",
	bold: "default",
	text: "default",
	secondaryText: "small",
	small: "small",
	smallThin: "small",
};

export function Text({ children, variant = "body", style, color, align, ...rest }: TextProps) {
	const mappedVariant = variantMap[variant];
	const variantStyles = textStyles[mappedVariant] || textStyles.default;

	const combinedStyle: React.CSSProperties = {
		...variantStyles,
		...(color && { color }),
		...(align && { textAlign: align }),
		...(style as React.CSSProperties),
	};

	return (
		<span style={combinedStyle} {...rest}>
			{children}
		</span>
	);
}
