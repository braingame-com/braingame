import { useThemeColor } from "@braingame/utils";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SIZE_MAP, styles } from "./styles";
import type { SpinnerProps } from "./types";

/**
 * Spinner component for indicating loading states.
 * Can be used inline or as a full-screen overlay.
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <Spinner />
 *
 * // Large spinner with custom color
 * <Spinner size="lg" color="#0066cc" />
 *
 * // Full-screen loading overlay
 * <Spinner variant="overlay" ariaLabel="Loading content..." />
 *
 * // Inline loading indicator
 * <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 *   <Spinner size="sm" />
 *   <Text>Loading...</Text>
 * </View>
 *
 * // Custom accessibility label
 * <Spinner ariaLabel="Saving your changes" />
 * ```
 *
 * @component
 */

export const Spinner = ({ size = "md", color, variant = "inline", ariaLabel }: SpinnerProps) => {
	const themeIconColor = useThemeColor("icon");
	const spinnerColor = color ?? themeIconColor;
	const indicatorSize = SIZE_MAP[size];

	const indicator = (
		<ActivityIndicator
			color={spinnerColor}
			size={indicatorSize}
			accessibilityLabel={ariaLabel}
			accessibilityLiveRegion="polite"
		/>
	);

	if (variant === "overlay") {
		return (
			<View style={[StyleSheet.absoluteFill, styles.overlay]} accessibilityViewIsModal>
				{indicator}
			</View>
		);
	}

	return indicator;
};

// Styles moved to styles.ts
