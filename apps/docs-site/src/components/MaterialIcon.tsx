"use client";

import type React from "react";

interface MaterialIconProps {
	name: string;
	size?: "small" | "medium" | "large" | number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

const sizeMap = {
	small: 18,
	medium: 24,
	large: 32,
};

export function MaterialIcon({
	name,
	size = "medium",
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
