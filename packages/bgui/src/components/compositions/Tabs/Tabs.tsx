import {
	createContext,
	forwardRef,
	type KeyboardEvent,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import type {
	NativeSyntheticEvent,
	PressableStateCallbackType,
	StyleProp,
	ViewStyle,
} from "react-native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import type {
	TabListProps,
	TabPanelProps,
	TabProps,
	TabsColor,
	TabsOrientation,
	TabsProps,
	TabsSize,
	TabsValue,
	TabsVariant,
} from "./Tabs.types";

type TabRegistration = {
	value: TabsValue;
	ref: React.RefObject<View | null>;
	disabled: boolean;
};

type TabsContextValue = {
	value: TabsValue | null;
	orientation: TabsOrientation;
	size: TabsSize;
	color: TabsColor;
	variant: TabsVariant;
	selectionFollowsFocus: boolean;
	allowKeyboardFocus: boolean;
	disabled: boolean;
	tabs: TabsValue[];
	registerTab: (tab: TabRegistration) => void;
	unregisterTab: (value: TabsValue) => void;
	updateTabDisabled: (value: TabsValue, disabled: boolean) => void;
	focusTab: (value: TabsValue) => void;
	selectTab: (value: TabsValue | null) => void;
	getTab: (value: TabsValue) => TabRegistration | undefined;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const createTabSizeStyles = (
	theme: Theme,
): Record<TabsSize, { paddingHorizontal: number; paddingVertical: number; minHeight: number }> => ({
	sm: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		minHeight: 32,
	},
	md: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		minHeight: 40,
	},
	lg: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		minHeight: 48,
	},
});

const createPanelPadding = (theme: Theme): Record<TabsSize, number> => ({
	sm: theme.spacing.sm,
	md: theme.spacing.md,
	lg: theme.spacing.lg,
});

const resolveColorToken = (theme: Theme, token: string | undefined) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const resolveVariantStyles = (
	theme: Theme,
	component: "Tabs" | "TabList" | "Tab" | "TabPanel",
	variant: TabsVariant,
	color: TabsColor,
) => {
	const variantKey = `${variant}-${color}`;
	const componentConfig = theme.components[component] as
		| {
				variants?: Record<
					string,
					{ backgroundColor?: string; borderColor?: string; borderWidth?: number; color?: string }
				>;
		  }
		| undefined;

	const variantStyles = componentConfig?.variants?.[variantKey];

	if (!variantStyles) {
		return {} as const;
	}

	const { backgroundColor, borderColor, borderWidth, color: textColor } = variantStyles;

	return {
		backgroundColor: resolveColorToken(theme, backgroundColor),
		borderColor: resolveColorToken(theme, borderColor),
		borderWidth: borderWidth ?? 0,
		color: resolveColorToken(theme, textColor),
	} as const;
};

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs components must be used within a <Tabs> provider.");
	}
	return context;
};

const mergeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) => {
	return (value: T | null) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(value);
			} else {
				try {
					(ref as React.MutableRefObject<T | null>).current = value;
				} catch (_error) {
					// noop - attempting to set read-only ref
				}
			}
		});
	};
};

const getNextEnabledValue = (
	values: TabsValue[],
	getTab: (value: TabsValue) => TabRegistration | undefined,
	allowKeyboardFocus: boolean,
	current: TabsValue | null,
	delta: number,
) => {
	if (values.length === 0) return null;

	const enabledValues = values.filter((value) => {
		const tab = getTab(value);
		if (!tab) return false;
		if (!tab.disabled) return true;
		return allowKeyboardFocus;
	});

	if (enabledValues.length === 0) {
		return null;
	}

	const currentIndex = current !== null ? enabledValues.indexOf(current) : -1;

	if (currentIndex === -1) {
		return delta > 0 ? enabledValues[0] : enabledValues[enabledValues.length - 1];
	}

	const nextIndex = (currentIndex + delta + enabledValues.length) % enabledValues.length;
	return enabledValues[nextIndex];
};

const extractEventKey = (
	event: NativeSyntheticEvent<{ key?: string }> | KeyboardEvent,
): string | undefined => {
	const nativeKey = (event as NativeSyntheticEvent<{ key?: string }>).nativeEvent?.key;
	if (nativeKey && nativeKey.length > 0) {
		return nativeKey;
	}

	return (event as KeyboardEvent).key;
};

const TabsComponent = forwardRef<View, TabsProps>(
	(
		{
			children,
			value: valueProp,
			defaultValue = null,
			onChange,
			orientation = "horizontal",
			size = "md",
			color = "neutral",
			variant = "plain",
			allowKeyboardFocus = false,
			selectionFollowsFocus = true,
			disabled = false,
			style,
			testID,
			accessibilityLabel,
			accessibilityHint,
			accessibilityLabelledBy,
		},
		ref,
	) => {
		const theme = useTheme();
		const [internalValue, setInternalValue] = useState<TabsValue | null>(valueProp ?? defaultValue);
		const isControlled = valueProp !== undefined;
		const currentValue = isControlled ? (valueProp ?? null) : internalValue;

		const [registeredValues, setRegisteredValues] = useState<TabsValue[]>([]);
		const registrations = useRef<Map<TabsValue, TabRegistration>>(new Map());

		const registerTab = useCallback((tab: TabRegistration) => {
			registrations.current.set(tab.value, tab);
			setRegisteredValues((previous) => {
				if (previous.includes(tab.value)) {
					return previous;
				}
				return [...previous, tab.value];
			});
		}, []);

		const unregisterTab = useCallback((value: TabsValue) => {
			registrations.current.delete(value);
			setRegisteredValues((previous) => previous.filter((item) => item !== value));
		}, []);

		const updateTabDisabled = useCallback((value: TabsValue, tabDisabled: boolean) => {
			const existing = registrations.current.get(value);
			if (!existing) {
				return;
			}

			registrations.current.set(value, { ...existing, disabled: tabDisabled });
		}, []);

		const focusTab = useCallback((value: TabsValue) => {
			const target = registrations.current.get(value);
			const node = target?.ref.current as unknown as { focus?: () => void } | null | undefined;
			if (node?.focus) {
				node.focus();
			} else if (Platform.OS !== "web" && target?.ref.current) {
				try {
					(
						target.ref.current as unknown as { setNativeProps?: (props: unknown) => void }
					)?.setNativeProps?.({
						hasTVPreferredFocus: true,
					});
				} catch (_error) {
					// Ignore focus errors on native platforms
				}
			}
		}, []);

		const selectTab = useCallback(
			(nextValue: TabsValue | null) => {
				if (!isControlled) {
					setInternalValue(nextValue);
				}
				onChange?.(nextValue);
			},
			[isControlled, onChange],
		);

		const contextValue = useMemo<TabsContextValue>(
			() => ({
				value: currentValue,
				orientation,
				size,
				color,
				variant,
				selectionFollowsFocus,
				allowKeyboardFocus,
				disabled,
				tabs: registeredValues,
				registerTab,
				unregisterTab,
				updateTabDisabled,
				focusTab,
				selectTab,
				getTab: (value: TabsValue) => registrations.current.get(value),
			}),
			[
				allowKeyboardFocus,
				color,
				currentValue,
				disabled,
				focusTab,
				orientation,
				registerTab,
				registeredValues,
				selectTab,
				selectionFollowsFocus,
				size,
				updateTabDisabled,
				variant,
				unregisterTab,
			],
		);

		return (
			<TabsContext.Provider value={contextValue}>
				<Box
					ref={ref}
					style={StyleSheet.flatten([
						styles.container,
						orientation === "vertical" ? styles.vertical : styles.horizontal,
						{ gap: theme.spacing.sm },
						style,
					])}
					testID={testID}
					accessibilityLabel={accessibilityLabel}
					accessibilityHint={accessibilityHint}
					accessibilityLabelledBy={accessibilityLabelledBy}
				>
					{children}
				</Box>
			</TabsContext.Provider>
		);
	},
);

TabsComponent.displayName = "Tabs";

const TabListComponent = forwardRef<View, TabListProps>(
	(
		{
			children,
			orientation: orientationProp,
			size: sizeProp,
			color: colorProp,
			variant: variantProp,
			disableUnderline = false,
			underlinePlacement = "bottom",
			style,
			testID,
			accessibilityLabel,
			accessibilityHint,
			accessibilityLabelledBy,
		},
		ref,
	) => {
		const {
			orientation,
			size,
			color,
			variant,
			tabs,
			value,
			focusTab,
			selectTab,
			allowKeyboardFocus,
			selectionFollowsFocus,
			disabled,
			getTab,
		} = useTabsContext();
		const theme = useTheme();

		const resolvedOrientation = orientationProp ?? orientation;
		const resolvedVariant = variantProp ?? variant;
		const resolvedColor = colorProp ?? color;
		const resolvedSize = sizeProp ?? size;

		const variantStyles = resolveVariantStyles(theme, "TabList", resolvedVariant, resolvedColor);

		const spacingToken = useMemo(() => {
			switch (resolvedSize) {
				case "sm":
					return "sm" as const;
				case "lg":
					return "lg" as const;
				default:
					return "md" as const;
			}
		}, [resolvedSize]);

		const handleKeyDown = useCallback(
			(event: NativeSyntheticEvent<{ key?: string }> | KeyboardEvent) => {
				const key = extractEventKey(event);
				if (!key) return;

				const isHorizontal = resolvedOrientation === "horizontal";
				let nextValue: TabsValue | null = null;

				if (key === "Home") {
					const first = getNextEnabledValue(tabs, getTab, allowKeyboardFocus, null, 1);
					nextValue = first;
				} else if (key === "End") {
					const last = getNextEnabledValue(tabs, getTab, allowKeyboardFocus, null, -1);
					nextValue = last;
				} else if (isHorizontal && (key === "ArrowRight" || key === "ArrowLeft")) {
					const delta = key === "ArrowRight" ? 1 : -1;
					nextValue = getNextEnabledValue(tabs, getTab, allowKeyboardFocus, value, delta);
				} else if (!isHorizontal && (key === "ArrowDown" || key === "ArrowUp")) {
					const delta = key === "ArrowDown" ? 1 : -1;
					nextValue = getNextEnabledValue(tabs, getTab, allowKeyboardFocus, value, delta);
				}

				if (nextValue === null || nextValue === undefined) {
					return;
				}

				if (typeof event.preventDefault === "function") {
					event.preventDefault();
				}

				focusTab(nextValue);
				if (selectionFollowsFocus) {
					selectTab(nextValue);
				}
			},
			[
				allowKeyboardFocus,
				focusTab,
				getTab,
				resolvedOrientation,
				selectTab,
				selectionFollowsFocus,
				tabs,
				value,
			],
		);

		const underlinePlacementForOrientation = useMemo(() => {
			if (resolvedOrientation === "vertical") {
				if (underlinePlacement === "bottom") return "right" as const;
				if (underlinePlacement === "top") return "left" as const;
			}
			return underlinePlacement;
		}, [resolvedOrientation, underlinePlacement]);

		const underlineStyle = !disableUnderline
			? (() => {
					switch (underlinePlacementForOrientation) {
						case "top":
							return styles.underlineTop;
						case "left":
							return styles.underlineLeft;
						case "right":
							return styles.underlineRight;
						default:
							return styles.underlineBottom;
					}
				})()
			: null;

		const keyDownProps =
			Platform.OS === "web"
				? {
						onKeyDown: handleKeyDown as unknown as (event: NativeSyntheticEvent<unknown>) => void,
					}
				: {};

		return (
			<View
				ref={ref}
				role={Platform.OS === "web" ? "tablist" : undefined}
				accessibilityRole="tablist"
				accessibilityLabel={accessibilityLabel}
				accessibilityHint={accessibilityHint}
				accessibilityLabelledBy={accessibilityLabelledBy}
				aria-orientation={resolvedOrientation}
				testID={testID}
				style={StyleSheet.flatten([
					styles.list,
					resolvedOrientation === "vertical" ? styles.listVertical : styles.listHorizontal,
					underlineStyle
						? {
								borderColor: theme.colors.outlineVariant,
								...(underlineStyle as ViewStyle),
							}
						: null,
					{
						backgroundColor: variantStyles.backgroundColor,
						borderColor: variantStyles.borderColor,
						borderRadius: theme.borderRadii.md,
						borderWidth: variantStyles.borderWidth,
					},
					style,
				])}
				{...keyDownProps}
				pointerEvents={disabled ? "none" : "auto"}
			>
				<Stack
					direction={resolvedOrientation === "vertical" ? "column" : "row"}
					spacing={spacingToken}
					useFlexGap={false}
				>
					{children}
				</Stack>
			</View>
		);
	},
);

TabListComponent.displayName = "TabList";

const TabComponent = forwardRef<View, TabProps>((props, ref) => {
	const {
		children,
		value,
		disabled: disabledProp = false,
		size: sizeProp,
		color: colorProp,
		variant: variantProp,
		indicatorPlacement = "bottom",
		indicatorInset = false,
		disableIndicator = false,
		style,
		testID,
		accessibilityLabel,
		accessibilityHint,
		accessibilityLabelledBy,
		onPress,
		onClick,
		onFocus,
		onBlur,
	} = props;
	const ariaControls = props["aria-controls"];

	const {
		value: selectedValue,
		orientation,
		size,
		color,
		variant,
		selectionFollowsFocus,
		disabled: tabsDisabled,
		registerTab,
		unregisterTab,
		updateTabDisabled,
		selectTab,
	} = useTabsContext();
	const theme = useTheme();

	const internalRef = useRef<View | null>(null);
	const mergedRef = useMemo(() => mergeRefs(internalRef, ref), [ref]);

	const generatedId = useId();
	const tabValue = (value ?? generatedId) as TabsValue;

	const resolvedSize = sizeProp ?? size;
	const resolvedColor = colorProp ?? color;
	const resolvedVariant = variantProp ?? variant;
	const isDisabled = tabsDisabled || disabledProp;
	const isSelected = selectedValue === tabValue;
	const sizeMap = useMemo(() => createTabSizeStyles(theme), [theme]);
	const sizeTokens = sizeMap[resolvedSize];

	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		registerTab({ value: tabValue, ref: internalRef, disabled: isDisabled });
		return () => unregisterTab(tabValue);
	}, [registerTab, unregisterTab, tabValue, isDisabled]);

	useEffect(() => {
		updateTabDisabled(tabValue, isDisabled);
	}, [isDisabled, tabValue, updateTabDisabled]);

	const variantStyles = resolveVariantStyles(theme, "Tab", resolvedVariant, resolvedColor);

	const indicatorOrientation = useMemo(() => {
		if (orientation === "vertical") {
			if (indicatorPlacement === "bottom") return "right" as const;
			if (indicatorPlacement === "top") return "left" as const;
		}
		return indicatorPlacement;
	}, [indicatorPlacement, orientation]);

	const indicatorStyle = useMemo(() => {
		if (disableIndicator || !isSelected) return null;
		const thickness = 2;
		const insetOffset = indicatorInset ? theme.spacing.xs : 0;
		const colorValue = variantStyles.color ?? theme.colors.primary;

		switch (indicatorOrientation) {
			case "top":
				return [
					styles.indicator,
					{
						height: thickness,
						top: 0,
						left: insetOffset,
						right: insetOffset,
						backgroundColor: colorValue,
						borderRadius: theme.borderRadii.xs,
					},
				];
			case "left":
				return [
					styles.indicator,
					{
						width: thickness,
						left: 0,
						top: insetOffset,
						bottom: insetOffset,
						backgroundColor: colorValue,
						borderRadius: theme.borderRadii.xs,
					},
				];
			case "right":
				return [
					styles.indicator,
					{
						width: thickness,
						right: 0,
						top: insetOffset,
						bottom: insetOffset,
						backgroundColor: colorValue,
						borderRadius: theme.borderRadii.xs,
					},
				];
			default:
				return [
					styles.indicator,
					{
						height: thickness,
						bottom: 0,
						left: insetOffset,
						right: insetOffset,
						backgroundColor: colorValue,
						borderRadius: theme.borderRadii.xs,
					},
				];
		}
	}, [
		disableIndicator,
		indicatorInset,
		indicatorOrientation,
		isSelected,
		theme,
		variantStyles.color,
	]);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
		if (selectionFollowsFocus && !isDisabled) {
			selectTab(tabValue);
		}
		onFocus?.();
	}, [isDisabled, onFocus, selectTab, selectionFollowsFocus, tabValue]);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
		onBlur?.();
	}, [onBlur]);

	const pressableStyle = useCallback(
		(state: PressableStateCallbackType): StyleProp<ViewStyle> => {
			const { pressed } = state;
			const hovered = (state as { hovered?: boolean }).hovered ?? false;
			const focused = (state as { focused?: boolean }).focused ?? false;

			const resolvedStyles = [
				styles.tab,
				orientation === "vertical" ? styles.tabVertical : styles.tabHorizontal,
				{
					paddingHorizontal: sizeTokens.paddingHorizontal,
					paddingVertical: sizeTokens.paddingVertical,
					minHeight: sizeTokens.minHeight,
					borderRadius: theme.borderRadii.sm,
					backgroundColor: variantStyles.backgroundColor,
					borderColor: variantStyles.borderColor,
					borderWidth: variantStyles.borderWidth,
				},
				isSelected && {
					borderColor: variantStyles.color ?? theme.colors.primary,
				},
				isDisabled && styles.disabled,
				(focused || isFocused) && !isDisabled
					? {
							borderColor: theme.colors.primary,
							shadowColor: theme.colors.primary,
							shadowOpacity: Platform.OS === "web" ? 0 : 0.2,
							shadowOffset: { width: 0, height: 0 },
							shadowRadius: 3,
						}
					: null,
				pressed && !isDisabled ? styles.pressed : null,
				hovered && !isDisabled ? styles.hovered : null,
				style,
			];
			return StyleSheet.flatten(resolvedStyles);
		},
		[
			isDisabled,
			isFocused,
			isSelected,
			orientation,
			style,
			variantStyles.backgroundColor,
			variantStyles.borderColor,
			variantStyles.borderWidth,
			variantStyles.color,
			theme,
			sizeTokens,
		],
	);

	return (
		<Pressable
			ref={mergedRef}
			accessibilityRole="tab"
			accessibilityState={{ selected: isSelected, disabled: isDisabled }}
			accessibilityLabel={accessibilityLabel}
			accessibilityHint={accessibilityHint}
			accessibilityLabelledBy={accessibilityLabelledBy}
			disabled={isDisabled}
			onPress={() => {
				if (isDisabled) return;
				selectTab(tabValue);
				onPress?.();
				onClick?.();
			}}
			onFocus={handleFocus}
			onBlur={handleBlur}
			focusable={!isDisabled}
			role={Platform.OS === "web" ? "tab" : undefined}
			tabIndex={isSelected ? 0 : -1}
			testID={testID}
			style={pressableStyle}
			{...(Platform.OS === "web" && ariaControls ? { "aria-controls": ariaControls } : {})}
		>
			<Box pointerEvents="none">{children}</Box>
			{indicatorStyle ? <Box pointerEvents="none" style={indicatorStyle} /> : null}
		</Pressable>
	);
});

TabComponent.displayName = "Tab";

const TabPanelComponent = forwardRef<View, TabPanelProps>(
	(
		{
			children,
			value,
			keepMounted = false,
			size: sizeProp,
			color: colorProp,
			variant: variantProp,
			style,
			testID,
			accessibilityLabel,
			accessibilityHint,
			accessibilityLabelledBy,
		},
		ref,
	) => {
		const { value: selectedValue, size, color, variant } = useTabsContext();
		const theme = useTheme();

		const resolvedSize = sizeProp ?? size;
		const resolvedColor = colorProp ?? color;
		const resolvedVariant = variantProp ?? variant;
		const panelPaddingMap = useMemo(() => createPanelPadding(theme), [theme]);

		const isSelected = selectedValue === value;

		if (!isSelected && !keepMounted) {
			return null;
		}

		const variantStyles = resolveVariantStyles(theme, "TabPanel", resolvedVariant, resolvedColor);

		return (
			<Box
				ref={ref}
				role={Platform.OS === "web" ? "tabpanel" : undefined}
				accessibilityRole={Platform.OS === "web" ? undefined : "summary"}
				accessibilityLabel={accessibilityLabel}
				accessibilityHint={accessibilityHint}
				accessibilityLabelledBy={accessibilityLabelledBy}
				testID={testID}
				style={StyleSheet.flatten([
					styles.panel,
					{
						padding: panelPaddingMap[resolvedSize],
						display: isSelected ? "flex" : "none",
						backgroundColor: variantStyles.backgroundColor,
						borderColor: variantStyles.borderColor,
						borderRadius: theme.borderRadii.md,
						borderWidth: variantStyles.borderWidth,
					},
					style,
				])}
				importantForAccessibility={isSelected ? "auto" : "no-hide-descendants"}
			>
				{children}
			</Box>
		);
	},
);

TabPanelComponent.displayName = "TabPanel";

export const Tabs = Object.assign(TabsComponent, {
	List: TabListComponent,
	Tab: TabComponent,
	Panel: TabPanelComponent,
});

export const TabList = TabListComponent;
export const Tab = TabComponent;
export const TabPanel = TabPanelComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
	},
	horizontal: {
		alignItems: "stretch",
	},
	vertical: {
		flexDirection: "row",
	},
	list: {},
	listHorizontal: {
		flexGrow: 0,
	},
	listVertical: {
		flexShrink: 0,
	},
	underlineTop: {
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	underlineBottom: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	underlineLeft: {
		borderLeftWidth: StyleSheet.hairlineWidth,
	},
	underlineRight: {
		borderRightWidth: StyleSheet.hairlineWidth,
	},
	tab: {
		justifyContent: "center",
		alignItems: "center",
		minWidth: 48,
	},
	tabHorizontal: {
		flexDirection: "row",
	},
	tabVertical: {
		flexDirection: "row",
	},
	indicator: {
		position: "absolute",
	},
	disabled: {
		opacity: 0.4,
	},
	pressed: {
		opacity: 0.8,
	},
	hovered: {
		opacity: 0.9,
	},
	panel: {},
});
