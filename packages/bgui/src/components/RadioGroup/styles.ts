import { Tokens } from "@braingame/utils";

/**
 * Get item styles for RadioGroup based on variant and state
 */
export const getItemStyles = (
	variant: "standard" | "card",
	background: string,
	borderColor?: string,
	isSelected?: boolean,
) => {
	const baseStyle = {
		padding: Tokens.m,
		borderWidth: variant === "card" ? 1 : 0,
		borderRadius: Tokens.s,
		backgroundColor: background,
		marginBottom: Tokens.xs,
		alignItems: "flex-start" as const,
	};

	const selectedStyle = variant === "card" && isSelected ? { borderColor } : {};

	return [baseStyle, selectedStyle];
};
