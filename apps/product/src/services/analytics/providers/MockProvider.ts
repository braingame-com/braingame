import type { EventName, EventProperties, SuperProperties, UserProperties } from "../types";
import type { AnalyticsProvider } from "./AnalyticsProvider";

export class MockAnalyticsProvider implements AnalyticsProvider {
	private logs: any[] = [];

	async init(apiKey: string) {
		console.log("[MockAnalytics] Initialized with key:", `${apiKey.substring(0, 8)}...`);
	}

	async identify(userId: string, properties?: UserProperties) {
		const log = { type: "identify", userId, properties, timestamp: new Date() };
		this.logs.push(log);
		console.log("[MockAnalytics] Identify:", log);
	}

	async track(event: EventName, properties?: EventProperties) {
		const log = { type: "track", event, properties, timestamp: new Date() };
		this.logs.push(log);
		console.log("[MockAnalytics] Track:", log);
	}

	async setUserProperties(properties: UserProperties) {
		console.log("[MockAnalytics] Set User Properties:", properties);
	}

	async setSuperProperties(properties: SuperProperties) {
		console.log("[MockAnalytics] Set Super Properties:", properties);
	}

	async reset() {
		this.logs = [];
		console.log("[MockAnalytics] Reset");
	}

	async flush() {
		console.log("[MockAnalytics] Flush - Total events:", this.logs.length);
	}
}
