"use client";

import { useCallback } from "react";
import { analytics } from "../lib/analytics";

/**
 * Hook to access analytics functions
 */
export function useAnalytics() {
	const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
		analytics.track(eventName, properties);

		// Also send to Google Analytics 4 if available
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

	const trackClick = useCallback((elementName: string, properties?: Record<string, unknown>) => {
		analytics.track({
			name: "click",
			category: "interaction",
			label: elementName,
			metadata: properties,
		});
	}, []);

	const trackFormSubmit = useCallback(
		(formName: string, success: boolean, properties?: Record<string, unknown>) => {
			analytics.track({
				name: "form_submit",
				category: "form",
				label: formName,
				metadata: {
					success,
					...properties,
				},
			});
		},
		[],
	);

	const trackTiming = useCallback(
		(category: string, variable: string, value: number, label?: string) => {
			analytics.timing(category, variable, value, label);
		},
		[],
	);

	const trackException = useCallback((error: Error | string, fatal = false) => {
		analytics.exception(error, fatal);
	}, []);

	const trackSocial = useCallback((network: string, action: string, target?: string) => {
		analytics.social(network, action, target);
	}, []);

	const trackOutboundLink = useCallback((url: string) => {
		analytics.outboundLink(url);
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
		trackClick,
		trackFormSubmit,
		trackTiming,
		trackException,
		trackSocial,
		trackOutboundLink,
		trackPageView,
		trackError,
	};
}
