import { Colors } from "@braingame/utils";
import type { LifeAreaConfigs } from "./types";

export const LIFE_AREA_CONFIGS: LifeAreaConfigs = {
	health: {
		title: "Health",
		icon: "heart",
		color: Colors.universal.status.error, // Red for health/heart
		description: "Physical and mental wellness",
	},
	wealth: {
		title: "Wealth",
		icon: "dollar-sign",
		color: Colors.universal.status.success, // Green for money
		description: "Financial abundance and security",
	},
	relationships: {
		title: "Relationships",
		icon: "users",
		color: Colors.universal.status.info, // Blue for connections
		description: "Love, family, and friendships",
	},
	happiness: {
		title: "Happiness",
		icon: "smile",
		color: Colors.universal.status.warning, // Yellow/orange for joy
		description: "Joy, fulfillment, and satisfaction",
	},
	self: {
		title: "Self",
		icon: "user",
		color: Colors.universal.primary, // Primary color for self
		description: "Personal growth and development",
	},
};
