import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	type AccessibilityActionEvent,
	type LayoutChangeEvent,
	type NativeSyntheticEvent,
	Platform,
	StyleSheet,
	View,
	type ViewProps,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import type { SliderProps } from "./Slider.types";

const clampStatic = (value: number, min: number, max: number, step?: number) => {
	if (!Number.isFinite(value)) {
		return min;
	}
	const clamped = Math.min(Math.max(value, min), max);
	if (!step || step <= 0) {
		return clamped;
	}
	const steps = Math.round((clamped - min) / step);
	return Math.min(max, min + steps * step);
};

const resolveColorToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof Theme["colors"]] ?? token;
};

const createStyles = (theme: Theme) => {
	const thumbSize = theme.spacing.lg * 1.25;
	return StyleSheet.create({
		container: {
			width: "100%",
			paddingVertical: theme.spacing.sm,
		},
		trackContainer: {
			height: 4,
			borderRadius: theme.radii.lg,
			overflow: "visible",
			justifyContent: "center",
		},
		track: {
			height: 4,
			borderRadius: theme.radii.lg,
			width: "100%",
		},
		trackActive: {
			position: "absolute",
			height: 4,
			borderRadius: theme.radii.lg,
			left: 0,
		},
		thumb: {
			position: "absolute",
			top: -(thumbSize / 2 - 2),
			width: thumbSize,
			height: thumbSize,
			borderRadius: thumbSize / 2,
			backgroundColor: theme.colors.primary,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: "#000",
			shadowOpacity: Platform.OS === "web" ? 0 : 0.2,
			shadowRadius: 2,
			shadowOffset: { width: 0, height: 1 },
			elevation: 2,
		},
		thumbDisabled: {
			opacity: 0.4,
		},
		disabled: {
			opacity: 0.5,
		},
	});
};

export function Slider({
	value,
	defaultValue,
	minimumValue = 0,
	maximumValue = 100,
	step,
	disabled = false,
	color = "primary",
	trackColor,
	thumbColor,
	style,
	thumbStyle,
	onValueChange,
	onSlidingStart,
	onSlidingComplete,
	testID,
	onLayout,
	onResponderGrant,
	onResponderMove,
	onResponderRelease,
	onResponderTerminate,
	onKeyDown,
	onAccessibilityAction,
	...viewProps
}: SliderProps) {
	const theme = useTheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const range = maximumValue - minimumValue;
	const effectiveRange = range > 0 ? range : 1;
	const initialValue = clampStatic(
		value ?? defaultValue ?? minimumValue,
		minimumValue,
		maximumValue,
		step,
	);

	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState(initialValue);
	const controlledValue = value ?? internalValue;
	const currentValue = isControlled
		? clampStatic(controlledValue, minimumValue, maximumValue, step)
		: internalValue;
	const lastEmittedRef = useRef(currentValue);
	const valueRef = useRef(currentValue);
	valueRef.current = currentValue;

	useEffect(() => {
		if (!isControlled) {
			setInternalValue((prev) => clampStatic(prev, minimumValue, maximumValue, step));
		}
	}, [isControlled, minimumValue, maximumValue, step]);

	useEffect(() => {
		lastEmittedRef.current = currentValue;
	}, [currentValue]);

	const [trackWidth, setTrackWidth] = useState(0);
	const percent = trackWidth > 0 ? (valueRef.current - minimumValue) / effectiveRange : 0;
	const clampedPercent = Math.max(0, Math.min(1, percent));

	const resolvedColor = resolveColorToken(theme, typeof color === "string" ? color : String(color));
	const activeTrack =
		resolveColorToken(theme, trackColor?.active) ?? resolvedColor ?? theme.colors.primary;
	const inactiveTrack =
		resolveColorToken(theme, trackColor?.inactive) ?? theme.colors.outlineVariant;
	const resolvedThumb =
		resolveColorToken(theme, thumbColor) ?? resolvedColor ?? theme.colors.primary;

	const emitValueChange = useCallback(
		(next: number, { notify = true }: { notify?: boolean } = {}) => {
			const clamped = clampStatic(next, minimumValue, maximumValue, step);
			if (!isControlled) {
				setInternalValue(clamped);
			}
			if (notify && clamped !== lastEmittedRef.current) {
				onValueChange?.(clamped);
				lastEmittedRef.current = clamped;
			}
			return clamped;
		},
		[isControlled, maximumValue, minimumValue, onValueChange, step],
	);

	const updateFromLocation = useCallback(
		(locationX: number) => {
			if (trackWidth <= 0) {
				return valueRef.current;
			}
			const clampedX = Math.min(Math.max(locationX, 0), trackWidth);
			const ratio = clampedX / trackWidth;
			const next = minimumValue + ratio * effectiveRange;
			const resolved = emitValueChange(next);
			return resolved;
		},
		[trackWidth, minimumValue, effectiveRange, emitValueChange],
	);

	const handleLayout = useCallback(
		(event: LayoutChangeEvent) => {
			setTrackWidth(event.nativeEvent.layout.width);
			onLayout?.(event);
		},
		[onLayout],
	);

	const handleResponderGrant = useCallback(
		(event: NativeSyntheticEvent<{ locationX: number }>) => {
			if (disabled) return;
			onSlidingStart?.(valueRef.current);
			const updated = updateFromLocation(event.nativeEvent.locationX ?? 0);
			valueRef.current = updated;
			onResponderGrant?.(
				event as unknown as Parameters<NonNullable<ViewProps["onResponderGrant"]>>[0],
			);
		},
		[disabled, onSlidingStart, onResponderGrant, updateFromLocation],
	);

	const handleResponderMove = useCallback(
		(event: NativeSyntheticEvent<{ locationX: number }>) => {
			if (disabled) return;
			const updated = updateFromLocation(event.nativeEvent.locationX ?? 0);
			valueRef.current = updated;
			onResponderMove?.(
				event as unknown as Parameters<NonNullable<ViewProps["onResponderMove"]>>[0],
			);
		},
		[disabled, onResponderMove, updateFromLocation],
	);

	const finishSliding = useCallback(
		(event: NativeSyntheticEvent<{ locationX: number }>) => {
			if (disabled) return;
			const updated = updateFromLocation(event.nativeEvent.locationX ?? valueRef.current);
			valueRef.current = updated;
			onSlidingComplete?.(updated);
			onResponderRelease?.(
				event as unknown as Parameters<NonNullable<ViewProps["onResponderRelease"]>>[0],
			);
		},
		[disabled, onResponderRelease, onSlidingComplete, updateFromLocation],
	);

	const handleTerminate = useCallback(
		(event: NativeSyntheticEvent<{ locationX: number }>) => {
			if (disabled) return;
			const updated = updateFromLocation(event.nativeEvent.locationX ?? valueRef.current);
			valueRef.current = updated;
			onSlidingComplete?.(updated);
			onResponderTerminate?.(
				event as unknown as Parameters<NonNullable<ViewProps["onResponderTerminate"]>>[0],
			);
		},
		[disabled, onResponderTerminate, onSlidingComplete, updateFromLocation],
	);

	const handleKeyDownInternal = useCallback(
		(event: NativeSyntheticEvent<{ key?: string }>) => {
			if (disabled) return;
			const key = event.nativeEvent.key;
			if (!key) return;
			if (Platform.OS === "web") {
				onKeyDown?.(event);
			}
			let direction = 0;
			if (key === "ArrowLeft" || key === "ArrowDown") {
				direction = -1;
			} else if (key === "ArrowRight" || key === "ArrowUp") {
				direction = 1;
			}
			if (direction === 0) return;
			event.preventDefault();
			const increment = step ?? effectiveRange / 100;
			const updated = emitValueChange(valueRef.current + direction * increment);
			valueRef.current = updated;
			onSlidingComplete?.(updated);
			if (Platform.OS !== "web") {
				onKeyDown?.(event);
			}
		},
		[disabled, emitValueChange, effectiveRange, onKeyDown, onSlidingComplete, step],
	);

	const handleAccessibilityAction = useCallback(
		(action: AccessibilityActionEvent) => {
			const { actionName } = action.nativeEvent;
			if (actionName !== "increment" && actionName !== "decrement") {
				onAccessibilityAction?.(action);
				return;
			}
			const direction = actionName === "increment" ? 1 : -1;
			const increment = step ?? effectiveRange / 100;
			const updated = emitValueChange(valueRef.current + direction * increment);
			valueRef.current = updated;
			onSlidingComplete?.(updated);
			onAccessibilityAction?.(action);
		},
		[effectiveRange, emitValueChange, onAccessibilityAction, onSlidingComplete, step],
	);

	const handleStartShouldSetResponder = useCallback(() => !disabled, [disabled]);
	const handleMoveShouldSetResponder = useCallback(() => !disabled, [disabled]);

	const sliderTestID = testID ?? viewProps.nativeID ?? undefined;
	const trackTestID = sliderTestID ? `${sliderTestID}-track` : undefined;
	const activeTrackTestID = sliderTestID ? `${sliderTestID}-track-active` : undefined;
	const thumbTestID = sliderTestID ? `${sliderTestID}-thumb` : undefined;
	const sharedHandlers = {
		onKeyDown: handleKeyDownInternal,
		onAccessibilityAction: handleAccessibilityAction,
	};

	return (
		<View
			{...viewProps}
			testID={sliderTestID}
			style={StyleSheet.flatten([styles.container, disabled && styles.disabled, style])}
			onStartShouldSetResponder={handleStartShouldSetResponder}
			onMoveShouldSetResponder={handleMoveShouldSetResponder}
			onResponderGrant={handleResponderGrant}
			onResponderMove={handleResponderMove}
			onResponderRelease={finishSliding}
			onResponderTerminate={handleTerminate}
			{...sharedHandlers}
			accessibilityRole="adjustable"
			accessibilityValue={{ min: minimumValue, max: maximumValue, now: valueRef.current }}
			accessibilityState={{ disabled }}
			pointerEvents={disabled ? "none" : "auto"}
		>
			<View
				onLayout={handleLayout}
				testID={trackTestID}
				style={[styles.trackContainer, { backgroundColor: inactiveTrack }]}
			>
				<View
					testID={activeTrackTestID}
					style={[
						styles.trackActive,
						{
							backgroundColor: activeTrack,
							width: trackWidth * clampedPercent,
						},
					]}
				/>
				<View
					testID={thumbTestID}
					style={[
						styles.thumb,
						thumbStyle,
						disabled && styles.thumbDisabled,
						{
							transform: [{ translateX: trackWidth * clampedPercent }],
							backgroundColor: resolvedThumb,
						},
					]}
				/>
			</View>
		</View>
	);
}

Slider.displayName = "Slider";

export type { SliderProps } from "./Slider.types";
