import React, { useCallback } from "react";
import {
	View,
	Switch as RNSwitch,
	type SwitchProps,
} from "react-native";
import { useAccessibility } from "../../../contexts/AccessibilityContext";
import { getAccessibilityProps, getAccessibilityState, getHint } from "../../../utils/accessibility";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";
import { AccessibleThemedText } from "./AccessibleThemedText";

interface AccessibleThemedSwitchProps extends SwitchProps {
	label: string;
	accessibilityLabel?: string;
	error?: boolean;
}

export const AccessibleThemedSwitch = withMemo<AccessibleThemedSwitchProps>(
	({ label, value, onValueChange, disabled, accessibilityLabel, error, ...props }) => {
		const { theme } = useTheme();
		const { announce } = useAccessibility();

		const handleValueChange = useCallback(
			(newValue: boolean) => {
				announce(`${label} ${newValue ? "enabled" : "disabled"}`);
				onValueChange?.(newValue);
			},
			[onValueChange, label, announce],
		);

		const switchAccessibilityProps = {
			...getAccessibilityProps(
				accessibilityLabel || label,
				getHint.toggle(value || false, label),
				"switch",
			),
			...getAccessibilityState({
				disabled,
				checked: value,
			}),
		};

		return (
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<AccessibleThemedText
					variant={error ? "error" : disabled ? "disabled" : "primary"}
					size="md"
					style={{ flex: 1, marginRight: theme.sizes.spacingMD }}
				>
					{label}
				</AccessibleThemedText>
				<RNSwitch
					trackColor={{
						false: theme.components.switch?.trackColor || "#767577",
						true: theme.colors.primary,
					}}
					thumbColor={value ? theme.colors.background : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={handleValueChange}
					value={value}
					disabled={disabled}
					{...switchAccessibilityProps}
					{...props}
				/>
			</View>
		);
	},
	"AccessibleThemedSwitch",
);