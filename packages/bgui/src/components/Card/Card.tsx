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
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	...rest
}: CardProps) => {
	const backgroundColor = useThemeColor("card");
	const borderColor = useThemeColor("border");
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const baseStyle: ViewStyle = {
		backgroundColor,
		padding: paddingMap[padding],
		borderRadius: Tokens.m,
		elevation,
		// Add focus outline for web
		...(Platform.OS === "web" && isFocused
			? {
					outlineWidth: 2,
					outlineColor: borderColor,
					outlineStyle: "solid",
					outlineOffset: 2,
				}
			: {}),
	};

	if (variant === "interactive" || onPress) {
		return (
			<Pressable
				onPress={onPress}
				accessibilityRole="button"
				accessibilityLabel={ariaLabel}
				{...(ariaDescribedBy && { "aria-describedby": ariaDescribedBy })}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
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
