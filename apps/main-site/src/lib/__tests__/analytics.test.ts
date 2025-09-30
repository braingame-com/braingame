import { afterEach, beforeEach, describe, it, jest } from "@jest/globals";
import { initAnalytics, setUserId, trackEvent, trackPageView } from "../analytics";

type GtagArg = Record<string, unknown> | string | number | boolean | null | undefined;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		dataLayer?: GtagArg[][];
	}
}

describe("Analytics", () => {
	const originalGtag = window.gtag;
	const originalDataLayer = window.dataLayer;

	beforeEach(() => {
		// Setup mock gtag
		window.dataLayer = [];
		window.gtag = jest.fn((...args: GtagArg[]) => {
			window.dataLayer?.push(args);
		}) as unknown as (...args: unknown[]) => void;

		// Clear localStorage
		localStorage.clear();
	});

	afterEach(() => {
		window.gtag = originalGtag;
		window.dataLayer = originalDataLayer;
	});

	describe("initAnalytics", () => {
		it("should initialize analytics with measurement ID", () => {
			initAnalytics("G-TEST123");

			expect(window.gtag).toHaveBeenCalledWith("js", expect.any(Date));
			expect(window.gtag).toHaveBeenCalledWith("config", "G-TEST123", {
				page_path: expect.any(String),
			});
		});

		it("should not initialize if gtag is not available", () => {
			window.gtag = undefined;

			// Should not throw
			expect(() => initAnalytics("G-TEST123")).not.toThrow();
		});
	});

	describe("trackEvent", () => {
		it("should track custom events", () => {
			trackEvent("test_event", {
				category: "test",
				value: 123,
			});

			expect(window.gtag).toHaveBeenCalledWith("event", "test_event", {
				category: "test",
				value: 123,
			});
		});

		it("should handle events without parameters", () => {
			trackEvent("simple_event");

			expect(window.gtag).toHaveBeenCalledWith("event", "simple_event", {});
		});

		it("should not track if gtag is not available", () => {
			window.gtag = undefined;

			// Should not throw
			expect(() => trackEvent("test_event")).not.toThrow();
		});

		it("should track email subscription events", () => {
			trackEvent("email_subscribe_success", {
				email: "test@example.com",
				source: "homepage",
			});

			expect(window.gtag).toHaveBeenCalledWith("event", "email_subscribe_success", {
				email: "test@example.com",
				source: "homepage",
			});
		});
	});

	describe("trackPageView", () => {
		it("should track page views", () => {
			trackPageView("/test-page");

			expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
				page_path: "/test-page",
			});
		});

		it("should track page views with additional data", () => {
			trackPageView("/test-page", {
				page_title: "Test Page",
				custom_dimension: "value",
			});

			expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
				page_path: "/test-page",
				page_title: "Test Page",
				custom_dimension: "value",
			});
		});
	});

	describe("setUserId", () => {
		it("should set user ID for tracking", () => {
			setUserId("user123");

			expect(window.gtag).toHaveBeenCalledWith("config", expect.any(String), {
				user_id: "user123",
			});
		});

		it("should clear user ID when null is passed", () => {
			setUserId(null);

			expect(window.gtag).toHaveBeenCalledWith("config", expect.any(String), {
				user_id: null,
			});
		});
	});

	describe("Event validation", () => {
		it("should sanitize event names", () => {
			trackEvent("Test Event Name!@#$", {});

			// Should convert to valid event name
			expect(window.gtag).toHaveBeenCalledWith(
				"event",
				expect.stringMatching(/^[a-zA-Z0-9_]+$/),
				{},
			);
		});

		it("should limit parameter values", () => {
			const longString = "a".repeat(200);
			trackEvent("test_event", {
				long_param: longString,
			});

			const calls = (window.gtag as jest.Mock).mock.calls;
			const eventCall = calls.find((call) => call[0] === "event");
			const params = eventCall?.[2] as Record<string, unknown> | undefined;

			// Should truncate long strings
			expect(typeof params?.long_param).toBe("string");
			expect((params?.long_param as string).length).toBeLessThanOrEqual(100);
		});
	});

	describe("Privacy compliance", () => {
		it("should respect Do Not Track", () => {
			// Mock navigator.doNotTrack
			Object.defineProperty(navigator, "doNotTrack", {
				value: "1",
				configurable: true,
			});

			trackEvent("test_event");

			// Should still track but with limited data
			expect(window.gtag).toHaveBeenCalledWith(
				"event",
				"test_event",
				expect.objectContaining({
					anonymize_ip: true,
				}),
			);

			// Clean up
			Object.defineProperty(navigator, "doNotTrack", {
				value: "0",
				configurable: true,
			});
		});

		it("should handle consent mode", () => {
			// Set consent
			window.gtag?.("consent", "update", {
				analytics_storage: "granted",
				ad_storage: "denied",
			});

			expect(window.dataLayer).toContainEqual([
				"consent",
				"update",
				{
					analytics_storage: "granted",
					ad_storage: "denied",
				},
			]);
		});
	});
});
