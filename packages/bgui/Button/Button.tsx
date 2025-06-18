import { useState } from "react";
import { Pressable } from "react-native";
import { buttonStyles } from "../../utils/constants/styles";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import { Icon } from "../Icon";
import { Text } from "../Text";
import type { ButtonProps } from "./types";

/**
 * Render a theme-aware button.
 *
 * Provides hover states on web and supports optional icon-only mode.
 */
export const Button = ({ text, icon, iconColor, iconType, onPress, disabled }: ButtonProps) => {
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
