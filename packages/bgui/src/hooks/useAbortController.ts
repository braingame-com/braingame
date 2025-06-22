import { useEffect, useRef } from "react";

/**
 * Hook that provides an AbortController for cancelling async operations
 * when the component unmounts.
 *
 * @returns An AbortController that will be aborted when the component unmounts
 *
 * @example
 * ```tsx
 * const abortController = useAbortController();
 *
 * useEffect(() => {
 *   const fetchData = async () => {
 *     try {
 *       const response = await fetch('/api/data', {
 *         signal: abortController.signal
 *       });
 *       if (!abortController.signal.aborted) {
 *         const data = await response.json();
 *         setData(data);
 *       }
 *     } catch (error) {
 *       if (!abortController.signal.aborted) {
 *         setError(error);
 *       }
 *     }
 *   };
 *   fetchData();
 * }, []);
 * ```
 */
export function useAbortController(): AbortController {
	const abortControllerRef = useRef<AbortController | null>(null);

	if (!abortControllerRef.current) {
		abortControllerRef.current = new AbortController();
	}

	useEffect(() => {
		const controller = abortControllerRef.current;
		return () => {
			controller?.abort();
		};
	}, []);

	return abortControllerRef.current;
}
