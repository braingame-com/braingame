import React, { useCallback, useMemo } from "react";
import {
	View as RNView,
	TextInput as RNTextInput,
	type TextInputProps,
	type TextStyle,
} from "react-native";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";
import { ThemedText } from "./ThemedText";

interface ThemedInputProps extends TextInputProps {
	variant?: "default" | "filled" | "outline";
	error?: boolean;
	label?: string;
}

export const ThemedInput = withMemo<ThemedInputProps>(
	({ variant = "default", error = false, label, style, onFocus, onBlur, ...props }) => {
		const { theme } = useTheme();
		const [isFocused, setIsFocused] = React.useState(false);

		const handleFocus = useCallback(
			(e: any) => {
				setIsFocused(true);
				onFocus?.(e);
			},
			[onFocus],
		);

		const handleBlur = useCallback(
			(e: any) => {
				setIsFocused(false);
				onBlur?.(e);
			},
			[onBlur],
		);

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
				fontSize: theme.sizes.fontSizeMD,
				color: theme.components.input.text,
				fontFamily: "LexendRegular",
				...(style as TextStyle),
			}),
			[error, isFocused, theme, style],
		);

		return (
			<RNView>
				{label && (
					<ThemedText
						variant={error ? "error" : "secondary"}
						size="sm"
						weight="medium"
						style={{ marginBottom: theme.sizes.spacingXS }}
					>
						{label}
					</ThemedText>
				)}
				<RNTextInput
					placeholderTextColor={theme.components.input.placeholder}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={inputStyle}
					{...props}
				/>
			</RNView>
		);
	},
	"ThemedInput",
);