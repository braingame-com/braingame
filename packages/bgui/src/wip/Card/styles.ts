import { Animation, BorderRadius, Opacity, Tokens } from "@braingame/utils";
import { Platform, type ViewStyle } from "react-native";
import {
	CARD_FOCUS_OUTLINE_OFFSET,
	CARD_FOCUS_OUTLINE_WIDTH,
	CARD_HOVER_SCALE,
} from "../../constants";

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
	borderRadius: BorderRadius.md,
	elevation,
	// Add focus outline for web
	...(Platform.OS === "web" && isFocused
		? {
				outlineWidth: CARD_FOCUS_OUTLINE_WIDTH,
				outlineColor: borderColor,
				outlineStyle: "solid",
				outlineOffset: CARD_FOCUS_OUTLINE_OFFSET,
			}
		: {}),
});

/**
 * Get interactive card styles with smooth transitions
 */
export const getInteractiveCardStyle = (isHovered: boolean): ViewStyle => ({
	opacity: isHovered ? Opacity.hover : 1,
	...(Platform.OS === "web"
		? {
				cursor: "pointer",
				transitionProperty: "opacity, transform",
				transitionDuration: `${Animation.duration.fast}ms`,
				transitionTimingFunction: Animation.easing.easeOut,
				transform: isHovered ? [{ scale: CARD_HOVER_SCALE }] : [{ scale: 1 }],
			}
		: {}),
});
