import { Pressable } from "react-native";
import type { ButtonProps } from "@/constants/types";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { buttonStyles } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";

export const Button = ({ text, icon, iconType, onPress }: ButtonProps) => {
	const backgroundColor = useThemeColor("card");

	return (
		<Pressable
			onPress={onPress}
			style={{
				...(icon && !text ? buttonStyles.iconButton : buttonStyles.button),
				backgroundColor,
			}}
		>
			{text && <Text>{text}</Text>}
			{icon && <Icon name={icon} type={iconType} />}
		</Pressable>
	);
};
