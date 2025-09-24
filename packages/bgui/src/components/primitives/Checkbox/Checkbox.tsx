import type React from "react";
import type { CSSProperties } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
	type GestureResponderEvent,
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	type StyleProp,
	StyleSheet,
	type TargetedEvent,
	View,
	type ViewStyle,
} from "react-native";
import { useControlledState } from "../../../hooks/useControlledState";
import { useInteractiveState } from "../../../hooks/useInteractiveState";
import { theme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { CheckboxChangeEvent, CheckboxProps } from "./Checkbox.types";

const resolveColorToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig = {
	sm: {
		box: 16,
		icon: 10,
		fontSize: theme.fontSizes.sm,
		gap: theme.spacing.xs,
	},
	md: {
		box: 20,
		icon: 12,
		fontSize: theme.fontSizes.md,
		gap: theme.spacing.sm,
	},
	lg: {
		box: 24,
		icon: 14,
		fontSize: theme.fontSizes.lg,
		gap: theme.spacing.md,
	},
} as const;

type FocusableInput = HTMLInputElement & { indeterminate?: boolean } & {
	value?: CheckboxProps["value"];
};

const createMockNativeEvent = (
	checked: boolean,
	value?: CheckboxProps["value"],
): CheckboxChangeEvent => {
	const target = Object.assign({} as FocusableInput, {
		checked,
		value,
	});

	return {
		target,
		currentTarget: target,
		bubbles: false,
		cancelable: false,
		defaultPrevented: false,
		eventPhase: 0,
		isTrusted: false,
		nativeEvent: {} as Event,
		persist: () => undefined,
		preventDefault: () => undefined,
		stopPropagation: () => undefined,
		isDefaultPrevented: () => false,
		isPropagationStopped: () => false,
		timeStamp: Date.now(),
		type: "change",
	};
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkbox: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radii.xs,
		borderWidth: 1,
	},
	checkMark: {
		width: 3,
		height: 8,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		transform: [{ rotate: "45deg" }],
	},
	indeterminate: {
		height: 2,
		borderRadius: 1,
		alignSelf: "stretch",
	},
});

const hiddenInputStyle: CSSProperties = {
	position: "absolute",
	opacity: 0,
	width: "100%",
	height: "100%",
	margin: 0,
};

export const Checkbox = forwardRef<View, CheckboxProps>(
	(
		{
			checked: checkedProp,
			defaultChecked = false,
			disabled = false,
			indeterminate = false,
			color = "neutral",
			variant = "outlined",
			size = "md",
			label,
			children,
			name,
			value,
			disableIcon = false,
			overlay = false,
			required = false,
			readOnly = false,
			autoFocus,
			checkedIcon,
			uncheckedIcon,
			indeterminateIcon,
			onChange,
			onFocus,
			onBlur,
			style,
			testID,
			className,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
			"aria-labelledby": ariaLabelledBy,
		},
		ref,
	) => {
		const inputRef = useRef<FocusableInput | null>(null);
		const pressableRef = useRef<View>(null);
		const [checked, setChecked] = useControlledState<boolean | undefined>(
			checkedProp,
			defaultChecked,
		);
		const { isFocused, isPressed, handleBlur, handleFocus, handlePressIn, handlePressOut } =
			useInteractiveState();

		useImperativeHandle(ref, () => pressableRef.current || ({} as View));

		const activeVariant = variant === "outlined" ? "solid" : variant;
		const inactiveVariant = variant;
		const activeColor = color === "neutral" ? "primary" : color;
		const inactiveColor = color;
		const isActive = Boolean(indeterminate || checked);

		const variantKey = `${isActive ? activeVariant : inactiveVariant}-${
			isActive ? activeColor : inactiveColor
		}` as keyof typeof theme.components.Checkbox.variants;

		const variantStyles =
			theme.components.Checkbox.variants[variantKey] ||
			theme.components.Checkbox.variants["solid-neutral"];

		const resolvedBackground = resolveColorToken(variantStyles.backgroundColor);
		const resolvedBorder =
			resolveColorToken(variantStyles.borderColor) ?? theme.colors.outlineVariant;
		const resolvedColor = resolveColorToken(variantStyles.color) ?? theme.colors.onSurface;
		const sizeTokens = sizeConfig[size];

		useEffect(() => {
			if (Platform.OS === "web" && inputRef.current) {
				inputRef.current.checked = Boolean(checked);
				if (typeof inputRef.current.indeterminate !== "undefined") {
					inputRef.current.indeterminate = indeterminate;
				}
			}
		}, [checked, indeterminate]);

		useEffect(() => {
			if (Platform.OS === "web" && inputRef.current && autoFocus) {
				inputRef.current.focus();
			}
		}, [autoFocus]);

		const emitChange = useCallback(
			(newChecked: boolean, nativeEvent?: CheckboxChangeEvent) => {
				setChecked(newChecked);

				if (!onChange) {
					return;
				}

				if (nativeEvent) {
					onChange(nativeEvent);
					return;
				}

				onChange(createMockNativeEvent(newChecked, value));
			},
			[onChange, setChecked, value],
		);

		const handlePress = useCallback(
			(event: GestureResponderEvent) => {
				if (disabled || readOnly) {
					return;
				}

				if (Platform.OS === "web") {
					inputRef.current?.click();
					return;
				}

				emitChange(!checked, event);
			},
			[checked, disabled, emitChange, readOnly],
		);

		const handleInputChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				if (disabled || readOnly) {
					event.preventDefault();
					return;
				}
				emitChange(event.target.checked, event);
			},
			[disabled, emitChange, readOnly],
		);

		const handleInputFocus = useCallback(
			(event: React.FocusEvent<HTMLInputElement>) => {
				handleFocus();
				onFocus?.(event);
			},
			[handleFocus, onFocus],
		);

		const handleInputBlur = useCallback(
			(event: React.FocusEvent<HTMLInputElement>) => {
				handleBlur();
				onBlur?.(event);
			},
			[handleBlur, onBlur],
		);

		const handlePressableFocus = useCallback(
			(event: NativeSyntheticEvent<TargetedEvent>) => {
				if (Platform.OS === "web") return;
				handleFocus();
				onFocus?.(event);
			},
			[handleFocus, onFocus],
		);

		const handlePressableBlur = useCallback(
			(event: NativeSyntheticEvent<TargetedEvent>) => {
				if (Platform.OS === "web") return;
				handleBlur();
				onBlur?.(event);
			},
			[handleBlur, onBlur],
		);

		const containerStyles = useMemo(() => {
			const flattened = StyleSheet.flatten(style as StyleProp<ViewStyle>);
			return [
				styles.container,
				{
					opacity: disabled ? 0.6 : 1,
					...(overlay ? StyleSheet.absoluteFillObject : {}),
				},
				flattened,
			];
		}, [disabled, overlay, style]);

		const focusRingStyle: ViewStyle | undefined = isFocused
			? {
					borderColor: theme.colors.primary,
					borderWidth: (variantStyles.borderWidth ?? 1) + 1,
				}
			: undefined;

		const pressStateStyle: ViewStyle | undefined = isPressed
			? {
					opacity: 0.9,
				}
			: undefined;

		const checkboxStyles = [
			styles.checkbox,
			{
				width: sizeTokens.box,
				height: sizeTokens.box,
				backgroundColor: isActive
					? (resolvedBackground ?? theme.colors.primary)
					: theme.colors.surface,
				borderColor: isActive ? (resolvedBorder ?? theme.colors.primary) : theme.colors.outline,
				borderWidth: variantStyles.borderWidth ?? 1,
			},
			focusRingStyle,
			pressStateStyle,
		];

		const renderIcon = () => {
			if (disableIcon) {
				return null;
			}

			if (indeterminate) {
				if (indeterminateIcon) {
					return indeterminateIcon;
				}
				return (
					<View
						style={[
							styles.indeterminate,
							{
								backgroundColor: resolvedColor,
								width: sizeTokens.icon,
							},
						]}
					/>
				);
			}

			if (checked) {
				if (checkedIcon) {
					return checkedIcon;
				}
				return (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<View
							style={[
								styles.checkMark,
								{
									borderRightColor: resolvedColor,
									borderBottomColor: resolvedColor,
								},
							]}
						/>
					</View>
				);
			}

			return uncheckedIcon ?? null;
		};

		const labelContent = label ?? children;

		const inputValue = useMemo(() => {
			if (value === undefined) return undefined;
			if (Array.isArray(value)) {
				return value.join(",");
			}
			return typeof value === "string" ? value : String(value);
		}, [value]);

		const webClassNameProps: { className?: string } = {};
		if (Platform.OS === "web" && className) {
			webClassNameProps.className = className;
		}

		return (
			<Pressable
				ref={pressableRef}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onFocus={handlePressableFocus}
				onBlur={handlePressableBlur}
				disabled={disabled}
				accessibilityRole="checkbox"
				accessibilityLabel={
					ariaLabel ?? (typeof labelContent === "string" ? labelContent : undefined)
				}
				accessibilityState={{
					disabled,
					checked: indeterminate ? "mixed" : Boolean(checked),
				}}
				accessibilityValue={value ? { text: String(value) } : undefined}
				accessibilityLabelledBy={ariaLabelledBy}
				testID={testID}
				style={({ pressed }) => [
					...containerStyles,
					pressed && !disabled ? { opacity: 0.9 } : undefined,
				]}
				{...webClassNameProps}
			>
				<Box style={checkboxStyles}>{renderIcon()}</Box>
				{Platform.OS === "web" ? (
					<input
						ref={inputRef}
						type="checkbox"
						name={name}
						value={inputValue}
						checked={Boolean(checked)}
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						required={required}
						readOnly={readOnly}
						disabled={disabled}
						aria-checked={indeterminate ? "mixed" : Boolean(checked)}
						aria-label={ariaLabel}
						aria-describedby={ariaDescribedBy}
						aria-labelledby={ariaLabelledBy}
						style={hiddenInputStyle}
					/>
				) : null}
				{labelContent ? (
					typeof labelContent === "string" ? (
						<Typography
							level="body-md"
							style={{
								fontSize: sizeTokens.fontSize,
								color: disabled ? theme.colors.onSurfaceVariant : theme.colors.onSurface,
								marginLeft: sizeTokens.gap,
							}}
						>
							{labelContent}
						</Typography>
					) : (
						<Box style={{ marginLeft: sizeTokens.gap }}>{labelContent}</Box>
					)
				) : null}
			</Pressable>
		);
	},
);

Checkbox.displayName = "Checkbox";
