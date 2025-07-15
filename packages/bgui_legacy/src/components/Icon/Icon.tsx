"use client";

import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../theme";
import { type IconName, iconRegistry } from "./iconRegistry";

interface IconProps {
	name: IconName;
	size?: number | "sm" | "md" | "lg" | "xl";
	color?: string;
	style?: any;
	testID?: string;
}

const sizeMap = {
	sm: 16,
	md: 24,
	lg: 32,
	xl: 48,
} as const;

export function Icon({ name, size = "md", color, style, testID }: IconProps) {
	const { colors } = useTheme();

	const iconSize = typeof size === "number" ? size : sizeMap[size];
	const iconColor = color || colors.onSurface;

	const pathData = iconRegistry[name];

	if (!pathData) {
		if (__DEV__) {
			console.warn(`Icon "${name}" not found in registry`);
		}
		return null;
	}

	// Material Symbols SVGs are designed at 960x960 viewBox
	// We scale them down to standard 24x24 viewport
	return (
		<Svg
			width={iconSize}
			height={iconSize}
			viewBox="0 0 960 960"
			fill={iconColor}
			style={style}
			testID={testID}
		>
			<Path d={pathData} />
		</Svg>
	);
}
