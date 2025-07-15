import { Tokens } from "@braingame/utils";
import { memo, useCallback, useMemo } from "react";
import { Pressable } from "react-native";
import { Text } from "../../components/Text";
import { SELECTED_BACKGROUND_OPACITY } from "../../constants";
import { useTheme } from "../../theme";
import type { SelectItemProps } from "./types";

export interface InternalSelectItemProps extends SelectItemProps {
	selected?: boolean;
	onSelect?: (value: string) => void;
}

const SelectItemComponent = ({ value, children, selected, onSelect }: InternalSelectItemProps) => {
	const { colors } = useTheme();
	const textColor = colors.onSurface;
	const selectedColor = colors.primary;

	const handlePress = useCallback(() => {
		onSelect?.(value);
	}, [onSelect, value]);

	const itemStyle = useMemo(
		() => ({
			padding: Tokens.s,
			backgroundColor: selected ? `${selectedColor}${SELECTED_BACKGROUND_OPACITY}` : "transparent",
		}),
		[selected, selectedColor],
	);

	const textStyle = useMemo(() => ({ color: textColor }), [textColor]);

	return (
		<Pressable
			accessibilityRole="menuitem"
			accessibilityState={{ selected }}
			onPress={handlePress}
			style={itemStyle}
		>
			<Text style={textStyle}>{children}</Text>
		</Pressable>
	);
};

// Wrap with memo for optimal performance in lists
export const SelectItem = memo(SelectItemComponent);
