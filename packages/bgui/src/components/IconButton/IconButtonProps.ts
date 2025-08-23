import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for IconButton component
 *
 * IconButtons allow users to take actions and make choices with a single tap.
 */
export interface IconButtonProps {
	/**
	 * The icon element.
	 */
	children?: ReactNode;

	/**
	 * The color of the component.
	 * @default 'neutral'
	 */
	color?: "primary" | "neutral" | "danger" | "success" | "warning";

	/**
	 * The variant to use.
	 * @default 'plain'
	 */
	variant?: "plain" | "outlined" | "soft" | "solid";

	/**
	 * The size of the component.
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * If `true`, the loading indicator is shown.
	 * @default false
	 */
	loading?: boolean;

	/**
	 * The loading indicator can be positioned on the start, end, or the center of the button.
	 * @default 'center'
	 */
	loadingPosition?: "start" | "end" | "center";

	/**
	 * Element placed before the children if the button is in loading state.
	 */
	loadingIndicator?: ReactNode;

	/**
	 * The type of the button.
	 * @default 'button'
	 */
	type?: "button" | "submit" | "reset";

	/**
	 * The URL to link to when the button is clicked.
	 * If defined, an `a` element will be used as the root node.
	 */
	href?: string;

	/**
	 * If `true`, the button will take up the full width of its container.
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Callback fired when the button is clicked.
	 */
	onClick?: (event: React.MouseEvent | import("react-native").GestureResponderEvent) => void;

	/**
	 * Callback fired when the button loses focus.
	 */
	onBlur?: (event: React.FocusEvent | import("react-native").GestureResponderEvent) => void;

	/**
	 * Callback fired when the button receives focus.
	 */
	onFocus?: (event: React.FocusEvent | import("react-native").GestureResponderEvent) => void;

	/**
	 * Callback fired when a key is pressed.
	 */
	onKeyDown?: (
		event:
			| React.KeyboardEvent
			| import("react-native").NativeSyntheticEvent<
					import("react-native").TextInputKeyPressEventData
			  >,
	) => void;

	/**
	 * Callback fired when a key is released.
	 */
	onKeyUp?: (
		event:
			| React.KeyboardEvent
			| import("react-native").NativeSyntheticEvent<
					import("react-native").TextInputKeyPressEventData
			  >,
	) => void;

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
	 * The id of the element describing the button.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the button.
	 */
	"aria-labelledby"?: string;

	/**
	 * If `true`, the button is in pressed state.
	 */
	"aria-pressed"?: boolean;

	/**
	 * If `true`, the button is expanded.
	 */
	"aria-expanded"?: boolean;

	/**
	 * Identifies the element (or elements) whose contents or presence are controlled by the button.
	 */
	"aria-controls"?: string;

	/**
	 * Indicates the current "pressed" state of toggle buttons.
	 */
	"aria-checked"?: boolean | "mixed";

	/**
	 * Mouse enter event handler
	 */
	onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Mouse leave event handler
	 */
	onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Mouse down event handler
	 */
	onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Mouse up event handler
	 */
	onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
