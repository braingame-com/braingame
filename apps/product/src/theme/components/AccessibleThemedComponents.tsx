import React, { useCallback, useMemo } from "react";
import {
	type AccessibilityRole,
	type GestureResponderEvent,
	type NativeSyntheticEvent,
	Switch as RNSwitch,
	Text as RNText,
	TextInput as RNTextInput,
	TouchableOpacity as RNTouchableOpacity,
	View as RNView,
	type SwitchProps,
	type TextInputFocusEventData,
	type TextInputProps,
	type TextProps,
	type TextStyle,
	type TouchableOpacityProps,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { getScaledFontSize, useAccessibility } from "../../contexts/AccessibilityContext";
import { getAccessibilityProps, getAccessibilityState, getHint } from "../../utils/accessibility";
import { withMemo } from "../../utils/withMemo";
import { useTheme } from "../ThemeContext";

// Accessible Themed View Component
interface AccessibleThemedViewProps extends ViewProps {
	variant?: "background" | "surface" | "card";
	animated?: boolean;
	accessibilityLabel?: string;
	accessibilityRole?: AccessibilityRole;
}

export const AccessibleThemedView: React.FC<AccessibleThemedViewProps> = withMemo(
	({
		variant = "background",
		animated = false,
		style,
		children,
		accessibilityLabel,
		accessibilityRole,
		...props
	}: AccessibleThemedViewProps) => {
		const { theme } = useTheme();

		const backgroundColor = useMemo(() => {
			switch (variant) {
				case "surface":
					return theme.colors.surface;
				case "card":
					return theme.components.card.background;
				default:
					return theme.colors.background;
			}
		}, [variant, theme]);

		const viewStyle = useMemo<ViewStyle>(
			() => ({
				backgroundColor,
				...(style as ViewStyle),
			}),
			[backgroundColor, style],
		);

		const accessibilityProps = accessibilityLabel
			? getAccessibilityProps(accessibilityLabel, undefined, accessibilityRole)
			: {};

		if (animated) {
			return (
				<Animated.View style={[viewStyle]} {...accessibilityProps} {...props}>
					{children}
				</Animated.View>
			);
		}

		return (
			<RNView style={viewStyle} {...accessibilityProps} {...props}>
				{children}
			</RNView>
		);
	},
	"AccessibleThemedView",
);

// Accessible Themed Text Component
interface AccessibleThemedTextProps extends TextProps {
	variant?: "primary" | "secondary" | "disabled" | "error" | "success";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "regular" | "medium" | "semibold" | "bold";
	animated?: boolean;
	isHeading?: boolean;
}

export const AccessibleThemedText: React.FC<AccessibleThemedTextProps> = withMemo(
	({
		variant = "primary",
		size = "md",
		weight = "regular",
		animated = false,
		style,
		children,
		isHeading = false,
		accessibilityLabel,
		...props
	}: AccessibleThemedTextProps) => {
		const { theme } = useTheme();
		const { fontSize: userFontSize, boldTextEnabled } = useAccessibility();

		const textStyle = useMemo<TextStyle>(() => {
			const colorMap = {
				secondary: theme.colors.textSecondary,
				disabled: theme.colors.textDisabled,
				error: theme.colors.error,
				success: theme.colors.success,
				primary: theme.colors.text,
			};

			const baseSizeMap = {
				xs: theme.sizes.fontSizeXS,
				sm: theme.sizes.fontSizeSM,
				md: theme.sizes.fontSizeMD,
				lg: theme.sizes.fontSizeLG,
				xl: theme.sizes.fontSizeXL,
				"2xl": theme.sizes.fontSize2XL,
				"3xl": theme.sizes.fontSize3XL,
				"4xl": theme.sizes.fontSize4XL,
			};

			const weightMap = {
				regular: "400" as const,
				medium: "500" as const,
				semibold: "600" as const,
				bold: "700" as const,
			};

			// Apply user font size preference
			const scaledFontSize = getScaledFontSize(baseSizeMap[size], userFontSize);

			// Apply bold text preference
			const finalWeight = boldTextEnabled ? "700" : weightMap[weight];

			return {
				color: colorMap[variant] || colorMap.primary,
				fontSize: scaledFontSize,
				fontWeight: finalWeight,
				fontFamily: `Lexend${weight.charAt(0).toUpperCase() + weight.slice(1)}`,
				...(style as TextStyle),
			};
		}, [variant, size, weight, theme, style, userFontSize, boldTextEnabled]);

		const accessibilityProps: {
			accessible: boolean;
			accessibilityLabel: string | undefined;
			accessibilityRole?: AccessibilityRole;
		} = {
			accessible: true,
			accessibilityLabel:
				accessibilityLabel || (typeof children === "string" ? children : undefined),
			accessibilityRole: isHeading ? "header" : undefined,
		};

		if (animated) {
			return (
				<Animated.Text style={[textStyle]} {...accessibilityProps} {...props}>
					{children}
				</Animated.Text>
			);
		}

		return (
			<RNText style={textStyle} {...accessibilityProps} {...props}>
				{children}
			</RNText>
		);
	},
	"AccessibleThemedText",
);

// Accessible Themed Button Component
interface AccessibleThemedButtonProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	children: React.ReactNode;
	accessibilityLabel: string;
	accessibilityHint?: string;
}

export const AccessibleThemedButton: React.FC<AccessibleThemedButtonProps> = withMemo(
	({
		variant = "primary",
		size = "medium",
		fullWidth = false,
		disabled = false,
		style,
		children,
		onPress,
		accessibilityLabel,
		accessibilityHint,
		...props
	}: AccessibleThemedButtonProps) => {
		const { theme } = useTheme();
		const { reduceMotionEnabled, announce } = useAccessibility();
		const scaleValue = useSharedValue(1);

		const handlePressIn = useCallback(() => {
			if (!reduceMotionEnabled) {
				scaleValue.value = withTiming(0.95, { duration: 100 });
			}
		}, [scaleValue, reduceMotionEnabled]);

		const handlePressOut = useCallback(() => {
			if (!reduceMotionEnabled) {
				scaleValue.value = withTiming(1, { duration: 100 });
			}
		}, [scaleValue, reduceMotionEnabled]);

		const handlePress = useCallback(
			(e: GestureResponderEvent) => {
				announce(`${accessibilityLabel} activated`);
				onPress?.(e);
			},
			[onPress, accessibilityLabel, announce],
		);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: reduceMotionEnabled ? [] : [{ scale: scaleValue.value }],
		}));

		const buttonStyle = useMemo<ViewStyle>(() => {
			const sizeStyles = {
				small: {
					paddingVertical: theme.sizes.spacingSM,
					paddingHorizontal: theme.sizes.spacingMD,
				},
				medium: {
					paddingVertical: theme.sizes.spacingSM + 4,
					paddingHorizontal: theme.sizes.spacingLG,
				},
				large: {
					paddingVertical: theme.sizes.spacingMD,
					paddingHorizontal: theme.sizes.spacingLG,
				},
			};

			const variantStyles = theme.components.button[variant];

			return {
				borderRadius: theme.sizes.radiusMD,
				alignItems: "center",
				justifyContent: "center",
				opacity: disabled ? 0.6 : 1,
				width: fullWidth ? "100%" : undefined,
				...sizeStyles[size],
				backgroundColor: variantStyles.background,
				borderWidth: variantStyles.border ? 1 : 0,
				borderColor: variantStyles.border,
				...(style as ViewStyle),
			};
		}, [variant, size, fullWidth, disabled, theme, style]);

		const textColor = theme.components.button[variant].text;
		const textSize = size === "small" ? "sm" : size === "large" ? "lg" : "md";

		const buttonAccessibilityProps = {
			...getAccessibilityProps(
				accessibilityLabel,
				accessibilityHint || getHint.button(accessibilityLabel),
				"button",
			),
			...getAccessibilityState({ disabled }),
		};

		return (
			<RNTouchableOpacity
				disabled={disabled}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...buttonAccessibilityProps}
				{...props}
			>
				<Animated.View style={[buttonStyle, animatedStyle]}>
					{typeof children === "string" ? (
						<AccessibleThemedText
							size={textSize}
							weight="semibold"
							style={{ color: textColor }}
							importantForAccessibility="no"
						>
							{children}
						</AccessibleThemedText>
					) : (
						children
					)}
				</Animated.View>
			</RNTouchableOpacity>
		);
	},
	"AccessibleThemedButton",
);

// Accessible Themed Input Component
interface AccessibleThemedInputProps extends TextInputProps {
	variant?: "default" | "filled" | "outline";
	error?: boolean;
	label?: string;
	required?: boolean;
}

export const AccessibleThemedInput: React.FC<AccessibleThemedInputProps> = withMemo(
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
	}: AccessibleThemedInputProps) => {
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

// Accessible Themed Switch Component
interface AccessibleThemedSwitchProps extends SwitchProps {
	label: string;
	accessibilityLabel?: string;
	error?: boolean;
}

export const AccessibleThemedSwitch: React.FC<AccessibleThemedSwitchProps> = withMemo(
	({
		label,
		value,
		onValueChange,
		disabled,
		accessibilityLabel,
		error,
		...props
	}: AccessibleThemedSwitchProps) => {
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
			<RNView style={{ flexDirection: "row", alignItems: "center" }}>
				<AccessibleThemedText
					variant={error ? "error" : disabled ? "disabled" : "primary"}
					size="md"
					style={{ flex: 1, marginRight: theme.sizes.spacingMD }}
				>
					{label}
				</AccessibleThemedText>
				<RNSwitch
					trackColor={{
						false: "#767577",
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
			</RNView>
		);
	},
	"AccessibleThemedSwitch",
);
