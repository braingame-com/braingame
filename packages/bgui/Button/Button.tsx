import { useCallback, useMemo, useState } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
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
        const baseBackgroundColor = useThemeColor("button");
        const hoverBackgroundColor = useThemeColor("buttonHovered");
        const [isHovered, setIsHovered] = useState(false);

        const handleHoverIn = useCallback(() => setIsHovered(true), []);
        const handleHoverOut = useCallback(() => setIsHovered(false), []);

        const pressableStyle: StyleProp<ViewStyle> = useMemo(
                () => [
                        icon && !text ? buttonStyles.iconButton : buttonStyles.button,
                        {
                                backgroundColor: isHovered ? baseBackgroundColor : hoverBackgroundColor,
                                opacity: disabled ? 0.5 : 1,
                        },
                ],
                [icon, text, isHovered, baseBackgroundColor, hoverBackgroundColor, disabled],
        );

	return (
                <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ disabled }}
                        onPress={onPress}
                        style={pressableStyle}
                        disabled={disabled}
                        onHoverIn={handleHoverIn}
                        onHoverOut={handleHoverOut}
                >
			{text && <Text>{text}</Text>}
			{icon && <Icon name={icon} color={iconColor} type={iconType} />}
		</Pressable>
	);
};
