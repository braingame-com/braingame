import type { BadgeVariant, ThemeColor } from "./types";

/**
 * Generate appropriate ARIA label for badge based on its properties
 */
export const getAriaLabel = (
	variant: BadgeVariant,
	dot?: boolean,
	count?: number,
	text?: string,
	color?: ThemeColor,
) => {
	if (dot) return "Notification indicator";

	if (variant === "notification" && count != null) {
		return `${count} notification${count !== 1 ? "s" : ""}`;
	}

	if (variant === "status") {
		return `Status: ${text || color}`;
	}

	if (count != null) {
		return `Count: ${count}`;
	}

	return text || "Badge";
};
