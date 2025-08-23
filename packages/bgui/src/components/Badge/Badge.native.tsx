import { createBox, createText, useTheme } from "@shopify/restyle";
import React from "react";
import { Animated, View, type ViewStyle } from "react-native";
import type { Theme } from "../../theme/theme";
import type { BadgeProps } from "./BadgeProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of Badge using Shopify Restyle
 *
 * Replicates the behavioral logic from Joy UI's Badge component
 */
export function Badge({
	children,
	color = "primary",
	variant = "solid",
	size = "md",
	dot = false,
	max = 99,
	badgeContent,
	invisible = false,
	style,
	"aria-label": ariaLabel,
	testID,
}: BadgeProps) {
	const _theme = useTheme<Theme>();
	const scaleAnim = React.useRef(new Animated.Value(1)).current;

	// Logic for determining visibility
	let isInvisible = invisible;

	if (invisible === false && badgeContent != null) {
		if ((badgeContent === 0 && !dot) || badgeContent === "") {
			isInvisible = true;
		}
	}

	// Logic for display value
	let displayValue = badgeContent;
	if (badgeContent && typeof badgeContent === "number" && badgeContent > max) {
		displayValue = `${max}+`;
	}

	if (dot) {
		displayValue = "";
	}

	// Animate scale based on visibility
	React.useEffect(() => {
		Animated.timing(scaleAnim, {
			toValue: isInvisible ? 0 : 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [isInvisible, scaleAnim]);

	// Size configurations
	const sizeConfig = {
		sm: {
			minHeight: dot ? 8 : 16,
			paddingX: dot ? 0 : 4,
			fontSize: 12,
		},
		md: {
			minHeight: dot ? 12 : 20,
			paddingX: dot ? 0 : 6,
			fontSize: 14,
		},
		lg: {
			minHeight: dot ? 16 : 24,
			paddingX: dot ? 0 : 8,
			fontSize: 16,
		},
	};

	const config = sizeConfig[size];

	// Create theme variant key
	const _variantKey = `${variant}-${color}` as keyof Theme["components"]["Badge"]["variants"];

	return (
		<View
			style={[
				{ position: "relative", alignSelf: "flex-start" },
				...(style ? [style as ViewStyle] : []),
			]}
		>
			{children}
			<Animated.View
				style={[
					{
						position: "absolute",
						top: 0,
						right: 0,
						minHeight: config.minHeight,
						minWidth: config.minHeight,
						borderRadius: config.minHeight / 2,
						alignItems: "center",
						justifyContent: "center",
						paddingHorizontal: config.paddingX,
						transform: [{ scale: scaleAnim }],
						elevation: 2,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 1 },
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
					},
				]}
				accessible
				accessibilityLabel={ariaLabel}
				accessibilityRole={badgeContent ? "text" : undefined}
				testID={testID}
			>
				<Box
					minHeight={config.minHeight}
					minWidth={config.minHeight}
					borderRadius="sm"
					alignItems="center"
					justifyContent="center"
					paddingHorizontal={dot ? "none" : "sm"}
					backgroundColor="primary"
				>
					{!dot && displayValue && (
						<ThemedText
							style={{
								fontSize: config.fontSize,
								fontWeight: "500",
								textAlign: "center",
							}}
						>
							{displayValue}
						</ThemedText>
					)}
				</Box>
			</Animated.View>
		</View>
	);
}
