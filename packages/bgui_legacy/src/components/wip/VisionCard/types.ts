import type { ViewStyle } from "react-native";

export type LifeArea = "health" | "wealth" | "relationships" | "happiness" | "self";

export interface VisionCardProps {
	/**
	 * The life area this card represents
	 */
	area: LifeArea;

	/**
	 * The user's vision text for this area
	 */
	vision?: string;

	/**
	 * Progress percentage (0-100) for this area
	 */
	progress?: number;

	/**
	 * Callback when edit button is pressed
	 */
	onEdit: () => void;

	/**
	 * Optional custom styling
	 */
	style?: ViewStyle;

	/**
	 * Whether the card is in a loading state
	 */
	loading?: boolean;
}

export interface LifeAreaConfig {
	title: string;
	icon: string;
	color: string;
	description: string;
}

export type LifeAreaConfigs = Record<LifeArea, LifeAreaConfig>;
