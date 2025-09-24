import {
	Children,
	forwardRef,
	isValidElement,
	type KeyboardEvent,
	type ReactNode,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Dimensions,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	type View,
} from "react-native";
import { theme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Typography } from "../../primitives/Typography";
import type { OptionProps, SelectOptionValue, SelectProps, SelectValue } from "./Select.types";

const resolveToken = (token?: string) => {
	if (!token) return undefined;
	return theme.colors[token as keyof typeof theme.colors] ?? token;
};

const sizeConfig = {
	sm: {
		minHeight: 32,
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		gap: theme.spacing.xs,
		textVariant: "body-sm" as const,
	},
	md: {
		minHeight: 40,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		gap: theme.spacing.sm,
		textVariant: "body-md" as const,
	},
	lg: {
		minHeight: 48,
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		gap: theme.spacing.md,
		textVariant: "body-lg" as const,
	},
} as const;

type OptionRecord = {
	value: SelectOptionValue;
	label: string;
	disabled: boolean;
	content: ReactNode;
	key: string;
};

const defaultPlaceholder = "Select an option";

const ChevronDownIcon = ({ expanded }: { expanded: boolean }) => (
	<Typography level="body-sm" style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}>
		⌄
	</Typography>
);

const isValueSelected = (value: SelectOptionValue, current: SelectValue) => {
	if (Array.isArray(current)) {
		return current.some((item) => item === value);
	}
	return current === value;
};

const toggleArrayValue = (value: SelectOptionValue, list: SelectOptionValue[]) => {
	const next = [...list];
	const existingIndex = next.findIndex((item) => item === value);
	if (existingIndex >= 0) {
		next.splice(existingIndex, 1);
	} else {
		next.push(value);
	}
	return next;
};

export const Select = forwardRef<View, SelectProps>(
	(
		{
			value: valueProp,
			defaultValue,
			disabled = false,
			error = false,
			color = "neutral",
			variant = "outlined",
			size = "md",
			startDecorator,
			endDecorator,
			indicator,
			fullWidth = false,
			placeholder = defaultPlaceholder,
			name,
			id,
			required = false,
			autoFocus = false,
			multiple = false,
			listboxOpen: listboxOpenProp,
			defaultListboxOpen = false,
			renderValue,
			onChange,
			onValueChange,
			onListboxOpenChange,
			onClose,
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
		const triggerRef = useRef<View>(null);
		useImperativeHandle(ref, () => triggerRef.current || ({} as View));

		const [internalValue, setInternalValue] = useState<SelectValue>(
			defaultValue !== undefined ? defaultValue : multiple ? [] : null,
		);
		const [internalOpen, setInternalOpen] = useState(defaultListboxOpen);
		const [highlightedIndex, setHighlightedIndex] = useState(-1);
		const [focusVisible, setFocusVisible] = useState(false);
		const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0, width: 0 });

		const selectedValue = valueProp !== undefined ? valueProp : internalValue;
		const open = listboxOpenProp !== undefined ? listboxOpenProp : internalOpen;

		const resolvedColor = error ? "danger" : color;
		const variantKey = `${variant}-${resolvedColor}`;
		const variantStyles =
			theme.components.Select.variants[variantKey] ??
			theme.components.Select.variants["outlined-neutral"];
		const sizeStyles = sizeConfig[size];

		const optionElements = useMemo(() => {
			const nodes: React.ReactElement<OptionProps>[] = [];
			Children.forEach(children, (child) => {
				if (isValidElement<OptionProps>(child) && child.type === Option) {
					nodes.push(child);
				}
			});
			return nodes;
		}, [children]);

		const options = useMemo<OptionRecord[]>(
			() =>
				optionElements.map((option, index) => {
					const labelFromChildren =
						typeof option.props.children === "string" || typeof option.props.children === "number"
							? String(option.props.children)
							: undefined;
					return {
						value: option.props.value,
						label: option.props.label ?? labelFromChildren ?? String(option.props.value),
						disabled: option.props.disabled ?? false,
						content: option.props.children ?? option.props.label ?? option.props.value,
						key: option.key ? String(option.key) : `${index}-${option.props.value}`,
					};
				}),
			[optionElements],
		);

		useEffect(() => {
			if (!open) {
				setHighlightedIndex(-1);
				return;
			}

			const selectedIndex = options.findIndex((option) =>
				isValueSelected(option.value, selectedValue),
			);
			if (selectedIndex >= 0) {
				setHighlightedIndex(selectedIndex);
				return;
			}

			const firstEnabled = options.findIndex((option) => !option.disabled);
			setHighlightedIndex(firstEnabled);
		}, [open, options, selectedValue]);

		useEffect(() => {
			if (!open) return;
			if (!triggerRef.current) return;

			const node = triggerRef.current as
				| (View & {
						measureInWindow?: (
							callback: (x: number, y: number, width: number, height: number) => void,
						) => void;
				  })
				| null;

			const measure = () => {
				node?.measureInWindow?.((x: number, y: number, width: number, height: number) => {
					setOverlayPosition({
						top: y + height,
						left: x,
						width,
					});
				});
			};

			const handle = requestAnimationFrame(measure);
			return () => cancelAnimationFrame(handle);
		}, [open]);

		useEffect(() => {
			if (autoFocus && triggerRef.current) {
				const node = triggerRef.current as (View & { focus?: () => void }) | null;
				node?.focus?.();
			}
		}, [autoFocus]);

		const handleOpenChange = (nextOpen: boolean) => {
			if (listboxOpenProp === undefined) {
				setInternalOpen(nextOpen);
			}
			onListboxOpenChange?.(nextOpen);
			if (!nextOpen) {
				onClose?.();
			}
		};

		const updateValue = (nextValue: SelectValue) => {
			if (valueProp === undefined) {
				setInternalValue(nextValue);
			}
			onValueChange?.(nextValue);
			onChange?.(null, nextValue);
		};

		const handleSelectOption = (option: OptionRecord) => {
			if (option.disabled) return;

			if (multiple) {
				const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
				const nextArray = toggleArrayValue(option.value, currentArray);
				updateValue(nextArray);
			} else {
				updateValue(option.value);
				handleOpenChange(false);
			}
		};

		const handleTriggerPress = () => {
			if (disabled) return;
			handleOpenChange(!open);
		};

		const highlightOffset = (direction: 1 | -1) => {
			if (!open) {
				handleOpenChange(true);
				return;
			}
			if (!options.length) return;

			let nextIndex = highlightedIndex;
			for (let i = 0; i < options.length; i += 1) {
				nextIndex = (nextIndex + direction + options.length) % options.length;
				if (!options[nextIndex].disabled) {
					setHighlightedIndex(nextIndex);
					break;
				}
			}
		};

		const handleTriggerKeyDown = (event: KeyboardEvent<View>) => {
			if (disabled) return;

			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					highlightOffset(1);
					break;
				case "ArrowUp":
					event.preventDefault();
					highlightOffset(-1);
					break;
				case "Enter":
				case " ":
					event.preventDefault();
					if (!open) {
						handleOpenChange(true);
					} else if (highlightedIndex >= 0 && options[highlightedIndex]) {
						handleSelectOption(options[highlightedIndex]);
					}
					break;
				case "Escape":
					if (open) {
						event.preventDefault();
						handleOpenChange(false);
					}
					break;
				default:
					break;
			}
		};

		const handleTriggerBlur = () => setFocusVisible(false);
		const handleTriggerFocus = () => setFocusVisible(true);

		const renderSelectedLabel = () => {
			if (renderValue) {
				return renderValue(selectedValue);
			}
			if (multiple) {
				const values = Array.isArray(selectedValue) ? selectedValue : [];
				if (values.length === 0) return placeholder;
				const labels = options
					.filter((option) => values.some((item) => item === option.value))
					.map((option) => option.label);
				return labels.join(", ");
			}
			if (selectedValue === null || selectedValue === undefined) {
				return placeholder;
			}
			const selectedOption = options.find((option) => option.value === selectedValue);
			return selectedOption?.label ?? placeholder;
		};

		const displayLabel = renderSelectedLabel();
		const isPlaceholder =
			selectedValue === null ||
			selectedValue === undefined ||
			(Array.isArray(selectedValue) && selectedValue.length === 0);

		const hiddenInputValue = Array.isArray(selectedValue)
			? JSON.stringify(selectedValue)
			: selectedValue !== null && selectedValue !== undefined
				? String(selectedValue)
				: "";

		const overlayWidth = Math.max(
			overlayPosition.width || (fullWidth ? Dimensions.get("window").width : 0),
			200,
		);
		const overlayLeft = overlayPosition.left;
		const overlayTop = overlayPosition.top + theme.spacing.xs;

		return (
			<Box style={[fullWidth ? styles.fullWidth : null, style]}>
				<Pressable
					ref={triggerRef}
					onPress={handleTriggerPress}
					disabled={disabled}
					onKeyDown={handleTriggerKeyDown}
					onFocus={handleTriggerFocus}
					onBlur={handleTriggerBlur}
					testID={testID}
					accessibilityRole="button"
					accessibilityLabel={ariaLabel}
					accessibilityHint={ariaDescribedBy}
					accessibilityLabelledBy={ariaLabelledBy}
					accessibilityState={{ disabled, expanded: open }}
					style={({ pressed }) => [
						styles.trigger,
						{
							minHeight: sizeStyles.minHeight,
							paddingHorizontal: sizeStyles.paddingHorizontal,
							paddingVertical: sizeStyles.paddingVertical,
							borderRadius: theme.radii.sm,
							backgroundColor: resolveToken(variantStyles.backgroundColor) ?? theme.colors.surface,
							borderWidth: variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0),
							borderColor: resolveToken(variantStyles.borderColor) ?? theme.colors.outlineVariant,
							opacity: disabled ? 0.6 : 1,
							width: fullWidth ? "100%" : undefined,
						},
						focusVisible && { borderColor: theme.colors.primary, borderWidth: 2 },
						pressed && !disabled ? styles.triggerPressed : null,
					]}
					nativeID={id}
				>
					<Box flexDirection="row" alignItems="center" flex={1}>
						{startDecorator ? (
							<Box style={{ marginRight: sizeStyles.gap }}>{startDecorator}</Box>
						) : null}
						<Typography
							level={sizeStyles.textVariant}
							style={{
								flex: 1,
								color: isPlaceholder
									? theme.colors.onSurfaceVariant
									: (resolveToken(variantStyles.color) ?? theme.colors.onSurface),
								opacity: isPlaceholder ? 0.7 : 1,
							}}
							numberOfLines={1}
						>
							{displayLabel}
						</Typography>
						{endDecorator ? <Box style={{ marginLeft: sizeStyles.gap }}>{endDecorator}</Box> : null}
						<Box style={{ marginLeft: sizeStyles.gap }}>
							{indicator || <ChevronDownIcon expanded={open} />}
						</Box>
					</Box>
				</Pressable>
				{Platform.OS === "web" && name ? (
					<input
						type="hidden"
						name={name}
						value={hiddenInputValue}
						required={required}
						data-multiple={multiple ? "true" : undefined}
					/>
				) : null}
				<SelectListbox
					open={open}
					options={options}
					highlightedIndex={highlightedIndex}
					selectedValue={selectedValue}
					anchor={{ left: overlayLeft, top: overlayTop, width: overlayWidth }}
					multiple={multiple}
					onRequestClose={() => handleOpenChange(false)}
					onOptionSelect={handleSelectOption}
					onHighlight={setHighlightedIndex}
				/>
			</Box>
		);
	},
);

Select.displayName = "Select";

interface SelectListboxProps {
	open: boolean;
	options: OptionRecord[];
	highlightedIndex: number;
	selectedValue: SelectValue;
	multiple: boolean;
	anchor: { left: number; top: number; width: number };
	onRequestClose: () => void;
	onOptionSelect: (option: OptionRecord) => void;
	onHighlight: (index: number) => void;
}

const SelectListbox = ({
	open,
	options,
	highlightedIndex,
	selectedValue,
	multiple,
	anchor,
	onRequestClose,
	onOptionSelect,
	onHighlight,
}: SelectListboxProps) => {
	if (!open) {
		return null;
	}

	const window = Dimensions.get("window");
	const maxHeight = Math.min(window.height * 0.5, 320);
	const horizontalPadding = theme.spacing.md;
	const verticalSpacing = theme.spacing.sm;

	const width = Math.min(Math.max(anchor.width, 200), window.width - horizontalPadding * 2);
	const left = Math.min(
		Math.max(horizontalPadding, anchor.left || horizontalPadding),
		window.width - width - horizontalPadding,
	);
	const top = Math.min(
		Math.max(verticalSpacing, anchor.top || verticalSpacing),
		window.height - maxHeight - verticalSpacing,
	);

	return (
		<Modal visible={open} transparent animationType="fade" onRequestClose={onRequestClose}>
			<Box style={styles.modalRoot}>
				<Pressable style={StyleSheet.absoluteFillObject} onPress={onRequestClose} />
				<Box
					style={[
						styles.listboxContainer,
						{
							top,
							left,
							width,
						},
					]}
				>
					<Box backgroundColor="surface" borderRadius="md" style={styles.listboxSurface}>
						<ScrollView style={{ maxHeight }}>
							{options.map((option, index) => {
								const selected = isValueSelected(option.value, selectedValue);
								const highlighted = index === highlightedIndex;
								return (
									<SelectOptionItem
										key={option.key}
										option={option}
										highlighted={highlighted}
										selected={selected}
										multiple={multiple}
										onPress={() => onOptionSelect(option)}
										onHighlight={() => onHighlight(index)}
									/>
								);
							})}
						</ScrollView>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

interface SelectOptionItemProps {
	option: OptionRecord;
	highlighted: boolean;
	selected: boolean;
	multiple: boolean;
	onPress: () => void;
	onHighlight: () => void;
}

const SelectOptionItem = ({
	option,
	highlighted,
	selected,
	multiple,
	onPress,
	onHighlight,
}: SelectOptionItemProps) => {
	const backgroundColor = highlighted
		? theme.colors.primaryContainer
		: selected
			? `${theme.colors.primary}22`
			: "transparent";
	const textColor = option.disabled
		? theme.colors.onSurfaceVariant
		: selected
			? theme.colors.primary
			: theme.colors.onSurface;

	const isPrimitiveLabel = typeof option.content === "string" || typeof option.content === "number";

	const labelNode = isPrimitiveLabel ? (
		<Typography level="body-md" style={{ color: textColor }}>
			{option.content ?? option.label}
		</Typography>
	) : (
		(option.content ?? (
			<Typography level="body-md" style={{ color: textColor }}>
				{option.label}
			</Typography>
		))
	);

	return (
		<Pressable
			disabled={option.disabled}
			onPress={onPress}
			onHoverIn={onHighlight}
			onFocus={onHighlight}
			onPressIn={onHighlight}
			accessibilityRole="menuitem"
			accessibilityState={{ disabled: option.disabled, selected }}
			style={({ pressed }) => [
				styles.option,
				{ backgroundColor, opacity: option.disabled ? 0.6 : 1 },
				pressed && !option.disabled ? { backgroundColor: theme.colors.surfaceVariant } : null,
			]}
		>
			<Box flexDirection="row" alignItems="center" justifyContent="space-between">
				<Box flex={1}>{labelNode}</Box>
				{multiple && selected ? (
					<Typography level="body-sm" style={{ color: textColor, marginLeft: theme.spacing.xs }}>
						✓
					</Typography>
				) : null}
			</Box>
		</Pressable>
	);
};

export const Option: React.FC<OptionProps> = () => null;

const styles = StyleSheet.create({
	trigger: {
		justifyContent: "center",
	},
	triggerPressed: {
		opacity: 0.85,
	},
	fullWidth: {
		width: "100%",
	},
	modalRoot: {
		flex: 1,
	},
	listboxContainer: {
		position: "absolute",
	},
	listboxSurface: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 6,
	},
	option: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
});
