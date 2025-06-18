/**
 * Z-index layering system for consistent stacking order
 * Ensures proper layering of overlays, modals, and floating elements
 */
export const ZIndex = {
	base: 1,
	sticky: 10, // Sticky headers, navigation
	fixed: 100, // Fixed position elements
	dropdown: 1000, // Dropdowns, select menus
	overlay: 1100, // Background overlays
	modal: 1200, // Modal dialogs
	popover: 1300, // Popovers, tooltips
	toast: 1400, // Toast notifications
	debug: 9999, // Debug overlays (highest)
} as const;
