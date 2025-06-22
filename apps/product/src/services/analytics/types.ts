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
	[key: string]: string | number | boolean | null | undefined;
}

export interface UserProperties {
	userId?: string;
	email?: string;
	name?: string;
	createdAt?: string;
	subscriptionStatus?: "free" | "trial" | "premium" | "expired";
	themeName?: string;
	accessibilityEnabled?: boolean;
	notificationsEnabled?: boolean;
	[key: string]: any;
}

export interface SuperProperties {
	platform: string;
	platformVersion: string;
	appVersion: string;
	buildVersion: string;
	deviceModel?: string;
	deviceManufacturer?: string;
	deviceName?: string;
	isDevice: boolean;
	sessionId: string;
	[key: string]: any;
}