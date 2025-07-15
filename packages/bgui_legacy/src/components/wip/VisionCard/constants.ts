import type { M3ColorScheme } from "../../theme";
import type { LifeAreaConfigs } from "./types";

export const getLifeAreaConfigs = (colors: M3ColorScheme): LifeAreaConfigs => ({
	health: {
		title: "Health",
		icon: "heart",
		color: colors.error, // Red for health/heart
		description: "Physical and mental wellness",
	},
	wealth: {
		title: "Wealth",
		icon: "dollar-sign",
		color: colors.success, // Green for money
		description: "Financial abundance and security",
	},
	relationships: {
		title: "Relationships",
		icon: "users",
		color: colors.primary, // Blue for connections
		description: "Love, family, and friendships",
	},
	happiness: {
		title: "Happiness",
		icon: "smile",
		color: colors.warning, // Yellow/orange for joy
		description: "Joy, fulfillment, and satisfaction",
	},
	self: {
		title: "Self",
		icon: "user",
		color: colors.primary, // Primary color for self
		description: "Personal growth and development",
	},
});
