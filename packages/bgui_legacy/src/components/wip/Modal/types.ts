import type { ReactNode } from "react";

/**
 * Props for the Modal component
 */
export interface ModalProps {
	/**
	 * Whether the modal is visible.
	 * Controls the open/closed state of the modal.
	 */
	visible: boolean;

	/**
	 * Callback fired when the modal should close.
	 * Called when backdrop is clicked (if closable) or Escape key is pressed.
	 */
	onClose: () => void;

	/**
	 * Content to display inside the modal.
	 * Can be any React node including forms, lists, or custom components.
	 */
	children: ReactNode;

	/**
	 * Size preset for the modal.
	 * - "sm": 300px width
	 * - "md": 480px width (default)
	 * - "lg": 720px width
	 * - "fullscreen": Full viewport size
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg" | "fullscreen";

	/**
	 * Display variant of the modal.
	 * - "center": Centered on screen
	 * - "bottom-sheet": Slides up from bottom (mobile pattern)
	 * @default "center"
	 */
	variant?: "center" | "bottom-sheet";

	/**
	 * Whether the modal can be closed by user interaction.
	 * When false, disables backdrop click and Escape key.
	 * @default true
	 */
	closable?: boolean;

	/**
	 * Whether to show a backdrop behind the modal.
	 * When false, modal appears without dimming background.
	 * @default true
	 */
	backdrop?: boolean;

	/**
	 * Accessible label for the modal dialog.
	 * Important for screen readers to announce modal purpose.
	 */
	"aria-label"?: string;
}
