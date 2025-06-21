import React, { useCallback, useMemo } from "react";
import {
	ScrollView as RNScrollView,
	Text as RNText,
	TextInput as RNTextInput,
	TouchableOpacity as RNTouchableOpacity,
	View as RNView,
	ScrollViewProps,
	StyleSheet,
	type TextInputProps,
	type TextProps,
	type TextStyle,
	type TouchableOpacityProps,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { withMemo } from "../../utils/performance";
import { useTheme } from "../ThemeContext";

// Themed View Component
interface ThemedViewProps extends ViewProps {
	variant?: "background" | "surface" | "card";
	animated?: boolean;
}

export const ThemedView = withMemo<ThemedViewProps>(
	({ variant = "background", animated = false, style, children, ...props }) => {
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

		if (animated) {
			return (
				<Animated.View style={[viewStyle]} {...props}>
					{children}
				</Animated.View>
			);
		}

		return (
			<RNView style={viewStyle} {...props}>
				{children}
			</RNView>
		);
	},
	"ThemedView",
);

// Themed Text Component
interface ThemedTextProps extends TextProps {
	variant?: "primary" | "secondary" | "disabled" | "error" | "success";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "regular" | "medium" | "semibold" | "bold";
	animated?: boolean;
}

export const ThemedText = withMemo<ThemedTextProps>(
	({
		variant = "primary",
		size = "md",
		weight = "regular",
		animated = false,
		style,
		children,
		...props
	}) => {
		const { theme } = useTheme();

		const textStyle = useMemo<TextStyle>(() => {
			const colorMap = {
				secondary: theme.colors.textSecondary,
				disabled: theme.colors.textDisabled,
				error: theme.colors.error,
				success: theme.colors.success,
				primary: theme.colors.text,
			};

			const sizeMap = {
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

			return {
				color: colorMap[variant] || colorMap.primary,
				fontSize: sizeMap[size],
				fontWeight: weightMap[weight],
				fontFamily: `Lexend${weight.charAt(0).toUpperCase() + weight.slice(1)}`,
				...(style as TextStyle),
			};
		}, [variant, size, weight, theme, style]);

		if (animated) {
			return (
				<Animated.Text style={[textStyle]} {...props}>
					{children}
				</Animated.Text>
			);
		}

		return (
			<RNText style={textStyle} {...props}>
				{children}
			</RNText>
		);
	},
	"ThemedText",
);

// Themed Button Component
interface ThemedButtonProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	children: React.ReactNode;
}

export const ThemedButton = withMemo<ThemedButtonProps>(
	({
		variant = "primary",
		size = "medium",
		fullWidth = false,
		disabled = false,
		style,
		children,
		onPress,
		...props
	}) => {
		const { theme } = useTheme();
		const scaleValue = useSharedValue(1);

		const handlePressIn = useCallback(() => {
			scaleValue.value = withTiming(0.95, { duration: 100 });
		}, [scaleValue]);

		const handlePressOut = useCallback(() => {
			scaleValue.value = withTiming(1, { duration: 100 });
		}, [scaleValue]);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [{ scale: scaleValue.value }],
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

		return (
			<RNTouchableOpacity
				disabled={disabled}
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...props}
			>
				<Animated.View style={[buttonStyle, animatedStyle]}>
					{typeof children === "string" ? (
						<ThemedText size={textSize} weight="semibold" style={{ color: textColor }}>
							{children}
						</ThemedText>
					) : (
						children
					)}
				</Animated.View>
			</RNTouchableOpacity>
		);
	},
	"ThemedButton",
);

// Themed Input Component
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

// Themed Card Component
interface ThemedCardProps extends ViewProps {
	elevation?: "none" | "low" | "medium" | "high";
	padding?: "none" | "small" | "medium" | "large";
	onPress?: () => void;
}

export const ThemedCard = withMemo<ThemedCardProps>(
	({ elevation = "low", padding = "medium", onPress, style, children, ...props }) => {
		const { theme } = useTheme();

		const cardStyle = useMemo<ViewStyle>(() => {
			const elevationStyles = {
				none: {},
				low: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.05,
					shadowRadius: 4,
					elevation: 2,
				},
				medium: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.1,
					shadowRadius: 8,
					elevation: 4,
				},
				high: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.15,
					shadowRadius: 16,
					elevation: 8,
				},
			};

			const paddingMap = {
				none: 0,
				small: theme.sizes.spacingSM,
				medium: theme.sizes.spacingMD,
				large: theme.sizes.spacingLG,
			};

			return {
				backgroundColor: theme.components.card.background,
				borderRadius: theme.sizes.radiusLG,
				borderWidth: 1,
				borderColor: theme.components.card.border,
				padding: paddingMap[padding],
				...elevationStyles[elevation],
				...(style as ViewStyle),
			};
		}, [elevation, padding, theme, style]);

		if (onPress) {
			return (
				<RNTouchableOpacity onPress={onPress} activeOpacity={0.8} {...props}>
					<RNView style={cardStyle}>{children}</RNView>
				</RNTouchableOpacity>
			);
		}

		return (
			<RNView style={cardStyle} {...props}>
				{children}
			</RNView>
		);
	},
	"ThemedCard",
);
