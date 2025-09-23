// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

/**
 * Shared props interface for Card component
 *
 * Cards contain content and actions about a single subject.
 */
export interface CardProps {
	/**
	 * The content of the card.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'outlined'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * The orientation of the card.
	 * @default 'vertical'
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * If true, the card colors are inverted.
	 * @default false
	 */
	invertedColors?: boolean;

	/**
	 * Click handler
	 */
	onClick?: (event: React.MouseEvent | GestureResponderEvent) => void;

	/**
	 * Called when card is pressed in (native only)
	 */
	onPressIn?: (event: GestureResponderEvent) => void;

	/**
	 * Called when card is pressed out (native only)
	 */
	onPressOut?: (event: GestureResponderEvent) => void;

	/**
	 * Additional styles
	 */
	style?: StyleProp<ViewStyle> | CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	// React Native specific props that need to be filtered out in web
	onTouchStart?: (event: GestureResponderEvent) => void;
	onTouchEnd?: (event: GestureResponderEvent) => void;
	onTouchCancel?: (event: GestureResponderEvent) => void;
	onTouchMove?: (event: GestureResponderEvent) => void;
	hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
	pointerEvents?: "box-none" | "none" | "box-only" | "auto";
	needsOffscreenAlphaCompositing?: boolean;
	renderToHardwareTextureAndroid?: boolean;
	shouldRasterizeIOS?: boolean;
}
