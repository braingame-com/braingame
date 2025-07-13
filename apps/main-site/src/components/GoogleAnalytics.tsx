"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export function GoogleAnalytics() {
	if (process.env.NODE_ENV !== "production") {
		return null;
	}

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			{/* biome-ignore lint/nursery/useUniqueElementIds: Static ID is fine for singleton component */}
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', '${GA_MEASUREMENT_ID}', {
						page_path: window.location.pathname,
					});

					// Default consent mode
					gtag('consent', 'default', {
						analytics_storage: 'denied',
						ad_storage: 'denied',
						wait_for_update: 500,
					});
				`}
			</Script>
		</>
	);
}
