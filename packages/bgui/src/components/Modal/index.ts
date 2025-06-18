import { Modal } from "./Modal";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

export { Modal } from "./Modal";
export { ModalHeader } from "./ModalHeader";
export { ModalFooter } from "./ModalFooter";
export type { ModalProps } from "./types";

// Create compound component
const ModalCompound = Modal as typeof Modal & {
	Header: typeof ModalHeader;
	Footer: typeof ModalFooter;
};

ModalCompound.Header = ModalHeader;
ModalCompound.Footer = ModalFooter;

export { ModalCompound };
