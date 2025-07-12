"use client";

import React from "react";
import type { TextProps } from "./types";

const variantStyles = {
	displayTitle: {
		fontSize: 48,
		fontWeight: "800" as const,
		lineHeight: 1.2,
		letterSpacing: -0.5,
	},
	title: {
		fontSize: 32,
		fontWeight: "700" as const,
		lineHeight: 1.3,
	},
	subtitle: {
		fontSize: 24,
		fontWeight: "600" as const,
		lineHeight: 1.4,
	},
	body: {
		fontSize: 16,
		fontWeight: "400" as const,
		lineHeight: 1.5,
	},
	caption: {
		fontSize: 14,
		fontWeight: "400" as const,
		lineHeight: 1.4,
		opacity: 0.8,
	},
	small: {
		fontSize: 12,
		fontWeight: "400" as const,
		lineHeight: 1.4,
		opacity: 0.7,
	},
	bold: {
		fontSize: 16,
		fontWeight: "700" as const,
		lineHeight: 1.5,
	},
	error: {
		fontSize: 14,
		fontWeight: "500" as const,
		color: "#ef4444",
		lineHeight: 1.4,
	},
};

export function Text({
	children,
	variant = "body",
	style,
	highlight,
	highlightColor = "#007bff",
	...props
}: TextProps) {
	const baseStyle = variantStyles[variant] || variantStyles.body;

	// Handle text highlighting
	if (highlight && typeof children === "string") {
		const parts = children.split(new RegExp(`(${highlight})`, "gi"));
		return (
			<span style={{ ...baseStyle, ...style }} {...props}>
				{parts.map((part, index) => {
					if (part.toLowerCase() === highlight.toLowerCase()) {
						return (
							<span key={index} style={{ color: highlightColor, fontWeight: "bold" }}>
								{part}
							</span>
						);
					}
					return <span key={index}>{part}</span>;
				})}
			</span>
		);
	}

	return (
		<span style={{ ...baseStyle, ...style }} {...props}>
			{children}
		</span>
	);
}
