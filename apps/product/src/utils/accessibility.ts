import type { AccessibilityRole, AccessibilityState } from "react-native";
import { Platform } from "react-native";

/**
 * Accessibility utilities for React Native
 * Provides consistent accessibility patterns across the app
 */

/**
 * Generate accessibility props for interactive elements
 */
export const getAccessibilityProps = (label: string, hint?: string, role?: AccessibilityRole) => ({
	accessible: true,
	accessibilityLabel: label,
	accessibilityHint: hint,
	accessibilityRole: role || "button",
	importantForAccessibility: "yes" as const,
});

/**
 * Generate accessibility state props
 */
export const getAccessibilityState = (state: AccessibilityState) => ({
	accessibilityState: state,
});

/**
 * Announce text to screen readers
 */
export const announceForAccessibility = (announcement: string) => {
	if (Platform.OS === "ios") {
		const { AccessibilityInfo } = require("react-native");
		AccessibilityInfo.announceForAccessibility(announcement);
	} else if (Platform.OS === "android") {
		const { AccessibilityInfo } = require("react-native");
		AccessibilityInfo.announceForAccessibility(announcement);
	}
};

/**
 * Check if screen reader is enabled
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
	const { AccessibilityInfo } = require("react-native");
	return await AccessibilityInfo.isScreenReaderEnabled();
};

/**
 * Common accessibility labels
 */
export const a11yLabels = {
	// Navigation
	back: "Go back",
	close: "Close",
	menu: "Open menu",
	settings: "Open settings",

	// Actions
	play: "Play",
	pause: "Pause",
	stop: "Stop",
	refresh: "Refresh",
	search: "Search",
	filter: "Filter",
	sort: "Sort",

	// Status
	loading: "Loading",
	error: "Error",
	success: "Success",
	warning: "Warning",

	// Forms
	required: "Required field",
	optional: "Optional field",
	submit: "Submit form",
	cancel: "Cancel",

	// Content
	image: "Image",
	video: "Video",
	audio: "Audio",
	chart: "Chart",

	// States
	selected: "Selected",
	notSelected: "Not selected",
	expanded: "Expanded",
	collapsed: "Collapsed",
	checked: "Checked",
	unchecked: "Unchecked",
};

/**
 * Generate label for list items
 */
export const getListItemLabel = (item: string, index: number, total: number): string => {
	return `${item}, ${index + 1} of ${total}`;
};

/**
 * Generate label for progress
 */
export const getProgressLabel = (current: number, total: number, unit = "items"): string => {
	const percentage = Math.round((current / total) * 100);
	return `${current} of ${total} ${unit} complete, ${percentage} percent`;
};

/**
 * Focus management utilities
 */
export const focusManagement = {
	// Set focus to element with accessibility
	setAccessibilityFocus: (ref: React.RefObject<unknown>) => {
		if (ref?.current) {
			const { AccessibilityInfo } = require("react-native");
			// @ts-expect-error - _nativeTag is not typed in React Native
			const reactTag = ref.current._nativeTag;
			if (reactTag) {
				AccessibilityInfo.setAccessibilityFocus(reactTag);
			}
		}
	},

	// Create focus trap for modals
	createFocusTrap: (containerRef: React.RefObject<unknown>) => {
		// Implementation would handle focus cycling within container
		return {
			activate: () => {
				// Set initial focus
				focusManagement.setAccessibilityFocus(containerRef);
			},
			deactivate: () => {
				// Return focus to trigger element
			},
		};
	},
};

/**
 * Semantic HTML roles mapped to React Native
 */
export const semanticRoles: Record<string, AccessibilityRole> = {
	heading: "header",
	navigation: "menu",
	main: "none",
	article: "none",
	section: "none",
	aside: "none",
	footer: "none",
	form: "none",
	search: "search",
	list: "list",
	listitem: "none",
	link: "link",
	button: "button",
	image: "image",
	text: "text",
	switch: "switch",
	checkbox: "checkbox",
	radio: "radio",
	slider: "adjustable",
	progressbar: "progressbar",
	tab: "tab",
	tablist: "tablist",
};

/**
 * Accessibility hints generator
 */
export const getHint = {
	button: (action: string) => `Double tap to ${action}`,
	link: (destination: string) => `Double tap to navigate to ${destination}`,
	toggle: (state: boolean, action: string) =>
		`Double tap to ${state ? "disable" : "enable"} ${action}`,
	slider: (value: number, min: number, max: number) =>
		`Swipe up or down to adjust. Current value ${value}, minimum ${min}, maximum ${max}`,
	textInput: (required: boolean) =>
		`Text field${required ? ", required" : ", optional"}. Double tap to edit`,
};

/**
 * Color contrast checker
 */
export const meetsContrastRatio = (
	_foreground: string,
	_background: string,
	_ratio = 4.5,
): boolean => {
	// Simplified check - in production would calculate actual contrast
	// WCAG AA requires 4.5:1 for normal text, 3:1 for large text
	return true; // Placeholder
};

/**
 * Reduced motion preference
 */
export const prefersReducedMotion = async (): Promise<boolean> => {
	if (Platform.OS === "ios") {
		const { AccessibilityInfo } = require("react-native");
		return await AccessibilityInfo.isReduceMotionEnabled();
	}
	return false;
};

/**
 * High contrast preference
 */
export const prefersHighContrast = async (): Promise<boolean> => {
	if (Platform.OS === "windows") {
		const { AccessibilityInfo } = require("react-native");
		
		// Check API availability explicitly
		if (!AccessibilityInfo.isHighContrastEnabled) {
			console.warn("High contrast detection not available on this platform");
			return false;
		}
		
		try {
			return await AccessibilityInfo.isHighContrastEnabled();
		} catch (error) {
			console.error("Error checking high contrast setting:", error);
			return false;
		}
	}
	return false;
};
