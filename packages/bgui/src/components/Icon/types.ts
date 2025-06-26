import type { Colors } from "@braingame/utils";
import type { StyleProp, ViewStyle } from "react-native";

export type IconVariant = "solid" | "regular" | "brand";
export type IconSize = "sm" | "md" | "lg";
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Props for the Icon component
 */
export interface IconProps {
	/**
	 * Name of the FontAwesome icon to display.
	 * See https://fontawesome.com/icons for available icons.
	 */
	name: string;

	/**
	 * Icon style variant.
	 * - "solid": Filled icons
	 * - "regular": Outlined icons
	 * - "brand": Brand/logo icons
	 * @default "regular"
	 */
	variant?: IconVariant;

	/**
	 * Size of the icon.
	 * Can be a preset size or a number for custom pixel size.
	 * - "sm": 16px
	 * - "md": 24px
	 * - "lg": 32px
	 * @default "md"
	 */
	size?: IconSize | number;

	/**
	 * Color from the theme palette.
	 * Falls back to the theme's default icon color.
	 */
	color?: ThemeColor;

	/**
	 * Whether the icon is purely decorative.
	 * Decorative icons are hidden from screen readers.
	 * @default false
	 */
	decorative?: boolean;

	/**
	 * Accessibility label for the icon.
	 * Required when icon conveys meaning (not decorative).
	 */
	"aria-label"?: string;

	/**
	 * Additional styles to apply to the icon.
	 */
	style?: StyleProp<ViewStyle>;
}
