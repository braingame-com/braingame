import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
	/**
	 * Image URL for the avatar.
	 * If not provided, falls back to initials from name.
	 */
	src?: string;

	/**
	 * Name of the user.
	 * Used to generate initials when no image is provided.
	 */
	name?: string;

	/**
	 * Size variant of the avatar.
	 * - "small": 32x32 pixels
	 * - "medium": 48x48 pixels
	 * - "large": 64x64 pixels
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large";

	/**
	 * Shape variant of the avatar.
	 * - "circle": Circular avatar
	 * - "square": Square with rounded corners
	 * @default "circle"
	 */
	variant?: "circle" | "square";

	/**
	 * Callback fired when avatar is pressed.
	 * Makes the avatar interactive.
	 */
	onPress?: () => void;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;
}
