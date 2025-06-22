import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { captureException } from "./ErrorService";

// Event types
export type EventName =
	// Navigation events
	| "screen_view"
	| "tab_switch"
	| "navigation_error"

	// User actions
	| "button_click"
	| "form_submit"
	| "search"
	| "filter_apply"
	| "share"
	| "scroll"

	// Content engagement
	| "video_play"
	| "video_pause"
	| "video_complete"
	| "video_error"
	| "content_view"
	| "content_save"
	| "content_share"

	// Feature usage
	| "mindset_start"
	| "mindset_complete"
	| "affirmation_play"
	| "vision_update"
	| "goal_create"
	| "goal_complete"

	// Performance
	| "app_launch"
	| "screen_load_time"
	| "api_call_time"
	| "crash"
	| "error"

	// Monetization
	| "purchase_start"
	| "purchase_complete"
	| "purchase_cancel"
	| "subscription_start"
	| "subscription_cancel"

	// Settings
	| "settings_change"
	| "theme_change"
	| "accessibility_change"
	| "notification_toggle";

export interface EventProperties {
	[key: string]: string | number | boolean | null | undefined | Record<string, unknown>;
}

interface UserProperties {
	userId?: string;
	email?: string;
	name?: string;
	createdAt?: string;
	subscriptionStatus?: "free" | "trial" | "premium" | "expired";
	themeName?: string;
	accessibilityEnabled?: boolean;
	notificationsEnabled?: boolean;
	[key: string]: unknown;
}

interface SuperProperties {
	platform: string;
	platformVersion: string;
	appVersion: string;
	buildVersion: string;
	deviceModel?: string;
	deviceManufacturer?: string;
	deviceName?: string;
	isDevice: boolean;
	sessionId: string;
	[key: string]: unknown;
}

interface AnalyticsProvider {
	init(apiKey: string): Promise<void>;
	identify(userId: string, properties?: UserProperties): Promise<void>;
	track(event: EventName, properties?: EventProperties): Promise<void>;
	setUserProperties(properties: UserProperties): Promise<void>;
	setSuperProperties(properties: SuperProperties): Promise<void>;
	reset(): Promise<void>;
	flush(): Promise<void>;
}

type AnalyticsEvent =
	| {
			type: "identify";
			userId: string;
			properties?: UserProperties;
			timestamp: Date;
	  }
	| {
			type: "track";
			event: EventName;
			properties?: EventProperties;
			timestamp: Date;
	  };

// Mock Analytics Provider for Development
class MockAnalyticsProvider implements AnalyticsProvider {
	private logs: AnalyticsEvent[] = [];
	async init(_apiKey: string) {
		// Mock analytics initialized in development
	}

	async identify(userId: string, properties?: UserProperties) {
		const log: AnalyticsEvent = { type: "identify", userId, properties, timestamp: new Date() };
		this.logs.push(log);
		// Mock analytics user identified
	}

	async track(event: EventName, properties?: EventProperties) {
		const log: AnalyticsEvent = { type: "track", event, properties, timestamp: new Date() };
		this.logs.push(log);
		// Mock analytics event tracked
	}

	async setUserProperties(_properties: UserProperties) {
		// Mock analytics user properties set
	}

	async setSuperProperties(_properties: SuperProperties) {
		// Mock analytics super properties set
	}

	async reset() {
		this.logs = [];
		// Mock analytics reset
	}

	async flush() {
		// Mock analytics flushed events
	}
}

// Main Analytics Service
class AnalyticsService {
	private static instance: AnalyticsService;
	private providers: AnalyticsProvider[] = [];
	private superProperties: SuperProperties;
	private userProperties: UserProperties = {};
	private sessionId: string;
	private eventQueue: Array<{ event: EventName; properties?: EventProperties }> = [];
	private isInitialized = false;
	private isEnabled = true;
	private debugMode = __DEV__;

	private constructor() {
		this.sessionId = this.generateSessionId();
		this.superProperties = this.generateSuperProperties();
	}

	static getInstance(): AnalyticsService {
		if (!AnalyticsService.instance) {
			AnalyticsService.instance = new AnalyticsService();
		}
		return AnalyticsService.instance;
	}

	private generateSessionId(): string {
		return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	private generateSuperProperties(): SuperProperties {
		// Validate critical platform data
		if (Platform.Version === null || Platform.Version === undefined) {
			console.error("Platform.Version is not available - check React Native setup");
		}

		return {
			platform: Platform.OS,
			platformVersion:
				Platform.Version !== null && Platform.Version !== undefined
					? Platform.Version.toString()
					: "unknown",
			appVersion: Application.nativeApplicationVersion || "1.0.0",
			buildVersion: Application.nativeBuildVersion || "1",
			deviceModel: Device.modelName || undefined,
			deviceManufacturer: Device.manufacturer || undefined,
			deviceName: Device.deviceName || undefined,
			isDevice: Device.isDevice ?? true,
			sessionId: this.sessionId,
		};
	}

	async initialize() {
		try {
			// Check if analytics is enabled
			const enabled = await AsyncStorage.getItem("@braingame/analytics_enabled");
			this.isEnabled = enabled !== "false";

			if (!this.isEnabled) {
				// Analytics disabled by user preference
				return;
			}

			// Initialize providers based on environment
			if (__DEV__) {
				// Use mock provider in development
				const mockProvider = new MockAnalyticsProvider();
				await mockProvider.init("mock-api-key");
				this.providers.push(mockProvider);
			} else {
				// Initialize real providers in production
				// Example: Mixpanel
				// const mixpanel = new MixpanelProvider();
				// await mixpanel.init(process.env.MIXPANEL_TOKEN);
				// this.providers.push(mixpanel);
				// Example: Amplitude
				// const amplitude = new AmplitudeProvider();
				// await amplitude.init(process.env.AMPLITUDE_API_KEY);
				// this.providers.push(amplitude);
			}

			// Set super properties on all providers
			await Promise.all(
				this.providers.map((provider) => provider.setSuperProperties(this.superProperties)),
			);

			// Process queued events
			await this.processEventQueue();

			this.isInitialized = true;

			// Track app launch
			this.track("app_launch", {
				launch_type: "cold",
				time_since_last_launch: await this.getTimeSinceLastLaunch(),
			});
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_initialization",
			});
		}
	}

	private async getTimeSinceLastLaunch(): Promise<number | null> {
		try {
			const lastLaunch = await AsyncStorage.getItem("@braingame/last_launch");
			if (lastLaunch) {
				return Date.now() - Number.parseInt(lastLaunch, 10);
			}
		} catch {}
		return null;
	}

	async identify(userId: string, properties?: UserProperties) {
		if (!this.isEnabled) return;

		this.userProperties = {
			...this.userProperties,
			...properties,
			userId,
		};

		if (!this.isInitialized) {
			// Queue for later if not initialized
			return;
		}

		try {
			await Promise.all(
				this.providers.map((provider) => provider.identify(userId, this.userProperties)),
			);
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_identify",
				userId,
			});
		}
	}

	async track(event: EventName, properties?: EventProperties) {
		if (!this.isEnabled) return;

		if (this.debugMode) {
			// Analytics event tracked in debug mode
		}

		if (!this.isInitialized) {
			// Queue event for later
			this.eventQueue.push({ event, properties });
			return;
		}

		try {
			const enrichedProperties = {
				...properties,
				timestamp: new Date().toISOString(),
				session_id: this.sessionId,
			};

			await Promise.all(
				this.providers.map((provider) => provider.track(event, enrichedProperties)),
			);

			// Store last launch time
			if (event === "app_launch") {
				await AsyncStorage.setItem("@braingame/last_launch", Date.now().toString());
			}
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_track",
				event,
			});
		}
	}

	async setUserProperty(key: string, value: unknown) {
		if (!this.isEnabled) return;

		this.userProperties[key] = value;

		if (!this.isInitialized) return;

		try {
			await Promise.all(
				this.providers.map((provider) => provider.setUserProperties({ [key]: value })),
			);
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_set_user_property",
				key,
			});
		}
	}

	async setUserProperties(properties: UserProperties) {
		if (!this.isEnabled) return;

		this.userProperties = {
			...this.userProperties,
			...properties,
		};

		if (!this.isInitialized) return;

		try {
			await Promise.all(this.providers.map((provider) => provider.setUserProperties(properties)));
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_set_user_properties",
			});
		}
	}

	async reset() {
		try {
			await Promise.all(this.providers.map((provider) => provider.reset()));

			this.userProperties = {};
			this.sessionId = this.generateSessionId();
			this.superProperties.sessionId = this.sessionId;
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_reset",
			});
		}
	}

	async flush() {
		if (!this.isInitialized) return;

		try {
			await Promise.all(this.providers.map((provider) => provider.flush()));
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_flush",
			});
		}
	}

	async setEnabled(enabled: boolean) {
		try {
			this.isEnabled = enabled;
			await AsyncStorage.setItem("@braingame/analytics_enabled", enabled.toString());

			if (!enabled) {
				await this.reset();
			}
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_set_enabled",
				enabled,
			});
		}
	}

	isAnalyticsEnabled(): boolean {
		return this.isEnabled;
	}

	private async processEventQueue() {
		try {
			if (this.eventQueue.length === 0) return;

			const events = [...this.eventQueue];
			this.eventQueue = [];

			for (const { event, properties } of events) {
				await this.track(event, properties);
			}
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_process_event_queue",
				queueLength: this.eventQueue.length,
			});
		}
	}

	// Screen tracking helper
	trackScreen(screenName: string, properties?: EventProperties) {
		try {
			this.track("screen_view", {
				screen_name: screenName,
				...properties,
			});
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_track_screen",
				screenName,
			});
		}
	}

	// Performance tracking helpers
	startTimer(_timerId: string): () => void {
		const startTime = Date.now();

		return () => {
			const duration = Date.now() - startTime;
			return duration;
		};
	}

	trackTiming(category: string, timingVar: string, duration: number, label?: string) {
		try {
			this.track("screen_load_time", {
				category,
				timing_var: timingVar,
				duration,
				label,
			});
		} catch (error) {
			captureException(error as Error, {
				context: "analytics_track_timing",
				category,
				timingVar,
			});
		}
	}

	// Error tracking helper
	trackError(error: Error, fatal = false) {
		try {
			this.track("error", {
				error_message: error.message,
				error_stack: error.stack,
				fatal,
			});
		} catch (_trackingError) {
			// Avoid recursive error tracking - error tracking itself failed
		}
	}
}

// Export singleton instance
export const analytics = AnalyticsService.getInstance();

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
