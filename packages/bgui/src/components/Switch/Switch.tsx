import { Colors, Tokens, useThemeColor } from "@braingame/utils";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { SwitchProps } from "./types";

const PADDING = 2;

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
	const width = variant === "compact" ? Tokens.xl : Tokens.xxl;
	const knobSize = variant === "compact" ? Tokens.s : Tokens.m;
	const translateX = width - knobSize - PADDING * 2;

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

const styles = StyleSheet.create({
	track: {
		height: Tokens.l,
		borderRadius: Tokens.l / 2,
		padding: PADDING,
		justifyContent: "center",
	},
	knob: {
		width: Tokens.m,
		height: Tokens.m,
		borderRadius: Tokens.m / 2,
	},
	compactTrack: {
		height: Tokens.m,
		borderRadius: Tokens.m / 2,
		padding: PADDING,
		justifyContent: "center",
	},
	compactKnob: {
		width: Tokens.s,
		height: Tokens.s,
		borderRadius: Tokens.s / 2,
	},
});
