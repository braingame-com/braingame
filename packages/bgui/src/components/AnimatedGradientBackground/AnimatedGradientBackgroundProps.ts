import type { CSSProperties, ReactNode } from "react";
import type { ViewProps, ViewStyle } from "react-native";

/**
 * Shared props interface for AnimatedGradientBackground component
 *
 * A dynamic, animated gradient background component with floating blobs
 */
export interface AnimatedGradientBackgroundProps extends Omit<ViewProps, "style"> {
	/**
	 * Array of colors to use for the gradient blobs
	 * @default ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"]
	 */
	colors?: string[];

	/**
	 * Duration of the animation cycle in milliseconds
	 * @default 10000
	 */
	duration?: number;

	/**
	 * Whether to animate the background
	 * @default true
	 */
	animate?: boolean;

	/**
	 * Number of gradient blobs to render
	 * @default 6
	 */
	blobCount?: number;

	/**
	 * Opacity of the gradient blobs
	 * @default 0.3
	 */
	blobOpacity?: number;

	/**
	 * Blur radius for the gradient effect
	 * @default 100
	 */
	blurRadius?: number;

	/**
	 * Children to render on top of the background
	 */
	children?: ReactNode;

	/**
	 * Additional styles
	 * Platform-specific: CSSProperties on web, ViewStyle on native
	 */
	style?: CSSProperties | ViewStyle;

	/**
	 * Test ID for testing
	 */
	testID?: string;
}
