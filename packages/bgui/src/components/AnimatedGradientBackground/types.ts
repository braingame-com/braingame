import type { ViewProps } from "react-native";

export interface AnimatedGradientBackgroundProps extends ViewProps {
	/**
	 * Array of colors for the gradient effect
	 * @default ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9']
	 */
	colors?: string[];

	/**
	 * Duration of the animation in milliseconds
	 * @default 10000
	 */
	duration?: number;

	/**
	 * Enable or disable animation
	 * @default true
	 */
	animate?: boolean;

	/**
	 * Number of animated blobs
	 * @default 6
	 */
	blobCount?: number;

	/**
	 * Opacity of each blob layer
	 * @default 0.3
	 */
	blobOpacity?: number;

	/**
	 * Blur radius for the gradient effect
	 * @default 100
	 */
	blurRadius?: number;
}
