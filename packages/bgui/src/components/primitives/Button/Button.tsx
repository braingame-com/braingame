import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Platform,
	Pressable,
	type PressableAndroidRippleConfig,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { ButtonProps } from "./Button.types";

type VariantStyle = {
	backgroundColor?: string;
	borderColor?: string;
	borderWidth?: number;
	color?: string;
};

const resolveVariantStyles = (theme: Theme, variant: string, color: string): VariantStyle => {
	const variants = theme.components.Button.variants as Record<string, Record<string, VariantStyle>>;
	const variantStyles = variants?.[variant];

	if (!variantStyles) {
		return variants?.solid?.primary ?? {};
	}

	return variantStyles[color] ?? variantStyles.primary ?? variants.solid?.primary ?? {};
};

const resolveSizeStyles = (theme: Theme, size: NonNullable<ButtonProps["size"]>) => {
	const sizeTokens = theme.components.Button.sizes[size];

	return {
		paddingHorizontal:
			typeof sizeTokens.paddingHorizontal === "string"
				? theme.spacing[sizeTokens.paddingHorizontal as keyof typeof theme.spacing]
				: sizeTokens.paddingHorizontal,
		paddingVertical:
			typeof sizeTokens.paddingVertical === "string"
				? theme.spacing[sizeTokens.paddingVertical as keyof typeof theme.spacing]
				: sizeTokens.paddingVertical,
		minHeight: sizeTokens.minHeight,
	};
};

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		root: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: theme.radii.sm,
			borderWidth: 0,
		},
		contentWrapper: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},
	});

export const Button = forwardRef<View, ButtonProps>(
	(
		{
			children,
			color = "primary",
			disabled = false,
			endDecorator,
			fullWidth = false,
			size = "md",
			startDecorator,
			variant = "solid",
			loading = false,
			loadingIndicator,
			loadingPosition = "center",
			onClick,
			onPressIn,
			onPressOut,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-pressed": ariaPressed,
			tabIndex,
			type,
			...rest
		},
		ref,
	) => {
		const buttonRef = useRef<View>(null);
		const [isPressed, setIsPressed] = useState(false);
		const theme = useTheme();
		const styles = useMemo(() => createStyles(theme), [theme]);

		useImperativeHandle(ref, () => buttonRef.current || ({} as View));

		const variantStyles = resolveVariantStyles(theme, variant, color);
		const sizeStyles = resolveSizeStyles(theme, size);

		const backgroundColor = variantStyles.backgroundColor
			? (theme.colors[variantStyles.backgroundColor as keyof Theme["colors"]] ??
				variantStyles.backgroundColor)
			: "transparent";

		const textColor = variantStyles.color
			? (theme.colors[variantStyles.color as keyof Theme["colors"]] ?? variantStyles.color)
			: theme.colors.onSurface;

		const androidRipple: PressableAndroidRippleConfig | undefined =
			Platform.OS === "android" ? { color: textColor, borderless: false } : undefined;

		const borderColor = variantStyles.borderColor
			? (theme.colors[variantStyles.borderColor as keyof Theme["colors"]] ??
				variantStyles.borderColor)
			: undefined;

		const isDisabled = disabled || loading;
		const customStyle = StyleSheet.flatten(style as ViewStyle | undefined);

		const accessibilityState = {
			disabled: isDisabled,
			busy: loading || undefined,
			pressed: ariaPressed === true ? true : undefined,
		} as const;

		const platformProps: Record<string, unknown> =
			Platform.OS === "web"
				? {
						role: "button",
						...(tabIndex !== undefined ? { tabIndex } : {}),
						...(type ? { type } : {}),
						...(ariaPressed !== undefined ? { "aria-pressed": ariaPressed } : {}),
					}
				: {};
		const handlePressIn = (event: GestureResponderEvent) => {
			setIsPressed(true);
			onPressIn?.(event);
		};

		const handlePressOut = (event: GestureResponderEvent) => {
			setIsPressed(false);
			onPressOut?.(event);
		};

		const handlePress = (event: GestureResponderEvent) => {
			if (!isDisabled && onClick) {
				onClick(event);
			}
		};

		const renderLoadingIndicator = () => {
			if (!loading) return null;
			if (loadingIndicator) return loadingIndicator;

			return (
				<ActivityIndicator
					size={size === "lg" ? "large" : "small"}
					color={textColor}
					testID="bgui-button-loading-indicator"
				/>
			);
		};

		const pressableStyle: ViewStyle = {
			width: fullWidth ? "100%" : undefined,
			opacity: isDisabled ? 0.6 : 1,
		};

		return (
			<Pressable
				ref={buttonRef}
				android_ripple={androidRipple}
				disabled={isDisabled}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				focusable={!isDisabled}
				style={({ pressed }) => [
					styles.root,
					{
						backgroundColor,
						borderColor,
						borderWidth: variantStyles.borderWidth ?? 0,
						width: fullWidth ? "100%" : undefined,
						opacity: pressed || isPressed ? 0.9 : pressableStyle.opacity,
						transform: [{ scale: pressed || isPressed ? 0.97 : 1 }],
						paddingHorizontal: sizeStyles.paddingHorizontal,
						paddingVertical: sizeStyles.paddingVertical,
						minHeight: sizeStyles.minHeight,
					},
					customStyle,
				]}
				testID={testID}
				accessibilityLabel={ariaLabel}
				accessibilityRole="button"
				accessibilityState={accessibilityState}
				{...platformProps}
				{...rest}
			>
				<Box style={styles.contentWrapper}>
					{loading && loadingPosition === "start" && (
						<Box style={{ marginRight: theme.spacing.xs }}>{renderLoadingIndicator()}</Box>
					)}
					{startDecorator ? (
						<Box style={{ marginRight: theme.spacing.xs }}>{startDecorator}</Box>
					) : null}
					<Typography
						level={"body-sm"}
						style={{
							color: textColor,
							textTransform: "uppercase",
							fontWeight: "600",
							letterSpacing: 0.5,
						}}
						numberOfLines={1}
					>
						{children}
					</Typography>
					{loading && loadingPosition === "center" && (
						<Box style={{ position: "absolute" }}>{renderLoadingIndicator()}</Box>
					)}
					{endDecorator ? <Box style={{ marginLeft: theme.spacing.xs }}>{endDecorator}</Box> : null}
					{loading && loadingPosition === "end" && (
						<Box style={{ marginLeft: theme.spacing.xs }}>{renderLoadingIndicator()}</Box>
					)}
				</Box>
			</Pressable>
		);
	},
);

Button.displayName = "Button";
