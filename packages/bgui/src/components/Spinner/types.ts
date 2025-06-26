/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
	/**
	 * Size of the spinner.
	 * - "sm": Small (20px)
	 * - "md": Medium (30px)
	 * - "lg": Large (40px)
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Color of the spinner.
	 * Can be any valid color string.
	 * @default Uses theme's icon color
	 */
	color?: string;

	/**
	 * Display variant of the spinner.
	 * - "inline": Normal inline display
	 * - "overlay": Full-screen modal overlay
	 * @default "inline"
	 */
	variant?: "inline" | "overlay";

	/**
	 * Accessibility label for screen readers.
	 * Describes what is loading.
	 * @default "Loading"
	 */
	ariaLabel?: string;
}
