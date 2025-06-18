import { Tokens } from "@braingame/utils/constants/Tokens";
import { useThemeColor } from "@braingame/utils/hooks/useThemeColor";
import { Children, type ReactElement, cloneElement, useState } from "react";
import { Pressable, Modal as RNModal, ScrollView, View } from "react-native";
import { Text } from "../../../Text";
import { View as BView } from "../../../View";
import { SelectItem } from "./SelectItem";
import type { SelectItemProps, SelectProps } from "./types";

export const Select = ({
	children,
	value,
	onValueChange,
	placeholder = "Select...",
	searchable,
	multiple,
	disabled,
	variant = "dropdown",
	"aria-label": ariaLabel,
}: SelectProps) => {
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
		<ScrollView accessibilityRole="list" style={{ maxHeight: 200 }}>
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

	const borderColor = useThemeColor("border");
	const background = useThemeColor("background");
	const textColor = useThemeColor(disabled ? "textSecondary" : "text");

	const label = selectedValues.length > 0 ? selectedValues.join(", ") : placeholder;

	return (
		<BView style={{ width: "100%" }}>
			<Pressable
				accessibilityRole="button"
				accessibilityLabel={ariaLabel}
				accessibilityState={{ disabled, expanded: open }}
				onPress={toggleOpen}
				onKeyDown={(e) => {
					const key = "key" in e.nativeEvent ? e.nativeEvent.key : undefined;
					if (key === "Enter" || key === " ") {
						e.preventDefault();
						toggleOpen();
					}
				}}
				style={{
					padding: Tokens.s,
					borderWidth: 1,
					borderColor,
					backgroundColor: background,
				}}
			>
				<Text style={{ color: textColor }}>{label}</Text>
			</Pressable>
			{variant === "dropdown" && open && (
				<View
					style={{
						position: "absolute",
						top: Tokens.l + Tokens.s,
						left: 0,
						right: 0,
						zIndex: 1000,
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
							top: "30%",
							left: "10%",
							right: "10%",
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

Select.Item = SelectItem;
