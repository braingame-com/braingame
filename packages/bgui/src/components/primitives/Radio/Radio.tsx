import type React from "react";
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
import { useRadioGroupContext } from "../../compositions/RadioGroup";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { RadioChangeEvent, RadioProps } from "./Radio.types";

const resolveColorToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig = {
	sm: {
		outer: 18,
		inner: 8,
		fontSize: theme.fontSizes.sm,
		gap: theme.spacing.xs,
	},
	md: {
		outer: 20,
		inner: 10,
		fontSize: theme.fontSizes.md,
		gap: theme.spacing.sm,
	},
	lg: {
		outer: 24,
		inner: 12,
		fontSize: theme.fontSizes.lg,
		gap: theme.spacing.md,
	},
} as const;

const createMockChangeEvent = (value: string | number | undefined): RadioChangeEvent => {
	return {
		target: {
			value,
		},
	};
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	radio: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 999,
		borderWidth: 1,
	},
	innerDot: {
		borderRadius: 999,
	},
});

export const Radio = forwardRef<View, RadioProps>(
	(
		{
			value,
			checked: checkedProp,
			defaultChecked = false,
			disabled: disabledProp = false,
			color: colorProp = "neutral",
			variant: variantProp = "outlined",
			size: sizeProp = "md",
			label,
			children,
			name: nameProp,
			disableIcon: disableIconProp = false,
			overlay: overlayProp = false,
			required: requiredProp = false,
			readOnly: readOnlyProp = false,
			autoFocus,
			checkedIcon,
			uncheckedIcon,
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
		const context = useRadioGroupContext();
		const inputRef = useRef<HTMLInputElement | null>(null);
		const pressableRef = useRef<View>(null);

		const isInGroup = Boolean(context);
		const disabled = disabledProp || context?.disabled || false;
		const color = context?.color ?? colorProp;
		const variant = context?.variant ?? variantProp;
		const size = context?.size ?? sizeProp;
		const disableIcon = context?.disableIcon ?? disableIconProp;
		const overlay = context?.overlay ?? overlayProp;
		const required = context?.required ?? requiredProp;
		const readOnly = context?.readOnly ?? readOnlyProp;
		const radioName = context?.name ?? nameProp;

		const { isFocused, isPressed, handleBlur, handleFocus, handlePressIn, handlePressOut } =
			useInteractiveState();

		const [checkedState, setCheckedState] = useControlledState<boolean | undefined>(
			isInGroup ? context?.value === value : checkedProp,
			defaultChecked,
		);

		const checked = isInGroup ? context?.value === value : Boolean(checkedState);

		useImperativeHandle(ref, () => pressableRef.current || ({} as View));

		useEffect(() => {
			if (Platform.OS === "web" && inputRef.current) {
				inputRef.current.checked = Boolean(checked);
				if (autoFocus) {
					inputRef.current.focus();
				}
			}
		}, [autoFocus, checked]);

		const variantKey = `${variant}-${color}` as keyof typeof theme.components.Radio.variants;
		const variantStyles =
			theme.components.Radio.variants[variantKey] ||
			theme.components.Radio.variants["outlined-neutral"];

		const resolvedBackground = resolveColorToken(variantStyles.backgroundColor);
		const resolvedBorder = resolveColorToken(variantStyles.borderColor) ?? theme.colors.outline;
		const resolvedColor = resolveColorToken(variantStyles.color) ?? theme.colors.primary;
		const sizeTokens = sizeConfig[size];

		const emitChange = useCallback(
			(nativeEvent?: RadioChangeEvent) => {
				if (isInGroup) {
					context?.onSelect(value, nativeEvent);
					return;
				}

				setCheckedState(true);
				if (!onChange) return;

				onChange(nativeEvent ?? createMockChangeEvent(value));
			},
			[context, isInGroup, onChange, setCheckedState, value],
		);

		const handlePress = useCallback(
			(event: GestureResponderEvent) => {
				if (disabled || readOnly || checked) {
					return;
				}

				if (Platform.OS === "web") {
					inputRef.current?.click();
					return;
				}

				emitChange(event);
			},
			[checked, disabled, emitChange, readOnly],
		);

		const handleInputChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				if (disabled || readOnly) {
					event.preventDefault();
					return;
				}
				if (!event.target.checked) {
					return;
				}
				emitChange(event);
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

		const radioStyles = [
			styles.radio,
			{
				width: sizeTokens.outer,
				height: sizeTokens.outer,
				borderColor: checked ? (resolvedBorder ?? resolvedColor) : theme.colors.outline,
				borderWidth: variantStyles.borderWidth ?? 1,
				backgroundColor: checked
					? (resolvedBackground ?? theme.colors.surface)
					: theme.colors.surface,
			},
			focusRingStyle,
			pressStateStyle,
		];

		const renderIcon = () => {
			if (disableIcon) {
				return null;
			}

			if (checked) {
				if (checkedIcon) {
					return checkedIcon;
				}
				return (
					<View
						style={[
							styles.innerDot,
							{
								width: sizeTokens.inner,
								height: sizeTokens.inner,
								backgroundColor: resolvedColor,
							},
						]}
					/>
				);
			}

			return uncheckedIcon ?? null;
		};

		const labelContent = label ?? children;

		const webClassNameProps: { className?: string } = {};
		if (Platform.OS === "web" && className) {
			webClassNameProps.className = className;
		}

		const inputValue = useMemo(() => {
			if (value === undefined) return undefined;
			return typeof value === "string" ? value : String(value);
		}, [value]);

		return (
			<Pressable
				ref={pressableRef}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onFocus={handlePressableFocus}
				onBlur={handlePressableBlur}
				disabled={disabled}
				accessibilityRole="radio"
				accessibilityLabel={
					ariaLabel ?? (typeof labelContent === "string" ? labelContent : undefined)
				}
				accessibilityState={{
					disabled,
					selected: checked,
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
				<Box style={radioStyles}>{renderIcon()}</Box>
				{Platform.OS === "web" ? (
					<input
						ref={inputRef}
						type="radio"
						name={radioName}
						value={inputValue}
						checked={Boolean(checked)}
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						required={required}
						readOnly={readOnly}
						disabled={disabled}
						aria-label={ariaLabel}
						aria-describedby={ariaDescribedBy}
						aria-labelledby={ariaLabelledBy}
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

Radio.displayName = "Radio";
