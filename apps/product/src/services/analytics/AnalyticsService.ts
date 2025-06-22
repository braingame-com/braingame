import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { captureException } from "../ErrorService";
import { ANALYTICS_STORAGE_KEYS } from "./constants";
import { type AnalyticsProvider, MockAnalyticsProvider } from "./providers";
import type { EventName, EventProperties, SuperProperties, UserProperties } from "./types";
import { generateSessionId } from "./utils";

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
		this.sessionId = generateSessionId();
		this.superProperties = this.generateSuperProperties();
	}

	static getInstance(): AnalyticsService {
		if (!AnalyticsService.instance) {
			AnalyticsService.instance = new AnalyticsService();
		}
		return AnalyticsService.instance;
	}

	private generateSuperProperties(): SuperProperties {
		return {
			platform: Platform.OS,
			platformVersion: Platform.Version?.toString() || "unknown",
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
			const enabled = await AsyncStorage.getItem(ANALYTICS_STORAGE_KEYS.ENABLED);
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
			const lastLaunch = await AsyncStorage.getItem(ANALYTICS_STORAGE_KEYS.LAST_LAUNCH);
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
			// Debug analytics event: [event] with [properties]
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
				await AsyncStorage.setItem(ANALYTICS_STORAGE_KEYS.LAST_LAUNCH, Date.now().toString());
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
			this.sessionId = generateSessionId();
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
		this.isEnabled = enabled;
		await AsyncStorage.setItem(ANALYTICS_STORAGE_KEYS.ENABLED, enabled.toString());

		if (!enabled) {
			await this.reset();
		}
	}

	isAnalyticsEnabled(): boolean {
		return this.isEnabled;
	}

	private async processEventQueue() {
		if (this.eventQueue.length === 0) return;

		const events = [...this.eventQueue];
		this.eventQueue = [];

		for (const { event, properties } of events) {
			await this.track(event, properties);
		}
	}

	// Screen tracking helper
	trackScreen(screenName: string, properties?: EventProperties) {
		this.track("screen_view", {
			screen_name: screenName,
			...properties,
		});
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
		this.track("screen_load_time", {
			category,
			timing_var: timingVar,
			duration,
			label,
		});
	}

	// Error tracking helper
	trackError(error: Error, fatal = false) {
		this.track("error", {
			error_message: error.message,
			error_stack: error.stack,
			fatal,
		});
	}
}

// Export singleton instance
export const analytics = AnalyticsService.getInstance();
