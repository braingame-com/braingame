import type { ViewStyle } from "react-native";

export interface EmptyStateProps {
	/**
	 * Icon name to display (optional)
	 */
	icon?: string;

	/**
	 * Main title text
	 */
	title: string;

	/**
	 * Optional description text
	 */
	description?: string;

	/**
	 * Optional action button
	 */
	action?: {
		label: string;
		onPress: () => void;
	};

	/**
	 * Custom styling
	 */
	style?: ViewStyle;
}
