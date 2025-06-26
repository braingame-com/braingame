import { Tokens, useThemeColor, viewStyles } from "@braingame/utils";
import { useState } from "react";
import { Platform, View as RNView } from "react-native";
import type { ViewProps } from "./types";

/**
 * Theme-aware View component for creating containers.
 * Extends React Native View with theming, borders, and hover states.
 *
 * @example
 * ```tsx
 * // Basic container
 * <View>
 *   <Text>Content</Text>
 * </View>
 *
 * // Card container
 * <View type="card" rounded>
 *   <Text>Card content</Text>
 * </View>
 *
 * // Surface with border
 * <View type="surface" border>
 *   <Text>Surface content</Text>
 * </View>
 *
 * // Hoverable card
 * <View
 *   type="card"
 *   hoverable
 *   onPress={() => console.log('Clicked')}
 * >
 *   <Text>Click me</Text>
 * </View>
 *
 * // Transparent overlay
 * <View
 *   transparent
 *   style={{
 *     position: 'absolute',
 *     top: 0,
 *     left: 0,
 *     right: 0,
 *     bottom: 0,
 *   }}
 * >
 *   <Text>Overlay content</Text>
 * </View>
 *
 * // Grabbable element
 * <View grabbable rounded>
 *   <Text>Drag me</Text>
 * </View>
 * ```
 *
 * @component
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
