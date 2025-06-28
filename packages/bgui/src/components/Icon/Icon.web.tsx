import { useThemeColor } from "@braingame/utils";
import type React from "react";
import { sizeMap } from "./styles";
import type { IconProps } from "./types";

export function Icon({
	name,
	variant = "regular",
	size = "md",
	color,
	decorative = false,
	"aria-label": ariaLabel,
	style,
}: IconProps) {
	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const iconColor = useThemeColor(color ?? "icon");

	// Map variants to Font Awesome class prefixes
	const variantMap: Record<string, string> = {
		regular: "far",
		solid: "fas",
		light: "fal",
		duotone: "fad",
		brands: "fab",
	};

	const fontAwesomeClass = `${variantMap[variant]} fa-${name}`;

	// Convert React Native style to web CSS
	const baseStyle: React.CSSProperties = {
		fontSize: iconSize,
		color: iconColor,
	};

	// Safely merge styles - style could be an array or object in React Native
	const webStyle = style
		? Array.isArray(style)
			? Object.assign({}, baseStyle, ...style.filter(Boolean))
			: Object.assign({}, baseStyle, style)
		: baseStyle;

	return (
		<i
			className={fontAwesomeClass}
			style={webStyle}
			role="img"
			aria-label={decorative ? undefined : ariaLabel}
			aria-hidden={decorative}
		/>
	);
}
