"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useId } from "react";
import { analytics } from "../lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const id = useId();

	// Track page views
	useEffect(() => {
		if (!GA_MEASUREMENT_ID) return;

		const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

		// Send pageview to GA4
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics script
			window.gtag("config", GA_MEASUREMENT_ID, {
				page_path: url,
			});
		}

		// Also track in our analytics
		analytics.pageView({
			url,
			title: document.title,
			referrer: document.referrer,
		});
	}, [pathname, searchParams]);

	// Don't render in development unless explicitly enabled
	if (!GA_MEASUREMENT_ID) {
		return null;
	}

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id={`google-analytics-${id}`} strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						anonymize_ip: true,
						cookie_flags: 'SameSite=None;Secure',
						send_page_view: false // We'll send manually for better control
					});
				`}
			</Script>
		</>
	);
}
