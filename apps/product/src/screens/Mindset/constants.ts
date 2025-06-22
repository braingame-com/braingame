/**
 * Constants for Mindset Training System
 * Ported from dev-dil React app
 */

import { FIREBASE_CONFIG } from "../../config/env";

/**
 * 5 Core Life Areas for Vision & Goals System
 * Exact content from dev-dil/src/sections/Vision.tsx
 */
export const VISION_AREAS = [
	"Business, Income & Financial Position",
	"Lifestyle, Home & Environment",
	"Life Purpose & Personal Qualities",
	"Health, Diet, Exercise, Weight",
	"Other, People Around Me",
];

/**
 * Journal Categories
 * From dev-dil/src/sections/Journal.tsx
 */
export const JOURNAL_CATEGORIES = ["Dreams", "After Action Report"];

/**
 * Performance Tracking Areas
 * From dev-dil/src/sections/Performance.tsx
 */
export const PERFORMANCE_CHECKBOXES = ["Dev-Dil (AM)", "Dev-Dil (PM)", "Supplements"];

export const PERFORMANCE_TEXT_INPUTS = [
	"Wake Time",
	"Sleep Score",
	"Bed Time",
	"Workout Time",
	"Workout Score",
	"Learning Time",
	"Learning Score",
	"Weight (lbs)",
	"Diet Score",
];

/**
 * Firebase Cloud Function endpoint
 * Configured via environment variables
 */
export const FIREBASE_FUNCTION_URL = FIREBASE_CONFIG.functionUrl;

/**
 * Mindset section configuration
 */
export const MINDSET_SECTIONS = [
	{
		id: "vision" as const,
		title: "Vision",
		description: "5-area life planning and goal setting",
	},
	{
		id: "affirmations" as const,
		title: "Affirmations",
		description: "Sam Ovens success affirmations with audio",
	},
	{
		id: "reminders" as const,
		title: "Reminders",
		description: "9 core philosophical principles",
	},
	{
		id: "images" as const,
		title: "Images",
		description: "Visual inspiration and motivation",
	},
	{
		id: "journal" as const,
		title: "Journal",
		description: "Dreams and after action reports",
	},
	{
		id: "performance" as const,
		title: "Performance",
		description: "Daily metrics and habit tracking",
	},
];

// Export affirmations content
export * from "./constants/affirmations";
