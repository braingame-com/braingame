"use client";

import { useEffect } from "react";
import { analytics } from "../lib/analytics";

interface AnalyticsProviderProps {
	children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
	useEffect(() => {
		// Initialize analytics
		analytics.init({
			debug: process.env.NODE_ENV === "development",
		});

		// Track web vitals
		if (typeof window !== "undefined" && "web-vital" in window) {
			// Will be populated by useReportWebVitals
		}

		// Track errors
		const handleError = (event: ErrorEvent) => {
			analytics.exception(event.error || event.message, false);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			analytics.exception(
				event.reason instanceof Error ? event.reason : String(event.reason),
				false,
			);
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);

	return <>{children}</>;
}
