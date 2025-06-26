/**
 * Props for the Toast component
 */
export interface ToastProps {
	/**
	 * Message to display in the toast.
	 * Will be announced to screen readers.
	 */
	message: string;

	/**
	 * Visual style determining background color.
	 * - "success": Green background for positive feedback
	 * - "warning": Yellow background for cautions
	 * - "error": Red background for errors
	 * - "info": Blue background for information
	 * @default "info"
	 */
	type?: "success" | "warning" | "error" | "info";

	/**
	 * Auto-dismiss duration in milliseconds.
	 * Set to 0 to disable auto-dismiss.
	 * @default 3000
	 */
	duration?: number;

	/**
	 * Label for optional action button.
	 * Only displayed when variant is "with-action".
	 */
	actionLabel?: string;

	/**
	 * Callback when action button is pressed.
	 * Required when actionLabel is provided.
	 */
	onActionPress?: () => void;

	/**
	 * Toast display variant.
	 * - "simple": Message only
	 * - "with-action": Message with action button
	 * @default "simple"
	 */
	variant?: "simple" | "with-action";
}
