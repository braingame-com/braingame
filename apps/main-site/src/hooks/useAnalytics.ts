"use client";

import { useCallback } from "react";

export function useAnalytics() {
	const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
		// Google Analytics 4
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics
			window.gtag("event", eventName, {
				...properties,
				timestamp: new Date().toISOString(),
			});
		}

		// Log in development
		if (process.env.NODE_ENV === "development") {
			console.log("[Analytics]", eventName, properties);
		}
	}, []);

	const trackPageView = useCallback(
		(path: string) => {
			trackEvent("page_view", {
				page_path: path,
				page_location: window.location.href,
				page_title: document.title,
			});
		},
		[trackEvent],
	);

	const trackError = useCallback(
		(error: Error, componentStack?: string) => {
			trackEvent("exception", {
				description: error.message,
				stack: error.stack,
				component_stack: componentStack,
				fatal: false,
			});
		},
		[trackEvent],
	);

	return {
		trackEvent,
		trackPageView,
		trackError,
	};
}
