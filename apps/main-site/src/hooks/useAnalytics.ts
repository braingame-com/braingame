"use client";

import { useCallback } from "react";

// Placeholder analytics hook for legal compliance phase
export function useAnalytics() {
	const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
		if (process.env.NODE_ENV === "development") {
			console.log("[Analytics] Event:", eventName, properties);
		}
	}, []);

	return { trackEvent };
}
