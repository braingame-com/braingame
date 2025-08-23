import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Typography component
 *
 * Typography components present your design and content clearly and efficiently.
 */
export interface TypographyProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * Applies the theme typography styles.
	 * @default 'body-md'
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
		| "body-xs"
		| "inherit";

	/**
	 * Element placed before the children.
	 */
	startDecorator?: ReactNode;

	/**
	 * Element placed after the children.
	 */
	endDecorator?: ReactNode;

	/**
	 * If `true`, the text will have a bottom margin.
	 * @default false
	 */
	gutterBottom?: boolean;

	/**
	 * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
	 * Note that text overflow can only happen with block or inline-block level elements
	 * (the element needs to have a width in order to overflow).
	 * @default false
	 */
	noWrap?: boolean;

	/**
	 * The text alignment.
	 */
	textAlign?: "left" | "center" | "right" | "justify";

	/**
	 * The component used for the root node.
	 * Either a string to use a HTML element or a component.
	 */
	component?: string;

	/**
	 * The text color of the component.
	 */
	textColor?: string;

	/**
	 * CSS class name for web styling
	 */
	className?: string;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the typography.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the typography.
	 */
	"aria-labelledby"?: string;
}
