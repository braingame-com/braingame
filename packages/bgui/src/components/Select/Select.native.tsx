import { createBox, createText, useTheme } from "@shopify/restyle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import type { Theme } from "../../theme/theme";
import type { SelectProps } from "./SelectProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of Select component
 *
 * Uses Modal for dropdown since React Native doesn't have a native select.
 * Supports all options, value management, keyboard navigation, and accessibility.
 */

export type SelectValueType = string | number | string[] | number[] | null;
export type OptionValueType = string | number;

interface OptionData {
	value: OptionValueType;
	label: string;
	disabled?: boolean;
}

interface OptionPropsData {
	selected: boolean;
	highlighted: boolean;
	onPress: () => void;
}

interface SelectContextType {
	value: SelectValueType;
	onChange: (value: SelectValueType) => void;
	multiple?: boolean;
	disabled?: boolean;
	highlightedIndex: number;
	setHighlightedIndex: (index: number) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	getOptionProps: (index: number, value: OptionValueType) => OptionPropsData;
	options: Array<OptionData>;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

const ChevronDownIcon = () => (
	<View style={{ transform: [{ rotate: "90deg" }], opacity: 0.6 }}>
		<ThemedText variant="body1">›</ThemedText>
	</View>
);

export const Select = React.forwardRef<View, SelectProps>(
	(
		{
			value: valueProp,
			defaultValue,
			onChange,
			children,
			disabled = false,
			error = false,
			color = "neutral",
			variant = "outlined",
			size = "md",
			placeholder = "Select an option",
			multiple = false,
			listboxOpen: listboxOpenProp,
			defaultListboxOpen = false,
			onListboxOpenChange,
			onClose,
			startDecorator,
			endDecorator,
			indicator,
			fullWidth = false,
			renderValue,
			style,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const theme = useTheme<Theme>();
		const fadeAnim = useRef(new Animated.Value(0)).current;

		// State management
		const [internalValue, setInternalValue] = useState<SelectValueType>(
			valueProp !== undefined ? valueProp : defaultValue || null,
		);
		const [internalOpen, setInternalOpen] = useState(defaultListboxOpen);
		const [highlightedIndex, setHighlightedIndex] = useState(-1);
		const [options, setOptions] = useState<Array<OptionData>>([]);

		// Resolve controlled/uncontrolled state
		const value = valueProp !== undefined ? valueProp : internalValue;
		const open = listboxOpenProp !== undefined ? listboxOpenProp : internalOpen;

		// Color override for error state
		const resolvedColor = error ? "danger" : color;

		// Size configurations
		const sizeConfig = {
			sm: {
				minHeight: 32,
				paddingHorizontal: "sm" as const,
				paddingVertical: "xs" as const,
				textVariant: "body2" as const,
			},
			md: {
				minHeight: 40,
				paddingHorizontal: "md" as const,
				paddingVertical: "sm" as const,
				textVariant: "body1" as const,
			},
			lg: {
				minHeight: 48,
				paddingHorizontal: "lg" as const,
				paddingVertical: "md" as const,
				textVariant: "body1" as const,
			},
		}[size];

		// Handle value changes
		const handleValueChange = useCallback(
			(newValue: SelectValueType) => {
				if (valueProp === undefined) {
					setInternalValue(newValue);
				}
				onChange?.(null, newValue);
			},
			[onChange, valueProp],
		);

		// Handle open state changes
		const handleOpenChange = useCallback(
			(newOpen: boolean) => {
				if (listboxOpenProp === undefined) {
					setInternalOpen(newOpen);
				}
				onListboxOpenChange?.(newOpen);
				if (!newOpen) {
					onClose?.();
					setHighlightedIndex(-1);
				}

				// Animate modal
				if (newOpen) {
					Animated.timing(fadeAnim, {
						toValue: 1,
						duration: 200,
						useNativeDriver: true,
					}).start();
				} else {
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 150,
						useNativeDriver: true,
					}).start();
				}
			},
			[listboxOpenProp, onListboxOpenChange, onClose, fadeAnim],
		);

		// Collect options from children
		useEffect(() => {
			const childOptions: Array<OptionData> = [];

			React.Children.forEach(children, (child) => {
				if (React.isValidElement<OptionProps>(child) && child.type === Option) {
					const childProps = child.props as OptionProps;
					childOptions.push({
						value: childProps.value,
						label:
							childProps.label ||
							(typeof childProps.children === "string"
								? childProps.children
								: String(childProps.value)),
						disabled: childProps.disabled,
					});
				}
			});

			setOptions(childOptions);
		}, [children]);

		// Get option props for context
		const getOptionProps = useCallback(
			(index: number, optionValue: OptionValueType): OptionPropsData => ({
				selected: multiple
					? Array.isArray(value) && value.some((v) => v === optionValue)
					: value === optionValue,
				highlighted: highlightedIndex === index,
				onPress: () => {
					if (multiple) {
						const newValue = Array.isArray(value) ? [...value] : [];
						const valueIndex = newValue.indexOf(optionValue);
						if (valueIndex === -1) {
							newValue.push(optionValue);
						} else {
							newValue.splice(valueIndex, 1);
						}
						handleValueChange(newValue as SelectValueType);
					} else {
						handleValueChange(optionValue);
						handleOpenChange(false);
					}
				},
			}),
			[value, multiple, highlightedIndex, handleValueChange, handleOpenChange],
		);

		// Render selected value
		const renderSelectedValue = () => {
			if (renderValue) {
				return renderValue(value);
			}

			if (multiple && Array.isArray(value)) {
				if (value.length === 0) return placeholder;
				const selectedOptions = options.filter((opt) => value.some((v) => v === opt.value));
				return selectedOptions.map((opt) => opt.label).join(", ");
			}
			const selectedOption = options.find((opt) => opt.value === value);
			return selectedOption ? selectedOption.label : placeholder;
		};

		// Determine if placeholder is shown
		const showPlaceholder =
			value === null || value === undefined || (Array.isArray(value) && value.length === 0);

		// Context value
		const contextValue: SelectContextType = {
			value,
			onChange: handleValueChange,
			multiple,
			disabled,
			highlightedIndex,
			setHighlightedIndex,
			open,
			setOpen: handleOpenChange,
			getOptionProps,
			options,
		};

		// Get variant props
		const variantKey =
			`${variant}-${resolvedColor}` as keyof Theme["components"]["Select"]["variants"];
		const variantProps = theme.components?.Select?.variants?.[variantKey] || {};

		return (
			<SelectContext.Provider value={contextValue}>
				<Pressable
					ref={ref}
					onPress={() => !disabled && handleOpenChange(!open)}
					disabled={disabled}
					accessible
					accessibilityLabel={ariaLabel}
					accessibilityRole="button"
					accessibilityState={{ disabled, expanded: open }}
					testID={testID}
					style={[fullWidth && { width: "100%" }]}
				>
					<Box
						{...variantProps}
						flexDirection="row"
						alignItems="center"
						minHeight={sizeConfig.minHeight}
						paddingHorizontal={sizeConfig.paddingHorizontal}
						paddingVertical={sizeConfig.paddingVertical}
						borderRadius="sm"
						opacity={disabled ? 0.6 : 1}
						style={[
							variant === "outlined" && {
								borderWidth: 1,
								borderColor:
									theme.colors[variantProps.borderColor as keyof typeof theme.colors] ||
									theme.colors.outline,
							},
						]}
					>
						{startDecorator && <Box marginRight="sm">{startDecorator}</Box>}

						<Box flex={1}>
							<ThemedText
								variant={sizeConfig.textVariant}
								color={
									showPlaceholder
										? "onSurfaceVariant"
										: (variantProps.color as keyof Theme["colors"]) || "onSurface"
								}
								numberOfLines={1}
								style={[showPlaceholder && { opacity: 0.7 }]}
							>
								{renderSelectedValue()}
							</ThemedText>
						</Box>

						{endDecorator && <Box marginLeft="sm">{endDecorator}</Box>}

						<Box
							marginLeft="sm"
							style={{
								transform: [{ rotate: open ? "180deg" : "0deg" }],
							}}
						>
							{indicator || <ChevronDownIcon />}
						</Box>
					</Box>
				</Pressable>

				{/* Modal for options */}
				<Modal
					visible={open}
					transparent
					animationType="none"
					onRequestClose={() => handleOpenChange(false)}
				>
					<Pressable style={StyleSheet.absoluteFillObject} onPress={() => handleOpenChange(false)}>
						<Animated.View
							style={[
								StyleSheet.absoluteFillObject,
								{
									backgroundColor: "rgba(0, 0, 0, 0.5)",
									opacity: fadeAnim,
								},
							]}
						/>
					</Pressable>

					<View style={styles.modalContent} pointerEvents="box-none">
						<Animated.View
							style={[
								styles.listContainer,
								{
									opacity: fadeAnim,
									transform: [
										{
											scale: fadeAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [0.95, 1],
											}),
										},
									],
								},
							]}
						>
							<Box
								backgroundColor="surface"
								borderRadius="md"
								maxHeight={Dimensions.get("window").height * 0.6}
								overflow="hidden"
								style={styles.shadow}
							>
								<ScrollView>
									{options.map((option, index) => (
										<OptionItem key={option.value} option={option} index={index} />
									))}
								</ScrollView>
							</Box>
						</Animated.View>
					</View>
				</Modal>
			</SelectContext.Provider>
		);
	},
);

Select.displayName = "Select";

/**
 * Option component for use within Select
 */
interface OptionProps {
	value: OptionValueType;
	label?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Option: React.FC<OptionProps> = () => {
	// This is a placeholder component that provides props to the parent Select
	// The actual rendering is handled by OptionItem
	return null;
};

// Internal component for rendering options in the modal
const OptionItem: React.FC<{ option: OptionData; index: number }> = ({ option, index }) => {
	const context = React.useContext(SelectContext);
	const _theme = useTheme<Theme>();

	if (!context) {
		throw new Error("OptionItem must be used within a Select component");
	}

	const { selected, highlighted, onPress } = context.getOptionProps(index, option.value);

	return (
		<Pressable
			onPress={option.disabled ? undefined : onPress}
			disabled={option.disabled}
			accessible
			accessibilityRole="button"
			accessibilityState={{ disabled: option.disabled, selected }}
		>
			<Box
				paddingHorizontal="md"
				paddingVertical="sm"
				backgroundColor={highlighted ? "primary" : selected ? "neutral" : undefined}
				opacity={option.disabled ? 0.6 : 1}
			>
				<ThemedText
					variant="body1"
					color={option.disabled ? "onSurfaceVariant" : selected ? "primary" : "onSurface"}
				>
					{option.label}
				</ThemedText>
			</Box>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	listContainer: {
		width: "100%",
		maxWidth: 400,
	},
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
