"use client";
import * as React from "react";
import { theme as restyleTheme } from "../../theme";
import { CircularProgress } from "../CircularProgress/CircularProgress.web";
import type { IconButtonProps } from "./IconButtonProps";

/**
 * Web implementation of IconButton
 *
 * IconButtons allow users to take actions with a single tap.
 * Based on Joy UI's IconButton implementation.
 */

// Helper to merge refs
function useForkRef<T>(...refs: Array<React.Ref<T> | undefined | null>): React.RefCallback<T> {
	return React.useCallback(
		(value: T | null) => {
			refs.forEach((ref) => {
				if (typeof ref === "function") {
					ref(value);
				} else if (ref && typeof ref === "object") {
					(ref as React.MutableRefObject<T | null>).current = value;
				}
			});
		},
		[...refs, refs.forEach],
	);
}

// Custom useButton hook implementation
function useButton(props: {
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
	onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
	href?: string;
	rootRef?: React.Ref<HTMLElement>;
}) {
	const [focusVisible, setFocusVisible] = React.useState(false);

	const handleFocus = React.useCallback(
		(event: React.FocusEvent<HTMLButtonElement>) => {
			// Check if focus is from keyboard
			if (event.target.matches(":focus-visible")) {
				setFocusVisible(true);
			}
			props.onFocus?.(event);
		},
		[props.onFocus],
	);

	const handleBlur = React.useCallback(
		(event: React.FocusEvent<HTMLButtonElement>) => {
			setFocusVisible(false);
			props.onBlur?.(event);
		},
		[props.onBlur],
	);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === " " || event.key === "Enter") {
				setFocusVisible(true);
			}
			props.onKeyDown?.(event);
		},
		[props.onKeyDown],
	);

	const getRootProps = () => ({
		disabled: props.disabled,
		onClick: props.onClick,
		onFocus: handleFocus,
		onBlur: handleBlur,
		onKeyDown: handleKeyDown,
		onKeyUp: props.onKeyUp,
		type: props.type || "button",
		href: props.href,
		ref: props.rootRef,
	});

	return {
		focusVisible,
		setFocusVisible,
		getRootProps,
	};
}

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
	function IconButton(props, ref) {
		const {
			children,
			color = "neutral",
			variant = "plain",
			size = "md",
			disabled: disabledProp = false,
			loading = false,
			loadingIndicator: loadingIndicatorProp,
			loadingPosition = "center",
			href,
			fullWidth = false,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
			"aria-pressed": ariaPressed,
			"aria-expanded": ariaExpanded,
			"aria-controls": ariaControls,
			"aria-checked": ariaChecked,
			...other
		} = props;

		// Note: ButtonGroup and ToggleButtonGroup context support could be added here
		// if needed in the future by checking React.useContext(ButtonGroupContext)
		// and React.useContext(ToggleButtonGroupContext)

		const disabled = disabledProp || loading;
		const Component = href && !disabled ? "a" : "button";

		const buttonRef = React.useRef<HTMLElement>(null);
		const handleRef = useForkRef(buttonRef, ref as React.Ref<HTMLElement>);

		const { focusVisible, getRootProps } = useButton({
			...props,
			disabled,
			rootRef: handleRef,
		});

		// Get variant styles from theme
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.IconButton?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: {
				minWidth: 32,
				minHeight: 32,
				fontSize: 20, // Icon size: 32 / 1.6 = 20
				paddingInline: 2,
				loadingSize: "sm" as const,
			},
			md: {
				minWidth: 36,
				minHeight: 36,
				fontSize: 24, // Icon size: 36 / 1.5 = 24
				paddingInline: 4,
				loadingSize: "sm" as const,
			},
			lg: {
				minWidth: 44,
				minHeight: 44,
				fontSize: 28, // Icon size: 44 / 1.571 = 28
				paddingInline: 6,
				loadingSize: "md" as const,
			},
		}[size];

		// Base styles
		const baseStyles: React.CSSProperties = {
			// Reset
			WebkitTapHighlightColor: "transparent",
			margin: 0,
			border: "none",
			outline: "none",
			background: "transparent",
			cursor: disabled ? "default" : "pointer",
			textDecoration: "none",

			// Layout
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			boxSizing: "border-box",

			// Sizing
			minWidth: fullWidth ? "100%" : sizeConfig.minWidth,
			minHeight: sizeConfig.minHeight,
			paddingLeft: sizeConfig.paddingInline,
			paddingRight: sizeConfig.paddingInline,
			paddingTop: 0,
			paddingBottom: 0,

			// Typography
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			fontWeight: restyleTheme.fontWeights.md,
			fontSize: restyleTheme.fontSizes.md,

			// Shape
			borderRadius: restyleTheme.radii.sm,

			// Colors from variant
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			...(variantStyles.borderWidth && {
				borderWidth: variantStyles.borderWidth,
				borderStyle: "solid",
				borderColor: variantStyles.borderColor || restyleTheme.colors.outline,
			}),

			// Transitions
			transition: "background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.1s",

			// States
			opacity: disabled ? 0.38 : 1,
			pointerEvents: disabled ? "none" : "auto",

			// Custom styles
			...style,
		};

		// Hover styles (applied via onMouseEnter/Leave)
		const [isHovered, setIsHovered] = React.useState(false);
		const hoverStyles = React.useMemo(() => {
			if (!isHovered || disabled) return {};

			// Map colors to their container versions
			const containerColorMap: Record<string, string> = {
				primary: "primaryContainer",
				neutral: "surfaceVariant",
				danger: "errorContainer",
				success: "successContainer",
				warning: "warningContainer",
			};

			const containerColor =
				(restyleTheme.colors as Record<string, string>)[containerColorMap[color]] ||
				"rgba(0, 0, 0, 0.04)";

			// Default hover styles based on variant
			if (variant === "plain") {
				return {
					backgroundColor: containerColor,
				};
			}
			if (variant === "outlined") {
				return {
					backgroundColor: containerColor,
				};
			}
			if (variant === "soft") {
				return {
					backgroundColor: containerColor,
					opacity: 0.8,
				};
			}
			if (variant === "solid") {
				return {
					opacity: 0.8,
				};
			}
			return {};
		}, [isHovered, disabled, variant, color]);

		// Active/pressed styles
		const [isActive, setIsActive] = React.useState(false);
		const activeStyles = React.useMemo(() => {
			if (!isActive || disabled) return {};

			return {
				transform: "scale(0.95)",
			};
		}, [isActive, disabled]);

		// Focus visible styles
		const focusStyles = React.useMemo(() => {
			if (!focusVisible) return {};

			return {
				outline: `2px solid ${restyleTheme.colors.primary}`,
				outlineOffset: 2,
			};
		}, [focusVisible]);

		// Combined styles
		const combinedStyles = {
			...baseStyles,
			...hoverStyles,
			...activeStyles,
			...focusStyles,
		};

		// Icon styles
		const iconStyles: React.CSSProperties = {
			fontSize: sizeConfig.fontSize,
			color: "currentColor",
		};

		// Loading indicator
		const loadingIndicator = loadingIndicatorProp || (
			<CircularProgress
				size={sizeConfig.loadingSize}
				color={color}
				variant={variant === "solid" ? "soft" : variant}
				thickness={size === "sm" ? 2 : size === "md" ? 3 : 4}
			/>
		);

		// Loading indicator container styles
		const loadingStyles: React.CSSProperties = {
			display: "flex",
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)",
			color: variantStyles.color || "inherit",
		};

		const rootProps = getRootProps();

		return (
			// @ts-ignore - Complex polymorphic component with dynamic props
			<Component
				{...rootProps}
				{...other}
				style={combinedStyles}
				onMouseEnter={(e) => {
					setIsHovered(true);
					if (Component === "a" && other.onMouseEnter) {
						(other.onMouseEnter as React.MouseEventHandler<HTMLElement>)(e);
					}
				}}
				onMouseLeave={(e) => {
					setIsHovered(false);
					setIsActive(false);
					if (Component === "a" && other.onMouseLeave) {
						(other.onMouseLeave as React.MouseEventHandler<HTMLElement>)(e);
					}
				}}
				onMouseDown={(e) => {
					setIsActive(true);
					if (Component === "a" && other.onMouseDown) {
						(other.onMouseDown as React.MouseEventHandler<HTMLElement>)(e);
					}
				}}
				onMouseUp={(e) => {
					setIsActive(false);
					if (Component === "a" && other.onMouseUp) {
						(other.onMouseUp as React.MouseEventHandler<HTMLElement>)(e);
					}
				}}
				aria-label={ariaLabel || "Icon button"}
				aria-describedby={ariaDescribedby}
				aria-labelledby={ariaLabelledby}
				aria-pressed={ariaPressed}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}
				aria-checked={ariaChecked}
				aria-busy={loading}
				data-testid={testID}
			>
				{loading && loadingPosition === "center" ? (
					<>
						<span style={{ opacity: 0, display: "flex" }}>{children}</span>
						<span style={loadingStyles}>{loadingIndicator}</span>
					</>
				) : (
					<span style={iconStyles}>{children}</span>
				)}
			</Component>
		);
	},
);

IconButton.displayName = "IconButton";
