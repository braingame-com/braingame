import { Tokens, useThemeColor } from "@braingame/utils";
import React, {
	Children,
	type ReactElement,
	cloneElement,
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import type { KeyboardEvent } from "react";
import type { NativeSyntheticEvent } from "react-native";
import { Pressable, View } from "react-native";
import type { RadioGroupItemProps, RadioGroupProps } from "./types";

interface ContextValue {
	value: string | undefined;
	disabled?: boolean;
	variant: "standard" | "card";
	onSelect: (value: string) => void;
	register: (index: number, ref: React.RefObject<View>) => void;
	focus: (index: number) => void;
	count: number;
}

const RadioGroupContext = createContext<ContextValue | null>(null);

const RadioGroupRoot = ({
	children,
	value: controlledValue,
	onValueChange,
	defaultValue,
	disabled,
	variant = "standard",
	"aria-label": ariaLabel,
	style,
}: RadioGroupProps) => {
	const [uncontrolled, setUncontrolled] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolled;

	const itemRefs = useRef<Array<React.RefObject<View>>>([]);

	const register = useCallback((index: number, ref: React.RefObject<View>) => {
		itemRefs.current[index] = ref;
	}, []);

	const focus = useCallback((index: number) => {
		const ref = itemRefs.current[index];
		if (ref?.current && typeof ref.current.focus === "function") {
			ref.current.focus();
		}
	}, []);

	const onSelect = useCallback(
		(val: string) => {
			if (!isControlled) {
				setUncontrolled(val);
			}
			if (onValueChange) {
				onValueChange(val);
			}
		},
		[isControlled, onValueChange],
	);

	const childrenArray = Children.toArray(children);
	// ensure we have ref for each child
	itemRefs.current = childrenArray.map((_, i) => itemRefs.current[i] || React.createRef());

	const context: ContextValue = {
		value,
		disabled,
		variant,
		onSelect,
		register,
		focus,
		count: childrenArray.length,
	};

	const wrapped = childrenArray.map((child, index) => {
		if (isValidElement(child)) {
			// Type assertion needed because index prop is passed internally
			return cloneElement(
				child as ReactElement<RadioGroupItemProps>,
				{ index } as RadioGroupItemProps & { index: number },
			);
		}
		return child;
	});

	return (
		<View accessibilityRole="radiogroup" accessibilityLabel={ariaLabel} style={style}>
			<RadioGroupContext.Provider value={context}>{wrapped}</RadioGroupContext.Provider>
		</View>
	);
};

const RadioGroupItem = ({
	value,
	children,
	disabled,
	style,
	index,
}: RadioGroupItemProps & { index?: number }) => {
	const ctx = useContext(RadioGroupContext);
	const ref = useRef<View>(null);

	const isSelected = ctx?.value === value;
	const itemDisabled = disabled || ctx?.disabled;

	useEffect(() => {
		if (ctx && typeof index === "number") {
			ctx.register(index, ref);
		}
	}, [ctx, index]);

	const handlePress = useCallback(() => {
		if (!itemDisabled && ctx) {
			ctx.onSelect(value);
		}
	}, [itemDisabled, ctx, value]);

	const handleKeyDown = (e: NativeSyntheticEvent<{ key: string }>) => {
		if (!ctx || typeof index !== "number") return;
		const key = e.nativeEvent.key;
		if (key === " " || key === "Enter") {
			e.preventDefault();
			handlePress();
		} else if (key === "ArrowRight" || key === "ArrowDown") {
			e.preventDefault();
			ctx.focus((index + 1) % ctx.count);
		} else if (key === "ArrowLeft" || key === "ArrowUp") {
			e.preventDefault();
			ctx.focus((index - 1 + ctx.count) % ctx.count);
		}
	};

	const borderColor = useThemeColor("border");
	const background = ctx?.variant === "card" ? useThemeColor("card") : "transparent";

	const selectedStyle = ctx?.variant === "card" && isSelected ? { borderColor: borderColor } : {};

	return (
		<Pressable
			ref={ref}
			accessibilityRole="radio"
			accessibilityState={{ disabled: itemDisabled, selected: isSelected }}
			onPress={handlePress}
			// onKeyDown={handleKeyDown} // Not supported in React Native
			focusable
			tabIndex={isSelected ? 0 : -1}
			disabled={itemDisabled}
			style={[
				{
					padding: Tokens.m,
					borderWidth: ctx?.variant === "card" ? 1 : 0,
					borderRadius: Tokens.s,
					backgroundColor: background,
					marginBottom: Tokens.xs,
					alignItems: "flex-start",
				},
				selectedStyle,
				style,
			]}
		>
			{typeof children === "string" ? <>{children}</> : children}
		</Pressable>
	);
};

export const RadioGroup = Object.assign(RadioGroupRoot, { Item: RadioGroupItem });
export type { RadioGroupProps, RadioGroupItemProps } from "./types";
