import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Skeleton component
 *
 * Skeleton components are used to display a placeholder preview of content before the data gets loaded.
 */
export interface SkeletonProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The animation. If `false`, the animation effect is disabled.
	 * @default 'pulse'
	 */
	animation?: "pulse" | "wave" | false;

	/**
	 * The variant to use.
	 * @default 'overlay'
	 */
	variant?: "overlay" | "text" | "circular" | "rectangular" | "inline";

	/**
	 * The type of content that will be rendered.
	 * @default 'text'
	 */
	level?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "title-lg"
		| "title-md"
		| "title-sm"
		| "body-lg"
		| "body-md"
		| "body-sm"
		| "body-xs";

	/**
	 * Width of the skeleton.
	 * Useful when the skeleton is inside an inline element with no width of its own.
	 */
	width?: number | string;

	/**
	 * Height of the skeleton.
	 * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
	 */
	height?: number | string;

	/**
	 * If `true`, the skeleton's position will change to absolute and fill the available space of the nearest positioned parent.
	 * This prop is useful when you want to show a skeleton while the content is in a loading state.
	 * The skeleton will be rendered on top of the content.
	 * @default false
	 */
	loading?: boolean;

	/**
	 * If `true`, the skeleton appears.
	 * @default true
	 */
	visible?: boolean;

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * If `true`, the component is shown as busy to screen readers.
	 * @default false
	 */
	"aria-busy"?: boolean;
}
