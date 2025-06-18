/**
 * Props for the {@link Button} component.
 * Use these to customise the appearance and behaviour of a button.
 */
export interface ButtonProps {
	/**
	 * Text label to display inside the button.
	 * Omit when using an icon-only button.
	 */
	text?: string;
	/**
	 * Optional icon name from the font library.
	 */
	icon?: string;
	/**
	 * Color of the optional icon.
	 */
	iconColor?: string;
	/**
	 * FontAwesome style prefix (e.g. `fas`).
	 */
	iconType?: string;
	/**
	 * Callback invoked when the user presses the button.
	 */
	onPress: () => void;
	/**
	 * Disable interaction and visually indicate inactive state.
	 */
	disabled?: boolean;
}
