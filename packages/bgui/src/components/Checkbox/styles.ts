import { Tokens } from "@braingame/utils";

/**
 * Calculate container style for checkbox
 */
export const getContainerStyle = (disabled?: boolean) => ({
	flexDirection: "row" as const,
	alignItems: "center" as const,
	opacity: disabled ? 0.5 : 1,
});

/**
 * Calculate checkbox style based on state and theme colors
 */
export const getCheckboxStyle = (
	checked: boolean,
	indeterminate: boolean,
	borderColor: string,
	accent: string,
	bg: string,
) => ({
	width: Tokens.l,
	height: Tokens.l,
	borderRadius: 4,
	borderWidth: 1,
	borderColor,
	alignItems: "center" as const,
	justifyContent: "center" as const,
	backgroundColor: checked || indeterminate ? accent : bg,
});

/**
 * Text style for checkbox label
 */
export const textStyle = {
	marginLeft: Tokens.s,
};
