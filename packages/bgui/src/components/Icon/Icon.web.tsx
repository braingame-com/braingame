<<<<<<< HEAD
"use client";

import React from "react";
import type { IconProps } from "./types";

const iconMap: Record<string, string> = {
	// Common icons used in the app
	home: "🏠",
	user: "👤",
	"user-circle": "👤",
	search: "🔍",
	heart: "❤️",
	star: "⭐",
	check: "✓",
	close: "✕",
	"chevron-left": "‹",
	"chevron-right": "›",
	"chevron-up": "^",
	"chevron-down": "v",
	plus: "+",
	minus: "-",
	edit: "✏️",
	trash: "🗑️",
	share: "📤",
	download: "📥",
	upload: "📤",
	camera: "📷",
	image: "🖼️",
	video: "🎥",
	music: "🎵",
	file: "📄",
	folder: "📁",
	calendar: "📅",
	clock: "🕐",
	bell: "🔔",
	"bell-slash": "🔕",
	envelope: "✉️",
	comment: "💬",
	cog: "⚙️",
	"sign-out": "🚪",
	"sign-in": "🔑",
	lock: "🔒",
	unlock: "🔓",
	eye: "👁️",
	"eye-slash": "👁️‍🗨️",
	warning: "⚠️",
	info: "ℹ️",
	"exclamation-circle": "❗",
	"check-circle": "✅",
	"times-circle": "❌",
	"question-circle": "❓",
};

export function Icon({
	name,
	size = 24,
	color = "#000",
	variant = "solid",
	style,
	"aria-label": ariaLabel,
	decorative = false,
	...props
}: IconProps) {
	// Get icon character or fallback
	const icon = iconMap[name] || "•";

	// Handle different size types
	const iconSize =
		typeof size === "string" ? (size === "small" ? 16 : size === "large" ? 32 : 24) : size;

	return (
		<span
			style={{
				fontSize: iconSize,
				color,
				display: "inline-block",
				lineHeight: 1,
				textAlign: "center",
				userSelect: "none",
				...style,
			}}
			aria-label={decorative ? undefined : ariaLabel || name}
			aria-hidden={decorative}
			role={decorative ? "presentation" : "img"}
			{...props}
		>
			{icon}
=======
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
>>>>>>> origin/main
		</span>
	);
}
