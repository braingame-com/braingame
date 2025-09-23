// @ts-nocheck
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { theme as restyleTheme } from "../../../theme";
import type { SelectProps } from "./SelectProps";

/**
 * Web implementation of Select component
 *
 * Based on Joy UI Select implementation with core dropdown functionality,
 * keyboard navigation, and accessibility support using inline styles with restyleTheme.
 */

interface SelectContextType {
	value: string | number | string[] | number[] | null;
	onChange: (value: string | number | string[] | number[] | null) => void;
	multiple?: boolean;
	disabled?: boolean;
	highlightedIndex: number;
	setHighlightedIndex: (index: number) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	getOptionProps: (
		index: number,
		value: string | number,
	) => {
		selected: boolean;
		highlighted: boolean;
		onClick: () => void;
		onMouseEnter: () => void;
	};
	options: Array<{ value: string | number; label: string; disabled?: boolean }>;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

const ChevronDownIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
		<title>Dropdown arrow</title>
		<path
			d="M4 6l4 4 4-4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
		/>
	</svg>
);

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
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
			name,
			id,
			required = false,
			autoFocus = false,
			renderValue,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
			...props
		},
		_ref,
	) => {
		// State management
		const [internalValue, setInternalValue] = useState<
			string | number | string[] | number[] | null
		>(valueProp !== undefined ? valueProp : defaultValue || null);
		const [internalOpen, setInternalOpen] = useState(defaultListboxOpen);
		const [highlightedIndex, setHighlightedIndex] = useState(-1);
		const [focusVisible, setFocusVisible] = useState(false);
		const [options, setOptions] = useState<
			Array<{ value: string | number; label: string; disabled?: boolean }>
		>([]);

		// Refs
		const buttonRef = useRef<HTMLButtonElement>(null);
		const listboxRef = useRef<HTMLUListElement>(null);
		const hiddenInputRef = useRef<HTMLInputElement>(null);

		// Resolve controlled/uncontrolled state
		const value = valueProp !== undefined ? valueProp : internalValue;
		const open = listboxOpenProp !== undefined ? listboxOpenProp : internalOpen;

		// Color override for error state
		const resolvedColor = error ? "danger" : color;

		// Get theme variant styles
		const variantKey = `${variant}-${resolvedColor}`;
		const variantStyles = restyleTheme.components.Select?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: {
				minHeight: 32,
				paddingX: 12,
				paddingY: 4,
				fontSize: restyleTheme.textVariants.body2.fontSize,
				gap: 8,
			},
			md: {
				minHeight: 40,
				paddingX: 16,
				paddingY: 8,
				fontSize: restyleTheme.textVariants.body1.fontSize,
				gap: 12,
			},
			lg: {
				minHeight: 48,
				paddingX: 20,
				paddingY: 12,
				fontSize: restyleTheme.textVariants.body1.fontSize,
				gap: 16,
			},
		}[size];

		// Handle value changes
		const handleValueChange = useCallback(
			(newValue: string | number | string[] | number[] | null) => {
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
			},
			[listboxOpenProp, onListboxOpenChange, onClose],
		);

		// Collect options from children
		useEffect(() => {
			const childOptions: Array<{ value: string | number; label: string; disabled?: boolean }> = [];

			React.Children.forEach(children, (child) => {
				if (React.isValidElement<OptionProps>(child) && child.type === Option) {
					const childProps = child.props as OptionProps;
					childOptions.push({
						value: childProps.value,
						label: childProps.label || String(childProps.children) || String(childProps.value),
						disabled: childProps.disabled,
					});
				}
			});

			setOptions(childOptions);
		}, [children]);

		// Handle keyboard navigation
		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent) => {
				if (disabled) return;

				switch (event.key) {
					case "ArrowDown":
						event.preventDefault();
						if (!open) {
							handleOpenChange(true);
						} else {
							const nextIndex = Math.min(highlightedIndex + 1, options.length - 1);
							setHighlightedIndex(nextIndex);
						}
						break;
					case "ArrowUp":
						event.preventDefault();
						if (open) {
							const prevIndex = Math.max(highlightedIndex - 1, 0);
							setHighlightedIndex(prevIndex);
						}
						break;
					case "Enter":
					case " ":
						event.preventDefault();
						if (!open) {
							handleOpenChange(true);
						} else if (highlightedIndex >= 0) {
							const selectedOption = options[highlightedIndex];
							if (selectedOption && !selectedOption.disabled) {
								handleValueChange(selectedOption.value);
								if (!multiple) {
									handleOpenChange(false);
								}
							}
						}
						break;
					case "Escape":
						event.preventDefault();
						handleOpenChange(false);
						break;
				}
			},
			[disabled, open, highlightedIndex, options, handleOpenChange, handleValueChange, multiple],
		);

		// Handle click outside
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					open &&
					buttonRef.current &&
					!buttonRef.current.contains(event.target as Node) &&
					listboxRef.current &&
					!listboxRef.current.contains(event.target as Node)
				) {
					handleOpenChange(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [open, handleOpenChange]);

		// Auto focus
		useEffect(() => {
			if (autoFocus && buttonRef.current) {
				buttonRef.current.focus();
			}
		}, [autoFocus]);

		// Handle focus visible
		const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
			if (event.target.matches(":focus-visible")) {
				setFocusVisible(true);
			}
		};

		const handleBlur = () => {
			setFocusVisible(false);
		};

		// Get option props for context
		const getOptionProps = useCallback(
			(index: number, optionValue: string | number) => ({
				selected: multiple
					? Array.isArray(value) && value.some((v) => v === optionValue)
					: value === optionValue,
				highlighted: highlightedIndex === index,
				onClick: () => {
					if (multiple) {
						const newValue = Array.isArray(value) ? [...value] : [];
						const valueIndex = newValue.indexOf(optionValue);
						if (valueIndex === -1) {
							newValue.push(optionValue);
						} else {
							newValue.splice(valueIndex, 1);
						}
						handleValueChange(newValue as string | number | string[] | number[] | null);
					} else {
						handleValueChange(optionValue);
						handleOpenChange(false);
					}
				},
				onMouseEnter: () => setHighlightedIndex(index),
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

		// Build button styles
		const buttonStyles: React.CSSProperties = {
			display: "flex",
			alignItems: "center",
			position: "relative",
			width: fullWidth ? "100%" : "auto",
			minWidth: 0,
			minHeight: sizeConfig.minHeight,
			padding: `${sizeConfig.paddingY}px ${sizeConfig.paddingX}px`,
			fontSize: sizeConfig.fontSize,
			fontFamily: "inherit",
			background: "none",
			border: "none",
			borderRadius: restyleTheme.borderRadii.sm,
			cursor: disabled ? "not-allowed" : "pointer",
			opacity: disabled ? 0.6 : 1,
			outline: "none",
			transition: "all 0.2s ease",

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			...(variant === "outlined" && {
				border: `1px solid ${variantStyles.borderColor || restyleTheme.colors.outline}`,
			}),
			...(variant === "soft" && {
				backgroundColor: variantStyles.backgroundColor || restyleTheme.colors.surfaceVariant,
			}),
			...(variant === "solid" && {
				backgroundColor: variantStyles.backgroundColor || restyleTheme.colors.surface,
			}),

			// Focus styles
			...(focusVisible && {
				boxShadow: `0 0 0 2px ${restyleTheme.colors.primary}`,
			}),

			// Placeholder styles
			...((value === null ||
				value === undefined ||
				(Array.isArray(value) && value.length === 0)) && {
				color: restyleTheme.colors.onSurfaceVariant,
				opacity: 0.7,
			}),

			...style,
		};

		// Build listbox styles
		const listboxStyles: React.CSSProperties = {
			position: "absolute",
			top: "100%",
			left: 0,
			right: 0,
			marginTop: 4,
			maxHeight: "200px",
			overflowY: "auto",
			backgroundColor: restyleTheme.colors.surface,
			border: `1px solid ${restyleTheme.colors.outline}`,
			borderRadius: restyleTheme.borderRadii.sm,
			boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
			zIndex: 1000,
			padding: 0,
			minWidth: "max-content",
		};

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

		return (
			<SelectContext.Provider value={contextValue}>
				<div
					style={{
						position: "relative",
						display: "inline-block",
						width: fullWidth ? "100%" : "auto",
					}}
				>
					<button
						ref={buttonRef}
						style={buttonStyles}
						onClick={() => !disabled && handleOpenChange(!open)}
						onKeyDown={handleKeyDown}
						onFocus={handleFocus}
						onBlur={handleBlur}
						disabled={disabled}
						aria-label={ariaLabel}
						aria-describedby={ariaDescribedby}
						aria-labelledby={ariaLabelledby}
						aria-expanded={open}
						aria-haspopup="listbox"
						aria-required={required}
						role="combobox"
						data-testid={testID}
						{...props}
					>
						{startDecorator && (
							<span style={{ marginRight: sizeConfig.gap }}>{startDecorator}</span>
						)}

						<span
							style={{
								flex: 1,
								textAlign: "left",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{renderSelectedValue()}
						</span>

						{endDecorator && <span style={{ marginLeft: sizeConfig.gap }}>{endDecorator}</span>}

						<span
							style={{
								marginLeft: sizeConfig.gap,
								transform: open ? "rotate(180deg)" : "rotate(0deg)",
								transition: "transform 0.2s ease",
							}}
						>
							{indicator || <ChevronDownIcon />}
						</span>
					</button>

					{/* Hidden input for form submission */}
					<input
						ref={hiddenInputRef}
						type="hidden"
						name={name}
						value={Array.isArray(value) ? JSON.stringify(value) : String(value || "")}
						required={required}
					/>

					{/* Listbox */}
					{open && (
						<ul
							ref={listboxRef}
							style={listboxStyles}
							role="listbox"
							aria-multiselectable={multiple}
						>
							{children}
						</ul>
					)}
				</div>
			</SelectContext.Provider>
		);
	},
);

Select.displayName = "Select";

/**
 * Option component for use within Select
 */
interface OptionProps {
	value: string | number;
	label?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Option: React.FC<OptionProps> = ({ value, label, disabled = false, children }) => {
	const context = React.useContext(SelectContext);
	const [isHovered, setIsHovered] = useState(false);

	if (!context) {
		throw new Error("Option must be used within a Select component");
	}

	// Find the index of this option from the context
	const index = React.useMemo(() => {
		return context.options.findIndex((option) => option.value === value);
	}, [context.options, value]);

	const { selected, highlighted, onClick, onMouseEnter } = context.getOptionProps(index, value);

	const optionStyles: React.CSSProperties = {
		padding: "8px 12px",
		cursor: disabled ? "not-allowed" : "pointer",
		backgroundColor: highlighted
			? restyleTheme.colors.primaryContainer
			: isHovered && !disabled
				? restyleTheme.colors.surfaceVariant
				: "transparent",
		color: disabled
			? restyleTheme.colors.onSurfaceVariant
			: selected
				? restyleTheme.colors.primary
				: restyleTheme.colors.onSurface,
		opacity: disabled ? 0.6 : 1,
		fontSize: restyleTheme.textVariants.body1.fontSize,
		fontFamily: "inherit",
		border: "none",
		outline: "none",
		textAlign: "left",
		width: "100%",
		display: "block",
		transition: "background-color 0.2s ease",
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
		if (!disabled) {
			onMouseEnter();
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<li
			style={optionStyles}
			role="option"
			aria-selected={selected}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onClick={disabled ? undefined : onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					if (!disabled) {
						onClick();
					}
				}
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children || label || String(value)}
		</li>
	);
};
