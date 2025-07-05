"use client";

import React from "react";
import { MaterialIcon } from "../MaterialIcon";

// Wrapper components that provide similar API to BGUI components for documentation purposes

export interface ButtonProps {
	onPress?: () => void;
	onClick?: () => void;
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "ghost" | "danger" | "icon";
	size?: "small" | "medium" | "large";
	icon?: string;
	disabled?: boolean;
	"aria-label"?: string;
	style?: React.CSSProperties;
}

export function Button({
	onPress,
	onClick,
	children,
	variant = "primary",
	size = "medium",
	icon,
	disabled = false,
	"aria-label": ariaLabel,
	style,
}: ButtonProps) {
	const handleClick = () => {
		if (onPress) onPress();
		if (onClick) onClick();
	};

	const classNames = [
		"button",
		variant && `button--${variant}`,
		size && `button--${size}`,
		disabled && "button--disabled",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type="button"
			className={classNames}
			onClick={handleClick}
			disabled={disabled}
			aria-label={ariaLabel}
			style={style}
		>
			{icon && <MaterialIcon name={icon} size="small" style={{ marginRight: 8 }} />}
			{children}
		</button>
	);
}

export { MaterialIcon as Icon };

// Text component for demos
export interface TextProps {
	children: React.ReactNode;
	variant?:
		| "displayTitle"
		| "title"
		| "heading"
		| "subtitle"
		| "body"
		| "bold"
		| "text"
		| "secondaryText"
		| "small"
		| "smallThin"
		| "caption"
		| "h1"
		| "h2"
		| "h3";
	color?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";
	align?: "left" | "center" | "right";
	numberOfLines?: number;
	mono?: boolean;
	style?: React.CSSProperties;
}

export function Text({
	children,
	variant = "body",
	color,
	align = "left",
	numberOfLines,
	mono = false,
	style,
}: TextProps) {
	const classNames = [
		"text",
		`text-${variant}`,
		color && `text-color-${color}`,
		mono && "font-mono",
	]
		.filter(Boolean)
		.join(" ");

	const textStyle: React.CSSProperties = {
		textAlign: align,
		...(numberOfLines && {
			overflow: "hidden",
			textOverflow: "ellipsis",
			display: "-webkit-box",
			WebkitLineClamp: numberOfLines,
			WebkitBoxOrient: "vertical",
		}),
		...style,
	};

	return (
		<span className={classNames} style={textStyle}>
			{children}
		</span>
	);
}

// Badge component for demos
export interface BadgeProps {
	text?: string | number;
	variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
	size?: "sm" | "md";
	dot?: boolean;
	max?: number;
	showZero?: boolean;
	style?: React.CSSProperties;
}

export function Badge({
	text,
	variant = "default",
	size = "md",
	dot = false,
	max = 99,
	showZero = false,
	style,
}: BadgeProps) {
	// Don't render if value is 0 and showZero is false
	if (!dot && text === 0 && !showZero) {
		return null;
	}

	// Format number display
	let displayText = text;
	if (typeof text === "number" && text > max) {
		displayText = `${max}+`;
	}

	const classNames = ["badge", `badge--${variant}`, `badge--${size}`, dot && "badge--dot"]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={classNames} style={style}>
			{!dot && displayText}
		</span>
	);
}

// Chip component for demos
export interface ChipProps {
	label: string;
	onPress?: () => void;
	onRemove?: () => void;
	variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
	size?: "sm" | "md" | "lg";
	icon?: string;
	selected?: boolean;
	disabled?: boolean;
	style?: React.CSSProperties;
}

export function Chip({
	label,
	onPress,
	onRemove,
	variant = "default",
	size = "md",
	icon,
	selected = false,
	disabled = false,
	style,
}: ChipProps) {
	const classNames = [
		"chip",
		`chip--${variant}`,
		`chip--${size}`,
		selected && "chip--selected",
		disabled && "chip--disabled",
		(onPress || onRemove) && "chip--interactive",
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = () => {
		if (!disabled && onPress) {
			onPress();
		}
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!disabled && onRemove) {
			onRemove();
		}
	};

	return (
		<div
			className={classNames}
			onClick={handleClick}
			onKeyDown={
				onPress && !disabled
					? (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								onPress();
							}
						}
					: undefined
			}
			style={style}
			role={onPress ? "button" : undefined}
			tabIndex={onPress && !disabled ? 0 : undefined}
		>
			{icon && <MaterialIcon name={icon} size="small" className="chip__icon" />}
			<span className="chip__label">{label}</span>
			{onRemove && (
				<button
					type="button"
					className="chip__delete"
					onClick={handleRemove}
					aria-label={`Remove ${label}`}
				>
					<MaterialIcon name="close" size="small" />
				</button>
			)}
		</div>
	);
}

// Checkbox component for demos
export interface CheckboxProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	label?: string;
	disabled?: boolean;
	error?: boolean;
	indeterminate?: boolean;
	size?: "sm" | "md" | "lg";
	color?: "primary" | "secondary" | "success" | "warning" | "error";
	testID?: string;
	style?: React.CSSProperties;
}

export function Checkbox({
	value,
	onValueChange,
	label,
	disabled = false,
	error = false,
	indeterminate = false,
	size = "md",
	color = "primary",
	testID,
	style,
}: CheckboxProps) {
	const handleClick = () => {
		if (!disabled) {
			onValueChange(!value);
		}
	};

	const classNames = [
		"checkbox",
		`checkbox--${size}`,
		`checkbox--${color}`,
		disabled && "checkbox--disabled",
		error && "checkbox--error",
		value && "checkbox--checked",
		indeterminate && "checkbox--indeterminate",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={classNames} style={style} data-testid={testID}>
			<div className="checkbox__input-wrapper">
				<input
					type="checkbox"
					checked={value}
					onChange={handleClick}
					disabled={disabled}
					className="checkbox__input"
					aria-checked={indeterminate ? "mixed" : value}
				/>
				<div className="checkbox__box">
					{indeterminate ? (
						<MaterialIcon name="remove" size="small" className="checkbox__icon" />
					) : value ? (
						<MaterialIcon name="check" size="small" className="checkbox__icon" />
					) : null}
				</div>
			</div>
			{label && <span className="checkbox__label">{label}</span>}
		</label>
	);
}

// Switch component for demos
export interface SwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	label?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	color?: "primary" | "secondary" | "success" | "warning" | "error";
	thumbIcon?: { on?: string; off?: string };
	testID?: string;
	style?: React.CSSProperties;
}

export function Switch({
	value,
	onValueChange,
	label,
	disabled = false,
	size = "md",
	color = "primary",
	thumbIcon,
	testID,
	style,
}: SwitchProps) {
	const handleClick = () => {
		if (!disabled) {
			onValueChange(!value);
		}
	};

	const classNames = [
		"switch",
		`switch--${size}`,
		`switch--${color}`,
		disabled && "switch--disabled",
		value && "switch--on",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={classNames} style={style} data-testid={testID}>
			<div className="switch__track">
				<input
					type="checkbox"
					checked={value}
					onChange={handleClick}
					disabled={disabled}
					className="switch__input"
					role="switch"
					aria-checked={value}
				/>
				<div className="switch__thumb">
					{thumbIcon && (
						<MaterialIcon
							name={value ? thumbIcon.on || "check" : thumbIcon.off || "close"}
							size="small"
							className="switch__icon"
						/>
					)}
				</div>
			</div>
			{label && <span className="switch__label">{label}</span>}
		</label>
	);
}

// TextInput component for demos
export interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	label?: string;
	helperText?: string;
	error?: boolean;
	errorText?: string;
	disabled?: boolean;
	multiline?: boolean;
	numberOfLines?: number;
	maxLength?: number;
	secureTextEntry?: boolean;
	keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "url";
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	autoComplete?: string;
	autoFocus?: boolean;
	leftIcon?: string;
	rightIcon?: string;
	onRightIconPress?: () => void;
	variant?: "outlined" | "filled";
	size?: "sm" | "md" | "lg";
	testID?: string;
	style?: React.CSSProperties;
}

export function TextInput({
	value,
	onChangeText,
	placeholder,
	label,
	helperText,
	error = false,
	errorText,
	disabled = false,
	multiline = false,
	numberOfLines = 1,
	maxLength,
	secureTextEntry = false,
	keyboardType = "default",
	autoCapitalize = "sentences",
	autoComplete,
	autoFocus = false,
	leftIcon,
	rightIcon,
	onRightIconPress,
	variant = "outlined",
	size = "md",
	testID,
	style,
}: TextInputProps) {
	const classNames = [
		"textinput",
		`textinput--${variant}`,
		`textinput--${size}`,
		error && "textinput--error",
		disabled && "textinput--disabled",
		(leftIcon || rightIcon) && "textinput--with-icons",
	]
		.filter(Boolean)
		.join(" ");

	const inputType = secureTextEntry
		? "password"
		: keyboardType === "email-address"
			? "email"
			: keyboardType === "phone-pad"
				? "tel"
				: keyboardType === "url"
					? "url"
					: keyboardType === "numeric"
						? "number"
						: "text";

	const inputId = testID || `input-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className={classNames} style={style} data-testid={testID}>
			{label && (
				<label htmlFor={inputId} className="textinput__label">
					{label}
				</label>
			)}
			<div className="textinput__wrapper">
				{leftIcon && (
					<MaterialIcon
						name={leftIcon}
						size="small"
						className="textinput__icon textinput__icon--left"
					/>
				)}
				{multiline ? (
					<textarea
						id={inputId}
						value={value}
						onChange={(e) => onChangeText(e.target.value)}
						placeholder={placeholder}
						disabled={disabled}
						rows={numberOfLines}
						maxLength={maxLength}
						autoComplete={autoComplete}
						className="textinput__input"
					/>
				) : (
					<input
						id={inputId}
						type={inputType}
						value={value}
						onChange={(e) => onChangeText(e.target.value)}
						placeholder={placeholder}
						disabled={disabled}
						maxLength={maxLength}
						autoComplete={autoComplete}
						autoCapitalize={autoCapitalize}
						className="textinput__input"
					/>
				)}
				{rightIcon && (
					<button
						type="button"
						className="textinput__icon textinput__icon--right"
						onClick={onRightIconPress}
						disabled={disabled}
						tabIndex={onRightIconPress ? 0 : -1}
					>
						<MaterialIcon name={rightIcon} size="small" />
					</button>
				)}
			</div>
			{(helperText || errorText) && (
				<div className={`textinput__helper ${error ? "textinput__helper--error" : ""}`}>
					{error ? errorText : helperText}
				</div>
			)}
		</div>
	);
}

// Select component for demos
export interface SelectOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface SelectGroup {
	label: string;
	options: SelectOption[];
}

export interface SelectProps {
	value: string | string[];
	onValueChange: (value: string | string[]) => void;
	options: SelectOption[] | SelectGroup[];
	placeholder?: string;
	label?: string;
	helperText?: string;
	error?: boolean;
	errorText?: string;
	disabled?: boolean;
	multiple?: boolean;
	searchable?: boolean;
	clearable?: boolean;
	variant?: "outlined" | "filled";
	size?: "sm" | "md" | "lg";
	maxHeight?: number;
	testID?: string;
	style?: React.CSSProperties;
}

export function Select({
	value,
	onValueChange,
	options,
	placeholder = "Select...",
	label,
	helperText,
	error = false,
	errorText,
	disabled = false,
	multiple = false,
	searchable = false,
	clearable = false,
	variant = "outlined",
	size = "md",
	maxHeight = 300,
	testID,
	style,
}: SelectProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");

	const classNames = [
		"select",
		`select--${variant}`,
		`select--${size}`,
		error && "select--error",
		disabled && "select--disabled",
		isOpen && "select--open",
	]
		.filter(Boolean)
		.join(" ");

	const isGrouped = options.length > 0 && "options" in options[0];
	const flatOptions = isGrouped
		? (options as SelectGroup[]).flatMap((group) => group.options)
		: (options as SelectOption[]);

	const filteredOptions = searchQuery
		? flatOptions.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
		: flatOptions;

	const selectedOptions = multiple
		? flatOptions.filter((opt) => (value as string[]).includes(opt.value))
		: flatOptions.filter((opt) => opt.value === value);

	const displayValue =
		selectedOptions.length > 0
			? multiple
				? `${selectedOptions.length} selected`
				: selectedOptions[0].label
			: "";

	const handleSelect = (optionValue: string) => {
		if (multiple) {
			const currentValues = value as string[];
			const newValues = currentValues.includes(optionValue)
				? currentValues.filter((v) => v !== optionValue)
				: [...currentValues, optionValue];
			onValueChange(newValues);
		} else {
			onValueChange(optionValue);
			setIsOpen(false);
		}
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		onValueChange(multiple ? [] : "");
	};

	return (
		<div className={classNames} style={style} data-testid={testID}>
			{label && <span className="select__label">{label}</span>}
			<div className="select__wrapper">
				<button
					type="button"
					className="select__trigger"
					onClick={() => !disabled && setIsOpen(!isOpen)}
					disabled={disabled}
				>
					<span className="select__value">
						{displayValue || <span className="select__placeholder">{placeholder}</span>}
					</span>
					<div className="select__icons">
						{clearable && displayValue && (
							<MaterialIcon
								name="close"
								size="small"
								className="select__clear"
								onClick={handleClear}
							/>
						)}
						<MaterialIcon
							name={isOpen ? "expand_less" : "expand_more"}
							size="small"
							className="select__arrow"
						/>
					</div>
				</button>

				{isOpen && (
					<div className="select__dropdown" style={{ maxHeight }}>
						{searchable && (
							<div className="select__search">
								<MaterialIcon name="search" size="small" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search..."
									className="select__search-input"
								/>
							</div>
						)}
						<div className="select__options">
							{filteredOptions.map((option) => (
								<button
									key={option.value}
									type="button"
									className={`select__option ${
										multiple
											? (value as string[]).includes(option.value)
												? "select__option--selected"
												: ""
											: value === option.value
												? "select__option--selected"
												: ""
									} ${option.disabled ? "select__option--disabled" : ""}`}
									onClick={() => !option.disabled && handleSelect(option.value)}
									disabled={option.disabled}
								>
									{multiple && (
										<Checkbox
											value={(value as string[]).includes(option.value)}
											onValueChange={() => {}}
											size="sm"
										/>
									)}
									{option.label}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
			{(helperText || errorText) && (
				<div className={`select__helper ${error ? "select__helper--error" : ""}`}>
					{error ? errorText : helperText}
				</div>
			)}
		</div>
	);
}

// Card component for demos
export interface CardProps {
	children: React.ReactNode;
	variant?: "elevated" | "filled" | "outlined";
	padding?: "none" | "sm" | "md" | "lg";
	interactive?: boolean;
	onPress?: () => void;
	disabled?: boolean;
	selected?: boolean;
	style?: React.CSSProperties;
	testID?: string;
}

export function Card({
	children,
	variant = "elevated",
	padding = "md",
	interactive = false,
	onPress,
	disabled = false,
	selected = false,
	style,
	testID,
}: CardProps) {
	const isInteractive = interactive || !!onPress;

	const classNames = [
		"card",
		`card--${variant}`,
		`card--padding-${padding}`,
		isInteractive && "card--interactive",
		disabled && "card--disabled",
		selected && "card--selected",
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = () => {
		if (isInteractive && !disabled && onPress) {
			onPress();
		}
	};

	const Component = isInteractive ? "button" : "div";

	return React.createElement(
		Component,
		{
			className: classNames,
			onClick: isInteractive ? handleClick : undefined,
			disabled: isInteractive ? disabled : undefined,
			style,
			"data-testid": testID,
			type: isInteractive ? "button" : undefined,
		},
		children,
	);
}

// Modal component for demos
export interface ModalProps {
	visible: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	size?: "sm" | "md" | "lg" | "full";
	closeOnBackdropPress?: boolean;
	closeOnEscape?: boolean;
	showCloseButton?: boolean;
	animationType?: "fade" | "slide" | "zoom";
	backdrop?: "dark" | "light" | "blur";
	scrollBehavior?: "inside" | "outside";
	testID?: string;
}

export function Modal({
	visible,
	onClose,
	children,
	title,
	size = "md",
	closeOnBackdropPress = true,
	closeOnEscape = true,
	showCloseButton = true,
	animationType = "fade",
	backdrop = "dark",
	scrollBehavior = "inside",
	testID,
}: ModalProps) {
	React.useEffect(() => {
		if (visible && closeOnEscape) {
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					onClose();
				}
			};
			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [visible, closeOnEscape, onClose]);

	if (!visible) return null;

	const modalClassNames = [
		"modal",
		`modal--${size}`,
		`modal--${animationType}`,
		scrollBehavior === "outside" && "modal--scroll-outside",
	]
		.filter(Boolean)
		.join(" ");

	const backdropClassNames = ["modal__backdrop", `modal__backdrop--${backdrop}`].join(" ");

	return (
		<div className="modal__container" data-testid={testID}>
			<div
				className={backdropClassNames}
				onClick={closeOnBackdropPress ? onClose : undefined}
				role={closeOnBackdropPress ? "button" : undefined}
				tabIndex={closeOnBackdropPress ? 0 : undefined}
				onKeyDown={
					closeOnBackdropPress
						? (e) => {
								if (e.key === "Enter" || e.key === " ") onClose();
							}
						: undefined
				}
				aria-label={closeOnBackdropPress ? "Close modal" : undefined}
			/>
			<div className={modalClassNames}>
				{(title || showCloseButton) && (
					<div className="modal__header">
						{title && <h2 className="modal__title">{title}</h2>}
						{showCloseButton && (
							<button
								type="button"
								className="modal__close"
								onClick={onClose}
								aria-label="Close modal"
							>
								<MaterialIcon name="close" size="medium" />
							</button>
						)}
					</div>
				)}
				<div className="modal__content">{children}</div>
			</div>
		</div>
	);
}

// Divider component for demos
export interface DividerProps {
	orientation?: "horizontal" | "vertical";
	variant?: "solid" | "dashed" | "dotted";
	spacing?: "none" | "sm" | "md" | "lg";
	thickness?: number;
	color?: string;
	label?: string;
	labelPosition?: "start" | "center" | "end";
	inset?: boolean | number;
	style?: React.CSSProperties;
	testID?: string;
}

export function Divider({
	orientation = "horizontal",
	variant = "solid",
	spacing = "md",
	thickness = 1,
	color = "var(--color-outline-variant)",
	label,
	labelPosition = "center",
	inset = false,
	style,
	testID,
}: DividerProps) {
	const isVertical = orientation === "vertical";
	const insetValue = typeof inset === "number" ? inset : inset ? 16 : 0;

	const classNames = [
		"divider",
		`divider--${orientation}`,
		`divider--${variant}`,
		`divider--spacing-${spacing}`,
		label && "divider--with-label",
		label && `divider--label-${labelPosition}`,
	]
		.filter(Boolean)
		.join(" ");

	const lineStyle: React.CSSProperties = {
		[isVertical ? "width" : "height"]: thickness,
		backgroundColor: variant === "solid" ? color : "transparent",
		borderColor: color,
		[isVertical ? "marginTop" : "marginLeft"]: insetValue,
		[isVertical ? "marginBottom" : "marginRight"]: insetValue,
	};

	if (variant === "dashed") {
		lineStyle.borderStyle = "dashed";
		lineStyle[isVertical ? "borderLeftWidth" : "borderTopWidth"] = thickness;
	} else if (variant === "dotted") {
		lineStyle.borderStyle = "dotted";
		lineStyle[isVertical ? "borderLeftWidth" : "borderTopWidth"] = thickness;
	}

	return (
		<div className={classNames} style={style} data-testid={testID}>
			{label ? (
				<>
					<div className="divider__line" style={lineStyle} />
					<span className="divider__label">{label}</span>
					<div className="divider__line" style={lineStyle} />
				</>
			) : (
				<div className="divider__line" style={lineStyle} />
			)}
		</div>
	);
}

// View component for demos (simple wrapper around div with RN-like props)
export interface ViewProps {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	testID?: string;
	accessible?: boolean;
	accessibilityLabel?: string;
	accessibilityRole?: string;
	onLayout?: (event: any) => void;
	pointerEvents?: "box-none" | "none" | "box-only" | "auto";
}

export function View({
	children,
	style,
	testID,
	accessible,
	accessibilityLabel,
	accessibilityRole,
	onLayout,
	pointerEvents = "auto",
}: ViewProps) {
	const pointerEventsStyle: React.CSSProperties =
		pointerEvents === "none"
			? { pointerEvents: "none" }
			: pointerEvents === "box-none"
				? { pointerEvents: "none" }
				: pointerEvents === "box-only"
					? { pointerEvents: "auto" }
					: {};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				...style,
				...pointerEventsStyle,
			}}
			data-testid={testID}
			{...(accessibilityRole && accessibilityLabel ? { "aria-label": accessibilityLabel } : {})}
			role={accessibilityRole}
		>
			{children}
		</div>
	);
}

// Alert component for demos
export interface AlertProps {
	type?: "info" | "success" | "warning" | "error";
	title: string;
	description?: string;
	icon?: string | boolean;
	variant?: "filled" | "outlined" | "standard";
	closable?: boolean;
	onClose?: () => void;
	action?: React.ReactNode;
	style?: React.CSSProperties;
	testID?: string;
}

export function Alert({
	type = "info",
	title,
	description,
	icon = true,
	variant = "standard",
	closable = false,
	onClose,
	action,
	style,
	testID,
}: AlertProps) {
	const [visible, setVisible] = React.useState(true);

	if (!visible && closable) return null;

	const defaultIcons = {
		info: "info",
		success: "check_circle",
		warning: "warning",
		error: "error",
	};

	const iconName = typeof icon === "string" ? icon : icon ? defaultIcons[type] : null;

	const classNames = ["alert", `alert--${type}`, `alert--${variant}`, closable && "alert--closable"]
		.filter(Boolean)
		.join(" ");

	const handleClose = () => {
		if (closable) {
			setVisible(false);
			onClose?.();
		}
	};

	return (
		<div className={classNames} style={style} data-testid={testID} role="alert">
			{iconName && <MaterialIcon name={iconName} size="medium" className="alert__icon" />}
			<div className="alert__content">
				<div className="alert__title">{title}</div>
				{description && <div className="alert__description">{description}</div>}
			</div>
			{action && <div className="alert__action">{action}</div>}
			{closable && (
				<button
					type="button"
					className="alert__close"
					onClick={handleClose}
					aria-label="Close alert"
				>
					<MaterialIcon name="close" size="small" />
				</button>
			)}
		</div>
	);
}
