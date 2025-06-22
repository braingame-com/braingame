import { ContextErrorBoundary, useMountedState } from "@braingame/bgui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { analytics, setUserProperties } from "../services/AnalyticsService";

interface AnalyticsContextValue {
	isAnalyticsEnabled: boolean;
	toggleAnalytics: () => void;
	isPerformanceTrackingEnabled: boolean;
	togglePerformanceTracking: () => void;
	isCrashReportingEnabled: boolean;
	toggleCrashReporting: () => void;
	privacyLevel: "minimal" | "balanced" | "full";
	setPrivacyLevel: (level: "minimal" | "balanced" | "full") => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

const STORAGE_KEYS = {
	ANALYTICS_ENABLED: "@braingame/analytics_enabled",
	PERFORMANCE_TRACKING: "@braingame/performance_tracking_enabled",
	CRASH_REPORTING: "@braingame/crash_reporting_enabled",
	PRIVACY_LEVEL: "@braingame/analytics_privacy_level",
};

const AnalyticsProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(true);
	const [isPerformanceTrackingEnabled, setIsPerformanceTrackingEnabled] = useState(true);
	const [isCrashReportingEnabled, setIsCrashReportingEnabled] = useState(true);
	const [privacyLevel, setPrivacyLevelState] = useState<"minimal" | "balanced" | "full">(
		"balanced",
	);
	const isMounted = useMountedState();

	// Load preferences on mount
	useEffect(() => {
		const loadPreferences = async () => {
			try {
				const [analyticsEnabled, performanceEnabled, crashEnabled, privacy] = await Promise.all([
					AsyncStorage.getItem(STORAGE_KEYS.ANALYTICS_ENABLED),
					AsyncStorage.getItem(STORAGE_KEYS.PERFORMANCE_TRACKING),
					AsyncStorage.getItem(STORAGE_KEYS.CRASH_REPORTING),
					AsyncStorage.getItem(STORAGE_KEYS.PRIVACY_LEVEL),
				]);

				if (!isMounted()) return;

				if (analyticsEnabled !== null) {
					setIsAnalyticsEnabled(analyticsEnabled === "true");
				}
				if (performanceEnabled !== null) {
					setIsPerformanceTrackingEnabled(performanceEnabled === "true");
				}
				if (crashEnabled !== null) {
					setIsCrashReportingEnabled(crashEnabled === "true");
				}
				if (privacy !== null) {
					setPrivacyLevelState(privacy as "minimal" | "balanced" | "full");
				}
			} catch (error) {
				console.error("Failed to load analytics preferences:", error);
			}
		};

		loadPreferences();
	}, [isMounted]);

	// Initialize analytics service
	useEffect(() => {
		analytics.initialize();
	}, []);

	// Update analytics service when enabled state changes
	useEffect(() => {
		analytics.setEnabled(isAnalyticsEnabled);
	}, [isAnalyticsEnabled]);

	const toggleAnalytics = useCallback(async () => {
		const newValue = !isAnalyticsEnabled;

		if (isMounted()) {
			setIsAnalyticsEnabled(newValue);
		}

		try {
			await AsyncStorage.setItem(STORAGE_KEYS.ANALYTICS_ENABLED, newValue.toString());

			// Update user properties
			setUserProperties({
				analytics_enabled: newValue,
			});

			// If disabling, also disable sub-features
			if (!newValue && isMounted()) {
				setIsPerformanceTrackingEnabled(false);
				await AsyncStorage.setItem(STORAGE_KEYS.PERFORMANCE_TRACKING, "false");
			}
		} catch (error) {
			console.error("Failed to save analytics preference:", error);
		}
	}, [isAnalyticsEnabled, isMounted]);

	const togglePerformanceTracking = useCallback(async () => {
		const newValue = !isPerformanceTrackingEnabled;
		setIsPerformanceTrackingEnabled(newValue);

		try {
			await AsyncStorage.setItem(STORAGE_KEYS.PERFORMANCE_TRACKING, newValue.toString());

			setUserProperties({
				performance_tracking_enabled: newValue,
			});
		} catch (error) {
			console.error("Failed to save performance tracking preference:", error);
		}
	}, [isPerformanceTrackingEnabled]);

	const toggleCrashReporting = useCallback(async () => {
		const newValue = !isCrashReportingEnabled;
		setIsCrashReportingEnabled(newValue);

		try {
			await AsyncStorage.setItem(STORAGE_KEYS.CRASH_REPORTING, newValue.toString());

			setUserProperties({
				crash_reporting_enabled: newValue,
			});
		} catch (error) {
			console.error("Failed to save crash reporting preference:", error);
		}
	}, [isCrashReportingEnabled]);

	const setPrivacyLevel = useCallback(async (level: "minimal" | "balanced" | "full") => {
		setPrivacyLevelState(level);

		try {
			await AsyncStorage.setItem(STORAGE_KEYS.PRIVACY_LEVEL, level);

			setUserProperties({
				privacy_level: level,
			});

			// Adjust sub-features based on privacy level
			switch (level) {
				case "minimal":
					// Only essential analytics
					setIsPerformanceTrackingEnabled(false);
					await AsyncStorage.setItem(STORAGE_KEYS.PERFORMANCE_TRACKING, "false");
					break;
				case "balanced":
					// Default settings
					break;
				case "full":
					// All features enabled
					setIsPerformanceTrackingEnabled(true);
					await AsyncStorage.setItem(STORAGE_KEYS.PERFORMANCE_TRACKING, "true");
					break;
			}
		} catch (error) {
			console.error("Failed to save privacy level:", error);
		}
	}, []);

	const value: AnalyticsContextValue = {
		isAnalyticsEnabled,
		toggleAnalytics,
		isPerformanceTrackingEnabled,
		togglePerformanceTracking,
		isCrashReportingEnabled,
		toggleCrashReporting,
		privacyLevel,
		setPrivacyLevel,
	};

	return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ContextErrorBoundary contextName="Analytics">
			<AnalyticsProviderInner>{children}</AnalyticsProviderInner>
		</ContextErrorBoundary>
	);
};

export const useAnalyticsSettings = () => {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error("useAnalyticsSettings must be used within AnalyticsProvider");
	}
	return context;
};
