<<<<<<< HEAD
"use client";

import React from "react";
import type { ViewProps } from "./types";

export function View({ children, style, ...props }: ViewProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				boxSizing: "border-box",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
=======
import { Tokens, useThemeColor, viewStyles } from "@braingame/utils";
import { useState } from "react";
import type { ViewProps } from "./types";

/**
 * Theme-aware container component used throughout layouts.
 * Web version for Next.js compatibility.
 */
export const View = ({
	type = "background",
	style,
	transparent,
	rounded,
	border,
	hoverable,
	grabbable,
	children,
}: ViewProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const themeBackgroundColor = useThemeColor(type.includes("card") ? "card" : "background");
	const backgroundColor = transparent ? "transparent" : themeBackgroundColor;
	const themeBorderColor = useThemeColor("border");
	const borderColor = getBorderColor(border, hoverable, isHovered, themeBorderColor);

	const divStyle: React.CSSProperties = {
		backgroundColor,
		...((viewStyles[type] as React.CSSProperties) || {}),
		...(rounded && {
			borderRadius: Tokens.m,
		}),
		...(border && {
			borderWidth: 1,
			borderStyle: "solid",
			borderColor,
		}),
		...(grabbable && {
			cursor: "pointer",
		}),
		...((style as React.CSSProperties) || {}),
	};

	// Add role for interactivity if hoverable
	const divProps = hoverable
		? {
				onMouseEnter: () => setIsHovered(true),
				onMouseLeave: () => setIsHovered(false),
				role: "button",
				tabIndex: 0,
			}
		: {};

	return (
		<div style={divStyle} {...divProps}>
			{children}
		</div>
	);
};

const getBorderColor = (
	border: boolean | undefined,
	hoverable: boolean | undefined,
	isHovered: boolean,
	borderColor: string,
) => {
	if (border && !hoverable) {
		return borderColor;
	}

	return isHovered ? borderColor : "transparent";
};
>>>>>>> origin/main
