/**
 * Used for font sizes, margin/padding etc.
 */
export const Tokens = {
	xxxs: 2, // .125rem
	xxs: 4, // .25rem
	xs: 8, // .5rem
	s: 12, // .75rem
	ms: 14, // .875rem
	m: 16, // 1rem
	l: 20, // 1.25rem
	xl: 24, // 1.5rem
	xxl: 32, // 2rem
	xxxl: 48, // 3rem
	xxxxl: 72, // 4.5rem
} as const;

/**
 * Consistent opacity values for UI states
 */
export const Opacity = {
	disabled: 0.5,
	hover: 0.9,
	pressed: 0.8,
	shadow: 0.1,
	overlay: 0.7,
} as const;

export type TokenKey = keyof typeof Tokens;
export type OpacityKey = keyof typeof Opacity;
