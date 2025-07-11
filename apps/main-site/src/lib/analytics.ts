/**
 * Analytics utility for tracking user interactions and metrics
 */

interface AnalyticsEvent {
	name: string;
	category: string;
	label?: string;
	value?: number;
	metadata?: Record<string, unknown>;
}

interface PageViewEvent {
	url: string;
	title: string;
	referrer?: string;
}

interface UserProperties {
	[key: string]: string | number | boolean | Date;
}

class Analytics {
	private isInitialized = false;
	private userId?: string;
	private sessionId: string;
	private eventQueue: AnalyticsEvent[] = [];

	constructor() {
		this.sessionId = this.generateSessionId();

		// Process queued events when ready
		if (typeof window !== "undefined") {
			window.addEventListener("load", () => {
				this.processEventQueue();
			});
		}
	}

	/**
	 * Initialize analytics with configuration
	 */
	init(config?: { userId?: string; debug?: boolean }) {
		if (this.isInitialized) return;

		this.userId = config?.userId;
		this.isInitialized = true;

		// Log initialization in debug mode
		if (config?.debug || process.env.NODE_ENV === "development") {
			console.log("[Analytics] Initialized", {
				userId: this.userId,
				sessionId: this.sessionId,
			});
		}

		// Process any queued events
		this.processEventQueue();
	}

	/**
	 * Track a custom event
	 */
	track(event: string | AnalyticsEvent, properties?: Record<string, unknown>) {
		const eventData: AnalyticsEvent =
			typeof event === "string"
				? {
						name: event,
						category: "general",
						metadata: properties,
					}
				: event;

		// Add timestamp and session info
		const enrichedEvent = {
			...eventData,
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			userId: this.userId,
		};

		if (!this.isInitialized) {
			this.eventQueue.push(enrichedEvent);
			return;
		}

		this.sendEvent(enrichedEvent);
	}

	/**
	 * Track page views
	 */
	pageView(data: PageViewEvent) {
		this.track({
			name: "page_view",
			category: "navigation",
			metadata: {
				...data,
				timestamp: new Date().toISOString(),
			},
		});
	}

	/**
	 * Track user timing metrics
	 */
	timing(category: string, variable: string, value: number, label?: string) {
		this.track({
			name: "timing",
			category,
			label: label || variable,
			value,
			metadata: {
				variable,
				unit: "ms",
			},
		});
	}

	/**
	 * Set user properties
	 */
	identify(userId: string, properties?: UserProperties) {
		this.userId = userId;

		this.track({
			name: "identify",
			category: "user",
			metadata: {
				userId,
				properties,
			},
		});
	}

	/**
	 * Track exceptions/errors
	 */
	exception(error: Error | string, fatal = false) {
		const errorMessage = error instanceof Error ? error.message : error;
		const errorStack = error instanceof Error ? error.stack : undefined;

		this.track({
			name: "exception",
			category: "error",
			metadata: {
				description: errorMessage,
				stack: errorStack,
				fatal,
				url: typeof window !== "undefined" ? window.location.href : undefined,
			},
		});
	}

	/**
	 * Track social interactions
	 */
	social(network: string, action: string, target?: string) {
		this.track({
			name: "social",
			category: "social",
			label: network,
			metadata: {
				socialNetwork: network,
				socialAction: action,
				socialTarget: target,
			},
		});
	}

	/**
	 * Track outbound links
	 */
	outboundLink(url: string, category = "outbound") {
		this.track({
			name: "click",
			category,
			label: url,
			metadata: {
				transport: "beacon",
				hitCallback: () => {
					if (typeof window !== "undefined") {
						window.location.href = url;
					}
				},
			},
		});
	}

	/**
	 * Send event to analytics provider
	 */
	private sendEvent(event: AnalyticsEvent & { timestamp: string; sessionId: string }) {
		// Log in development
		if (process.env.NODE_ENV === "development") {
			console.log("[Analytics] Event:", event);
		}

		// Google Analytics 4
		if (typeof window !== "undefined" && "gtag" in window) {
			// @ts-expect-error - gtag is added by Google Analytics script
			window.gtag("event", event.name, {
				event_category: event.category,
				event_label: event.label,
				value: event.value,
				...event.metadata,
			});
		}

		// Additional analytics providers can be added here
		// Example: Mixpanel, Amplitude, Segment, etc.
	}

	/**
	 * Process queued events
	 */
	private processEventQueue() {
		if (!this.isInitialized) return;

		while (this.eventQueue.length > 0) {
			const event = this.eventQueue.shift();
			if (event) {
				this.sendEvent(event as AnalyticsEvent & { timestamp: string; sessionId: string });
			}
		}
	}

	/**
	 * Generate unique session ID
	 */
	private generateSessionId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}
}

// Export singleton instance
export const analytics = new Analytics();

// Export types
export type { AnalyticsEvent, PageViewEvent, UserProperties };
