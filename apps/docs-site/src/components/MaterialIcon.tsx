"use client";

import { Icon } from "@braingame/bgui";
import type React from "react";

interface MaterialIconProps {
	name: string;
	size?: "sm" | "md" | "lg" | number;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
}

export function MaterialIcon({
	name,
	size = "md",
	color = "currentColor",
	className = "",
	style = {},
}: MaterialIconProps) {
	return <Icon name={name as any} size={size} color={color} style={style} />;
}
