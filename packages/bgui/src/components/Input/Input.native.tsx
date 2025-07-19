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
import type { InputProps } from "./InputProps";

/**
 * Native implementation of Input component
 *
 * Text input fields allow users to enter and edit text.
 * This implementation replicates Joy UI's Input behavior using React Native's TextInput.
 */

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
			id: _id,
			required = false,
			autoFocus = false,
			readOnly = false,
			autoComplete,
			maxLength,
			minLength: _minLength,
			onChange,
			onBlur,
			onFocus,
			onKeyDown: _onKeyDown,
			onKeyUp,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const inputRef = useRef<TextInput>(null);
		const [focused, setFocused] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => inputRef.current || null);

		// Use error color if error prop is true
		const effectiveColor = error ? "danger" : color;

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey =
				`${variant}-${effectiveColor}` as keyof typeof theme.components.Input.variants;
			return (
				theme.components.Input.variants[variantKey] ||
				theme.components.Input.variants["outlined-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					minHeight: 32,
					paddingHorizontal: theme.spacing.xs,
					fontSize: theme.fontSizes.sm,
					gap: theme.spacing.xs,
				},
				md: {
					minHeight: 36,
					paddingHorizontal: theme.spacing.sm,
					fontSize: theme.fontSizes.md,
					gap: theme.spacing.xs,
				},
				lg: {
					minHeight: 44,
					paddingHorizontal: theme.spacing.md,
					fontSize: theme.fontSizes.lg,
					gap: theme.spacing.sm,
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

		// Get keyboard type based on input type
		const getKeyboardType = () => {
			switch (type) {
				case "email":
					return "email-address";
				case "number":
					return "numeric";
				case "tel":
					return "phone-pad";
				case "url":
					return "url";
				default:
					return "default";
			}
		};

		// Get text content type for secure entry
		const getSecureTextEntry = () => {
			return type === "password";
		};

		// Get auto complete type
		const getAutoCompleteType = () => {
			if (autoComplete) return autoComplete;

			switch (type) {
				case "email":
					return "email";
				case "password":
					return "password";
				case "tel":
					return "tel";
				default:
					return "off";
			}
		};

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();

		// Container styles
		const containerStyles = [
			styles.container,
			{
				minHeight: sizeConfig.minHeight,
				paddingHorizontal: sizeConfig.paddingHorizontal,
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

		// Input styles
		const inputStyles = [
			styles.input,
			{
				fontSize: sizeConfig.fontSize,
				color: variantStyles.color || theme.colors.onSurface,
				flex: 1,
			},
		];

		return (
			<Box flexDirection="row" alignItems="center" style={containerStyles} testID={testID}>
				{startDecorator && <Box marginRight="xs">{startDecorator}</Box>}

				<TextInput
					ref={inputRef}
					value={value}
					defaultValue={defaultValue}
					placeholder={placeholder}
					placeholderTextColor={theme.colors.onSurfaceVariant}
					editable={!disabled && !readOnly}
					keyboardType={getKeyboardType()}
					secureTextEntry={getSecureTextEntry()}
					maxLength={maxLength}
					autoFocus={autoFocus}
					autoComplete={getAutoCompleteType()}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={inputStyles}
					accessibilityLabel={ariaLabel}
					accessibilityHint={ariaDescribedby}
					accessibilityLabelledBy={ariaLabelledby}
					accessibilityRequired={required}
					accessibilityState={{
						disabled: disabled,
						invalid: error,
					}}
				/>

				{endDecorator && <Box marginLeft="xs">{endDecorator}</Box>}
			</Box>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		flex: 1,
		paddingVertical: 0, // Remove default padding to control with container
		margin: 0,
		textAlignVertical: "center",
	},
});
