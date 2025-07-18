"use client";

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
	const sizeMap = {
		sm: 18,
		md: 24,
		lg: 32,
	};
	
	const iconSize = typeof size === 'number' ? size : sizeMap[size];
	
	// Simple icon implementation using Unicode symbols for now
	const iconMap: Record<string, string> = {
		'dark_mode': '🌙',
		'light_mode': '☀️',
		'menu': '☰',
		'close': '✕',
		'chevron_right': '›',
		'chevron_left': '‹',
		'arrow_forward': '→',
		'arrow_back': '←',
	};
	
	return (
		<span 
			className={`material-icon ${className}`}
			style={{
				fontSize: iconSize,
				color,
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: iconSize,
				height: iconSize,
				...style
			}}
		>
			{iconMap[name] || '•'}
		</span>
	);
}
