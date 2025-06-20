/**
 * Types for the Mindset Training System
 * Ported from dev-dil React app to React Native
 */

export interface VisionArea {
	key: string;
	value: string;
}

export interface JournalEntry {
	key: string;
	value: string;
}

export interface PerformanceMetric {
	key: string;
	value: string | boolean;
	type: "checkbox" | "text";
}

export interface CompletionState {
	vision: boolean;
	affirmations: boolean;
	reminders: boolean;
	images: boolean;
	journal: boolean;
	performance: boolean;
}

export interface MindsetSection {
	id: keyof CompletionState;
	title: string;
	description: string;
	completed: boolean;
}

/**
 * Button states for async operations
 * Matches dev-dil Button component behavior
 */
export type ButtonState = "idle" | "loading" | "success" | "error";

/**
 * Firebase Cloud Function response format
 */
export interface SubmissionResponse {
	success: boolean;
	message?: string;
	error?: string;
}
