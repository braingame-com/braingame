import { useThemeColor } from "@braingame/utils";
import { Platform, Pressable, View as RNView } from "react-native";
import { useInteractiveState } from "../../hooks";
import { getBaseCardStyle, getInteractiveCardStyle } from "./styles";
import type { CardProps } from "./types";

/**
 * Card component for displaying content in a contained, elevated surface.
 * Supports both static and interactive variants with hover states.
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Card with padding and elevation
 * <Card padding="large" elevation={2}>
 *   <Text>Elevated card</Text>
 * </Card>
 *
 * // Interactive card
 * <Card variant="interactive" onPress={handlePress}>
 *   <Text>Click me</Text>
 * </Card>
 *
 * // Card with custom styling
 * <Card style={{ backgroundColor: 'lightblue' }}>
 *   <Text>Custom styled card</Text>
 * </Card>
 * ```
 *
 * @component
 */

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
