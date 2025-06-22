/**
 * Utility to apply error boundaries to all screens and components
 * This ensures consistent error handling across the application
 */

import type { ComponentType } from "react";
import { withScreenErrorBoundary } from "./withErrorBoundary";

/**
 * Configuration for which components should have error boundaries
 */
export const ERROR_BOUNDARY_CONFIG = {
	// Screens that need error boundaries
	screens: {
		// Auth screens
		LoginScreen: { level: "screen" as const, showDetails: true },
		RegisterScreen: { level: "screen" as const, showDetails: true },
		ForgotPasswordScreen: { level: "screen" as const, showDetails: true },
		WelcomeScreen: { level: "screen" as const, showDetails: true },

		// Main screens
		DashboardScreen: { level: "screen" as const, showDetails: true },
		VideosScreen: { level: "screen" as const, showDetails: true },
		VideoPlayerScreen: { level: "screen" as const, showDetails: true },
		AnalyticsScreen: { level: "screen" as const, showDetails: true },
		PremiumScreen: { level: "screen" as const, showDetails: true },
		MindsetScreen: { level: "screen" as const, showDetails: true },
		TaskDetailsScreen: { level: "screen" as const, showDetails: true },
		VisionGoalsScreen: { level: "screen" as const, showDetails: true },
		ProfileScreen: { level: "screen" as const, showDetails: true },
		SettingsScreen: { level: "screen" as const, showDetails: true },
		NotificationsScreen: { level: "screen" as const, showDetails: true },
		PrivacyScreen: { level: "screen" as const, showDetails: true },
		TermsScreen: { level: "screen" as const, showDetails: true },
		AboutScreen: { level: "screen" as const, showDetails: true },
		DeleteAccountScreen: { level: "screen" as const, showDetails: true },
	},

	// Modal screens
	modals: {
		PaymentModal: { level: "screen" as const, showDetails: true },
		NotificationSettingsModal: { level: "screen" as const, showDetails: true },
		OnboardingModal: { level: "screen" as const, showDetails: true },
	},

	// Critical components
	components: {
		VideoPlayer: { level: "component" as const, isolate: true },
		PaymentForm: { level: "component" as const, isolate: false },
		Analytics: { level: "component" as const, isolate: true },
		MindsetGame: { level: "component" as const, isolate: true },
	},
};

/**
 * Apply error boundary to a screen
 */
export function applyScreenErrorBoundary<P extends object>(
	Screen: ComponentType<P>,
	screenName: string,
): ComponentType<P> {
	return withScreenErrorBoundary(Screen, screenName);
}

/**
 * Batch apply error boundaries to multiple screens
 *
 * @example
 * ```tsx
 * const screens = {
 *   Login: LoginScreen,
 *   Register: RegisterScreen,
 * };
 *
 * const safeScreens = applyErrorBoundariesToScreens(screens);
 * ```
 */
export function applyErrorBoundariesToScreens<T extends Record<string, ComponentType<any>>>(
	screens: T,
): T {
	const safeScreens = {} as T;

	for (const [name, Screen] of Object.entries(screens)) {
		safeScreens[name as keyof T] = withScreenErrorBoundary(Screen, name) as T[keyof T];
	}

	return safeScreens;
}

/**
 * Check if a component has an error boundary
 */
export function hasErrorBoundary(Component: ComponentType<any>): boolean {
	return (
		Component.displayName?.includes("withErrorBoundary") ||
		Component.displayName?.includes("ErrorBoundary") ||
		false
	);
}

/**
 * Development-only validation to ensure screens have error boundaries
 */
export function validateErrorBoundaries(screens: Record<string, ComponentType<any>>): void {
	if (!__DEV__) return;

	const missing: string[] = [];

	for (const [name, Screen] of Object.entries(screens)) {
		if (!hasErrorBoundary(Screen)) {
			missing.push(name);
		}
	}

	if (missing.length > 0) {
		console.warn(
			"⚠️ The following screens are missing error boundaries:",
			missing,
			"\n\nUse withScreenErrorBoundary() to add error boundaries.",
		);
	}
}
