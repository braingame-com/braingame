import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	type NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	type TextInputChangeEventData,
	type TextInputFocusEventData,
} from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { TextareaProps } from "./TextareaProps";

/**
 * Native implementation of Textarea component
 *
 * Textareas allow users to enter multiple lines of text into a UI.
 * This implementation uses React Native's TextInput with multiline support.
 */

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
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const textareaRef = useRef<TextInput>(null);
		const [focused, setFocused] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => textareaRef.current!);

		// Use error color if error prop is true
		const effectiveColor = error ? "danger" : color;

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey =
				`${variant}-${effectiveColor}` as keyof typeof theme.components.Textarea.variants;
			return (
				theme.components.Textarea.variants[variantKey] ||
				theme.components.Textarea.variants["outlined-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					minHeight: 64, // 2 rows minimum
					paddingHorizontal: theme.spacing.xs,
					paddingVertical: theme.spacing.xs,
					fontSize: theme.fontSizes.sm,
					lineHeight: 20,
				},
				md: {
					minHeight: 80, // 2 rows minimum
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.sm,
					fontSize: theme.fontSizes.md,
					lineHeight: 24,
				},
				lg: {
					minHeight: 96, // 2 rows minimum
					paddingHorizontal: theme.spacing.md,
					paddingVertical: theme.spacing.md,
					fontSize: theme.fontSizes.lg,
					lineHeight: 28,
				},
			};
			return sizeConfigs[size];
		};

		// Handle focus events
		const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setFocused(true);
			onFocus?.(event);
		};

		const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setFocused(false);
			onBlur?.(event);
		};

		const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
			onChange?.(event);
		};

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();

		// Calculate height based on rows
		const calculateHeight = () => {
			const baseHeight = sizeConfig.minHeight;
			if (rows) {
				return Math.max(baseHeight, rows * sizeConfig.lineHeight + sizeConfig.paddingVertical * 2);
			}
			if (maxRows) {
				return Math.min(
					baseHeight * 4,
					maxRows * sizeConfig.lineHeight + sizeConfig.paddingVertical * 2,
				);
			}
			return baseHeight;
		};

		// Container styles
		const containerStyles = [
			styles.container,
			{
				minHeight: calculateHeight(),
				paddingHorizontal: sizeConfig.paddingHorizontal,
				paddingVertical: sizeConfig.paddingVertical,
				backgroundColor: variantStyles.backgroundColor,
				borderColor: variantStyles.borderColor,
				borderWidth: variantStyles.borderWidth || 0,
				borderRadius: theme.radii.sm,
				opacity: disabled ? 0.6 : 1,
			},
			focused && {
				borderColor: theme.colors[effectiveColor === "neutral" ? "primary" : effectiveColor],
				borderWidth: 2,
			},
			fullWidth && { width: "100%" },
			style,
		];

		// Textarea styles
		const textareaStyles = [
			styles.textarea,
			{
				fontSize: sizeConfig.fontSize,
				lineHeight: sizeConfig.lineHeight,
				color: variantStyles.color || theme.colors.onSurface,
				textAlignVertical: "top",
				flex: 1,
			},
		];

		return (
			<Box style={containerStyles} testID={testID}>
				<Box flexDirection="row" alignItems="flex-start" flex={1}>
					{startDecorator && (
						<Box marginRight="xs" marginTop="xs">
							{startDecorator}
						</Box>
					)}

					<TextInput
						ref={textareaRef}
						value={value}
						defaultValue={defaultValue}
						placeholder={placeholder}
						placeholderTextColor={theme.colors.onSurfaceVariant}
						editable={!disabled && !readOnly}
						multiline={true}
						numberOfLines={rows || minRows}
						maxLength={maxLength}
						autoFocus={autoFocus}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={textareaStyles}
						accessibilityLabel={ariaLabel}
						accessibilityHint={ariaDescribedby}
						accessibilityLabelledBy={ariaLabelledby}
						accessibilityRequired={required}
						accessibilityState={{
							disabled: disabled,
							invalid: error,
						}}
						scrollEnabled={!!maxRows}
						keyboardType="default"
						returnKeyType="default"
						blurOnSubmit={false}
					/>

					{endDecorator && (
						<Box marginLeft="xs" marginTop="xs">
							{endDecorator}
						</Box>
					)}
				</Box>
			</Box>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	textarea: {
		flex: 1,
		margin: 0,
		padding: 0,
		minHeight: 40,
	},
});
