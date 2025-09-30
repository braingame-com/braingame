import {
	Children,
	forwardRef,
	type ReactElement,
	type RefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	type NativeSyntheticEvent,
	StyleSheet,
	type TargetedEvent,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import { Stack } from "../../primitives/Stack";
import type { ListContextValue, ListItemValue, ListProps, ListVariant } from "./List.types";
import { ListContext } from "./ListContext";

interface RegisteredItem {
	key: string;
	ref: RefObject<unknown>;
	disabled: boolean;
}

const resolveThemeColor = (value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof typeof theme.colors] ?? value;
};

const getVariantStyles = (variant: ListVariant, color: ListProps["color"]) => {
	const key = `${variant}-${color}` as const;
	const fallback = "plain-neutral" as const;
	const tokens =
		theme.components.List?.variants?.[key] ?? theme.components.List?.variants?.[fallback];

	return {
		backgroundColor: resolveThemeColor(tokens?.backgroundColor) ?? "transparent",
		borderColor: resolveThemeColor(tokens?.borderColor),
		borderWidth: tokens?.borderWidth ?? (variant === "outlined" ? StyleSheet.hairlineWidth : 0),
	} satisfies Pick<ViewStyle, "backgroundColor" | "borderColor" | "borderWidth">;
};

const paddingMap = {
	sm: theme.spacing.xs,
	md: theme.spacing.sm,
	lg: theme.spacing.md,
} as const;

const gapMap = {
	sm: theme.spacing.xs,
	md: theme.spacing.sm,
	lg: theme.spacing.md,
} as const;

const radiusMap = {
	sm: theme.radii.sm,
	md: theme.radii.md,
	lg: theme.radii.lg,
} as const;

type KeyDownEvent = NativeSyntheticEvent<TargetedEvent> & { nativeEvent: { key?: string } };

const findNextEnabledIndex = (items: RegisteredItem[], start: number, direction: 1 | -1) => {
	const total = items.length;
	let index = start;
	for (let i = 0; i < total; i += 1) {
		index = (index + direction + total) % total;
		const item = items[index];
		if (item && !item.disabled) {
			return index;
		}
	}
	return start;
};

export const List = forwardRef<View, ListProps>(function List(
	{
		children,
		color = "neutral",
		variant = "plain",
		size = "md",
		orientation = "vertical",
		marker = "none",
		wrap = false,
		selectionMode = "none",
		defaultSelectedValue = null,
		selectedValue,
		onSelectionChange,
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
		accessibilityRole,
		onKeyDown: restOnKeyDown,
		...viewProps
	} = rest as ViewProps & { onKeyDown?: (event: KeyDownEvent) => void };
	const resolvedRole = accessibilityRole ?? "list";

	const itemsRef = useRef<RegisteredItem[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [uncontrolledValue, setUncontrolledValue] = useState<ListItemValue | null>(
		defaultSelectedValue,
	);
	const resolvedSelectedValue = selectedValue ?? uncontrolledValue;

	const registerItem = useCallback<ListContextValue["registerItem"]>((key, itemRef, options) => {
		const existing = itemsRef.current.find((item) => item.key === key);
		if (existing) {
			existing.ref = itemRef;
			existing.disabled = options.disabled;
			return;
		}
		itemsRef.current.push({ key, ref: itemRef, disabled: options.disabled });
	}, []);

	const unregisterItem = useCallback<ListContextValue["unregisterItem"]>((key) => {
		itemsRef.current = itemsRef.current.filter((item) => item.key !== key);
	}, []);

	const updateItemOptions = useCallback<ListContextValue["updateItemOptions"]>((key, options) => {
		const target = itemsRef.current.find((item) => item.key === key);
		if (target) {
			target.disabled = options.disabled;
		}
	}, []);

	const getItemIndex = useCallback<ListContextValue["getItemIndex"]>((key) => {
		return itemsRef.current.findIndex((item) => item.key === key);
	}, []);

	const focusItem = useCallback<ListContextValue["focusItem"]>((index) => {
		const target = itemsRef.current[index];
		const node = target?.ref.current as unknown as { focus?: () => void } | undefined;
		node?.focus?.();
	}, []);

	const onItemPress = useCallback<ListContextValue["onItemPress"]>(
		(value, event) => {
			if (selectionMode !== "single" || value === undefined) return;

			if (selectedValue === undefined) {
				setUncontrolledValue(value);
			}
			onSelectionChange?.(value);
			event?.stopPropagation?.();
		},
		[onSelectionChange, selectedValue, selectionMode],
	);

	const isItemSelected = useCallback<ListContextValue["isItemSelected"]>(
		(value) => {
			if (selectionMode !== "single" || value === undefined) return false;
			return resolvedSelectedValue === value;
		},
		[resolvedSelectedValue, selectionMode],
	);

	const variantStyles = useMemo(() => getVariantStyles(variant, color), [variant, color]);

	const containerBaseStyle = useMemo(
		() =>
			StyleSheet.flatten([
				styles.base,
				{
					borderRadius: radiusMap[size],
					padding: paddingMap[size],
					backgroundColor: variantStyles.backgroundColor,
					borderColor: variantStyles.borderColor,
					borderWidth: variantStyles.borderWidth,
				},
				style,
			]),
		[
			size,
			style,
			variantStyles.backgroundColor,
			variantStyles.borderColor,
			variantStyles.borderWidth,
		],
	);

	const handleKeyDown = useCallback(
		(event: KeyDownEvent) => {
			restOnKeyDown?.(event);
			const key = event.nativeEvent?.key;
			if (!key || itemsRef.current.length === 0) {
				return;
			}

			let nextIndex = activeIndex;
			if (orientation === "vertical") {
				if (key === "ArrowDown") {
					nextIndex = findNextEnabledIndex(itemsRef.current, activeIndex, 1);
				} else if (key === "ArrowUp") {
					nextIndex = findNextEnabledIndex(itemsRef.current, activeIndex, -1);
				}
			} else {
				if (key === "ArrowRight") {
					nextIndex = findNextEnabledIndex(itemsRef.current, activeIndex, 1);
				} else if (key === "ArrowLeft") {
					nextIndex = findNextEnabledIndex(itemsRef.current, activeIndex, -1);
				}
			}

			if (key === "Home") {
				nextIndex = findNextEnabledIndex(itemsRef.current, -1, 1);
			}

			if (key === "End") {
				nextIndex = findNextEnabledIndex(itemsRef.current, 0, -1);
			}

			if (nextIndex !== activeIndex) {
				event.preventDefault();
				setActiveIndex(nextIndex);
				focusItem(nextIndex);
			}
		},
		[activeIndex, focusItem, orientation, restOnKeyDown],
	);

	const contextValue = useMemo<ListContextValue>(
		() => ({
			color,
			variant,
			size,
			orientation,
			marker,
			gap: gapMap[size],
			padding: paddingMap[size],
			registerItem,
			unregisterItem,
			updateItemOptions,
			getItemIndex,
			activeIndex,
			setActiveIndex,
			focusItem,
			onItemPress,
			isItemSelected,
			selectionMode,
		}),
		[
			activeIndex,
			color,
			focusItem,
			getItemIndex,
			isItemSelected,
			marker,
			onItemPress,
			orientation,
			registerItem,
			selectionMode,
			size,
			unregisterItem,
			updateItemOptions,
			variant,
		],
	);

	const direction = orientation === "horizontal" ? "row" : "column";
	const shouldUseFlexGap = orientation !== "horizontal";

	const content = Children.toArray(children) as ReactElement[];

	const viewPropsWithHandlers = {
		...viewProps,
		onKeyDown: handleKeyDown,
	} as unknown as ViewProps;

	return (
		<View
			ref={ref}
			accessibilityRole={resolvedRole}
			accessibilityLabel={ariaLabel}
			accessibilityLabelledBy={ariaLabelledBy}
			accessibilityHint={ariaDescribedBy}
			style={containerBaseStyle}
			testID={testID}
			{...viewPropsWithHandlers}
		>
			<ListContext.Provider value={contextValue}>
				<Stack
					direction={direction}
					spacing={gapMap[size]}
					useFlexGap={shouldUseFlexGap}
					style={StyleSheet.flatten([
						styles.items,
						direction === "row" && wrap ? { flexWrap: "wrap" as const } : null,
					])}
				>
					{content}
				</Stack>
			</ListContext.Provider>
		</View>
	);
});

const styles = StyleSheet.create({
	base: {
		width: "100%",
	},
	items: {
		width: "100%",
	},
});
