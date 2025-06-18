import type { ReactNode } from "react";

export interface ModalProps {
	visible: boolean;
	onClose: () => void;
	children: ReactNode;
	size?: "sm" | "md" | "lg" | "fullscreen";
	variant?: "center" | "bottom-sheet";
	closable?: boolean;
	backdrop?: boolean;
	"aria-label"?: string;
}
