import {
	Children,
	createContext,
	Fragment,
	forwardRef,
	isValidElement,
	memo,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import {
	type GestureResponderEvent,
	Pressable,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import type {
	CardActionsProps,
	CardContentProps,
	CardHeaderProps,
	CardOrientation,
	CardProps,
	CardSize,
	CardVariant,
} from "./Card.types";

interface CardContextValue {
	size: CardSize;
	orientation: CardOrientation;
	spacing: number;
	padding: number;
	variant: CardVariant;
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => useContext(CardContext);

const radiusMap: Record<CardSize, number> = {
	sm: theme.radii.sm,
	md: theme.radii.md,
	lg: theme.radii.lg,
};

const paddingMap: Record<CardSize, number> = {
	sm: theme.spacing.sm,
	md: theme.spacing.md,
	lg: theme.spacing.lg,
};

const gapMap: Record<CardSize, number> = {
	sm: theme.spacing.xs,
	md: theme.spacing.sm,
	lg: theme.spacing.md,
};

type VariantStyle = {
	backgroundColor: string;
	borderColor?: string;
	borderWidth?: number;
	color?: string;
};

const resolveThemeColor = (value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof typeof theme.colors] ?? value;
};

const getVariantStyle = (variant: CardVariant, color: CardProps["color"]) => {
	const normalizedColor = (color ?? "neutral") as Exclude<CardProps["color"], undefined>;
	const variantKey = `${variant}-${normalizedColor}` as const;
	const fallbackKey = "outlined-neutral" as const;
	const tokens =
		theme.components.Card?.variants?.[variantKey] ?? theme.components.Card?.variants?.[fallbackKey];
	const normalizedTokens = (tokens ?? {}) as Partial<{
		backgroundColor: string;
		borderColor: string;
		borderWidth: number;
		color: string;
	}>;

	const backgroundColor =
		resolveThemeColor(normalizedTokens.backgroundColor) ?? theme.colors.surface;
	const borderColor = resolveThemeColor(normalizedTokens.borderColor);
	const resolvedColor = resolveThemeColor(normalizedTokens.color) ?? theme.colors.onSurface;

	return {
		backgroundColor,
		borderColor,
		borderWidth:
			normalizedTokens.borderWidth ?? (variant === "outlined" ? StyleSheet.hairlineWidth : 0),
		color: resolvedColor,
	} satisfies VariantStyle;
};

const buildShadowStyle = (variant: CardVariant, elevated?: boolean): ViewStyle | undefined => {
	if (variant !== "outlined" && !elevated) {
		return undefined;
	}

	return {
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	} satisfies ViewStyle;
};

const renderChildrenWithFragments = (children: ReactNode) => {
	const array = Children.toArray(children);
	if (array.length === 0) return null;

	return array.map((child, index) => (
		<Fragment key={(isValidElement(child) && child.key) || `card-child-${index}`}>{child}</Fragment>
	));
};

export const Card = memo(
	forwardRef<View, CardProps>(function Card(
		{
			children,
			color = "neutral",
			variant = "outlined",
			size = "md",
			orientation = "vertical",
			disabled = false,
			elevated,
			onPress,
			onClick,
			onPressIn,
			onPressOut,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			"aria-describedby": ariaDescribedBy,
			...rest
		},
		ref,
	) {
		const {
			onFocus: restOnFocus,
			onBlur: restOnBlur,
			onHoverIn: restOnHoverIn,
			onHoverOut: restOnHoverOut,
			accessibilityRole,
			...pressableRest
		} = rest;

		const spacing = gapMap[size];
		const padding = paddingMap[size];
		const variantStyle = useMemo(() => getVariantStyle(variant, color), [variant, color]);
		const baseStyle: ViewStyle = {
			borderRadius: radiusMap[size],
			backgroundColor: variantStyle.backgroundColor,
			borderColor: variantStyle.borderColor,
			borderWidth: variantStyle.borderWidth,
			overflow: "hidden",
		};

		const containerStyle = [styles.base, baseStyle, buildShadowStyle(variant, elevated), style];
		const containerBaseStyle = StyleSheet.flatten(containerStyle);

		const interactive = Boolean(onPress || onClick);
		const [isHovered, setIsHovered] = useState(false);
		const [isFocused, setIsFocused] = useState(false);

		const handlePress = (event: GestureResponderEvent) => {
			if (disabled) return;
			onPress?.(event);
			onClick?.(event);
		};

		const resolvedRole = accessibilityRole ?? (interactive ? "button" : "summary");

		const content = (
			<CardContext.Provider value={{ size, orientation, spacing, padding, variant }}>
				<Stack
					direction={orientation === "horizontal" ? "row" : "column"}
					spacing={spacing}
					useFlexGap={orientation !== "horizontal"}
					style={StyleSheet.flatten([styles.content, { padding }])}
				>
					{renderChildrenWithFragments(children)}
				</Stack>
			</CardContext.Provider>
		);

		if (interactive) {
			return (
				<Pressable
					ref={ref}
					disabled={disabled}
					accessibilityRole={resolvedRole}
					accessibilityLabel={ariaLabel}
					accessibilityHint={ariaDescribedBy}
					accessibilityLabelledBy={ariaLabelledBy}
					onPress={handlePress}
					onPressIn={disabled ? undefined : onPressIn}
					onPressOut={disabled ? undefined : onPressOut}
					onFocus={(event) => {
						setIsFocused(true);
						restOnFocus?.(event);
					}}
					onBlur={(event) => {
						setIsFocused(false);
						restOnBlur?.(event);
					}}
					onHoverIn={(event) => {
						setIsHovered(true);
						restOnHoverIn?.(event);
					}}
					onHoverOut={(event) => {
						setIsHovered(false);
						restOnHoverOut?.(event);
					}}
					testID={testID}
					style={({ pressed }) => [
						containerBaseStyle,
						styles.pressable,
						pressed ? styles.active : null,
						isHovered ? styles.hovered : null,
						isFocused ? styles.focused : null,
						disabled ? styles.disabled : null,
					]}
					{...pressableRest}
				>
					{content}
				</Pressable>
			);
		}

		return (
			<View
				ref={ref}
				accessibilityRole={resolvedRole}
				accessibilityLabel={ariaLabel}
				accessibilityHint={ariaDescribedBy}
				accessibilityLabelledBy={ariaLabelledBy}
				style={containerBaseStyle}
				testID={testID}
				{...pressableRest}
			>
				{content}
			</View>
		);
	}),
);

export const CardHeader: React.FC<CardHeaderProps> = memo(function CardHeader({
	title,
	subtitle,
	leading,
	trailing,
	children,
	style,
}) {
	const context = useCardContext();
	const spacing = context?.spacing ?? theme.spacing.sm;

	return (
		<Stack
			direction="row"
			spacing={spacing}
			useFlexGap={false}
			style={StyleSheet.flatten([styles.headerRow, style])}
		>
			{leading ? <Box style={styles.headerLeading}>{leading}</Box> : null}
			<Stack direction="column" spacing={subtitle ? spacing / 2 : 0} style={styles.headerContent}>
				{title ? (
					typeof title === "string" ? (
						<Typography level="title-md" numberOfLines={2}>
							{title}
						</Typography>
					) : (
						title
					)
				) : null}
				{subtitle ? (
					typeof subtitle === "string" ? (
						<Typography level="body-sm" color="neutral" numberOfLines={2}>
							{subtitle}
						</Typography>
					) : (
						subtitle
					)
				) : null}
				{children}
			</Stack>
			{trailing ? <Box style={styles.headerTrailing}>{trailing}</Box> : null}
		</Stack>
	);
});

export const CardContent: React.FC<CardContentProps> = memo(function CardContent({
	children,
	padding = false,
	style,
}) {
	const context = useCardContext();
	const spacing = context?.spacing ?? theme.spacing.sm;
	const paddingValue = padding ? (context?.padding ?? theme.spacing.md) : undefined;

	return (
		<Box
			style={StyleSheet.flatten([
				styles.body,
				paddingValue
					? {
							paddingHorizontal: paddingValue,
							paddingVertical: spacing,
						}
					: null,
				style,
			])}
		>
			{children}
		</Box>
	);
});

export const CardActions: React.FC<CardActionsProps> = memo(function CardActions({
	children,
	align = "end",
	direction = "horizontal",
	style,
}) {
	const context = useCardContext();
	const spacing = context?.spacing ?? theme.spacing.sm;
	const paddingValue = context?.padding ?? theme.spacing.md;
	const justifyContent =
		align === "start"
			? "flex-start"
			: align === "end"
				? "flex-end"
				: align === "center"
					? "center"
					: "space-between";

	return (
		<Stack
			direction={direction === "horizontal" ? "row" : "column"}
			spacing={spacing}
			useFlexGap={direction !== "horizontal"}
			style={StyleSheet.flatten([
				styles.actions,
				{
					justifyContent,
					paddingHorizontal: paddingValue,
					paddingBottom: paddingValue,
				},
				style,
			])}
		>
			{renderChildrenWithFragments(children)}
		</Stack>
	);
});

const styles = StyleSheet.create({
	base: {
		width: "100%",
	},
	content: {
		flex: 1,
	},
	pressable: {
		cursor: "pointer",
	},
	active: {
		transform: [{ scale: 0.99 }],
	},
	hovered: {
		transform: [{ translateY: -1 }],
	},
	disabled: {
		opacity: 0.6,
	},
	focused: {
		borderColor: theme.colors.primary,
		borderWidth: 2,
		shadowColor: theme.colors.primary,
		shadowOpacity: 0.18,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 4,
	},
	headerRow: {
		alignItems: "center",
	},
	headerLeading: {
		flexShrink: 0,
	},
	headerContent: {
		flex: 1,
	},
	headerTrailing: {
		flexShrink: 0,
	},
	body: {
		flex: 1,
	},
	actions: {
		alignItems: "center",
	},
});
