import type React from "react";
import { Platform, Text as RNText } from "react-native";
import { getBaseStyle, getFloatingStyle, requiredStyle } from "./styles";
import type { LabelProps } from "./types";

export const Label = ({
	children,
	htmlFor,
	required = false,
	size = "md",
	variant = "standard",
	style,
}: LabelProps) => {
	const baseStyle = getBaseStyle(size);
	const floatingStyle = variant === "floating" ? getFloatingStyle() : {};

	if (Platform.OS === "web") {
		return (
			<label htmlFor={htmlFor} style={style as React.CSSProperties}>
				<RNText style={[baseStyle, floatingStyle]}>
					{children}
					{required && (
						<RNText accessibilityElementsHidden accessibilityRole="none" style={requiredStyle}>
							*
						</RNText>
					)}
				</RNText>
			</label>
		);
	}

	return (
		<RNText
			style={[baseStyle, floatingStyle, style]}
			nativeID={htmlFor ? `${htmlFor}-label` : undefined}
		>
			{children}
			{required && (
				<RNText accessibilityElementsHidden accessibilityRole="none" style={requiredStyle}>
					*
				</RNText>
			)}
		</RNText>
	);
};
