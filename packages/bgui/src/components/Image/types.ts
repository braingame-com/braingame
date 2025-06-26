import type { ReactNode } from "react";
import type { ImageStyle, ImageProps as RNImageProps, StyleProp } from "react-native";

/**
 * Props for the Image component
 */
export interface ImageProps extends Omit<RNImageProps, "source"> {
	/**
	 * Source URL of the image to display.
	 * Required for loading the image.
	 */
	src: string;

	/**
	 * Alternative text describing the image.
	 * Essential for accessibility.
	 */
	alt: string;

	/**
	 * Content to display while image is loading.
	 * Can be a spinner, skeleton, or custom element.
	 */
	placeholder?: ReactNode;

	/**
	 * Content to display if image fails to load.
	 * Overrides default error message.
	 */
	fallback?: ReactNode;

	/**
	 * Aspect ratio of the image container.
	 * Helps prevent layout shift during loading.
	 */
	aspectRatio?: number;

	/**
	 * How the image should resize within its container.
	 * - "cover": Scale to fill container, may crop
	 * - "contain": Scale to fit within container
	 * - "fill": Stretch to fill container
	 * @default "cover"
	 */
	objectFit?: "cover" | "contain" | "fill";

	/**
	 * Image display variant.
	 * - "responsive": Adapts to container width
	 * - "fixed": Maintains specified dimensions
	 * @default "responsive"
	 */
	variant?: "responsive" | "fixed";

	/**
	 * Additional styles to apply to the image container.
	 */
	style?: StyleProp<ImageStyle>;
}
