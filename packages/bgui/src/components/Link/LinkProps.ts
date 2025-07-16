import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Link component
 *
 * Links allow users to click to navigate to another page or resource.
 */
export interface LinkProps {
	/**
	 * The content of the link.
	 */
	children?: ReactNode;

	/**
	 * The URL to link to when the link is clicked.
	 */
	href?: string;

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The color of the link.
	 * @default 'primary'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * Applies the theme link styles.
	 * @default 'plain'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * Controls when the link should have an underline.
	 * @default 'hover'
	 */
	underline?: "none" | "hover" | "always";

	/**
	 * Element placed before the children.
	 */
	startDecorator?: ReactNode;

	/**
	 * Element placed after the children.
	 */
	endDecorator?: ReactNode;

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
	 * If `true`, the ::after pseudo element is added to cover the area of interaction.
	 * The parent of the overlay Link should have `relative` CSS position.
	 * @default false
	 */
	overlay?: boolean;

	/**
	 * Where to open the linked document (for anchor elements).
	 */
	target?: "_self" | "_blank" | "_parent" | "_top";

	/**
	 * The relationship of the linked document to the current document.
	 */
	rel?: string;

	/**
	 * Hints at the human language of the linked URL.
	 */
	hrefLang?: string;

	/**
	 * A space-separated list of URLs to which, when the link is followed, POST requests with the body PING will be sent by the browser.
	 */
	ping?: string;

	/**
	 * The MIME type of the linked document.
	 */
	type?: string;

	/**
	 * Callback fired when the link is clicked.
	 */
	onClick?: (event: any) => void;

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
	 * The id of the element describing the link.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the link.
	 */
	"aria-labelledby"?: string;
}
