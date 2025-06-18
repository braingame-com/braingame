/**
 * Border radius system for consistent rounded corners
 * Separate from spacing tokens for semantic clarity
 */
export const BorderRadius = {
	none: 0,
	xs: 4, // Small components, inputs
	sm: 6, // Buttons, small cards
	md: 8, // Default cards, modals
	lg: 12, // Large cards, sheets
	xl: 16, // Hero sections, large elements
	xxl: 24, // Very large elements
	full: 9999, // Pills, circular elements
} as const;
