import { analytics } from "./AnalyticsService";
import type { EventName, EventProperties, UserProperties } from "./types";

// Export convenience functions
export const trackEvent = (event: EventName, properties?: EventProperties) =>
	analytics.track(event, properties);

export const trackScreen = (screenName: string, properties?: EventProperties) =>
	analytics.trackScreen(screenName, properties);

export const identifyUser = (userId: string, properties?: UserProperties) =>
	analytics.identify(userId, properties);

export const setUserProperty = (key: string, value: unknown) =>
	analytics.setUserProperty(key, value);

export const setUserProperties = (properties: UserProperties) =>
	analytics.setUserProperties(properties);

export const trackTiming = (
	category: string,
	timingVar: string,
	duration: number,
	label?: string,
) => analytics.trackTiming(category, timingVar, duration, label);

export const resetAnalytics = () => analytics.reset();

export const flushAnalytics = () => analytics.flush();
