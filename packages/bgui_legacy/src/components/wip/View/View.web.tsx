"use client";

import { Tokens, viewStyles } from "@braingame/utils";
import { useState } from "react";
import { useTheme } from "../../theme";
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
	const { colors } = useTheme();
	const [isHovered, setIsHovered] = useState(false);
	const themeBackgroundColor = type.includes("card") ? colors.surfaceContainer : colors.background;
	const backgroundColor = transparent ? "transparent" : themeBackgroundColor;
	const themeBorderColor = colors.outlineVariant;
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
