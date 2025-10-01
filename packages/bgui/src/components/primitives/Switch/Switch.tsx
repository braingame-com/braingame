import {
	forwardRef,
	type KeyboardEvent,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { Animated, Platform, Pressable, StyleSheet, type View } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { SwitchProps } from "./Switch.types";

const resolveToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig = {
	sm: {
		trackWidth: 32,
		trackHeight: 18,
		thumbSize: 14,
		thumbOffset: 2,
		decoratorSpacing: theme.spacing.xs,
		labelVariant: "body-sm" as const,
	},
	md: {
		trackWidth: 40,
		trackHeight: 22,
		thumbSize: 18,
		thumbOffset: 2,
		decoratorSpacing: theme.spacing.sm,
		labelVariant: "body-md" as const,
	},
	lg: {
		trackWidth: 48,
		trackHeight: 26,
		thumbSize: 22,
		thumbOffset: 3,
		decoratorSpacing: theme.spacing.md,
		labelVariant: "body-lg" as const,
	},
} as const;

export const Switch = forwardRef<View, SwitchProps>(
	(
		{
			checked,
			defaultChecked = false,
			disabled = false,
			color = "neutral",
			variant = "solid",
			size = "md",
			startDecorator,
			endDecorator,
			trackChild,
			name,
			value,
			required = false,
			autoFocus = false,
			readOnly = false,
			onChange,
			onValueChange,
			style,
			testID,
			children,
			className: _className,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
			"aria-labelledby": ariaLabelledBy,
		},
		ref,
	) => {
		const pressableRef = useRef<View>(null);
		const [internalChecked, setInternalChecked] = useState(defaultChecked);
		const animatedValue = useRef(new Animated.Value(defaultChecked ? 1 : 0)).current;

		const isControlled = checked !== undefined;
		const isChecked = isControlled ? Boolean(checked) : internalChecked;

		useImperativeHandle(ref, () => pressableRef.current || ({} as View));

		useEffect(() => {
			Animated.timing(animatedValue, {
				toValue: isChecked ? 1 : 0,
				duration: 150,
				useNativeDriver: false,
			}).start();
		}, [animatedValue, isChecked]);

		useEffect(() => {
			if (autoFocus && Platform.OS === "web") {
				const focusTarget = pressableRef.current as (View & { focus?: () => void }) | null;
				focusTarget?.focus?.();
			}
		}, [autoFocus]);

		const variantKey = `${variant}-${color}` as const;
		const variantStyles =
			theme.components.Switch.variants[variantKey] ??
			theme.components.Switch.variants["solid-neutral"];

		const activeTrackColor = resolveToken(variantStyles.backgroundColor) ?? theme.colors.primary;
		const thumbColor = resolveToken(variantStyles.color) ?? theme.colors.onPrimary;
		const inactiveTrackColor = theme.colors.outlineVariant;

		const currentSize = sizeConfig[size];
		const trackRange = useMemo(
			() => [
				currentSize.thumbOffset,
				currentSize.trackWidth - currentSize.thumbSize - currentSize.thumbOffset,
			],
			[currentSize],
		);

		const thumbTranslateX = animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: trackRange,
		});

		const handleToggle = () => {
			if (disabled || readOnly) {
				return;
			}

			const nextChecked = !isChecked;

			if (!isControlled) {
				setInternalChecked(nextChecked);
			}

			const event = {
				target: {
					checked: nextChecked,
					value,
					name,
				},
				currentTarget: {
					checked: nextChecked,
					value,
					name,
				},
				preventDefault: () => {},
				stopPropagation: () => {},
			};

			onValueChange?.(nextChecked);
			onChange?.(event);
		};

		const handleKeyDown = (event: KeyboardEvent<View>) => {
			if (Platform.OS !== "web") return;
			if (event.key === " " || event.key === "Enter") {
				event.preventDefault();
				handleToggle();
			}
		};

		const labelSpacing = currentSize.decoratorSpacing;

		const hiddenInput =
			Platform.OS === "web" && name ? (
				<input
					type="checkbox"
					name={name}
					value={typeof value === "string" ? value : value !== undefined ? String(value) : "on"}
					checked={isChecked}
					required={required}
					readOnly={readOnly}
					disabled={disabled}
					onChange={() => {}}
					style={{ display: "none" }}
				/>
			) : null;

		return (
			<Pressable
				ref={pressableRef}
				accessibilityRole="switch"
				accessibilityLabel={ariaLabel}
				accessibilityHint={ariaDescribedBy}
				accessibilityLabelledBy={ariaLabelledBy}
				accessibilityState={{ disabled, checked: isChecked }}
				disabled={disabled}
				testID={testID}
				style={({ pressed }) => [
					styles.pressable,
					{ opacity: disabled ? 0.6 : 1 },
					style,
					pressed && !disabled ? styles.pressed : null,
				]}
				onPress={handleToggle}
				onKeyDown={handleKeyDown}
			>
				<Box style={{ flexDirection: "row", alignItems: "center" }}>
					{startDecorator ? (
						<Box style={{ marginRight: labelSpacing }}>{startDecorator}</Box>
					) : null}
					{children ? (
						<Typography level={currentSize.labelVariant} style={{ marginRight: labelSpacing }}>
							{children}
						</Typography>
					) : null}
					<Box
						style={{
							marginRight: endDecorator ? labelSpacing : 0,
						}}
					>
						<Box style={styles.trackWrapper}>
							<Animated.View
								style={[
									styles.track,
									{
										width: currentSize.trackWidth,
										height: currentSize.trackHeight,
										borderRadius: currentSize.trackHeight / 2,
										backgroundColor: isChecked ? activeTrackColor : inactiveTrackColor,
									},
								]}
							>
								{trackChild ? <Box style={styles.trackChild}>{trackChild}</Box> : null}
							</Animated.View>
							<Animated.View
								style={[
									styles.thumb,
									{
										width: currentSize.thumbSize,
										height: currentSize.thumbSize,
										borderRadius: currentSize.thumbSize / 2,
										backgroundColor: thumbColor,
										transform: [{ translateX: thumbTranslateX }],
									},
								]}
							/>
						</Box>
					</Box>
					{endDecorator ? <Box style={{ marginLeft: labelSpacing }}>{endDecorator}</Box> : null}
					{hiddenInput}
				</Box>
			</Pressable>
		);
	},
);

Switch.displayName = "Switch";

const styles = StyleSheet.create({
	pressable: {
		flexDirection: "row",
		alignItems: "center",
	},
	pressed: {
		opacity: 0.8,
	},
	trackWrapper: {
		justifyContent: "center",
	},
	track: {
		justifyContent: "center",
	},
	trackChild: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
	thumb: {
		position: "absolute",
		top: 0,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
});
