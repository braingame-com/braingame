import { useThemeColor } from "@braingame/utils";
import { sizeMap } from "./styles";
import type { IconProps } from "./types";

// Web-compatible icon mapping for FontAwesome
const iconMap: Record<string, string> = {
	// Common icons used in the app
	home: "🏠",
	user: "👤",
	settings: "⚙️",
	search: "🔍",
	menu: "☰",
	close: "✕",
	check: "✓",
	"arrow-left": "←",
	"arrow-right": "→",
	"arrow-up": "↑",
	"arrow-down": "↓",
	plus: "+",
	minus: "−",
	heart: "♥",
	star: "★",
	bell: "🔔",
	mail: "✉",
	lock: "🔒",
	unlock: "🔓",
	eye: "👁",
	"eye-slash": "🙈",
	edit: "✏️",
	trash: "🗑️",
	download: "⬇",
	upload: "⬆",
	share: "🔗",
	copy: "📋",
	save: "💾",
	print: "🖨️",
	calendar: "📅",
	clock: "🕐",
	location: "📍",
	camera: "📷",
	image: "🖼️",
	video: "🎥",
	music: "🎵",
	file: "📄",
	folder: "📁",
	link: "🔗",
	wifi: "📶",
	bluetooth: "🔵",
	battery: "🔋",
	volume: "🔊",
	microphone: "🎤",
	headphones: "🎧",
	phone: "📞",
	message: "💬",
	comment: "💭",
	"thumbs-up": "👍",
	"thumbs-down": "👎",
	warning: "⚠️",
	error: "❌",
	info: "ℹ️",
	success: "✅",
	question: "❓",
	exclamation: "❗",
};

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
	const iconColor = useThemeColor(color ?? "icon");

	// Map FontAwesome icon names to Unicode equivalents
	const iconSymbol = iconMap[name] || "?";

	return (
		<span
			role={decorative ? "presentation" : "img"}
			aria-label={decorative ? undefined : ariaLabel || name}
			aria-hidden={decorative}
			style={{
				fontSize: iconSize,
				color: iconColor,
				display: "inline-block",
				lineHeight: 1,
				fontFamily: "system-ui, -apple-system, sans-serif",
				userSelect: "none",
				...style,
			}}
		>
			{iconSymbol}
		</span>
	);
}
