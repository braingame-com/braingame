import { memo, useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../Icon";
import { colorConfig, sizeConfig, styles } from "./styles";
import type { ChipProps } from "./types";

/**
 * Chip component for displaying tags, labels, or selectable items.
 *
 * @example
 * ```tsx
 * // Basic chip
 * <Chip label="Technology" />
 *
 * // Chip with icon
 * <Chip label="React Native" icon="react" color="primary" />
 *
 * // Removable chip
 * <Chip label="JavaScript" onRemove={() => console.log('removed')} />
 *
 * // Selectable chip
 * <Chip label="Filter" onPress={() => {}} selected={isSelected} />
 * ```
 */
function ChipComponent({
	label,
	variant = "filled",
	size = "md",
	color = "neutral",
	icon,
	onRemove,
	selected = false,
	onPress,
	disabled = false,
	style,
}: ChipProps) {
	const [isPressed, setIsPressed] = useState(false);

	const { paddingHorizontal, paddingVertical, fontSize } = sizeConfig[size];
	const { backgroundColor, borderColor, textColor } = colorConfig[variant][color];

	const handlePressIn = useCallback(() => setIsPressed(true), []);
	const handlePressOut = useCallback(() => setIsPressed(false), []);

	const content = (
		<View
			style={[
				styles.base,
				{
					backgroundColor,
					borderColor,
					paddingHorizontal,
					paddingVertical,
				},
				selected && styles.selected,
				disabled && styles.disabled,
				style,
			]}
		>
			{icon && <Icon name={icon} size="sm" color={textColor} style={styles.icon} />}
			<Text style={[styles.label, { color: textColor, fontSize }]}>{label}</Text>
			{onRemove && !disabled && (
				<Pressable
					onPress={onRemove}
					style={styles.removeButton}
					hitSlop={8}
					accessibilityRole="button"
					accessibilityLabel={`Remove ${label}`}
				>
					<Icon name="close" size="sm" color={textColor} />
				</Pressable>
			)}
		</View>
	);

	if (onPress && !disabled) {
		return (
			<Pressable
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				style={[styles.pressable, isPressed && styles.pressed]}
				disabled={disabled}
				accessibilityRole="button"
				accessibilityState={{ selected, disabled }}
			>
				{content}
			</Pressable>
		);
	}

	return content;
}

export const Chip = memo(ChipComponent);
