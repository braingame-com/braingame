import { Colors, useThemeColor } from "@braingame/utils";
import { Pressable, View } from "react-native";
import { getSwitchDimensions, styles } from "./styles";
import type { SwitchProps } from "./types";

export const Switch = ({
	checked,
	onValueChange,
	disabled = false,
	variant = "standard",
	style,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedby,
}: SwitchProps) => {
	const activeColor = Colors.universal.primary;
	const inactiveColor = useThemeColor("button");
	const trackStyles = variant === "compact" ? styles.compactTrack : styles.track;
	const knobStyles = variant === "compact" ? styles.compactKnob : styles.knob;
	const { width, translateX } = getSwitchDimensions(variant);

	return (
		<Pressable
			role="switch"
			accessibilityRole="switch"
			accessibilityState={{ checked: checked, disabled }}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			aria-checked={checked}
			aria-disabled={disabled}
			onPress={() => onValueChange(!checked)}
			disabled={disabled}
			style={[
				trackStyles,
				{
					width,
					backgroundColor: checked ? activeColor : inactiveColor,
					opacity: disabled ? 0.5 : 1,
				},
				style,
			]}
		>
			<View
				style={[
					knobStyles,
					{
						transform: checked ? [{ translateX }] : undefined,
						backgroundColor: "#fff",
					},
				]}
			/>
		</Pressable>
	);
};

// Styles moved to styles.ts
