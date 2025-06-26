import type { ViewProps } from "react-native";

/**
 * Props for the GlowingLogo component
 */
export interface GlowingLogoProps extends ViewProps {
	/**
	 * Size of the logo in pixels.
	 * Affects both width and height.
	 * @default 120
	 */
	size?: number;

	/**
	 * Color of the glow effect.
	 * Any valid CSS color string.
	 * @default "#7c3aed"
	 */
	glowColor?: string;

	/**
	 * Intensity of the glow effect.
	 * - "low": Subtle glow
	 * - "medium": Standard glow
	 * - "high": Intense glow
	 * @default "medium"
	 */
	glowIntensity?: "low" | "medium" | "high";

	/**
	 * Whether to animate the logo with pulse and glow effects.
	 * @default true
	 */
	animate?: boolean;

	/**
	 * Callback fired when logo is pressed.
	 * Makes the logo interactive.
	 */
	onPress?: () => void;
}
