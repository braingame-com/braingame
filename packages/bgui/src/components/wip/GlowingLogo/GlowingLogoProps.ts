// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";

/**
 * Shared props interface for GlowingLogo component
 *
 * A logo component with animated glow effect
 */
export interface GlowingLogoProps extends Omit<ViewProps, "style"> {
	/**
	 * Size of the logo in pixels
	 * @default 120
	 */
	size?: number;

	/**
	 * Color of the glow effect
	 * @default "#007fff"
	 */
	glowColor?: string;

	/**
	 * Intensity of the glow effect
	 * @default "medium"
	 */
	glowIntensity?: "low" | "medium" | "high";

	/**
	 * Whether to animate the glow effect
	 * @default true
	 */
	animate?: boolean;

	/**
	 * Logo image source (can be a URL or imported image)
	 * If not provided, will render a default logo shape
	 */
	source?: string | { uri: string };

	/**
	 * Click/press handler
	 */
	onPress?: () => void;

	/**
	 * Children to render inside the logo (overrides source)
	 */
	children?: ReactNode;

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
}
