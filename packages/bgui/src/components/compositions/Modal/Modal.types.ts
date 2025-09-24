import type {
	CSSProperties,
	KeyboardEvent as ReactKeyboardEvent,
	MouseEvent as ReactMouseEvent,
	ReactNode,
	TouchEvent as ReactTouchEvent,
} from "react";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type ModalCloseReason = "backdropClick" | "escapeKeyDown" | "closeClick";

export type ModalCloseEvent =
	| ReactKeyboardEvent<HTMLElement>
	| ReactMouseEvent<HTMLElement>
	| ReactTouchEvent<HTMLElement>
	| KeyboardEvent
	| MouseEvent
	| TouchEvent
	| GestureResponderEvent
	| null;

export interface ModalProps {
	children: ReactNode;
	open: boolean;
	onClose?: (event: ModalCloseEvent, reason?: ModalCloseReason) => void;
	disableAutoFocus?: boolean;
	disableEnforceFocus?: boolean;
	disableEscapeKeyDown?: boolean;
	disableRestoreFocus?: boolean;
	disableScrollLock?: boolean;
	hideBackdrop?: boolean;
	keepMounted?: boolean;
	disablePortal?: boolean;
	container?: HTMLElement | (() => HTMLElement | null) | null;
	style?: StyleProp<ViewStyle> | CSSProperties;
	testID?: string;
	role?: "dialog" | "alertdialog";
	"aria-label"?: string;
	"aria-describedby"?: string;
	"aria-labelledby"?: string;
}
