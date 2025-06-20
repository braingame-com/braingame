import { Text as RNText } from "react-native";
import { textStyles, useThemeColor } from "@braingame/utils";
import { baseTextStyle, getTextColor } from "./styles";
import type { TextProps } from "./types";

export const Text = ({
	children,
	variant = "body",
	color,
	align = "left",
	numberOfLines,
	style,
	...rest
}: TextProps) => {
	const baseColor = useThemeColor("text");
	const secondaryColor = useThemeColor("textSecondary");

	const resolvedColor = getTextColor(color, baseColor, secondaryColor);

	return (
		<RNText
			numberOfLines={numberOfLines}
			style={[
				{ color: resolvedColor, textAlign: align, ...baseTextStyle },
				variant === "h1" && textStyles.displayTitle,
				variant === "h2" && textStyles.title,
				variant === "h3" && textStyles.subtitle,
				variant === "body" && textStyles.default,
				variant === "caption" && textStyles.small,
				style,
			]}
			{...rest}
		>
			{children}
		</RNText>
	);
};
