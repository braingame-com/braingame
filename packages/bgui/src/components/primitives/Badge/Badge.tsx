import type { ReactNode } from "react";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import {
	Animated,
	type GestureResponderEvent,
	Pressable,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import type { VariantStyle } from "../../../theme/variants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import type { BadgeProps, BadgeSize } from "./Badge.types";

const resolveColorToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const sizeConfig: Record<
	BadgeSize,
	{
		minSize: number;
		paddingHorizontal: number;
		textLevel: "body-xs" | "body-sm" | "body-md";
		decoratorGap: number;
		dismissIconSize: number;
	}
> = {
	sm: {
		minSize: 16,
		paddingHorizontal: 4,
		textLevel: "body-xs",
		decoratorGap: 4,
		dismissIconSize: 12,
	},
	md: {
		minSize: 20,
		paddingHorizontal: 6,
		textLevel: "body-sm",
		decoratorGap: 6,
		dismissIconSize: 14,
	},
	lg: {
		minSize: 24,
		paddingHorizontal: 8,
		textLevel: "body-md",
		decoratorGap: 8,
		dismissIconSize: 16,
	},
};

const styles = StyleSheet.create({
	root: {
		position: "relative",
		alignSelf: "flex-start",
	},
	badge: {
		position: "absolute",
		top: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	contentRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	decorator: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export const Badge = forwardRef<View, BadgeProps>(
	(
		{
			children,
			color = "primary",
			variant = "solid",
			size = "md",
			dot = false,
			max = 99,
			badgeContent,
			invisible = false,
			startDecorator,
			endDecorator,
			onDismiss,
			dismissLabel = "Dismiss badge",
			dismissIconName = "close",
			style,
			badgeStyle,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		let displayContent: ReactNode = badgeContent;

		if (typeof badgeContent === "number") {
			if (badgeContent > max) {
				displayContent = `${max}+`;
			} else if (badgeContent <= 0) {
				displayContent = null;
			} else {
				displayContent = `${badgeContent}`;
			}
		}

		if (typeof badgeContent === "string" && badgeContent.trim() === "") {
			displayContent = null;
		}

		if (badgeContent == null) {
			displayContent = null;
		}

		if (dot) {
			displayContent = null;
		}

		const shouldHide = invisible || (!dot && displayContent == null);

		const animatedScale = useRef(new Animated.Value(shouldHide ? 0 : 1)).current;

		useEffect(() => {
			Animated.timing(animatedScale, {
				toValue: shouldHide ? 0 : 1,
				duration: 150,
				useNativeDriver: true,
			}).start();
		}, [animatedScale, shouldHide]);

		const sizeStyles = sizeConfig[size];
		const theme = useTheme();
		const variantMap = theme.components.Badge.variants as Record<string, VariantStyle>;
		const variantKey = `${variant}-${color}`;
		const variantStyles = variantMap[variantKey] ?? variantMap["solid-primary"];

		const resolvedBackground =
			resolveColorToken(theme, variantStyles.backgroundColor) ?? theme.colors.primary;
		const resolvedTextColor =
			resolveColorToken(theme, variantStyles.color) ?? theme.colors.onPrimary;
		const resolvedBorderColor = resolveColorToken(theme, variantStyles.borderColor);
		const resolvedBorderWidth =
			typeof variantStyles.borderWidth === "number"
				? variantStyles.borderWidth
				: variant === "outlined"
					? 1
					: 0;

		const badgeContainerStyle = useMemo<ViewStyle>(() => {
			const baseStyle = StyleSheet.flatten<ViewStyle>([
				styles.badge,
				{
					minHeight: sizeStyles.minSize,
					minWidth: sizeStyles.minSize,
					borderRadius: sizeStyles.minSize / 2,
					paddingHorizontal: dot ? 0 : sizeStyles.paddingHorizontal,
					backgroundColor: resolvedBackground,
					borderColor: resolvedBorderColor,
					borderWidth: resolvedBorderWidth,
				},
				badgeStyle,
			]);
			return baseStyle;
		}, [
			badgeStyle,
			dot,
			resolvedBackground,
			resolvedBorderColor,
			resolvedBorderWidth,
			sizeStyles.minSize,
			sizeStyles.paddingHorizontal,
		]);

		const contentSpacing = sizeStyles.decoratorGap;

		const badgeContentNode =
			displayContent == null ? null : typeof displayContent === "string" ||
				typeof displayContent === "number" ? (
				<Typography
					level={sizeStyles.textLevel}
					numberOfLines={1}
					style={{ color: resolvedTextColor }}
				>
					{displayContent}
				</Typography>
			) : (
				displayContent
			);

		const computedAccessibilityLabel =
			ariaLabel ??
			(typeof displayContent === "string"
				? displayContent
				: typeof displayContent === "number"
					? String(displayContent)
					: undefined);

		const shouldRenderContent = !dot && !shouldHide;

		return (
			<Box ref={ref} style={StyleSheet.flatten([styles.root, style])} testID={testID}>
				{children}
				<Animated.View
					style={StyleSheet.flatten([
						badgeContainerStyle,
						{ transform: [{ scale: animatedScale }] },
					])}
					accessibilityLabel={computedAccessibilityLabel}
					accessibilityRole={badgeContentNode ? "text" : undefined}
					accessibilityLiveRegion={shouldHide ? undefined : "polite"}
					pointerEvents={shouldHide ? "none" : "auto"}
				>
					<Box style={styles.contentRow}>
						{startDecorator && !shouldHide ? (
							<Box style={StyleSheet.flatten([styles.decorator, { marginRight: contentSpacing }])}>
								{startDecorator}
							</Box>
						) : null}
						{shouldRenderContent ? badgeContentNode : null}
						{endDecorator && !shouldHide ? (
							<Box style={StyleSheet.flatten([styles.decorator, { marginLeft: contentSpacing }])}>
								{endDecorator}
							</Box>
						) : null}
						{onDismiss && !shouldHide ? (
							<Pressable
								accessibilityRole="button"
								accessibilityLabel={dismissLabel}
								hitSlop={6}
								style={{ marginLeft: contentSpacing }}
								onPress={(event: GestureResponderEvent) => {
									event.stopPropagation?.();
									onDismiss?.();
								}}
							>
								<Icon
									name={dismissIconName}
									size={sizeStyles.dismissIconSize}
									color={resolvedTextColor}
								/>
							</Pressable>
						) : null}
					</Box>
				</Animated.View>
			</Box>
		);
	},
);

Badge.displayName = "Badge";
