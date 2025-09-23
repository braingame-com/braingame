"use client";

// Re-export types
// Legacy type exports for backward compatibility
export type {
	AlertProps,
	AvatarProps,
	BadgeProps,
	BoxProps,
	BoxProps as ViewProps,
	ButtonProps,
	CardProps,
	CheckboxProps,
	ChipProps,
	CircularProgressProps,
	ContainerProps,
	DividerProps,
	GridProps,
	IconButtonProps,
	InputProps,
	InputProps as TextInputProps,
	LinearProgressProps,
	LinkProps,
	ListItemProps,
	ListProps,
	ModalProps,
	RadioGroupProps,
	RadioProps,
	SelectProps,
	SkeletonProps,
	StackProps,
	SwitchProps,
	TabListProps,
	TabPanelProps,
	TabProps,
	TabsProps,
	TextareaProps,
	TooltipProps,
	TypographyProps,
	TypographyProps as TextProps,
} from "@braingame/bgui";
// Re-export select components from @braingame/bgui for use in documentation
export {
	Box,
	Box as View,
	Button,
	Container,
	Link,
	Stack,
	Typography,
	Typography as Text,
	Footer,
	Header,
} from "@braingame/bgui";

// Import for Icon component
import type { ChangeEvent } from "react";
import React from "react";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import {
	Checkbox as BGUICheckbox,
	Input as BGUIInput,
	Option as BGUIOption,
	Select as BGUISelect,
	Switch as BGUISwitch,
	Badge as BGUIBadge,
	Typography as BGUITypography,
} from "@braingame/bgui";
import type {
	CheckboxProps as BGUICheckboxProps,
	InputProps as BGUIInputProps,
	BadgeProps as BGUIBadgeProps,
	SelectProps as BGUISelectProps,
	SwitchProps as BGUISwitchProps,
} from "@braingame/bgui";
import { MaterialIcon } from "../MaterialIcon";

type CheckboxDemoProps = BGUICheckboxProps & {
	onValueChange?: (checked: boolean) => void;
};

export const Checkbox = ({ onValueChange, onChange, ...props }: CheckboxDemoProps) => {
	const handleChange: BGUICheckboxProps["onChange"] = (event) => {
		onChange?.(event);
		if (!onValueChange) {
			return;
		}
		if (typeof event === "object" && event !== null && "target" in event) {
			const target = (event as ChangeEvent<HTMLInputElement>).target as HTMLInputElement | undefined;
			if (target && typeof target === "object" && "checked" in target) {
				onValueChange(Boolean((target as HTMLInputElement).checked));
			}
		}
	};

	return <BGUICheckbox {...props} onChange={handleChange} />;
};

type SelectDemoProps = BGUISelectProps & {
	onValueChange?: (value: string | number | string[] | number[] | null) => void;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectDemoProps>(
	({ onValueChange, onChange, ...props }, ref) => {
		const handleChange: BGUISelectProps["onChange"] | undefined = onValueChange
			? (event, value) => {
				onChange?.(event, value);
				onValueChange(value);
			}
			: onChange;

		return <BGUISelect ref={ref} {...props} onChange={handleChange} />;
	},
);
Select.displayName = "Select";

type SwitchDemoProps = BGUISwitchProps & {
	onValueChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchDemoProps>(
	({ onValueChange, onChange, ...props }, ref) => {
		const handleChange: BGUISwitchProps["onChange"] | undefined = onValueChange
			? (event) => {
				onChange?.(event);
				if (
					typeof event === "object" &&
					event !== null &&
					"target" in event &&
					typeof (event as React.ChangeEvent<HTMLInputElement>).target === "object"
				) {
					const target = (event as React.ChangeEvent<HTMLInputElement>).target as HTMLInputElement | undefined;
					if (target && typeof target.checked === "boolean") {
						onValueChange(target.checked);
					}
				}
			}
			: onChange;

	return <BGUISwitch ref={ref} {...props} onChange={handleChange} />;
	},
);
Switch.displayName = "Switch";

type InputDemoProps = BGUIInputProps & {
	onValueChange?: (value: string) => void;
	leftIcon?: string;
	rightIcon?: string;
};

export const Input = React.forwardRef<any, InputDemoProps>(
	({ onValueChange, onChange, leftIcon, rightIcon, startDecorator, endDecorator, ...props }, ref) => {
		const handleChange: BGUIInputProps["onChange"] | undefined = onValueChange
			? (event) => {
				onChange?.(event);
				if (
					typeof event === "object" &&
					event !== null &&
					"nativeEvent" in event &&
					"text" in (event as NativeSyntheticEvent<TextInputChangeEventData>).nativeEvent
				) {
					onValueChange(
						(event as NativeSyntheticEvent<TextInputChangeEventData>).nativeEvent.text ?? "",
					);
				}
			}
			: onChange;

		const leading =
			startDecorator ?? (leftIcon ? <MaterialIcon name={leftIcon} size="sm" /> : undefined);
		const trailing =
			endDecorator ?? (rightIcon ? <MaterialIcon name={rightIcon} size="sm" /> : undefined);

		return (
			<BGUIInput
				ref={ref}
				{...props}
				onChange={handleChange}
				startDecorator={leading}
				endDecorator={trailing}
			/>
		);
	},
);
Input.displayName = "Input";

export const TextInput = Input;

type BadgeDemoProps = Omit<BGUIBadgeProps, "variant" | "size" | "children"> & {
	text?: React.ReactNode;
	variant?: BGUIBadgeProps["variant"] | "status";
	size?: BGUIBadgeProps["size"] | "small" | "large";
	children?: React.ReactNode;
};

export const Badge = ({ text, children, variant, size, ...rest }: BadgeDemoProps) => {
	const normalizedVariant: BGUIBadgeProps["variant"] | undefined =
		variant === "status" ? "soft" : variant;
	const normalizedSize: BGUIBadgeProps["size"] | undefined =
		size === "small" ? "sm" : size === "large" ? "lg" : size;
	const content = text ?? children;

	return (
		<BGUIBadge variant={normalizedVariant} size={normalizedSize} {...rest}>
			{content}
		</BGUIBadge>
	);
};

// Icon component for backward compatibility - uses Typography with material icon font
export const Icon = ({
	name,
	size = "md",
	color,
	style,
	...props
}: {
	name: string;
	size?: "sm" | "md" | "lg";
	color?: string;
	style?: any;
	[key: string]: any;
}) => {
	const sizeMap = { sm: 16, md: 24, lg: 32 };
	return (
		<BGUITypography
			component="span"
			style={{
				fontFamily: "Material Icons",
				fontSize: sizeMap[size],
				color,
				...style,
			}}
			{...props}
		>
			{name}
		</BGUITypography>
	);
};

// SelectItem for backward compatibility
export const SelectItem = BGUIOption;
