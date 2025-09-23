// @ts-nocheck
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Modal component
 *
 * Modals inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
 */
export interface ModalProps {
	/**
	 * A single child content element.
	 */
	children: ReactNode;

	/**
	 * If `true`, the component is shown.
	 */
	open: boolean;

	/**
	 * Callback fired when the component requests to be closed.
	 * The `reason` parameter can optionally be used to control the response to `onClose`.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"closeClick"`.
	 */
	onClose?: (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent, reason?: "backdropClick" | "escapeKeyDown" | "closeClick") => void;

	/**
	 * If `true`, the modal will not automatically shift focus to itself when it opens, and
	 * replace it to the last focused element when it closes.
	 * @default false
	 */
	disableAutoFocus?: boolean;

	/**
	 * If `true`, the modal will not prevent focus from leaving the modal while open.
	 * @default false
	 */
	disableEnforceFocus?: boolean;

	/**
	 * If `true`, hitting escape will not fire the onClose callback.
	 * @default false
	 */
	disableEscapeKeyDown?: boolean;

	/**
	 * If `true`, the modal will not restore focus to previously focused element once modal is hidden.
	 * @default false
	 */
	disableRestoreFocus?: boolean;

	/**
	 * Disable the scroll lock behavior.
	 * @default false
	 */
	disableScrollLock?: boolean;

	/**
	 * If `true`, the backdrop is not rendered.
	 * @default false
	 */
	hideBackdrop?: boolean;

	/**
	 * Always keep the children in the DOM.
	 * @default false
	 */
	keepMounted?: boolean;

	/**
	 * The container will be under the DOM hierarchy of the parent component.
	 * @default false
	 */
	disablePortal?: boolean;

	/**
	 * An HTML element or function that returns one.
	 * The `container` will have the portal children appended to it.
	 * @default document.body
	 */
	container?: HTMLElement | (() => HTMLElement | null) | null;

	/**
	 * Additional styles
	 */
	style?: CSSProperties;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * The ARIA role attribute.
	 * @default 'dialog'
	 */
	role?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;

	/**
	 * The id of the element describing the modal.
	 */
	"aria-describedby"?: string;

	/**
	 * The id of the element labeling the modal.
	 */
	"aria-labelledby"?: string;
}
