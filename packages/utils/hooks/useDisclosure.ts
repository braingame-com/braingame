import { useCallback, useState } from "react";

export interface UseDisclosureOptions {
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
	const { defaultOpen = false, onOpenChange } = options;
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const open = useCallback(() => {
		setIsOpen(true);
		onOpenChange?.(true);
	}, [onOpenChange]);

	const close = useCallback(() => {
		setIsOpen(false);
		onOpenChange?.(false);
	}, [onOpenChange]);

	const toggle = useCallback(() => {
		setIsOpen((prev) => {
			const next = !prev;
			onOpenChange?.(next);
			return next;
		});
	}, [onOpenChange]);

	return { isOpen, open, close, toggle };
}
