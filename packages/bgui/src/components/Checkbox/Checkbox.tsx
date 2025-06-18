import { Tokens, useThemeColor } from "@braingame/utils";
import { memo, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { Icon } from "../Icon";
import { Text } from "../Text";
import type { CheckboxProps } from "./types";

const CheckboxComponent = ({
	checked,
	onValueChange,
	children,
	indeterminate = false,
	disabled,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
}: CheckboxProps) => {
	const borderColor = useThemeColor("border");
	const bg = useThemeColor("background");
	const accent = useThemeColor("text");

	const handlePress = useCallback(() => {
		if (disabled) return;
		onValueChange(!checked);
	}, [disabled, checked, onValueChange]);

	const containerStyle = useMemo(
		() => ({
			flexDirection: "row" as const,
			alignItems: "center" as const,
			opacity: disabled ? 0.5 : 1,
		}),
		[disabled],
	);

	const checkboxStyle = useMemo(
		() => ({
			width: Tokens.l,
			height: Tokens.l,
			borderRadius: 4,
			borderWidth: 1,
			borderColor,
			alignItems: "center" as const,
			justifyContent: "center" as const,
			backgroundColor: checked || indeterminate ? accent : bg,
		}),
		[borderColor, checked, indeterminate, accent, bg],
	);

	const textStyle = useMemo(() => ({ marginLeft: Tokens.s }), []);

	const iconName = indeterminate ? "minus" : "check";

	return (
		<Pressable
			onPress={handlePress}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: indeterminate ? "mixed" : checked, disabled }}
			accessibilityLabel={ariaLabel}
			{...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {})}
			style={containerStyle}
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
