import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	type KeyboardTypeOptions,
	type NativeSyntheticEvent,
	Platform,
	StyleSheet,
	TextInput,
	type TextInputFocusEventData,
	type TextInputKeyPressEventData,
	type TextInputProps,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import type { InputProps } from "./Input.types";

const resolveColorToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig = {
	sm: {
		minHeight: 32,
		paddingHorizontal: theme.spacing.xs,
		fontSize: theme.fontSizes.sm,
		decoratorGap: theme.spacing.xs,
	},
	md: {
		minHeight: 36,
		paddingHorizontal: theme.spacing.sm,
		fontSize: theme.fontSizes.md,
		decoratorGap: theme.spacing.xs,
	},
	lg: {
		minHeight: 44,
		paddingHorizontal: theme.spacing.md,
		fontSize: theme.fontSizes.lg,
		decoratorGap: theme.spacing.sm,
	},
} as const;

export const Input = forwardRef<TextInput, InputProps>(
	(
		{
			value,
			defaultValue,
			disabled = false,
			error = false,
			color = "neutral",
			variant = "outlined",
			size = "md",
			startDecorator,
			endDecorator,
			fullWidth = false,
			type = "text",
			placeholder,
			name: _name,
			id,
			required,
			autoFocus,
			readOnly,
			autoComplete,
			maxLength,
			minLength: _minLength,
			max: _max,
			min: _min,
			step: _step,
			pattern: _pattern,
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": _ariaDescribedBy,
		},
		ref,
	) => {
		const inputRef = useRef<TextInput>(null);
		const [focused, setFocused] = useState(false);

		useImperativeHandle(ref, () => inputRef.current || ({} as TextInput));

		const effectiveColor = error ? "danger" : color;
		const variantKey = `${variant}-${effectiveColor}`;
		const variantStyles =
			theme.components.Input.variants[variantKey] ??
			theme.components.Input.variants["outlined-neutral"];

		const sizeStyles = sizeConfig[size];

		const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setFocused(true);
			onFocus?.(event);
		};

		const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setFocused(false);
			onBlur?.(event);
		};

		const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
			onKeyDown?.(event);
			onKeyUp?.(event);
		};

		const inputStyle = [
			styles.input,
			{
				fontSize: sizeStyles.fontSize,
				color: resolveColorToken(variantStyles.color) ?? theme.colors.onSurface,
			},
		];

		const containerStyles = StyleSheet.flatten<ViewStyle>([
			styles.container,
			{
				minHeight: sizeStyles.minHeight,
				paddingHorizontal: sizeStyles.paddingHorizontal,
				backgroundColor: resolveColorToken(variantStyles.backgroundColor) ?? theme.colors.surface,
				borderColor: resolveColorToken(variantStyles.borderColor) ?? theme.colors.outlineVariant,
				borderWidth: variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0),
				borderRadius: theme.radii.sm,
				width: fullWidth ? "100%" : undefined,
				opacity: disabled ? 0.6 : 1,
			},
			focused && {
				borderColor: theme.colors[effectiveColor === "neutral" ? "primary" : effectiveColor],
				borderWidth: 2,
			},
			style as ViewStyle,
		]);

		const keyboardType: KeyboardTypeOptions = (() => {
			switch (type) {
				case "email":
					return "email-address";
				case "number":
					return Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric";
				case "tel":
					return "phone-pad";
				case "url":
					return "url";
				default:
					return "default";
			}
		})();

		const autoCompleteProp = autoComplete as TextInputProps["autoComplete"];

		return (
			<Box
				style={containerStyles}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityState={{ disabled }}
			>
				{startDecorator ? (
					<Box style={[styles.decorator, { marginRight: sizeStyles.decoratorGap }]}>
						{startDecorator}
					</Box>
				) : null}
				<TextInput
					ref={inputRef}
					style={inputStyle}
					value={typeof value === "number" ? String(value) : value}
					defaultValue={typeof defaultValue === "number" ? String(defaultValue) : defaultValue}
					editable={!readOnly && !disabled}
					autoFocus={autoFocus}
					placeholder={placeholder}
					keyboardType={keyboardType}
					secureTextEntry={type === "password"}
					autoComplete={autoCompleteProp}
					maxLength={maxLength}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyPress={handleKeyPress}
					importantForAutofill={required ? "yes" : "auto"}
					accessibilityLabel={ariaLabel}
					nativeID={id}
				/>
				{endDecorator ? (
					<Box style={[styles.decorator, { marginLeft: sizeStyles.decoratorGap }]}>
						{endDecorator}
					</Box>
				) : null}
			</Box>
		);
	},
);

Input.displayName = "Input";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		flex: 1,
		paddingVertical: Platform.OS === "web" ? 8 : 0,
		color: theme.colors.onSurface,
	},
	decorator: {
		justifyContent: "center",
		alignItems: "center",
	},
});
