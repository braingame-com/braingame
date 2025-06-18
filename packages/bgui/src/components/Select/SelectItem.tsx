import { Tokens } from "@braingame/utils/constants/Tokens";
import { useThemeColor } from "@braingame/utils/hooks/useThemeColor";
import { Pressable } from "react-native";
import { Text } from "../../../Text";
import type { SelectItemProps } from "./types";

export interface InternalSelectItemProps extends SelectItemProps {
	selected?: boolean;
	onSelect?: (value: string) => void;
}

export const SelectItem = ({ value, children, selected, onSelect }: InternalSelectItemProps) => {
	const textColor = useThemeColor("text");
	const selectedColor = useThemeColor("tint");

	return (
		<Pressable
			accessibilityRole="menuitem"
			accessibilityState={{ selected }}
			onPress={() => onSelect?.(value)}
			style={{
				padding: Tokens.s,
				backgroundColor: selected ? `${selectedColor}33` : "transparent",
			}}
		>
			<Text style={{ color: textColor }}>{children}</Text>
		</Pressable>
	);
};
