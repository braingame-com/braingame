/**
 * Unified monitoring setup for analytics and error tracking
 */

import { analytics } from "./analytics";

interface MonitoringConfig {
	sentryDsn?: string;
	gaTrackingId?: string;
	debug?: boolean;
}

class Monitoring {
	private config: MonitoringConfig = {};

	/**
	 * Initialize all monitoring services
	 */
	init(config: MonitoringConfig) {
		this.config = config;

		// Initialize analytics
		analytics.init({
			debug: config.debug,
		});

		// Log initialization
		if (config.debug || process.env.NODE_ENV === "development") {
			console.log("[Monitoring] Initialized with:", {
				hasSentry: !!config.sentryDsn,
				hasGA: !!config.gaTrackingId,
			});
		}
	}

	/**
	 * Track custom metrics
	 */
	trackMetric(name: string, value: number, unit?: string) {
		analytics.track({
			name: "custom_metric",
			category: "performance",
			label: name,
			value,
			metadata: {
				unit: unit || "ms",
			},
		});
	}

	/**
	 * Track user engagement
	 */
	trackEngagement(action: string, target: string, value?: number) {
		analytics.track({
			name: "engagement",
			category: "user_interaction",
			label: `${action}_${target}`,
			value,
			metadata: {
				action,
				target,
			},
		});
	}

	/**
	 * Track conversion events
	 */
	trackConversion(type: string, value?: number, currency?: string) {
		analytics.track({
			name: "conversion",
			category: "goal",
			label: type,
			value,
			metadata: {
				currency: currency || "USD",
				conversion_type: type,
			},
		});
	}

	/**
	 * Track feature usage
	 */
	trackFeature(featureName: string, action: string, metadata?: Record<string, unknown>) {
		analytics.track({
			name: "feature_usage",
			category: "feature",
			label: featureName,
			metadata: {
				action,
				...metadata,
			},
		});
	}

	/**
	 * Log performance marks
	 */
	logPerformance(markName: string) {
		if (typeof window === "undefined" || !window.performance) return;

		const entries = performance.getEntriesByName(markName);
		if (entries.length > 0) {
			const duration = entries[0].startTime;
			this.trackMetric(markName, duration, "ms");
		}
	}
}

// Export singleton instance
export const monitoring = new Monitoring();
