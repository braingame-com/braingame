import React from 'react';
import {
	View as RNView,
	Text as RNText,
	TouchableOpacity as RNTouchableOpacity,
	TextInput as RNTextInput,
	ScrollView as RNScrollView,
	StyleSheet,
	ViewStyle,
	TextStyle,
	TextInputProps,
	TouchableOpacityProps,
	ViewProps,
	TextProps,
	ScrollViewProps,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	interpolateColor,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../ThemeContext';

// Themed View Component
interface ThemedViewProps extends ViewProps {
	variant?: 'background' | 'surface' | 'card';
	animated?: boolean;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
	variant = 'background',
	animated = false,
	style,
	children,
	...props
}) => {
	const { theme } = useTheme();

	const getBackgroundColor = () => {
		switch (variant) {
			case 'surface':
				return theme.colors.surface;
			case 'card':
				return theme.components.card.background;
			default:
				return theme.colors.background;
		}
	};

	const viewStyle: ViewStyle = {
		backgroundColor: getBackgroundColor(),
		...(style as ViewStyle),
	};

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
};

// Themed Text Component
interface ThemedTextProps extends TextProps {
	variant?: 'primary' | 'secondary' | 'disabled' | 'error' | 'success';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
	weight?: 'regular' | 'medium' | 'semibold' | 'bold';
	animated?: boolean;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
	variant = 'primary',
	size = 'md',
	weight = 'regular',
	animated = false,
	style,
	children,
	...props
}) => {
	const { theme } = useTheme();

	const getTextColor = () => {
		switch (variant) {
			case 'secondary':
				return theme.colors.textSecondary;
			case 'disabled':
				return theme.colors.textDisabled;
			case 'error':
				return theme.colors.error;
			case 'success':
				return theme.colors.success;
			default:
				return theme.colors.text;
		}
	};

	const getFontSize = () => {
		const sizeMap = {
			xs: theme.sizes.fontSizeXS,
			sm: theme.sizes.fontSizeSM,
			md: theme.sizes.fontSizeMD,
			lg: theme.sizes.fontSizeLG,
			xl: theme.sizes.fontSizeXL,
			'2xl': theme.sizes.fontSize2XL,
			'3xl': theme.sizes.fontSize3XL,
			'4xl': theme.sizes.fontSize4XL,
		};
		return sizeMap[size];
	};

	const getFontWeight = () => {
		const weightMap = {
			regular: '400' as const,
			medium: '500' as const,
			semibold: '600' as const,
			bold: '700' as const,
		};
		return weightMap[weight];
	};

	const textStyle: TextStyle = {
		color: getTextColor(),
		fontSize: getFontSize(),
		fontWeight: getFontWeight(),
		fontFamily: `Lexend${weight.charAt(0).toUpperCase() + weight.slice(1)}`,
		...(style as TextStyle),
	};

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
};

// Themed Button Component
interface ThemedButtonProps extends TouchableOpacityProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
	children: React.ReactNode;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
	variant = 'primary',
	size = 'medium',
	fullWidth = false,
	disabled = false,
	style,
	children,
	onPress,
	...props
}) => {
	const { theme } = useTheme();
	const scaleValue = useSharedValue(1);

	const handlePressIn = () => {
		scaleValue.value = withTiming(0.95, { duration: 100 });
	};

	const handlePressOut = () => {
		scaleValue.value = withTiming(1, { duration: 100 });
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleValue.value }],
		};
	});

	const getSizeStyles = (): ViewStyle => {
		switch (size) {
			case 'small':
				return {
					paddingVertical: theme.sizes.spacingSM,
					paddingHorizontal: theme.sizes.spacingMD,
				};
			case 'large':
				return {
					paddingVertical: theme.sizes.spacingMD,
					paddingHorizontal: theme.sizes.spacingLG,
				};
			default:
				return {
					paddingVertical: theme.sizes.spacingSM + 4,
					paddingHorizontal: theme.sizes.spacingLG,
				};
		}
	};

	const getVariantStyles = (): ViewStyle => {
		const styles = theme.components.button[variant];
		return {
			backgroundColor: styles.background,
			borderWidth: styles.border ? 1 : 0,
			borderColor: styles.border,
		};
	};

	const buttonStyle: ViewStyle = {
		borderRadius: theme.sizes.radiusMD,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: disabled ? 0.6 : 1,
		width: fullWidth ? '100%' : undefined,
		...getSizeStyles(),
		...getVariantStyles(),
		...(style as ViewStyle),
	};

	const textColor = theme.components.button[variant].text;

	return (
		<RNTouchableOpacity
			disabled={disabled}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...props}
		>
			<Animated.View style={[buttonStyle, animatedStyle]}>
				{typeof children === 'string' ? (
					<ThemedText
						size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'}
						weight="semibold"
						style={{ color: textColor }}
					>
						{children}
					</ThemedText>
				) : (
					children
				)}
			</Animated.View>
		</RNTouchableOpacity>
	);
};

// Themed Input Component
interface ThemedInputProps extends TextInputProps {
	variant?: 'default' | 'filled' | 'outline';
	error?: boolean;
	label?: string;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
	variant = 'default',
	error = false,
	label,
	style,
	...props
}) => {
	const { theme } = useTheme();
	const [isFocused, setIsFocused] = React.useState(false);

	const inputStyle: TextStyle = {
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
		fontFamily: 'LexendRegular',
		...(style as TextStyle),
	};

	return (
		<RNView>
			{label && (
				<ThemedText
					variant={error ? 'error' : 'secondary'}
					size="sm"
					weight="medium"
					style={{ marginBottom: theme.sizes.spacingXS }}
				>
					{label}
				</ThemedText>
			)}
			<RNTextInput
				placeholderTextColor={theme.components.input.placeholder}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				style={inputStyle}
				{...props}
			/>
		</RNView>
	);
};

// Themed Card Component
interface ThemedCardProps extends ViewProps {
	elevation?: 'none' | 'low' | 'medium' | 'high';
	padding?: 'none' | 'small' | 'medium' | 'large';
	onPress?: () => void;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
	elevation = 'low',
	padding = 'medium',
	onPress,
	style,
	children,
	...props
}) => {
	const { theme } = useTheme();

	const getElevationStyles = (): ViewStyle => {
		const elevationMap = {
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
		return elevationMap[elevation];
	};

	const getPadding = () => {
		const paddingMap = {
			none: 0,
			small: theme.sizes.spacingSM,
			medium: theme.sizes.spacingMD,
			large: theme.sizes.spacingLG,
		};
		return paddingMap[padding];
	};

	const cardStyle: ViewStyle = {
		backgroundColor: theme.components.card.background,
		borderRadius: theme.sizes.radiusLG,
		borderWidth: 1,
		borderColor: theme.components.card.border,
		padding: getPadding(),
		...getElevationStyles(),
		...(style as ViewStyle),
	};

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
};