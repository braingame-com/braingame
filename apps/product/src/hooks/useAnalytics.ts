import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import {
	type EventName,
	type EventProperties,
	trackEvent,
	trackScreen,
	trackTiming,
} from "../services/AnalyticsService";

/**
 * Hook for tracking screen views automatically
 */
export const useScreenTracking = (screenName?: string, properties?: EventProperties) => {
	const route = useRoute();
	const effectiveScreenName = screenName || route.name;
	const startTime = useRef<number>(Date.now());

	useFocusEffect(
		useCallback(() => {
			// Track screen view when screen comes into focus
			trackScreen(effectiveScreenName, properties);

			// Reset start time
			startTime.current = Date.now();

			return () => {
				// Track time spent on screen when leaving
				const timeSpent = Date.now() - startTime.current;
				trackEvent("screen_view", {
					screen_name: effectiveScreenName,
					time_spent: timeSpent,
					exit_type: "navigate_away",
					...properties,
				});
			};
		}, [effectiveScreenName, properties]),
	);
};

/**
 * Hook for tracking events with memoization
 */
export const useAnalyticsEvent = () => {
	const track = useCallback((event: EventName, properties?: EventProperties) => {
		trackEvent(event, properties);
	}, []);

	const trackWithTimer = useCallback((event: EventName, properties?: EventProperties) => {
		const startTime = Date.now();

		return () => {
			const duration = Date.now() - startTime;
			trackEvent(event, {
				...properties,
				duration,
			});
		};
	}, []);

	return { track, trackWithTimer };
};

/**
 * Hook for tracking button clicks
 */
export const useButtonTracking = (buttonName: string, properties?: EventProperties) => {
	const { track } = useAnalyticsEvent();

	const trackClick = useCallback(() => {
		track("button_click", {
			button_name: buttonName,
			...properties,
		});
	}, [track, buttonName, properties]);

	return trackClick;
};

/**
 * Hook for tracking form interactions
 */
export const useFormTracking = (formName: string) => {
	const { track } = useAnalyticsEvent();
	const startTime = useRef<number | null>(null);
	const fieldInteractions = useRef<Record<string, number>>({});

	const trackFormStart = useCallback(() => {
		startTime.current = Date.now();
		track("form_submit", {
			form_name: formName,
			action: "start",
		});
	}, [track, formName]);

	const trackFieldFocus = useCallback((fieldName: string) => {
		fieldInteractions.current[fieldName] = (fieldInteractions.current[fieldName] || 0) + 1;
	}, []);

	const trackFormSubmit = useCallback(
		(success: boolean, errors?: Record<string, unknown>) => {
			const duration = startTime.current ? Date.now() - startTime.current : null;

			track("form_submit", {
				form_name: formName,
				action: "submit",
				success,
				duration,
				field_interaction_count: Object.keys(fieldInteractions.current).length,
				error_count: errors ? Object.keys(errors).length : 0,
				has_errors: Boolean(errors && Object.keys(errors).length > 0),
			});

			// Reset tracking
			startTime.current = null;
			fieldInteractions.current = {};
		},
		[track, formName],
	);

	const trackFormAbandon = useCallback(() => {
		const duration = startTime.current ? Date.now() - startTime.current : null;

		track("form_submit", {
			form_name: formName,
			action: "abandon",
			duration,
			field_interaction_count: Object.keys(fieldInteractions.current).length,
		});

		// Reset tracking
		startTime.current = null;
		fieldInteractions.current = {};
	}, [track, formName]);

	return {
		trackFormStart,
		trackFieldFocus,
		trackFormSubmit,
		trackFormAbandon,
	};
};

/**
 * Hook for tracking content engagement
 */
export const useContentTracking = (contentType: string, contentId: string) => {
	const { track, trackWithTimer } = useAnalyticsEvent();
	const viewTimer = useRef<(() => void) | null>(null);

	const trackView = useCallback(() => {
		track("content_view", {
			content_type: contentType,
			content_id: contentId,
		});

		// Start timer for engagement tracking
		viewTimer.current = trackWithTimer("content_view", {
			content_type: contentType,
			content_id: contentId,
			action: "engage",
		});
	}, [track, trackWithTimer, contentType, contentId]);

	const trackSave = useCallback(() => {
		track("content_save", {
			content_type: contentType,
			content_id: contentId,
		});
	}, [track, contentType, contentId]);

	const trackShare = useCallback(
		(shareMethod: string) => {
			track("content_share", {
				content_type: contentType,
				content_id: contentId,
				share_method: shareMethod,
			});
		},
		[track, contentType, contentId],
	);

	// Track engagement time when component unmounts
	useEffect(() => {
		return () => {
			if (viewTimer.current) {
				viewTimer.current();
			}
		};
	}, []);

	return {
		trackView,
		trackSave,
		trackShare,
	};
};

/**
 * Hook for tracking search interactions
 */
export const useSearchTracking = () => {
	const { track } = useAnalyticsEvent();
	const searchStartTime = useRef<number | null>(null);

	const trackSearchStart = useCallback(() => {
		searchStartTime.current = Date.now();
	}, []);

	const trackSearch = useCallback(
		(query: string, resultCount: number, filters?: Record<string, unknown>) => {
			const duration = searchStartTime.current ? Date.now() - searchStartTime.current : null;

			track("search", {
				query,
				result_count: resultCount,
				has_results: resultCount > 0,
				duration,
				filters: filters ? Object.keys(filters).join(",") : undefined,
			});

			searchStartTime.current = null;
		},
		[track],
	);

	return {
		trackSearchStart,
		trackSearch,
	};
};

/**
 * Hook for tracking performance metrics
 */
export const usePerformanceTracking = () => {
	const timers = useRef<Record<string, number>>({});

	const startTimer = useCallback((timerId: string) => {
		timers.current[timerId] = Date.now();
	}, []);

	const endTimer = useCallback((timerId: string, category: string, label?: string) => {
		const startTime = timers.current[timerId];
		if (!startTime) {
			console.warn(`Timer ${timerId} was not started`);
			return;
		}

		const duration = Date.now() - startTime;
		trackTiming(category, timerId, duration, label);

		delete timers.current[timerId];
	}, []);

	// Clean up any remaining timers
	useEffect(() => {
		return () => {
			timers.current = {};
		};
	}, []);

	return {
		startTimer,
		endTimer,
	};
};

/**
 * Hook for tracking video engagement
 */
export const useVideoTracking = (videoId: string, videoTitle?: string) => {
	const { track } = useAnalyticsEvent();
	const playStartTime = useRef<number | null>(null);
	const totalPlayTime = useRef<number>(0);
	const hasCompleted = useRef<boolean>(false);

	const trackPlay = useCallback(() => {
		playStartTime.current = Date.now();
		track("video_play", {
			video_id: videoId,
			video_title: videoTitle,
		});
	}, [track, videoId, videoTitle]);

	const trackPause = useCallback(
		(currentTime: number) => {
			if (playStartTime.current) {
				totalPlayTime.current += Date.now() - playStartTime.current;
				playStartTime.current = null;
			}

			track("video_pause", {
				video_id: videoId,
				video_title: videoTitle,
				current_time: currentTime,
				total_play_time: totalPlayTime.current,
			});
		},
		[track, videoId, videoTitle],
	);

	const trackComplete = useCallback(() => {
		if (!hasCompleted.current) {
			hasCompleted.current = true;

			if (playStartTime.current) {
				totalPlayTime.current += Date.now() - playStartTime.current;
			}

			track("video_complete", {
				video_id: videoId,
				video_title: videoTitle,
				total_play_time: totalPlayTime.current,
			});
		}
	}, [track, videoId, videoTitle]);

	const trackError = useCallback(
		(error: string) => {
			track("video_error", {
				video_id: videoId,
				video_title: videoTitle,
				error,
				play_time_before_error: totalPlayTime.current,
			});
		},
		[track, videoId, videoTitle],
	);

	return {
		trackPlay,
		trackPause,
		trackComplete,
		trackError,
	};
};
