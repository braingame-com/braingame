import { useCallback, useRef } from "react";

interface FocusableElement {
	focus(): void;
}

/**
 * Hook to manage focus and keyboard navigation for lists of interactive elements
 * Handles arrow key navigation, focus trapping, and ref management
 *
 * @param itemCount - Number of items in the list
 * @returns Object with focus utilities
 *
 * @example
 * ```tsx
 * function MyList({ items }) {
 *   const { itemRefs, register, focusItem, handleKeyDown } = useFocusManagement(items.length);
 *
 *   return (
 *     <div onKeyDown={handleKeyDown}>
 *       {items.map((item, index) => (
 *         <button ref={(el) => register(index, el)} key={index}>
 *           {item}
 *         </button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusManagement(itemCount: number) {
	const itemRefs = useRef<Array<React.RefObject<FocusableElement | null> | null>>([]);

	// Ensure we have refs for all items
	while (itemRefs.current.length < itemCount) {
		itemRefs.current.push({ current: null });
	}

	const register = useCallback(
		(index: number, ref: React.RefObject<FocusableElement | null> | FocusableElement | null) => {
			if (ref && typeof ref === "object" && "current" in ref) {
				itemRefs.current[index] = ref;
			} else if (ref && typeof ref === "object" && "focus" in ref) {
				// Create a ref object if a direct element is passed
				itemRefs.current[index] = { current: ref as FocusableElement };
			}
		},
		[],
	);

	const focusItem = useCallback((index: number) => {
		const ref = itemRefs.current[index];
		if (ref?.current && typeof ref.current.focus === "function") {
			ref.current.focus();
		}
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, currentIndex: number) => {
			const key = e.key;

			switch (key) {
				case "ArrowDown":
					e.preventDefault();
					focusItem((currentIndex + 1) % itemCount);
					break;
				case "ArrowUp":
					e.preventDefault();
					focusItem((currentIndex - 1 + itemCount) % itemCount);
					break;
				case "Home":
					e.preventDefault();
					focusItem(0);
					break;
				case "End":
					e.preventDefault();
					focusItem(itemCount - 1);
					break;
			}
		},
		[focusItem, itemCount],
	);

	return {
		itemRefs: itemRefs.current,
		register,
		focusItem,
		handleKeyDown,
	};
}
