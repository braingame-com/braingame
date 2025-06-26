import { useThemeColor } from "@braingame/utils";
import { memo, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { getCheckboxStyle, getContainerStyle, textStyle } from "./styles";
import type { CheckboxProps } from "./types";

/**
 * Checkbox component for multi-selection interfaces.
 * Supports checked, unchecked, and indeterminate states.
 *
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox
 *   checked={isSelected}
 *   onValueChange={setIsSelected}
 * />
 *
 * // With label
 * <Checkbox
 *   checked={acceptTerms}
 *   onValueChange={setAcceptTerms}
 * >
 *   I accept the terms and conditions
 * </Checkbox>
 *
 * // Indeterminate state
 * <Checkbox
 *   checked={false}
 *   indeterminate={true}
 *   onValueChange={handleChange}
 * >
 *   Select all
 * </Checkbox>
 *
 * // Disabled checkbox
 * <Checkbox
 *   checked={true}
 *   onValueChange={() => {}}
 *   disabled
 * >
 *   Premium feature
 * </Checkbox>
 * ```
 *
 * @component
 */
const CheckboxComponent = ({
	checked,
	onValueChange,
	children,
	indeterminate = false,
	disabled,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	...pressableProps
}: CheckboxProps) => {
	const borderColor = useThemeColor("border");
	const bg = useThemeColor("background");
	const accent = useThemeColor("text");

	const handlePress = useCallback(() => {
		if (disabled) return;
		onValueChange(!checked);
	}, [disabled, checked, onValueChange]);

	const containerStyle = useMemo(() => getContainerStyle(disabled), [disabled]);

	const checkboxStyle = useMemo(
		() => getCheckboxStyle(checked, indeterminate, borderColor, accent, bg),
		[checked, indeterminate, borderColor, accent, bg],
	);

	const iconName = indeterminate ? "minus" : "check";

	return (
		<Pressable
			onPress={handlePress}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: indeterminate ? "mixed" : checked, disabled }}
			accessibilityLabel={ariaLabel}
			{...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {})}
			style={containerStyle}
			{...pressableProps}
		>
			<View style={checkboxStyle}>
				{(checked || indeterminate) && <Icon name={iconName} size="sm" color="background" />}
			</View>
			{children && <Text style={textStyle}>{children}</Text>}
		</Pressable>
	);
};

// Wrap with memo for optimal performance
export const Checkbox = memo(CheckboxComponent);
