// Main exports
export { analytics } from "./AnalyticsService";

// Type exports
export type { EventName, EventProperties, UserProperties, SuperProperties } from "./types";

// Helper function exports
export {
	trackEvent,
	trackScreen,
	identifyUser,
	setUserProperty,
	setUserProperties,
	trackTiming,
	resetAnalytics,
	flushAnalytics,
} from "./helpers";