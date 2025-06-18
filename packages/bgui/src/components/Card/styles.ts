import { Opacity, Tokens } from "@braingame/utils";
import { Platform, type ViewStyle } from "react-native";

/**
 * Padding mapping for Card component
 */
export const paddingMap = {
	none: 0,
	small: Tokens.s,
	medium: Tokens.m,
	large: Tokens.l,
} as const;

/**
 * Get base card styles
 */
export const getBaseCardStyle = (
	backgroundColor: string,
	padding: keyof typeof paddingMap,
	elevation: number,
	isFocused: boolean,
	borderColor: string,
): ViewStyle => ({
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
});

/**
 * Get interactive card styles
 */
export const getInteractiveCardStyle = (isHovered: boolean): ViewStyle => ({
	...(isHovered && Platform.OS === "web" ? { opacity: Opacity.hover, cursor: "pointer" } : {}),
});
