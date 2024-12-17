import { Pressable } from "react-native";
import type { ButtonProps } from "@/constants/types";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { buttonStyles } from "@/constants/styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export const Button = ({
	text,
	icon,
	iconColor,
	iconType,
	onPress,
	disabled,
}: ButtonProps) => {
	const backgroundColor = useThemeColor("button");
	const backgroundColorHovered = useThemeColor("buttonHovered");
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Pressable
			onPress={onPress}
			style={{
				...(icon && !text ? buttonStyles.iconButton : buttonStyles.button),
				backgroundColor: isHovered ? backgroundColor : backgroundColorHovered,
				opacity: disabled ? 0.5 : undefined,
			}}
			disabled={disabled}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
		>
			{text && <Text>{text}</Text>}
			{icon && <Icon name={icon} color={iconColor} type={iconType} />}
		</Pressable>
	);
};
