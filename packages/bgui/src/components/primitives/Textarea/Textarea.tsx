import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
	type NativeSyntheticEvent,
	Platform,
	StyleSheet,
	TextInput,
	type TextInputChangeEventData,
	type TextInputFocusEventData,
	type TextInputKeyPressEventData,
	type TextInputProps,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { TextareaProps } from "./Textarea.types";

const resolveToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const createSizeConfig = (theme: Theme) =>
	({
		sm: {
			minHeight: 64,
			paddingHorizontal: theme.spacing.xs,
			paddingVertical: theme.spacing.xs,
			fontSize: theme.fontSizes.sm,
			lineHeight: 20,
			decoratorGap: theme.spacing.xs,
			labelVariant: "body-sm" as const,
		},
		md: {
			minHeight: 80,
			paddingHorizontal: theme.spacing.sm,
			paddingVertical: theme.spacing.sm,
			fontSize: theme.fontSizes.md,
			lineHeight: 24,
			decoratorGap: theme.spacing.xs,
			labelVariant: "body-md" as const,
		},
		lg: {
			minHeight: 96,
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.md,
			fontSize: theme.fontSizes.lg,
			lineHeight: 28,
			decoratorGap: theme.spacing.sm,
			labelVariant: "body-lg" as const,
		},
	}) as const;

export const Textarea = forwardRef<TextInput, TextareaProps>(
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
			minRows = 2,
			maxRows,
			placeholder,
			name,
			id,
			required = false,
			autoFocus = false,
			readOnly = false,
			maxLength,
			minLength,
			rows,
			cols,
			wrap = "soft",
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			onValueChange,
			style,
			inputStyle,
			testID,
			children,
			className: _className,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
			"aria-labelledby": ariaLabelledBy,
		},
		ref,
	) => {
		const textInputRef = useRef<TextInput>(null);
		const [focused, setFocused] = useState(false);
		const theme = useTheme();
		const sizeConfig = useMemo(() => createSizeConfig(theme), [theme]);

		const resolvedDefaultValue = useMemo(() => {
			if (defaultValue !== undefined) {
				return String(defaultValue);
			}
			if (typeof children === "string" || typeof children === "number") {
				return String(children);
			}
			return undefined;
		}, [children, defaultValue]);

		const isControlled = value !== undefined;
		const [internalValue, setInternalValue] = useState(resolvedDefaultValue ?? "");

		useEffect(() => {
			if (!isControlled && resolvedDefaultValue !== undefined) {
				setInternalValue(resolvedDefaultValue);
			}
		}, [isControlled, resolvedDefaultValue]);

		useEffect(() => {
			if (autoFocus && textInputRef.current) {
				textInputRef.current.focus();
			}
		}, [autoFocus]);

		useImperativeHandle(ref, () => textInputRef.current || ({} as TextInput));

		const effectiveColor = error ? "danger" : color;
		const variantKey = `${variant}-${effectiveColor}`;
		const variantStyles =
			theme.components.Textarea.variants[variantKey] ??
			theme.components.Textarea.variants["outlined-neutral"];

		const sizeStyles = sizeConfig[size];

		const stringValue = value !== undefined ? String(value) : undefined;
		const displayedValue = isControlled ? (stringValue ?? "") : internalValue;

		const calculateHeight = () => {
			const baseHeight = sizeStyles.minHeight;
			if (rows) {
				return Math.max(baseHeight, rows * sizeStyles.lineHeight + sizeStyles.paddingVertical * 2);
			}
			if (maxRows) {
				return Math.min(
					maxRows * sizeStyles.lineHeight + sizeStyles.paddingVertical * 2,
					baseHeight * 4,
				);
			}
			if (minRows) {
				return Math.max(
					minRows * sizeStyles.lineHeight + sizeStyles.paddingVertical * 2,
					baseHeight,
				);
			}
			return baseHeight;
		};

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

		const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
			const nextText = event.nativeEvent.text ?? "";
			if (!isControlled) {
				setInternalValue(nextText);
			}
			onValueChange?.(nextText);
			onChange?.(event);
		};

		const containerStyles = StyleSheet.flatten([
			styles.container,
			{
				minHeight: calculateHeight(),
				paddingHorizontal: sizeStyles.paddingHorizontal,
				paddingVertical: sizeStyles.paddingVertical,
				backgroundColor: resolveToken(theme, variantStyles.backgroundColor) ?? theme.colors.surface,
				borderColor: resolveToken(theme, variantStyles.borderColor) ?? theme.colors.outlineVariant,
				borderWidth: variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0),
				borderRadius: theme.radii.sm,
				opacity: disabled ? 0.6 : 1,
				width: fullWidth ? ("100%" as const) : undefined,
			},
			focused && {
				borderColor:
					theme.colors[
						(effectiveColor === "neutral" ? "primary" : effectiveColor) as keyof typeof theme.colors
					],
				borderWidth: 2,
			},
			style,
		]);

		const textInputStyles = StyleSheet.flatten([
			styles.textarea,
			{
				fontSize: sizeStyles.fontSize,
				lineHeight: sizeStyles.lineHeight,
				color: resolveToken(theme, variantStyles.color) ?? theme.colors.onSurface,
			},
			inputStyle,
			Platform.OS === "web"
				? {
						resize: wrap === "off" ? "none" : "vertical",
						whiteSpace: wrap === "off" ? "pre" : wrap === "hard" ? "pre-wrap" : "pre-wrap",
					}
				: null,
		]);

		const hiddenTextarea =
			Platform.OS === "web" && name ? (
				<textarea
					name={name}
					value={displayedValue}
					required={required}
					readOnly={readOnly}
					disabled={disabled}
					minLength={minLength}
					maxLength={maxLength}
					rows={rows ?? minRows}
					cols={cols}
					wrap={wrap}
					style={{ display: "none" }}
					onChange={() => {}}
				/>
			) : null;

		const helperText =
			typeof children === "string" || typeof children === "number" ? null : children;

		return (
			<Box style={containerStyles} testID={testID} accessibilityLabel={ariaLabel}>
				{startDecorator ? (
					<Box style={{ marginRight: sizeStyles.decoratorGap }}>{startDecorator}</Box>
				) : null}
				<TextInput
					ref={textInputRef}
					value={displayedValue}
					defaultValue={isControlled ? undefined : resolvedDefaultValue}
					editable={!readOnly && !disabled}
					autoFocus={autoFocus}
					placeholder={placeholder}
					placeholderTextColor={theme.colors.onSurfaceVariant}
					multiline
					numberOfLines={rows ?? minRows}
					maxLength={maxLength}
					scrollEnabled={!!maxRows}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					style={textInputStyles as TextInputProps["style"]}
					textAlignVertical="top"
					nativeID={id}
					accessibilityLabel={ariaLabel}
					accessibilityHint={ariaDescribedBy}
					accessibilityLabelledBy={ariaLabelledBy}
				/>
				{endDecorator ? (
					<Box style={{ marginLeft: sizeStyles.decoratorGap }}>{endDecorator}</Box>
				) : null}
				{helperText ? (
					<Typography level={sizeStyles.labelVariant} style={{ marginTop: theme.spacing.xs }}>
						{helperText}
					</Typography>
				) : null}
				{hiddenTextarea}
			</Box>
		);
	},
);

Textarea.displayName = "Textarea";

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
	},
	textarea: {
		flexGrow: 1,
		minHeight: 40,
		padding: 0,
	},
});
