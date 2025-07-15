import { useCallback, useState } from "react";

/**
 * Hook to manage interactive states (hover, focus, pressed) for components
 * Provides consistent state management for interactive elements
 *
 * @returns Object with state values and handlers
 *
 * @example
 * ```tsx
 * function InteractiveButton({ children, onPress }) {
 *   const {
 *     isHovered,
 *     isFocused,
 *     isPressed,
 *     handleHoverIn,
 *     handleHoverOut,
 *     handleFocus,
 *     handleBlur,
 *     handlePressIn,
 *     handlePressOut
 *   } = useInteractiveState();
 *
 *   return (
 *     <Pressable
 *       onPress={onPress}
 *       onHoverIn={handleHoverIn}
 *       onHoverOut={handleHoverOut}
 *       onFocus={handleFocus}
 *       onBlur={handleBlur}
 *       onPressIn={handlePressIn}
 *       onPressOut={handlePressOut}
 *       style={{
 *         opacity: isPressed ? 0.8 : isHovered ? 0.9 : 1,
 *         outlineWidth: isFocused ? 2 : 0,
 *       }}
 *     >
 *       {children}
 *     </Pressable>
 *   );
 * }
 * ```
 */
export function useInteractiveState() {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const handleHoverIn = useCallback(() => setIsHovered(true), []);
	const handleHoverOut = useCallback(() => setIsHovered(false), []);
	const handleFocus = useCallback(() => setIsFocused(true), []);
	const handleBlur = useCallback(() => setIsFocused(false), []);
	const handlePressIn = useCallback(() => setIsPressed(true), []);
	const handlePressOut = useCallback(() => setIsPressed(false), []);

	return {
		isHovered,
		isFocused,
		isPressed,
		handleHoverIn,
		handleHoverOut,
		handleFocus,
		handleBlur,
		handlePressIn,
		handlePressOut,
	};
}
