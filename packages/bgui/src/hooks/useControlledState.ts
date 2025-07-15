import { useCallback, useState } from "react";

/**
 * Hook to handle controlled/uncontrolled state patterns
 * Provides a unified interface for components that can be either controlled or uncontrolled
 *
 * @param controlledValue - Value from props (controlled mode)
 * @param defaultValue - Default value for uncontrolled mode
 * @param onValueChange - Callback for value changes
 * @returns [value, setValue] - Current value and setter function
 *
 * @example
 * ```tsx
 * function MyComponent({ value, defaultValue, onValueChange }) {
 *   const [currentValue, setValue] = useControlledState(value, defaultValue, onValueChange);
 *
 *   return (
 *     <button onClick={() => setValue(!currentValue)}>
 *       {currentValue ? 'On' : 'Off'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useControlledState<T>(
	controlledValue: T | undefined,
	defaultValue: T | undefined,
	onValueChange?: (value: T) => void,
): [T | undefined, (value: T) => void] {
	const isControlled = controlledValue !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);

	const value = isControlled ? controlledValue : uncontrolledValue;

	const setValue = useCallback(
		(newValue: T) => {
			if (!isControlled) {
				setUncontrolledValue(newValue);
			}
			onValueChange?.(newValue);
		},
		[isControlled, onValueChange],
	);

	return [value, setValue];
}
