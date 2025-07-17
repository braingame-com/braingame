import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Text component
 *
 * Text components present your design and content clearly and efficiently.
 * Supports both Restyle variants and Joy UI levels for backward compatibility.
 */
export interface TextProps {
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
	 * For Restyle compatibility, also accepts typography variants like "h1", "body1", "button", etc.
	 */
	variant?: "plain" | "outlined" | "soft" | "solid" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "button" | "caption" | "overline" | "subtitle1" | "subtitle2";

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
	 * The id of the element describing the typography.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the typography.
	 */
	"aria-labelledby"?: string;
}
