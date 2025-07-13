import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const environment = process.env.NODE_ENV;

export function initSentry() {
	if (!SENTRY_DSN) {
		console.log("[Sentry] No DSN provided, skipping initialization");
		return;
	}

	Sentry.init({
		dsn: SENTRY_DSN,
		environment,

		// Performance Monitoring
		tracesSampleRate: environment === "production" ? 0.1 : 1.0,

		// Session Replay
		replaysSessionSampleRate: environment === "production" ? 0.1 : 1.0,
		replaysOnErrorSampleRate: 1.0,

		// Release tracking
		release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

		// Integrations
		integrations: [
			Sentry.replayIntegration({
				maskAllText: false,
				blockAllMedia: false,
			}),
			Sentry.browserTracingIntegration(),
		],

		// Filtering
		ignoreErrors: [
			// Browser extensions
			"top.GLOBALS",
			// Random network errors
			"Network request failed",
			"NetworkError",
			"Failed to fetch",
			// Safari specific
			"Non-Error promise rejection captured",
		],

		beforeSend(event, hint) {
			// Filter out non-actionable errors
			if (event.exception) {
				const error = hint.originalException;

				// Filter browser extension errors
				if (error?.toString?.().includes("extension://")) {
					return null;
				}
			}

			return event;
		},
	});
}
