import React, { useCallback, useMemo } from "react";
import {
	type NativeSyntheticEvent,
	TextInput as RNTextInput,
	View as RNView,
	type TextInputFocusEventData,
	type TextInputProps,
	type TextStyle,
} from "react-native";
import { getScaledFontSize, useAccessibility } from "../../../contexts/AccessibilityContext";
import {
	getAccessibilityProps,
	getAccessibilityState,
	getHint,
} from "../../../utils/accessibility";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";
import { AccessibleThemedText } from "./AccessibleThemedText";

interface AccessibleThemedInputProps extends TextInputProps {
	variant?: "default" | "filled" | "outline";
	error?: boolean;
	label?: string;
	required?: boolean;
}

export const AccessibleThemedInput = withMemo<AccessibleThemedInputProps>(
	({
		variant = "default",
		error = false,
		label,
		required = false,
		style,
		onFocus,
		onBlur,
		accessibilityLabel,
		...props
	}) => {
		const { theme } = useTheme();
		const { fontSize: userFontSize, announce } = useAccessibility();
		const [isFocused, setIsFocused] = React.useState(false);

		const handleFocus = useCallback(
			(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
				setIsFocused(true);
				announce(`${label || "Text field"} focused`);
				onFocus?.(e);
			},
			[onFocus, label, announce],
		);

		const handleBlur = useCallback(
			(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
				setIsFocused(false);
				onBlur?.(e);
			},
			[onBlur],
		);

		const scaledFontSize = getScaledFontSize(theme.sizes.fontSizeMD, userFontSize);

		const inputStyle = useMemo<TextStyle>(
			() => ({
				backgroundColor: theme.components.input.background,
				borderWidth: 1,
				borderColor: error
					? theme.colors.error
					: isFocused
						? theme.components.input.borderFocus
						: theme.components.input.border,
				borderRadius: theme.sizes.radiusMD,
				paddingVertical: theme.sizes.spacingSM + 4,
				paddingHorizontal: theme.sizes.spacingMD,
				fontSize: scaledFontSize,
				color: theme.components.input.text,
				fontFamily: "LexendRegular",
				...(style as TextStyle),
			}),
			[error, isFocused, theme, style, scaledFontSize],
		);

		const inputAccessibilityProps = {
			...getAccessibilityProps(
				accessibilityLabel || label || "Text field",
				getHint.textInput(required),
				undefined,
			),
			...getAccessibilityState({ disabled: props.editable === false }),
			accessibilityRequired: required,
		};

		return (
			<RNView>
				{label && (
					<AccessibleThemedText
						variant={error ? "error" : "secondary"}
						size="sm"
						weight="medium"
						style={{ marginBottom: theme.sizes.spacingXS }}
						accessibilityLabel={`${label}${required ? ", required" : ", optional"}`}
					>
						{label}
						{required && " *"}
					</AccessibleThemedText>
				)}
				<RNTextInput
					placeholderTextColor={theme.components.input.placeholder}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={inputStyle}
					{...inputAccessibilityProps}
					{...props}
				/>
				{error && (
					<AccessibleThemedText
						variant="error"
						size="sm"
						style={{ marginTop: theme.sizes.spacingXS }}
						accessibilityRole="alert"
					>
						Please check this field
					</AccessibleThemedText>
				)}
			</RNView>
		);
	},
	"AccessibleThemedInput",
);
