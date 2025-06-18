import { Tokens, useThemeColor } from "@braingame/utils";
import { Pressable, View } from "react-native";
import { Icon } from "../Icon";
import { Text } from "../Text";
import type { CheckboxProps } from "./types";

export const Checkbox = ({
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

	const handlePress = () => {
		if (disabled) return;
		onValueChange(!checked);
	};

	// Icon color should contrast with the checked background

	return (
		<Pressable
			onPress={handlePress}
			accessibilityRole="checkbox"
			accessibilityState={{ checked: indeterminate ? "mixed" : checked, disabled }}
			accessibilityLabel={ariaLabel}
			{...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {})}
			style={{ flexDirection: "row", alignItems: "center", opacity: disabled ? 0.5 : 1 }}
		>
			<View
				style={{
					width: Tokens.l,
					height: Tokens.l,
					borderRadius: 4,
					borderWidth: 1,
					borderColor,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: checked || indeterminate ? accent : bg,
				}}
			>
				{(checked || indeterminate) && (
					<Icon name={indeterminate ? "minus" : "check"} size="sm" color="background" />
				)}
			</View>
			{children && <Text style={{ marginLeft: Tokens.s }}>{children}</Text>}
		</Pressable>
	);
};
