/**
 * Animation timing and easing tokens for consistent motion design
 * Duration in milliseconds, easing functions for smooth transitions
 */
export const Animation = {
	duration: {
		instant: 0,
		fast: 150, // Quick interactions, hover states
		normal: 200, // Default transitions
		slow: 300, // Layout changes, page transitions
		slower: 500, // Complex animations
		crawl: 1000, // Special effects, loading states
	},
	easing: {
		linear: "linear",
		ease: "ease",
		easeIn: "ease-in",
		easeOut: "ease-out",
		easeInOut: "ease-in-out",
		// Custom cubic-bezier curves for advanced animations
		bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
		smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
		sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
	},
} as const;
