import { useState } from "react";
import { Platform, Pressable, View as RNView, type ViewStyle } from "react-native";
import { Tokens } from "../../../../utils/constants/Tokens";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import type { CardProps } from "./types";

const paddingMap = {
	none: 0,
	small: Tokens.s,
	medium: Tokens.m,
	large: Tokens.l,
} as const;

export const Card = ({
	children,
	variant = "basic",
	padding = "medium",
	elevation = 0,
	onPress,
	style,
	...rest
}: CardProps) => {
	const backgroundColor = useThemeColor("card");
	const [isHovered, setIsHovered] = useState(false);

	const baseStyle: ViewStyle = {
		backgroundColor,
		padding: paddingMap[padding],
		borderRadius: Tokens.m,
		elevation,
	};

	if (variant === "interactive" || onPress) {
		return (
			<Pressable
				onPress={onPress}
				{...(Platform.OS === "web" && variant === "interactive"
					? { onHoverIn: () => setIsHovered(true), onHoverOut: () => setIsHovered(false) }
					: {})}
				style={[
					baseStyle,
					variant === "interactive" && isHovered && Platform.OS === "web"
						? { opacity: 0.9, cursor: "pointer" }
						: null,
					style,
				]}
				{...rest}
			>
				{children}
			</Pressable>
		);
	}

	return (
		<RNView style={[baseStyle, style]} {...rest}>
			{children}
		</RNView>
	);
};
