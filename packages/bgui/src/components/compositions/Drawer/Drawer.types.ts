import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { ModalCloseEvent, ModalCloseReason } from "../Modal/Modal.types";

export type DrawerPlacement = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg" | number;

export interface DrawerProps {
	children: ReactNode;
	open: boolean;
	onClose?: (event: ModalCloseEvent, reason?: ModalCloseReason) => void;
	placement?: DrawerPlacement;
	size?: DrawerSize;
	hideBackdrop?: boolean;
	keepMounted?: boolean;
	disablePortal?: boolean;
	ariaLabel?: string;
	testID?: string;
	style?: StyleProp<ViewStyle>;
}
