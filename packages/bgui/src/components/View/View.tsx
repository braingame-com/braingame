import { Tokens, useThemeColor, viewStyles } from "@braingame/utils";
import { useState } from "react";
import { Platform, View as RNView } from "react-native";
import type { ViewProps } from "./types";

/**
 * Theme-aware container component used throughout layouts.
 */
export const View = ({
	type = "background",
	style,
	transparent,
	rounded,
	border,
	hoverable,
	grabbable,
	...rest
}: ViewProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const themeBackgroundColor = useThemeColor(type.includes("card") ? "card" : "background");
	const backgroundColor = transparent ? "transparent" : themeBackgroundColor;
	const themeBorderColor = useThemeColor("border");
	const borderColor = getBorderColor(border, hoverable, isHovered, themeBorderColor);

	return (
		<RNView
			{...(hoverable &&
				Platform.OS === "web" && {
					onMouseEnter: () => setIsHovered(true),
					onMouseLeave: () => setIsHovered(false),
				})}
			style={[
				{ backgroundColor },
				viewStyles[type],
				rounded && {
					borderRadius: Tokens.m,
				},
				border && {
					borderWidth: 1,
					borderColor,
				},
				grabbable && {
					cursor: "pointer",
				},
				style,
			]}
			{...rest}
		/>
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
