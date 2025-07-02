import { useThemeColor } from "@braingame/utils";
import { sizeMap } from "./styles";
import type { IconProps } from "./types";

export function Icon({
	name: _name,
	variant: _variant = "regular",
	size = "md",
	color,
	decorative = false,
	"aria-label": ariaLabel,
	style,
}: IconProps) {
	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const iconColor = useThemeColor(color ?? "icon");

	// For web, we'll use a simple fallback
	// In a real implementation, you might use react-icons or another web-compatible icon library
	const role = decorative ? "presentation" : ariaLabel ? "img" : undefined;

	const spanProps: React.HTMLAttributes<HTMLSpanElement> = {
		role,
		"aria-hidden": decorative || undefined,
	};

	// Only add aria-label when role is "img"
	if (role === "img" && ariaLabel) {
		spanProps["aria-label"] = ariaLabel;
	}

	return (
		<span
			{...spanProps}
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: iconSize,
				height: iconSize,
				color: iconColor,
				fontSize: iconSize,
				...((style as React.CSSProperties) || {}),
			}}
		>
			{/* Placeholder for web icons - you can replace this with a proper web icon library */}
			<svg
				width={iconSize}
				height={iconSize}
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<title>{decorative ? "" : ariaLabel || "Icon"}</title>
				<circle cx="12" cy="12" r="10" opacity="0.3" />
			</svg>
		</span>
	);
}
