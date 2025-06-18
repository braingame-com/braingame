import { useThemeColor } from "@braingame/utils";
import { Platform, Pressable, View as RNView } from "react-native";
import { useInteractiveState } from "../../hooks";
import { getBaseCardStyle, getInteractiveCardStyle } from "./styles";
import type { CardProps } from "./types";

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
	const { isHovered, isFocused, handleHoverIn, handleHoverOut, handleFocus, handleBlur } =
		useInteractiveState();

	const baseStyle = getBaseCardStyle(backgroundColor, padding, elevation, isFocused, borderColor);

	if (variant === "interactive" || onPress) {
		return (
			<Pressable
				onPress={onPress}
				accessibilityRole="button"
				accessibilityLabel={ariaLabel}
				{...(ariaDescribedBy && { "aria-describedby": ariaDescribedBy })}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...(Platform.OS === "web" && variant === "interactive"
					? { onHoverIn: handleHoverIn, onHoverOut: handleHoverOut }
					: {})}
				style={[
					baseStyle,
					variant === "interactive" ? getInteractiveCardStyle(isHovered) : null,
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
