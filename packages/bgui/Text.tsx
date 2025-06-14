import { Text as RNText } from "react-native";
import { textStyles } from "../utils/constants/styles";
import type { TextProps } from "../utils/constants/types";
import { useThemeColor } from "../utils/hooks/useThemeColor";

export const Text = ({ type = "default", style, ...rest }: TextProps) => {
	const color = useThemeColor("text");

	return (
		<RNText
			style={[
				{ color },
				{ fontFamily: "SohneBook" },
				type === "display" && textStyles.displayTitle,
				type === "title" && textStyles.title,
				type === "subtitle" && textStyles.subtitle,
				type === "default" && textStyles.default,
				type === "small" && textStyles.small,
				type === "link" && textStyles.link,
				style,
			]}
			{...rest}
		/>
	);
};
