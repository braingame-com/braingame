import { View as RNView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { ViewProps } from "@/constants/types";
import { viewStyles } from "@/constants/styles";
import { Tokens } from "@/constants/Tokens";

export const View = ({
	type = "background",
	style,
	transparent,
	rounded,
	border,
	...rest
}: ViewProps) => {
	const backgroundColor = transparent
		? "transparent"
		: useThemeColor(type.includes("card") ? "card" : "background");
	const borderColor = useThemeColor("border");

	return (
		<RNView
			style={[
				{ backgroundColor },
				viewStyles[type],
				rounded && {
					borderRadius: Tokens.m,
				},
				border && {
					borderWidth: 1,
					borderColor,
				},
				style,
			]}
			{...rest}
		/>
	);
};
