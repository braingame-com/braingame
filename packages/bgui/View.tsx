import { useState } from "react";
import { Platform, View as RNView } from "react-native";
import { Tokens } from "../utils/constants/Tokens";
import { viewStyles } from "../utils/constants/styles";
import type { ViewProps } from "../utils/constants/types";
import { useThemeColor } from "../utils/hooks/useThemeColor";

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
	const backgroundColor = transparent
		? "transparent"
		: useThemeColor(type.includes("card") ? "card" : "background");
	const borderColor = getBorderColor(border, hoverable, isHovered);

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
) => {
	const borderColor = useThemeColor("border");

	if (border && !hoverable) {
		return borderColor;
	}

	return isHovered ? borderColor : "transparent";
};
