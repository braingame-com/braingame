import { Tokens, Typography } from "@braingame/utils";
import { Children, cloneElement, type ReactElement, useState } from "react";
import { Platform, Pressable, Modal as RNModal, ScrollView, View } from "react-native";
import { Text } from "../../components/Text";
import {
	SELECT_DROPDOWN_MAX_HEIGHT,
	SELECT_DROPDOWN_Z_INDEX,
	SELECT_MODAL_HORIZONTAL_MARGIN,
	SELECT_MODAL_TOP,
} from "../../constants";
import { useTheme } from "../../theme";
import { validateProps, validators } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { View as BView } from "../View";
import { SelectItem } from "./SelectItem";
import type { SelectItemProps, SelectProps } from "./types";

/**
 * Select component for choosing from a list of options.
 * Supports single and multiple selection, error states, and different display variants.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Select value={selected} onValueChange={setSelected}>
 *   <Select.Item value="apple">Apple</Select.Item>
 *   <Select.Item value="banana">Banana</Select.Item>
 *   <Select.Item value="orange">Orange</Select.Item>
 * </Select>
 *
 * // Multiple selection
 * <Select value={selectedItems} onValueChange={setSelectedItems} multiple>
 *   <Select.Item value="1">Option 1</Select.Item>
 *   <Select.Item value="2">Option 2</Select.Item>
 * </Select>
 *
 * // With error state
 * <Select
 *   value={value}
 *   onValueChange={setValue}
 *   error
 *   errorMessage="Please select an option"
 * >
 *   <Select.Item value="1">Option 1</Select.Item>
 * </Select>
 * ```
 *
 * @component
 */
const SelectComponent = ({
	children,
	value,
	onValueChange,
	placeholder = "Select...",
	searchable: _searchable,
	multiple,
	disabled,
	error,
	errorMessage,
	helperText,
	variant = "dropdown",
	"aria-label": ariaLabel,
	"aria-invalid": ariaInvalid = error,
}: SelectProps) => {
	// Validate props
	validateProps(
		{ onValueChange, variant },
		{
			onValueChange: validators.required,
			variant: validators.oneOf(["dropdown", "modal"] as const),
		},
		"Select",
	);

	const [open, setOpen] = useState(false);
	const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

	const toggleOpen = () => {
		if (!disabled) {
			setOpen((o) => !o);
		}
	};

	const handleSelect = (itemValue: string) => {
		if (multiple) {
			const exists = selectedValues.includes(itemValue);
			const values = exists
				? selectedValues.filter((v) => v !== itemValue)
				: [...selectedValues, itemValue];
			onValueChange(values);
		} else {
			onValueChange(itemValue);
			setOpen(false);
		}
	};

	const renderItems = () => (
		<ScrollView accessibilityRole="list" style={{ maxHeight: SELECT_DROPDOWN_MAX_HEIGHT }}>
			{Children.map(children, (child) => {
				if (!child) return null;
				const element = child as ReactElement<SelectItemProps>;
				const isSelected = selectedValues.includes(element.props.value);
				return cloneElement(element, {
					selected: isSelected,
					onSelect: handleSelect,
				});
			})}
		</ScrollView>
	);

	const { colors } = useTheme();
	const borderColorDefault = colors.outlineVariant;
	const background = colors.background;
	const textColor = disabled ? colors.onSurfaceVariant : colors.onSurface;
	const errorColor = colors.error;
	const borderColor = error ? errorColor : borderColorDefault;

	const label = selectedValues.length > 0 ? selectedValues.join(", ") : placeholder;

	return (
		<BView style={{ width: "100%" }}>
			<Pressable
				accessibilityRole="button"
				accessibilityLabel={ariaLabel}
				accessibilityState={{ disabled, expanded: open }}
				{...(Platform.OS === "web" ? { "aria-invalid": ariaInvalid } : {})}
				onPress={toggleOpen}
				style={{
					padding: Tokens.s,
					borderWidth: 1,
					borderColor,
					backgroundColor: background,
				}}
			>
				<Text style={{ color: textColor }}>{label}</Text>
			</Pressable>
			{helperText && !error && (
				<Text style={{ fontSize: Typography.fontSize.xs, color: textColor, marginTop: 4 }}>
					{helperText}
				</Text>
			)}
			{error && errorMessage && (
				<Text
					style={{ fontSize: Typography.fontSize.xs, color: errorColor, marginTop: 4 }}
					accessibilityRole="alert"
				>
					{errorMessage}
				</Text>
			)}
			{variant === "dropdown" && open && (
				<View
					style={{
						position: "absolute",
						top: Tokens.l + Tokens.s,
						left: 0,
						right: 0,
						zIndex: SELECT_DROPDOWN_Z_INDEX,
						borderWidth: 1,
						borderColor,
						backgroundColor: background,
					}}
				>
					{renderItems()}
				</View>
			)}
			{variant === "modal" && (
				<RNModal
					visible={open}
					transparent
					animationType="fade"
					onRequestClose={() => setOpen(false)}
				>
					<Pressable
						style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
						onPress={() => setOpen(false)}
					/>
					<View
						style={{
							position: "absolute",
							top: SELECT_MODAL_TOP,
							left: SELECT_MODAL_HORIZONTAL_MARGIN,
							right: SELECT_MODAL_HORIZONTAL_MARGIN,
							borderWidth: 1,
							borderColor,
							backgroundColor: background,
							padding: Tokens.m,
						}}
					>
						{renderItems()}
					</View>
				</RNModal>
			)}
		</BView>
	);
};

// Wrap with error boundary
export const Select = Object.assign(withErrorBoundary(SelectComponent), {
	Item: SelectItem,
});
