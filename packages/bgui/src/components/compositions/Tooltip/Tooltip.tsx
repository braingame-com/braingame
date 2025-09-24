import {
	Children,
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Dimensions,
	type LayoutChangeEvent,
	type LayoutRectangle,
	Modal,
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	StyleSheet,
	type TargetedEvent,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import { useControlledState } from "../../../hooks/useControlledState";
import { theme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Typography } from "../../primitives/Typography";
import type { TooltipPlacement, TooltipProps } from "./Tooltip.types";

const ARROW_SIZE = 8;
const VIEWPORT_MARGIN = 8;

const sizeMap = {
	sm: {
		paddingX: theme.spacing.sm,
		paddingY: theme.spacing.xs,
		textLevel: "body-xs" as const,
	},
	md: {
		paddingX: theme.spacing.md,
		paddingY: theme.spacing.sm,
		textLevel: "body-sm" as const,
	},
	lg: {
		paddingX: theme.spacing.lg,
		paddingY: theme.spacing.md,
		textLevel: "body-md" as const,
	},
};

const resolveThemeColor = (token: string | undefined, fallback: string) => {
	if (!token) return fallback;
	return theme.colors[token as keyof typeof theme.colors] ?? token ?? fallback;
};

const composeEventHandler = <E,>(
	theirHandler: ((event: E) => void) | undefined,
	ourHandler: ((event: E) => void) | undefined,
) => {
	if (!theirHandler && !ourHandler) {
		return undefined;
	}

	return (event: E) => {
		theirHandler?.(event);
		if ((event as unknown as { defaultPrevented?: boolean }).defaultPrevented) {
			return;
		}
		ourHandler?.(event);
	};
};

interface Position {
	top: number;
	left: number;
}

const DEFAULT_OFFSCREEN_POSITION: Position = { top: -9999, left: -9999 };

type MeasureCallback = (x: number, y: number, width: number, height: number) => void;

type NativeMeasureTarget = {
	measureInWindow?: (callback: MeasureCallback) => void;
};

type WebMeasureTarget = {
	getBoundingClientRect?: () => {
		left: number;
		top: number;
		width: number;
		height: number;
	};
};

type TriggerNode = (NativeMeasureTarget & WebMeasureTarget) | null;

const calculatePosition = (
	placement: TooltipPlacement,
	triggerLayout: LayoutRectangle,
	tooltipSize: { width: number; height: number },
	arrow: boolean,
): Position => {
	const offset = theme.spacing.sm;
	const arrowOffset = arrow ? ARROW_SIZE : 0;
	let top = 0;
	let left = 0;

	switch (placement) {
		case "top":
			top = triggerLayout.y - tooltipSize.height - offset - arrowOffset;
			left = triggerLayout.x + triggerLayout.width / 2 - tooltipSize.width / 2;
			break;
		case "top-start":
			top = triggerLayout.y - tooltipSize.height - offset - arrowOffset;
			left = triggerLayout.x;
			break;
		case "top-end":
			top = triggerLayout.y - tooltipSize.height - offset - arrowOffset;
			left = triggerLayout.x + triggerLayout.width - tooltipSize.width;
			break;
		case "bottom":
			top = triggerLayout.y + triggerLayout.height + offset + arrowOffset;
			left = triggerLayout.x + triggerLayout.width / 2 - tooltipSize.width / 2;
			break;
		case "bottom-start":
			top = triggerLayout.y + triggerLayout.height + offset + arrowOffset;
			left = triggerLayout.x;
			break;
		case "bottom-end":
			top = triggerLayout.y + triggerLayout.height + offset + arrowOffset;
			left = triggerLayout.x + triggerLayout.width - tooltipSize.width;
			break;
		case "left":
			top = triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
			left = triggerLayout.x - tooltipSize.width - offset - arrowOffset;
			break;
		case "left-start":
			top = triggerLayout.y;
			left = triggerLayout.x - tooltipSize.width - offset - arrowOffset;
			break;
		case "left-end":
			top = triggerLayout.y + triggerLayout.height - tooltipSize.height;
			left = triggerLayout.x - tooltipSize.width - offset - arrowOffset;
			break;
		case "right":
			top = triggerLayout.y + triggerLayout.height / 2 - tooltipSize.height / 2;
			left = triggerLayout.x + triggerLayout.width + offset + arrowOffset;
			break;
		case "right-start":
			top = triggerLayout.y;
			left = triggerLayout.x + triggerLayout.width + offset + arrowOffset;
			break;
		case "right-end":
			top = triggerLayout.y + triggerLayout.height - tooltipSize.height;
			left = triggerLayout.x + triggerLayout.width + offset + arrowOffset;
			break;
	}

	const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

	const clampedLeft = Math.min(
		Math.max(left, VIEWPORT_MARGIN),
		Math.max(VIEWPORT_MARGIN, screenWidth - tooltipSize.width - VIEWPORT_MARGIN),
	);
	const clampedTop = Math.min(
		Math.max(top, VIEWPORT_MARGIN),
		Math.max(VIEWPORT_MARGIN, screenHeight - tooltipSize.height - VIEWPORT_MARGIN),
	);

	return { top: clampedTop, left: clampedLeft };
};

const calculateArrowStyle = (
	placement: TooltipPlacement,
	tooltipSize: { width: number; height: number } | null,
	backgroundColor: string,
): ViewStyle => {
	const base: ViewStyle = {
		position: "absolute",
		width: 0,
		height: 0,
		borderStyle: "solid",
	};

	if (!tooltipSize) {
		return base;
	}

	const centeredLeft = tooltipSize.width / 2 - ARROW_SIZE;
	const centeredTop = tooltipSize.height / 2 - ARROW_SIZE;

	switch (placement) {
		case "top":
			return {
				...base,
				top: tooltipSize.height - 1,
				left: centeredLeft,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: backgroundColor,
				borderLeftColor: "transparent",
				borderTopWidth: 0,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
		case "top-start":
			return {
				...base,
				top: tooltipSize.height - 1,
				left: ARROW_SIZE * 2,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: backgroundColor,
				borderLeftColor: "transparent",
				borderTopWidth: 0,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
		case "top-end":
			return {
				...base,
				top: tooltipSize.height - 1,
				left: tooltipSize.width - ARROW_SIZE * 3,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: backgroundColor,
				borderLeftColor: "transparent",
				borderTopWidth: 0,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
		case "bottom":
			return {
				...base,
				bottom: tooltipSize.height - 1,
				left: centeredLeft,
				borderTopColor: backgroundColor,
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: 0,
				borderLeftWidth: ARROW_SIZE,
			};
		case "bottom-start":
			return {
				...base,
				bottom: tooltipSize.height - 1,
				left: ARROW_SIZE * 2,
				borderTopColor: backgroundColor,
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: 0,
				borderLeftWidth: ARROW_SIZE,
			};
		case "bottom-end":
			return {
				...base,
				bottom: tooltipSize.height - 1,
				left: tooltipSize.width - ARROW_SIZE * 3,
				borderTopColor: backgroundColor,
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: 0,
				borderLeftWidth: ARROW_SIZE,
			};
		case "left":
			return {
				...base,
				left: tooltipSize.width - 1,
				top: centeredTop,
				borderTopColor: "transparent",
				borderRightColor: backgroundColor,
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: 0,
			};
		case "left-start":
			return {
				...base,
				left: tooltipSize.width - 1,
				top: ARROW_SIZE * 2,
				borderTopColor: "transparent",
				borderRightColor: backgroundColor,
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: 0,
			};
		case "left-end":
			return {
				...base,
				left: tooltipSize.width - 1,
				top: tooltipSize.height - ARROW_SIZE * 3,
				borderTopColor: "transparent",
				borderRightColor: backgroundColor,
				borderBottomColor: "transparent",
				borderLeftColor: "transparent",
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: ARROW_SIZE,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: 0,
			};
		case "right":
			return {
				...base,
				right: tooltipSize.width - 1,
				top: centeredTop,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: backgroundColor,
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: 0,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
		case "right-start":
			return {
				...base,
				right: tooltipSize.width - 1,
				top: ARROW_SIZE * 2,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: backgroundColor,
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: 0,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
		case "right-end":
			return {
				...base,
				right: tooltipSize.width - 1,
				top: tooltipSize.height - ARROW_SIZE * 3,
				borderTopColor: "transparent",
				borderRightColor: "transparent",
				borderBottomColor: "transparent",
				borderLeftColor: backgroundColor,
				borderTopWidth: ARROW_SIZE,
				borderRightWidth: 0,
				borderBottomWidth: ARROW_SIZE,
				borderLeftWidth: ARROW_SIZE,
			};
	}

	return base;
};

const isFocusVisible = (event: TargetedEvent) => {
	if (Platform.OS !== "web") {
		return true;
	}

	const target = event.target as unknown;
	if (target && typeof (target as HTMLElement).matches === "function") {
		try {
			return (target as HTMLElement).matches(":focus-visible");
		} catch {
			return true;
		}
	}

	return true;
};

export function Tooltip({
	children,
	title,
	color = "neutral",
	variant = "solid",
	size = "md",
	open: openProp,
	defaultOpen = false,
	placement = "bottom",
	arrow = false,
	enterDelay = 0,
	leaveDelay = 0,
	disableInteractive = false,
	followCursor = false,
	disableFocusListener = false,
	disableHoverListener = false,
	disableTouchListener = false,
	enterTouchDelay = 700,
	leaveTouchDelay = 1500,
	onOpen,
	onClose,
	disabled = false,
	style,
	testID,
	id,
	"aria-label": ariaLabel,
}: TooltipProps) {
	const generatedId = useId();
	const tooltipId = id ?? generatedId;
	const [openState, setOpenState] = useControlledState<boolean>(openProp, defaultOpen);
	const open = Boolean(openState && title);
	const triggerRef = useRef<TriggerNode>(null);
	const tooltipSizeRef = useRef<{ width: number; height: number } | null>(null);
	const [tooltipSize, setTooltipSize] = useState<{ width: number; height: number } | null>(null);
	const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState<Position | null>(null);
	const showTimerRef = useRef<NodeJS.Timeout | null>(null);
	const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
	const cursorPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const isFocusVisibleRef = useRef(false);

	const variantKey = `${variant}-${color}` as const;
	const variantTokens = theme.components.Tooltip.variants[variantKey] ?? {};
	const resolvedBackground = resolveThemeColor(variantTokens.backgroundColor, theme.colors.surface);
	const resolvedBorderColor = variantTokens.borderColor
		? resolveThemeColor(variantTokens.borderColor, theme.colors.outline)
		: undefined;
	const resolvedTextColor = resolveThemeColor(variantTokens.color, theme.colors.onSurface);
	const borderWidth = variantTokens.borderWidth ?? (resolvedBorderColor ? 1 : 0);
	const sizeStyles = sizeMap[size] ?? sizeMap.md;

	const clearTimers = useCallback(() => {
		if (showTimerRef.current) {
			clearTimeout(showTimerRef.current);
			showTimerRef.current = null;
		}
		if (hideTimerRef.current) {
			clearTimeout(hideTimerRef.current);
			hideTimerRef.current = null;
		}
	}, []);

	const requestOpen = useCallback(
		(event: unknown) => {
			if (open || disabled || !title) {
				return;
			}
			setOpenState(true);
			onOpen?.(event);
		},
		[disabled, onOpen, open, setOpenState, title],
	);

	const requestClose = useCallback(
		(event: unknown) => {
			if (!open) {
				return;
			}
			setOpenState(false);
			onClose?.(event);
		},
		[onClose, open, setOpenState],
	);

	const updatePosition = useCallback(
		(currentPlacement: TooltipPlacement = placement) => {
			if (!triggerLayout || !tooltipSizeRef.current) {
				return;
			}
			const position = calculatePosition(
				currentPlacement,
				triggerLayout,
				tooltipSizeRef.current,
				arrow,
			);
			setTooltipPosition(position);
		},
		[arrow, placement, triggerLayout],
	);

	const measureTrigger = useCallback(() => {
		const node = triggerRef.current;
		if (!node) {
			return;
		}

		if (typeof node.measureInWindow === "function") {
			node.measureInWindow((x: number, y: number, width: number, height: number) => {
				setTriggerLayout({ x, y, width, height });
			});
			return;
		}

		if (Platform.OS === "web") {
			const element = node as WebMeasureTarget | null;
			if (element?.getBoundingClientRect) {
				const rect = element.getBoundingClientRect();
				setTriggerLayout({
					x: rect.left + window.scrollX,
					y: rect.top + window.scrollY,
					width: rect.width,
					height: rect.height,
				});
			}
		}
	}, []);

	const scheduleOpen = useCallback(
		(event: unknown, delay: number) => {
			if (disabled || !title) {
				return;
			}
			if (showTimerRef.current) {
				clearTimeout(showTimerRef.current);
			}
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current);
				hideTimerRef.current = null;
			}
			if (delay > 0) {
				showTimerRef.current = setTimeout(() => {
					measureTrigger();
					requestOpen(event);
				}, delay);
				return;
			}
			measureTrigger();
			requestOpen(event);
		},
		[disabled, measureTrigger, requestOpen, title],
	);

	const scheduleClose = useCallback(
		(event: unknown, delay: number) => {
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current);
			}
			if (delay > 0) {
				hideTimerRef.current = setTimeout(() => {
					requestClose(event);
				}, delay);
				return;
			}
			requestClose(event);
		},
		[requestClose],
	);

	const handleFocus = useCallback(
		(event: TargetedEvent) => {
			if (disableFocusListener || disabled) {
				return;
			}
			const visible = isFocusVisible(event);
			isFocusVisibleRef.current = visible;
			if (visible) {
				scheduleOpen(event, enterDelay);
			}
		},
		[disableFocusListener, disabled, enterDelay, scheduleOpen],
	);

	const handleBlur = useCallback(
		(event: TargetedEvent) => {
			if (disableFocusListener || disabled) {
				return;
			}
			if (isFocusVisibleRef.current) {
				scheduleClose(event, leaveDelay);
			}
			isFocusVisibleRef.current = false;
		},
		[disableFocusListener, disabled, leaveDelay, scheduleClose],
	);

	const handleMouseEnter = useCallback(
		(event: NativeSyntheticEvent<Record<string, unknown>>) => {
			if (disableHoverListener || disabled) {
				return;
			}
			scheduleOpen(event, enterDelay);
		},
		[disableHoverListener, disabled, enterDelay, scheduleOpen],
	);

	const handleMouseLeave = useCallback(
		(event: NativeSyntheticEvent<Record<string, unknown>>) => {
			if (disableHoverListener || disabled) {
				return;
			}
			scheduleClose(event, leaveDelay);
		},
		[disableHoverListener, disabled, leaveDelay, scheduleClose],
	);

	const handleMouseMove = useCallback(
		(event: NativeSyntheticEvent<{ pageX?: number; pageY?: number }>) => {
			if (!followCursor || disabled) {
				return;
			}
			const { pageX = 0, pageY = 0 } = event.nativeEvent;
			cursorPositionRef.current = { x: pageX, y: pageY };
			setTooltipPosition({
				top: pageY + theme.spacing.sm,
				left: pageX + theme.spacing.sm,
			});
		},
		[disabled, followCursor],
	);

	const handlePressIn = useCallback(
		(event: NativeSyntheticEvent<Record<string, unknown>>) => {
			if (disableTouchListener || disabled) {
				return;
			}
			scheduleOpen(event, enterTouchDelay);
		},
		[disableTouchListener, disabled, enterTouchDelay, scheduleOpen],
	);

	const handlePressOut = useCallback(
		(event: NativeSyntheticEvent<Record<string, unknown>>) => {
			if (disableTouchListener || disabled) {
				return;
			}
			scheduleClose(event, leaveTouchDelay);
		},
		[disableTouchListener, disabled, leaveTouchDelay, scheduleClose],
	);

	const handleTooltipEnter = useCallback(() => {
		if (disableInteractive) {
			return;
		}
		if (showTimerRef.current) {
			clearTimeout(showTimerRef.current);
		}
	}, [disableInteractive]);

	const handleTooltipLeave = useCallback(
		(event: NativeSyntheticEvent<Record<string, unknown>>) => {
			if (disableInteractive) {
				return;
			}
			scheduleClose(event, leaveDelay);
		},
		[disableInteractive, leaveDelay, scheduleClose],
	);

	const handleTooltipLayout = useCallback(
		(event: LayoutChangeEvent) => {
			const layout = event.nativeEvent.layout;
			const nextSize = { width: layout.width, height: layout.height };
			tooltipSizeRef.current = nextSize;
			setTooltipSize(nextSize);
			if (open && !followCursor) {
				updatePosition();
			}
		},
		[followCursor, open, updatePosition],
	);

	useEffect(() => clearTimers, [clearTimers]);

	useEffect(() => {
		if (!open) {
			return;
		}
		if (followCursor) {
			setTooltipPosition({
				top: cursorPositionRef.current.y + theme.spacing.sm,
				left: cursorPositionRef.current.x + theme.spacing.sm,
			});
			return;
		}
		updatePosition();
	}, [followCursor, open, updatePosition]);

	useEffect(() => {
		if (!open) {
			return;
		}
		measureTrigger();
	}, [measureTrigger, open]);

	useEffect(() => {
		if (!open) {
			return;
		}
		if (Platform.OS !== "web") {
			return;
		}
		const handleWindowUpdate = () => {
			measureTrigger();
			updatePosition();
		};
		window.addEventListener("resize", handleWindowUpdate);
		window.addEventListener("scroll", handleWindowUpdate, true);
		return () => {
			window.removeEventListener("resize", handleWindowUpdate);
			window.removeEventListener("scroll", handleWindowUpdate, true);
		};
	}, [measureTrigger, open, updatePosition]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				scheduleClose(event, 0);
			}
		};
		if (Platform.OS === "web") {
			window.addEventListener("keydown", handleEscape);
			return () => window.removeEventListener("keydown", handleEscape);
		}
	}, [open, scheduleClose]);

	const child = useMemo(() => {
		const onlyChild = Children.only(children);
		if (!isValidElement(onlyChild)) {
			throw new Error("Tooltip expects a single React element child.");
		}
		return onlyChild;
	}, [children]);

	const mergedRef = useCallback(
		(node: unknown) => {
			triggerRef.current = node as TriggerNode;
			const { ref } = child as {
				ref?: ((instance: unknown) => void) | { current: unknown } | null;
			};
			if (typeof ref === "function") {
				ref(node);
			} else if (ref && typeof ref === "object") {
				(ref as { current: unknown }).current = node;
			}
		},
		[child],
	);

	const childProps: Record<string, unknown> = {
		ref: mergedRef,
	};

	if (!disableHoverListener && Platform.OS === "web") {
		childProps.onMouseEnter = composeEventHandler(
			(child.props as Record<string, unknown>).onMouseEnter as
				| ((event: NativeSyntheticEvent<Record<string, unknown>>) => void)
				| undefined,
			handleMouseEnter,
		);
		childProps.onMouseLeave = composeEventHandler(
			(child.props as Record<string, unknown>).onMouseLeave as
				| ((event: NativeSyntheticEvent<Record<string, unknown>>) => void)
				| undefined,
			handleMouseLeave,
		);
		if (followCursor) {
			childProps.onMouseMove = composeEventHandler(
				(child.props as Record<string, unknown>).onMouseMove as
					| ((event: NativeSyntheticEvent<{ pageX?: number; pageY?: number }>) => void)
					| undefined,
				handleMouseMove,
			);
		}
	}

	if (!disableFocusListener) {
		childProps.onFocus = composeEventHandler(
			(child.props as Record<string, unknown>).onFocus as
				| ((event: TargetedEvent) => void)
				| undefined,
			handleFocus,
		);
		childProps.onBlur = composeEventHandler(
			(child.props as Record<string, unknown>).onBlur as
				| ((event: TargetedEvent) => void)
				| undefined,
			handleBlur,
		);
	}

	if (!disableTouchListener) {
		childProps.onPressIn = composeEventHandler(
			(child.props as Record<string, unknown>).onPressIn as
				| ((event: NativeSyntheticEvent<Record<string, unknown>>) => void)
				| undefined,
			handlePressIn,
		);
		childProps.onPressOut = composeEventHandler(
			(child.props as Record<string, unknown>).onPressOut as
				| ((event: NativeSyntheticEvent<Record<string, unknown>>) => void)
				| undefined,
			handlePressOut,
		);
	}

	if (Platform.OS === "web") {
		(childProps as Record<string, unknown>)["aria-describedby"] = open ? tooltipId : undefined;
		if (ariaLabel) {
			(childProps as Record<string, unknown>)["aria-label"] = ariaLabel;
		}
	} else {
		(childProps as Record<string, unknown>).accessibilityDescribedBy = open ? tooltipId : undefined;
		if (ariaLabel) {
			(childProps as Record<string, unknown>).accessibilityLabel = ariaLabel;
		}
	}

	const tooltipContentStyle = StyleSheet.flatten([
		styles.tooltipSurface,
		{
			backgroundColor: resolvedBackground,
			borderColor: resolvedBorderColor,
			borderWidth,
			paddingHorizontal: sizeStyles.paddingX,
			paddingVertical: sizeStyles.paddingY,
		},
		style,
	]);

	const arrowStyle = arrow
		? calculateArrowStyle(placement, tooltipSize, resolvedBackground)
		: undefined;

	const content =
		typeof title === "string" || typeof title === "number" ? (
			<Typography level={sizeStyles.textLevel} style={{ color: resolvedTextColor }}>
				{title}
			</Typography>
		) : (
			title
		);

	const tooltipHoverProps =
		Platform.OS === "web" && !disableInteractive
			? ({
					onMouseEnter: handleTooltipEnter,
					onMouseLeave: handleTooltipLeave,
				} satisfies {
					onMouseEnter: () => void;
					onMouseLeave: (event: NativeSyntheticEvent<Record<string, unknown>>) => void;
				})
			: undefined;

	return (
		<>
			{cloneElement(child, childProps)}
			{open ? (
				<Modal
					animationType="fade"
					transparent
					visible
					onRequestClose={(event) => scheduleClose(event, 0)}
				>
					<View pointerEvents="box-none" style={styles.modalRoot}>
						<Pressable
							style={styles.backdrop}
							accessibilityRole="none"
							onPress={(event) => scheduleClose(event, leaveDelay)}
						/>
						<View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
							<View
								pointerEvents={disableInteractive ? "none" : "auto"}
								accessibilityRole={Platform.OS === "web" ? undefined : "text"}
								accessibilityLabel={
									typeof title === "string" || typeof title === "number" ? String(title) : ariaLabel
								}
								nativeID={tooltipId}
								style={[
									styles.tooltipWrapper,
									{
										top: (tooltipPosition ?? DEFAULT_OFFSCREEN_POSITION).top,
										left: (tooltipPosition ?? DEFAULT_OFFSCREEN_POSITION).left,
									},
								]}
								{...(tooltipHoverProps as unknown as Partial<ViewProps>)}
							>
								<Box style={tooltipContentStyle} testID={testID} onLayout={handleTooltipLayout}>
									{content}
								</Box>
								{arrow && tooltipSize ? <View style={arrowStyle} /> : null}
							</View>
						</View>
					</View>
				</Modal>
			) : null}
		</>
	);
}

const styles = StyleSheet.create({
	modalRoot: {
		...StyleSheet.absoluteFillObject,
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
	},
	tooltipWrapper: {
		position: "absolute",
		maxWidth: 320,
	},
	tooltipSurface: {
		borderRadius: theme.radii.sm,
		shadowColor: theme.colors.outlineVariant,
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 12,
		elevation: 3,
	},
});
