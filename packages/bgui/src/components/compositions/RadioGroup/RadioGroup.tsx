import type React from "react";
import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { Platform, StyleSheet, type ViewStyle, type View as ViewType } from "react-native";
import { useControlledState } from "../../../hooks/useControlledState";
import { Box } from "../../primitives/Box";
import type {
	RadioGroupChangeEvent,
	RadioGroupContextValue,
	RadioGroupProps,
} from "./RadioGroup.types";

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = () => useContext(RadioGroupContext);

export const RadioGroup = forwardRef<ViewType, RadioGroupProps>(
	(
		{
			children,
			value: valueProp,
			defaultValue,
			name,
			disabled = false,
			color = "neutral",
			variant = "plain",
			size = "md",
			orientation = "vertical",
			required = false,
			readOnly = false,
			disableIcon = false,
			overlay = false,
			onChange,
			style,
			testID,
			className,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
		},
		ref,
	) => {
		const containerRef = useRef<ViewType>(null);
		const [currentValue, setCurrentValue] = useControlledState<string | number | undefined>(
			valueProp,
			defaultValue,
		);

		useEffect(() => {
			if (ref) {
				if (typeof ref === "function") {
					ref(containerRef.current);
				} else if (ref) {
					(ref as React.MutableRefObject<ViewType | null>).current = containerRef.current;
				}
			}
		}, [ref]);

		const groupName = useMemo(() => {
			if (name) return name;
			return `radio-group-${Math.random().toString(36).slice(2, 9)}`;
		}, [name]);

		const emitChange = useCallback(
			(nextValue: string | number | undefined, event?: RadioGroupChangeEvent) => {
				setCurrentValue(nextValue);
				if (!onChange) return;
				const changeEvent = event ?? {
					target: { value: nextValue, name: groupName },
				};
				onChange(changeEvent);
			},
			[groupName, onChange, setCurrentValue],
		);

		const contextValue = useMemo<RadioGroupContextValue>(
			() => ({
				value: currentValue,
				name: groupName,
				disabled,
				color,
				variant,
				size,
				required,
				readOnly,
				disableIcon,
				overlay,
				onSelect: emitChange,
			}),
			[
				color,
				currentValue,
				disableIcon,
				disabled,
				emitChange,
				groupName,
				overlay,
				readOnly,
				required,
				size,
				variant,
			],
		);

		const containerStyles = useMemo(() => {
			const base = StyleSheet.flatten(style);
			const flexDirection = orientation === "horizontal" ? "row" : "column";
			const alignItems = (
				orientation === "horizontal" ? "center" : "flex-start"
			) as ViewStyle["alignItems"];

			const dynamicStyle: ViewStyle = {
				flexDirection,
				alignItems,
				opacity: disabled ? 0.6 : 1,
			};

			return [dynamicStyle, base];
		}, [disabled, orientation, style]);

		const webClassNameProps: { className?: string } = {};
		if (Platform.OS === "web" && className) {
			webClassNameProps.className = className;
		}

		return (
			<RadioGroupContext.Provider value={contextValue}>
				<Box
					ref={containerRef}
					style={containerStyles}
					testID={testID}
					accessibilityRole="radiogroup"
					accessibilityLabel={ariaLabel}
					accessibilityState={{ disabled }}
					accessibilityLabelledBy={ariaLabelledBy}
					{...webClassNameProps}
				>
					{children}
				</Box>
			</RadioGroupContext.Provider>
		);
	},
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroupContext };
