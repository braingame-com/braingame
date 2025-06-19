import { useThemeColor } from "@braingame/utils";
import type React from "react";
import {
	Children,
	cloneElement,
	createContext,
	isValidElement,
	type ReactElement,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import type { NativeSyntheticEvent } from "react-native";
import { Pressable, View } from "react-native";
import { useControlledState, useFocusManagement } from "../../hooks";
import { getItemStyles } from "./styles";
import type { RadioGroupItemProps, RadioGroupProps } from "./types";

interface ContextValue {
	value: string | undefined;
	disabled?: boolean;
	variant: "standard" | "card";
	onSelect: (value: string) => void;
	register: (index: number, ref: React.RefObject<View | null>) => void;
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
	const [value, setValue] = useControlledState(controlledValue, defaultValue, onValueChange);

	const childrenArray = Children.toArray(children);
	const { register, focusItem } = useFocusManagement(childrenArray.length);

	const context: ContextValue = {
		value,
		disabled,
		variant,
		onSelect: setValue,
		register,
		focus: focusItem,
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

	const _handleKeyDown = (e: NativeSyntheticEvent<{ key: string }>) => {
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
	const cardThemeColor = useThemeColor("card");
	const background = ctx?.variant === "card" ? cardThemeColor : "transparent";
	const itemStyles = ctx ? getItemStyles(ctx.variant, background, borderColor, isSelected) : [];

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
			style={[...itemStyles, style]}
		>
			{typeof children === "string" ? children : children}
		</Pressable>
	);
};

export const RadioGroup = Object.assign(RadioGroupRoot, { Item: RadioGroupItem });
export type { RadioGroupItemProps, RadioGroupProps } from "./types";
