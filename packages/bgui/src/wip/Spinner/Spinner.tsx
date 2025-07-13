import { useThemeColor } from "@braingame/utils";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SIZE_MAP, styles } from "./styles";
import type { SpinnerProps } from "./types";

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
