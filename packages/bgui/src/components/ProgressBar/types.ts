import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps {
	/**
	 * Progress value between 0 and 100.
	 * Represents percentage completion.
	 */
	value: number;

	/**
	 * Color of the progress indicator.
	 * Can be any valid color string.
	 * @default Primary theme color
	 */
	color?: string;

	/**
	 * Background color of the progress track.
	 * @default Theme's border color
	 */
	backgroundColor?: string;

	/**
	 * Visual variant of the progress bar.
	 * - "linear": Horizontal bar
	 * - "circular": Circular indicator
	 * @default "linear"
	 */
	variant?: "linear" | "circular";

	/**
	 * Whether to animate progress changes.
	 * When true, progress smoothly transitions.
	 * @default true
	 */
	animated?: boolean;

	/**
	 * Size (diameter) for circular variant in pixels.
	 * Ignored for linear variant.
	 * @default 40
	 */
	size?: number;

	/**
	 * Additional styles to apply to the container.
	 */
	style?: StyleProp<ViewStyle>;
}
