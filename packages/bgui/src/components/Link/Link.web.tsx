"use client";

import React from "react";
import type { LinkProps } from "./types";

export function Link({ href, children, style, disabled, ...props }: LinkProps) {
	// Handle disabled state
	if (disabled) {
		return (
			<span
				style={{
					...style,
					opacity: 0.6,
					cursor: "not-allowed",
					textDecoration: "none",
				}}
				{...props}
			>
				{children}
			</span>
		);
	}

	// For Next.js compatibility, render as a standard anchor tag
	return (
		<a
			href={href}
			style={{
				textDecoration: "none",
				color: "inherit",
				...style,
			}}
			{...props}
		>
			{children}
		</a>
	);
}
