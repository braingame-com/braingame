import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
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
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../Box";
import type { InputProps } from "./Input.types";

const resolveColorToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const createSizeConfig = (theme: Theme) =>
	({
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
	}) as const;

const createStyles = (theme: Theme) =>
	StyleSheet.create({
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
			name,
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
		const theme = useTheme();
		const sizeConfig = useMemo(() => createSizeConfig(theme), [theme]);
		const styles = useMemo(() => createStyles(theme), [theme]);

		useImperativeHandle(ref, () => inputRef.current || ({} as TextInput));

		const effectiveColor = error ? "danger" : color;
		const variantKey = `${variant}-${effectiveColor}`;
		const variantStyles =
			theme.components.Input.variants[variantKey] ??
			theme.components.Input.variants["outlined-neutral"];

		const sizeStyles = sizeConfig[size];

		const placeholderColor =
			resolveColorToken(theme, variantStyles.color) ?? theme.colors.onSurfaceVariant;

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
				color: resolveColorToken(theme, variantStyles.color) ?? theme.colors.onSurface,
			},
		];

		const containerStyles = useMemo(
			() =>
				StyleSheet.flatten<ViewStyle>([
					styles.container,
					{
						minHeight: sizeStyles.minHeight,
						paddingHorizontal: sizeStyles.paddingHorizontal,
						backgroundColor:
							resolveColorToken(theme, variantStyles.backgroundColor) ?? theme.colors.surface,
						borderColor:
							resolveColorToken(theme, variantStyles.borderColor) ?? theme.colors.outlineVariant,
						borderWidth: variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0),
						borderRadius: theme.radii.sm,
						width: fullWidth ? "100%" : undefined,
						opacity: disabled ? 0.6 : 1,
					},
					focused && {
						borderColor: theme.colors[effectiveColor === "neutral" ? "primary" : effectiveColor],
						borderWidth: 2,
					},
					style,
				]),
			[
				theme,
				effectiveColor,
				focused,
				fullWidth,
				sizeStyles.minHeight,
				sizeStyles.paddingHorizontal,
				variant,
				variantStyles.backgroundColor,
				variantStyles.borderColor,
				variantStyles.borderWidth,
				disabled,
				style,
				styles,
			],
		);

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

		const autoCompleteProp = (() => {
			if (autoComplete) return autoComplete as TextInputProps["autoComplete"];

			switch (type) {
				case "email":
					return "email";
				case "password":
					return "password";
				case "tel":
					return "tel";
				default:
					return undefined;
			}
		})();

		const inputTestID = name ? `${name}-input` : testID;

		return (
			<Box style={containerStyles} testID={testID}>
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
					placeholderTextColor={placeholderColor}
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
					accessibilityState={{ disabled }}
					nativeID={id}
					testID={inputTestID}
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
