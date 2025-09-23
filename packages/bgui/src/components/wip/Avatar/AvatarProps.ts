// @ts-nocheck
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";

/**
 * Shared props interface for Avatar component
 *
 * Avatars are used to represent people or entities.
 */
export interface AvatarProps {
	/**
	 * The content of the Avatar (initials, icon, etc.)
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'soft'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Image source for the avatar
	 */
	src?: string;

	/**
	 * Alt text for the avatar image
	 */
	alt?: string;

	/**
	 * Fallback src if primary image fails to load
	 */
	srcSet?: string;

	/**
	 * Click handler
	 */
	onClick?: ((event: GestureResponderEvent) => void) | MouseEventHandler<HTMLDivElement>;

	/**
	 * Called when avatar is pressed in (native only)
	 */
	onPressIn?: (event: GestureResponderEvent) => void;

	/**
	 * Called when avatar is pressed out (native only)
	 */
	onPressOut?: (event: GestureResponderEvent) => void;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;
}
