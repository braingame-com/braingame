"use client";

import { useThemeColor } from "@braingame/utils";
import { sizeMap } from "./styles";
import type { IconProps, ThemeColor } from "./types";

export function Icon({
	name,
	variant: _variant = "regular",
	size = "md",
	color,
	decorative = false,
	"aria-label": ariaLabel,
	style,
}: IconProps) {
	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const defaultColor = useThemeColor("icon");
	// Always call useThemeColor with a safe value
	const isThemeColor = color && typeof color === "string" && !color.startsWith("#");
	const colorKey = isThemeColor ? color : "icon";
	const themeColor = useThemeColor(colorKey as ThemeColor);
	const iconColor = isThemeColor ? themeColor : color || defaultColor;

	const iconStyle: React.CSSProperties = {
		fontFamily: "'Material Icons Round'",
		fontSize: iconSize,
		color: iconColor as string,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 1,
		letterSpacing: "normal",
		textTransform: "none",
		display: "inline-block",
		whiteSpace: "nowrap",
		wordWrap: "normal",
		direction: "ltr",
		WebkitFontFeatureSettings: "'liga'",
		WebkitFontSmoothing: "antialiased",
		...((style as React.CSSProperties) || {}),
	};

	// Only add aria-label when role is img
	const spanProps = decorative
		? {
				role: "presentation",
				"aria-hidden": true,
			}
		: {
				role: "img",
				"aria-label": ariaLabel,
			};

	return (
		<span {...spanProps} style={iconStyle}>
			{name}
		</span>
	);
}
