import { ContextErrorBoundary } from "@braingame/bgui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";

interface AccessibilityState {
	screenReaderEnabled: boolean;
	reduceMotionEnabled: boolean;
	boldTextEnabled: boolean;
	grayscaleEnabled: boolean;
	invertColorsEnabled: boolean;
	highContrastEnabled: boolean;
	// Custom app settings
	fontSize: "small" | "medium" | "large" | "extra-large";
	announcements: boolean;
	keyboardNavigation: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
	updateFontSize: (size: AccessibilityState["fontSize"]) => void;
	toggleAnnouncements: () => void;
	toggleKeyboardNavigation: () => void;
	announce: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

const STORAGE_KEY = "@braingame/accessibility_preferences";

const AccessibilityProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AccessibilityState>({
		screenReaderEnabled: false,
		reduceMotionEnabled: false,
		boldTextEnabled: false,
		grayscaleEnabled: false,
		invertColorsEnabled: false,
		highContrastEnabled: false,
		fontSize: "medium",
		announcements: true,
		keyboardNavigation: false,
	});

	// Load saved preferences
	useEffect(() => {
		const loadPreferences = async () => {
			try {
				const saved = await AsyncStorage.getItem(STORAGE_KEY);
				if (saved) {
					const preferences = JSON.parse(saved);
					setState((prev) => ({ ...prev, ...preferences }));
				}
			} catch (error) {
				console.error("Failed to load accessibility preferences:", error);
			}
		};
		loadPreferences();
	}, []);

	// Save preferences when they change
	const savePreferences = useCallback(async (newState: AccessibilityState) => {
		try {
			await AsyncStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					fontSize: newState.fontSize,
					announcements: newState.announcements,
					keyboardNavigation: newState.keyboardNavigation,
				}),
			);
		} catch (error) {
			console.error("Failed to save accessibility preferences:", error);
		}
	}, []);

	// Listen to system accessibility changes
	useEffect(() => {
		const subscriptions: { remove: () => void }[] = [];

		// Screen reader
		const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
			"screenReaderChanged",
			(enabled) => {
				setState((prev) => ({ ...prev, screenReaderEnabled: enabled }));
			},
		);
		subscriptions.push(screenReaderChangedSubscription);

		// Reduce motion
		if (Platform.OS === "ios") {
			const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
				"reduceMotionChanged",
				(enabled) => {
					setState((prev) => ({ ...prev, reduceMotionEnabled: enabled }));
				},
			);
			subscriptions.push(reduceMotionChangedSubscription);

			// Bold text
			const boldTextChangedSubscription = AccessibilityInfo.addEventListener(
				"boldTextChanged",
				(enabled) => {
					setState((prev) => ({ ...prev, boldTextEnabled: enabled }));
				},
			);
			subscriptions.push(boldTextChangedSubscription);

			// Grayscale
			const grayscaleChangedSubscription = AccessibilityInfo.addEventListener(
				"grayscaleChanged",
				(enabled) => {
					setState((prev) => ({ ...prev, grayscaleEnabled: enabled }));
				},
			);
			subscriptions.push(grayscaleChangedSubscription);

			// Invert colors
			const invertColorsChangedSubscription = AccessibilityInfo.addEventListener(
				"invertColorsChanged",
				(enabled) => {
					setState((prev) => ({ ...prev, invertColorsEnabled: enabled }));
				},
			);
			subscriptions.push(invertColorsChangedSubscription);
		}

		// Initial state check
		const checkInitialState = async () => {
			const [
				screenReaderEnabled,
				reduceMotionEnabled,
				boldTextEnabled,
				grayscaleEnabled,
				invertColorsEnabled,
			] = await Promise.all([
				AccessibilityInfo.isScreenReaderEnabled(),
				Platform.OS === "ios" ? AccessibilityInfo.isReduceMotionEnabled() : Promise.resolve(false),
				Platform.OS === "ios" ? AccessibilityInfo.isBoldTextEnabled() : Promise.resolve(false),
				Platform.OS === "ios" ? AccessibilityInfo.isGrayscaleEnabled() : Promise.resolve(false),
				Platform.OS === "ios" ? AccessibilityInfo.isInvertColorsEnabled() : Promise.resolve(false),
			]);

			setState((prev) => ({
				...prev,
				screenReaderEnabled,
				reduceMotionEnabled,
				boldTextEnabled,
				grayscaleEnabled,
				invertColorsEnabled,
			}));
		};

		checkInitialState();

		return () => {
			subscriptions.forEach((subscription) => subscription?.remove());
		};
	}, []);

	// Update font size
	const updateFontSize = useCallback(
		(size: AccessibilityState["fontSize"]) => {
			setState((prev) => {
				const newState = { ...prev, fontSize: size };
				savePreferences(newState);
				return newState;
			});
		},
		[savePreferences],
	);

	// Toggle announcements
	const toggleAnnouncements = useCallback(() => {
		setState((prev) => {
			const newState = { ...prev, announcements: !prev.announcements };
			savePreferences(newState);
			return newState;
		});
	}, [savePreferences]);

	// Toggle keyboard navigation
	const toggleKeyboardNavigation = useCallback(() => {
		setState((prev) => {
			const newState = { ...prev, keyboardNavigation: !prev.keyboardNavigation };
			savePreferences(newState);
			return newState;
		});
	}, [savePreferences]);

	// Announce message
	const announce = useCallback(
		(message: string) => {
			if (state.announcements) {
				AccessibilityInfo.announceForAccessibility(message);
			}
		},
		[state.announcements],
	);

	const value: AccessibilityContextValue = {
		...state,
		updateFontSize,
		toggleAnnouncements,
		toggleKeyboardNavigation,
		announce,
	};

	return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ContextErrorBoundary contextName="Accessibility">
			<AccessibilityProviderInner>{children}</AccessibilityProviderInner>
		</ContextErrorBoundary>
	);
};

export const useAccessibility = () => {
	const context = useContext(AccessibilityContext);
	if (!context) {
		throw new Error("useAccessibility must be used within AccessibilityProvider");
	}
	return context;
};

// Font size multipliers
export const fontSizeMultipliers = {
	small: 0.85,
	medium: 1,
	large: 1.15,
	"extra-large": 1.3,
};

// Get scaled font size
export const getScaledFontSize = (baseSize: number, scale: AccessibilityState["fontSize"]) => {
	return Math.round(baseSize * fontSizeMultipliers[scale]);
};
