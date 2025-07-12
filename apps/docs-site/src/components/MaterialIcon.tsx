"use client";

import type React from "react";

interface MaterialIconProps {
	name: string;
	size?: "sm" | "md" | "lg" | number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

const sizeMap = {
	sm: 18,
	md: 24,
	lg: 32,
};

export function MaterialIcon({
	name,
	size = "md",
	color = "currentColor",
	className = "",
	style = {},
}: MaterialIconProps) {
	const fontSize = typeof size === "number" ? size : sizeMap[size];

	return (
		<span
			className={`material-icons-round ${className}`}
			style={{
				fontSize,
				color,
				...style,
			}}
			aria-hidden="true"
		>
			{name}
		</span>
	);
}
