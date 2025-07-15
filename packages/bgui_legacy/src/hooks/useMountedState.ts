import { useCallback, useEffect, useRef } from "react";

/**
 * Hook that tracks whether a component is still mounted.
 * Useful for preventing race conditions when setting state after async operations.
 *
 * @returns A function that returns true if the component is still mounted
 *
 * @example
 * ```tsx
 * const isMounted = useMountedState();
 *
 * useEffect(() => {
 *   const fetchData = async () => {
 *     const data = await api.getData();
 *     if (isMounted()) {
 *       setData(data);
 *     }
 *   };
 *   fetchData();
 * }, [isMounted]);
 * ```
 */
export function useMountedState(): () => boolean {
	const mountedRef = useRef(true);

	useEffect(() => {
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return useCallback(() => mountedRef.current, []);
}
