import { memo, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { Icon } from "../../components/Icon";
import { Text } from "../../components/Text";
import { useTheme } from "../../theme";
import { getCheckboxStyle, getContainerStyle, textStyle } from "./styles";
import type { CheckboxProps } from "./types";

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
	const { colors } = useTheme();
	const borderColor = colors.outlineVariant;
	const bg = colors.background;
	const accent = colors.onSurface;

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
