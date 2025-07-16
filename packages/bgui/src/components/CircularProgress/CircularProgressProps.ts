import type { CSSProperties } from "react";

/**
 * Shared props interface for CircularProgress component
 *
 * Circular progress indicators display progress by animating along an invisible circular track.
 */
export interface CircularProgressProps {
	/**
	 * The color of the component.
	 * @default 'primary'
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
	 * The determinate prop can be used to indicate how long an operation will take.
	 * @default false
	 */
	determinate?: boolean;

	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value?: number;

	/**
	 * The thickness of the circle.
	 * @default 6
	 */
	thickness?: number;

	/**
	 * The button label for screen readers.
	 * @default 'Loading…'
	 */
	"aria-label"?: string;

	/**
	 * If provided, the value will be announced to screen readers.
	 * Takes precedence over `aria-label`.
	 */
	"aria-valuenow"?: number;

	/**
	 * The minimum value for the determinate variant.
	 * @default 0
	 */
	"aria-valuemin"?: number;

	/**
	 * The maximum value for the determinate variant.
	 * @default 100
	 */
	"aria-valuemax"?: number;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;
}
