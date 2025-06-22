import type { EventName, EventProperties, SuperProperties, UserProperties } from "../types";

export interface AnalyticsProvider {
	init(apiKey: string): Promise<void>;
	identify(userId: string, properties?: UserProperties): Promise<void>;
	track(event: EventName, properties?: EventProperties): Promise<void>;
	setUserProperties(properties: UserProperties): Promise<void>;
	setSuperProperties(properties: SuperProperties): Promise<void>;
	reset(): Promise<void>;
	flush(): Promise<void>;
}
