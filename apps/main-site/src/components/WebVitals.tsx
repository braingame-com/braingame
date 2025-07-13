"use client";

import { useReportWebVitals } from "next/web-vitals";
import { analytics } from "../lib/analytics";

export function WebVitals() {
	useReportWebVitals((metric) => {
		// Send to analytics
		analytics.timing("web_vitals", metric.name, Math.round(metric.value), metric.id);

		// Log in development
		if (process.env.NODE_ENV === "development") {
			console.log(`[Web Vitals] ${metric.name}:`, metric.value);
		}

		// Send to Google Analytics
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics script
			window.gtag("event", metric.name, {
				event_category: "Web Vitals",
				event_label: metric.id,
				value: Math.round(metric.value),
				non_interaction: true,
			});
		}
	});

	return null;
}
