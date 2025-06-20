import { useCallback, useEffect, useRef } from "react";
import { AccessibilityInfo, Platform } from "react-native";
import { useAccessibility } from "../contexts/AccessibilityContext";

interface AnnouncementOptions {
	delay?: number;
	queue?: boolean;
	interrupt?: boolean;
}

/**
 * Hook for managing screen reader announcements
 * Provides a consistent way to announce messages to screen reader users
 */
export const useScreenReaderAnnouncement = () => {
	const { screenReaderEnabled, announcements } = useAccessibility();
	const announcementQueue = useRef<string[]>([]);
	const isProcessing = useRef(false);

	// Process announcement queue
	const processQueue = useCallback(async () => {
		if (isProcessing.current || announcementQueue.current.length === 0) {
			return;
		}

		isProcessing.current = true;

		while (announcementQueue.current.length > 0) {
			const message = announcementQueue.current.shift();
			if (message) {
				AccessibilityInfo.announceForAccessibility(message);
				// Add small delay between announcements to ensure they're not cut off
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}

		isProcessing.current = false;
	}, []);

	/**
	 * Announce a message to screen reader users
	 */
	const announce = useCallback(
		(message: string, options: AnnouncementOptions = {}) => {
			if (!announcements || !message) {
				return;
			}

			const { delay = 0, queue = false, interrupt = false } = options;

			const makeAnnouncement = () => {
				if (interrupt) {
					// Clear queue if interrupting
					announcementQueue.current = [];
				}

				if (queue) {
					// Add to queue
					announcementQueue.current.push(message);
					processQueue();
				} else {
					// Announce immediately
					AccessibilityInfo.announceForAccessibility(message);
				}
			};

			if (delay > 0) {
				setTimeout(makeAnnouncement, delay);
			} else {
				makeAnnouncement();
			}
		},
		[announcements, processQueue],
	);

	/**
	 * Announce multiple messages in sequence
	 */
	const announceSequence = useCallback(
		(messages: string[], delayBetween: number = 1000) => {
			messages.forEach((message, index) => {
				announce(message, {
					delay: index * delayBetween,
					queue: true,
				});
			});
		},
		[announce],
	);

	/**
	 * Announce a live update (for dynamic content)
	 */
	const announceLive = useCallback(
		(message: string, priority: "polite" | "assertive" = "polite") => {
			if (!announcements || !message) {
				return;
			}

			// On iOS, we can use different announcement types
			if (Platform.OS === "ios") {
				// For assertive announcements, interrupt current speech
				if (priority === "assertive") {
					announce(message, { interrupt: true });
				} else {
					announce(message, { queue: true });
				}
			} else {
				// Android doesn't distinguish, so just announce
				announce(message);
			}
		},
		[announcements, announce],
	);

	/**
	 * Announce screen change
	 */
	const announceScreenChange = useCallback(
		(screenName: string, additionalInfo?: string) => {
			const messages = [`${screenName} screen loaded`];

			if (additionalInfo) {
				messages.push(additionalInfo);
			}

			announceSequence(messages, 500);
		},
		[announceSequence],
	);

	/**
	 * Announce form validation errors
	 */
	const announceFormErrors = useCallback(
		(errors: Record<string, string>) => {
			const errorCount = Object.keys(errors).length;

			if (errorCount === 0) {
				announce("Form is valid");
				return;
			}

			const messages = [
				`${errorCount} ${errorCount === 1 ? "error" : "errors"} found`,
				...Object.entries(errors).map(([field, error]) => `${field}: ${error}`),
			];

			announceSequence(messages, 800);
		},
		[announce, announceSequence],
	);

	/**
	 * Announce loading state changes
	 */
	const announceLoading = useCallback(
		(isLoading: boolean, loadingMessage?: string, completedMessage?: string) => {
			if (isLoading) {
				announce(loadingMessage || "Loading, please wait", { interrupt: true });
			} else {
				announce(completedMessage || "Loading complete", { delay: 100 });
			}
		},
		[announce],
	);

	/**
	 * Announce progress updates
	 */
	const announceProgress = useCallback(
		(current: number, total: number, unit: string = "items") => {
			const percentage = Math.round((current / total) * 100);
			const message = `Progress: ${current} of ${total} ${unit} complete, ${percentage} percent`;

			// Use polite announcements for progress to avoid interrupting
			announceLive(message, "polite");
		},
		[announceLive],
	);

	/**
	 * Clear announcement queue
	 */
	const clearQueue = useCallback(() => {
		announcementQueue.current = [];
	}, []);

	return {
		announce,
		announceSequence,
		announceLive,
		announceScreenChange,
		announceFormErrors,
		announceLoading,
		announceProgress,
		clearQueue,
		isScreenReaderEnabled: screenReaderEnabled,
	};
};
