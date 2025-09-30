import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
	type GestureResponderEvent,
	Pressable,
	type PressableProps,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { useListContext } from "../List/ListContext";
import type { ListItemProps } from "./ListItem.types";

let generatedId = 0;

const resolveThemeColor = (value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof typeof theme.colors] ?? value;
};

const getVariantStyles = (variant: string, color: string) => {
	const key = `${variant}-${color}` as const;
	const fallback = "plain-neutral" as const;
	const tokens =
		theme.components.ListItem?.variants?.[key] ?? theme.components.ListItem?.variants?.[fallback];

	return {
		backgroundColor: resolveThemeColor(tokens?.backgroundColor) ?? "transparent",
		borderColor: resolveThemeColor(tokens?.borderColor),
		borderWidth: tokens?.borderWidth ?? (variant === "outlined" ? StyleSheet.hairlineWidth : 0),
		color: resolveThemeColor(tokens?.color) ?? theme.colors.onSurface,
	};
};

const sizeMap = {
	sm: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		minHeight: 32,
		gap: theme.spacing.xs,
		radius: theme.radii.sm,
	},
	md: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		minHeight: 40,
		gap: theme.spacing.sm,
		radius: theme.radii.md,
	},
	lg: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		minHeight: 48,
		gap: theme.spacing.md,
		radius: theme.radii.lg,
	},
} as const;

const markerSymbols = {
	disc: "•",
	circle: "◦",
	square: "▪",
	decimal: (index: number) => `${index + 1}.`,
};

export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
	{
		children,
		value,
		color,
		variant,
		size,
		orientation,
		startAction,
		endAction,
		nested = false,
		button = false,
		disabled = false,
		selected: selectedProp,
		onPress: onPressProp,
		onClick,
		onPressIn,
		onPressOut,
		onFocus: onFocusProp,
		onBlur: onBlurProp,
		onHoverIn: onHoverInProp,
		onHoverOut: onHoverOutProp,
		style,
		testID,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		"aria-describedby": ariaDescribedBy,
		"aria-selected": ariaSelected,
		"aria-disabled": ariaDisabled,
		...rest
	},
	ref,
) {
	const context = useListContext();
	const effectiveColor = color ?? context?.color ?? "neutral";
	const effectiveVariant = variant ?? context?.variant ?? "plain";
	const effectiveSize = size ?? context?.size ?? "md";
	const effectiveOrientation = orientation ?? context?.orientation ?? "vertical";
	const gap = context?.gap ?? theme.spacing.sm;

	const { accessibilityRole, ...pressableRest } = rest;
	const resolvedRole = accessibilityRole ?? (button ? "button" : "text");
	const [isHovered, setIsHovered] = useState(false);
	const [isFocusedState, setIsFocusedState] = useState(false);

	const variantStyles = useMemo(
		() => getVariantStyles(effectiveVariant, effectiveColor),
		[effectiveVariant, effectiveColor],
	);
	const sizeStyles = sizeMap[effectiveSize];

	const pressableRef = useRef<View>(null);
	useImperativeHandle(ref, () => pressableRef.current as View);

	const keyRef = useRef<string>("");
	if (!keyRef.current) {
		if (value !== undefined) {
			keyRef.current = `value-${String(value)}`;
		} else {
			generatedId += 1;
			keyRef.current = `generated-${generatedId}`;
		}
	}

	useEffect(() => {
		if (!context) return;
		context.registerItem(keyRef.current, pressableRef, {
			disabled: disabled || Boolean(ariaDisabled),
		});
		return () => context.unregisterItem(keyRef.current);
	}, [ariaDisabled, context, disabled]);

	useEffect(() => {
		if (!context) return;
		context.updateItemOptions(keyRef.current, {
			disabled: disabled || Boolean(ariaDisabled),
		});
	}, [ariaDisabled, context, disabled]);

	const isSelected = selectedProp ?? context?.isItemSelected(value) ?? Boolean(ariaSelected);
	const disabledState = disabled || Boolean(ariaDisabled);
	const interactive =
		button ||
		Boolean(onPressProp) ||
		Boolean(onClick) ||
		(context?.selectionMode === "single" && value !== undefined);

	const textColor = variantStyles.color;
	const focusOutline = {
		borderColor: theme.colors.primary,
		borderWidth: Math.max(variantStyles.borderWidth ?? 0, 2),
	} satisfies ViewStyle;
	const selectedOutline = isSelected ? focusOutline : null;

	const containerStyles = [
		styles.item,
		{
			borderRadius: sizeStyles.radius,
			paddingHorizontal: sizeStyles.paddingHorizontal,
			paddingVertical: sizeStyles.paddingVertical,
			minHeight: sizeStyles.minHeight,
			backgroundColor: variantStyles.backgroundColor,
			borderColor: variantStyles.borderColor,
			borderWidth: variantStyles.borderWidth,
		},
		nested
			? {
					paddingLeft: sizeStyles.paddingHorizontal + gap,
				}
			: null,
		style,
	];
	const containerBaseStyle = StyleSheet.flatten(containerStyles);

	const handlePress = (event: GestureResponderEvent) => {
		if (disabledState) return;
		context?.onItemPress(value, event);
		onPressProp?.(event);
		onClick?.(event);
	};

	const handleFocus: PressableProps["onFocus"] = (event) => {
		if (context) {
			const index = context.getItemIndex(keyRef.current);
			if (index >= 0) {
				context.setActiveIndex(index);
			}
		}
		setIsFocusedState(true);
		onFocusProp?.(event);
	};

	const handleBlur: PressableProps["onBlur"] = (event) => {
		setIsFocusedState(false);
		onBlurProp?.(event);
	};

	const marker = (() => {
		if (!context || context.marker === "none") return null;
		if (effectiveOrientation === "horizontal") return null;

		const index = context.getItemIndex(keyRef.current);
		if (index < 0) return null;
		const symbol =
			context.marker === "decimal" ? markerSymbols.decimal(index) : markerSymbols[context.marker];

		return (
			<Typography level="body-md" textColor={textColor} style={styles.marker}>
				{symbol}
			</Typography>
		);
	})();

	return (
		<Pressable
			ref={pressableRef}
			accessibilityRole={resolvedRole}
			accessibilityLabel={ariaLabel}
			accessibilityHint={ariaDescribedBy}
			accessibilityLabelledBy={ariaLabelledBy}
			accessibilityState={{
				disabled: disabledState,
				selected: isSelected || Boolean(ariaSelected),
			}}
			disabled={disabledState}
			onPress={handlePress}
			onPressIn={disabledState ? undefined : onPressIn}
			onPressOut={disabledState ? undefined : onPressOut}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onHoverIn={(event) => {
				setIsHovered(true);
				onHoverInProp?.(event);
			}}
			onHoverOut={(event) => {
				setIsHovered(false);
				onHoverOutProp?.(event);
			}}
			testID={testID}
			style={({ pressed }) => [
				containerBaseStyle,
				interactive ? styles.interactive : null,
				pressed ? styles.pressed : null,
				isHovered ? styles.hovered : null,
				isFocusedState ? focusOutline : null,
				selectedOutline,
				disabledState ? styles.disabled : null,
			]}
			{...pressableRest}
		>
			<Stack direction="row" spacing={sizeStyles.gap} useFlexGap={false} style={styles.content}>
				{marker}
				{startAction ? <Box style={styles.action}>{startAction}</Box> : null}
				<Box style={styles.body}>
					{typeof children === "string" ? (
						<Typography level="body-md" textColor={textColor}>
							{children}
						</Typography>
					) : (
						children
					)}
				</Box>
				{endAction ? <Box style={styles.action}>{endAction}</Box> : null}
			</Stack>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "center",
	},
	interactive: {
		cursor: "pointer",
	},
	pressed: {
		transform: [{ scale: 0.98 }],
	},
	hovered: {
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 3,
		elevation: 2,
	},
	disabled: {
		opacity: 0.5,
	},
	content: {
		flex: 1,
		alignItems: "center",
	},
	body: {
		flex: 1,
	},
	action: {
		flexShrink: 0,
	},
	marker: {
		marginRight: theme.spacing.xs,
	},
});
