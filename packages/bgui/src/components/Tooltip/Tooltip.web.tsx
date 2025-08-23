"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { theme as restyleTheme } from "../../theme";
import type { TooltipProps } from "./TooltipProps";

/**
 * Web implementation of Tooltip component
 *
 * Provides an accessible tooltip with multiple variants and states.
 * Based on Joy UI's Tooltip implementation with positioning and timing logic.
 */

// Add global styles for tooltip animations
if (typeof document !== "undefined" && !document.getElementById("bgui-tooltip-styles")) {
	const style = document.createElement("style");
	style.id = "bgui-tooltip-styles";
	style.textContent = `
    @keyframes bgui-tooltip-fade-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes bgui-tooltip-fade-out {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.8); }
    }
  `;
	document.head.appendChild(style);
}

// Type definitions for positioning
type PlacementType = NonNullable<TooltipProps["placement"]>;
type Position = { top: number; left: number };

// Timeout utility class
class Timeout {
	private timeoutId: number | null = null;

	start(delay: number, callback: () => void) {
		this.clear();
		this.timeoutId = window.setTimeout(callback, delay);
	}

	clear() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}
}

// Focus visibility detection
const isFocusVisible = (element: Element): boolean => {
	try {
		return element.matches(":focus-visible");
	} catch {
		// Fallback for browsers without :focus-visible
		return false;
	}
};

// Global variables for hysteresis behavior
let hystersisOpen = false;
const hystersisTimer = new Timeout();

// Cursor position tracking
let cursorPosition = { x: 0, y: 0 };

// Generate unique ID
const generateId = () => `tooltip-${Math.random().toString(36).substr(2, 9)}`;

// Compose event handlers
const composeEventHandler = (
	handler: (...args: any[]) => void,
	existingHandler?: (...args: any[]) => void,
) => {
	return (...args: any[]) => {
		if (existingHandler) {
			existingHandler(...args);
		}
		handler(...args);
	};
};

// Calculate tooltip position based on placement
const calculatePosition = (
	triggerElement: HTMLElement,
	tooltipElement: HTMLElement,
	placement: PlacementType,
	followCursor = false,
): Position => {
	if (followCursor) {
		const offset = 10;
		return {
			top: cursorPosition.y + offset,
			left: cursorPosition.x + offset,
		};
	}

	const triggerRect = triggerElement.getBoundingClientRect();
	const tooltipRect = tooltipElement.getBoundingClientRect();
	const offset = 10;

	let top = 0;
	let left = 0;

	switch (placement) {
		case "top":
			top = triggerRect.top - tooltipRect.height - offset;
			left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
			break;
		case "top-start":
			top = triggerRect.top - tooltipRect.height - offset;
			left = triggerRect.left;
			break;
		case "top-end":
			top = triggerRect.top - tooltipRect.height - offset;
			left = triggerRect.right - tooltipRect.width;
			break;
		case "bottom":
			top = triggerRect.bottom + offset;
			left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
			break;
		case "bottom-start":
			top = triggerRect.bottom + offset;
			left = triggerRect.left;
			break;
		case "bottom-end":
			top = triggerRect.bottom + offset;
			left = triggerRect.right - tooltipRect.width;
			break;
		case "left":
			top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
			left = triggerRect.left - tooltipRect.width - offset;
			break;
		case "left-start":
			top = triggerRect.top;
			left = triggerRect.left - tooltipRect.width - offset;
			break;
		case "left-end":
			top = triggerRect.bottom - tooltipRect.height;
			left = triggerRect.left - tooltipRect.width - offset;
			break;
		case "right":
			top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
			left = triggerRect.right + offset;
			break;
		case "right-start":
			top = triggerRect.top;
			left = triggerRect.right + offset;
			break;
		case "right-end":
			top = triggerRect.bottom - tooltipRect.height;
			left = triggerRect.right + offset;
			break;
	}

	// Ensure tooltip stays within viewport
	const viewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	// Adjust horizontal position
	if (left < 0) {
		left = 8;
	} else if (left + tooltipRect.width > viewport.width) {
		left = viewport.width - tooltipRect.width - 8;
	}

	// Adjust vertical position
	if (top < 0) {
		top = 8;
	} else if (top + tooltipRect.height > viewport.height) {
		top = viewport.height - tooltipRect.height - 8;
	}

	return {
		top: top + window.scrollY,
		left: left + window.scrollX,
	};
};

// Calculate arrow position and styles
const calculateArrowPosition = (
	placement: PlacementType,
	backgroundColor: string,
): React.CSSProperties => {
	const arrowSize = 8;
	const styles: React.CSSProperties = {
		position: "absolute",
		width: 0,
		height: 0,
		border: `${arrowSize}px solid`,
		borderColor: "transparent",
	};

	switch (placement) {
		case "top":
		case "top-start":
		case "top-end":
			styles.top = "100%";
			styles.left =
				placement === "top-start"
					? "16px"
					: placement === "top-end"
						? `calc(100% - ${16 + arrowSize}px)`
						: "50%";
			styles.transform = placement === "top" ? "translateX(-50%)" : "none";
			styles.borderBottomWidth = 0;
			styles.borderTopColor = backgroundColor;
			break;
		case "bottom":
		case "bottom-start":
		case "bottom-end":
			styles.bottom = "100%";
			styles.left =
				placement === "bottom-start"
					? "16px"
					: placement === "bottom-end"
						? `calc(100% - ${16 + arrowSize}px)`
						: "50%";
			styles.transform = placement === "bottom" ? "translateX(-50%)" : "none";
			styles.borderTopWidth = 0;
			styles.borderBottomColor = backgroundColor;
			break;
		case "left":
		case "left-start":
		case "left-end":
			styles.left = "100%";
			styles.top =
				placement === "left-start"
					? "16px"
					: placement === "left-end"
						? `calc(100% - ${16 + arrowSize}px)`
						: "50%";
			styles.transform = placement === "left" ? "translateY(-50%)" : "none";
			styles.borderRightWidth = 0;
			styles.borderLeftColor = backgroundColor;
			break;
		case "right":
		case "right-start":
		case "right-end":
			styles.right = "100%";
			styles.top =
				placement === "right-start"
					? "16px"
					: placement === "right-end"
						? `calc(100% - ${16 + arrowSize}px)`
						: "50%";
			styles.transform = placement === "right" ? "translateY(-50%)" : "none";
			styles.borderLeftWidth = 0;
			styles.borderRightColor = backgroundColor;
			break;
	}

	return styles;
};

const TooltipComponent = forwardRef<HTMLDivElement, TooltipProps>(
	(
		{
			children,
			title,
			color = "neutral",
			variant = "solid",
			size = "md",
			open: openProp,
			defaultOpen = false,
			placement = "bottom",
			arrow = false,
			enterDelay = 0,
			leaveDelay = 0,
			disableInteractive = false,
			followCursor = false,
			disableFocusListener = false,
			disableHoverListener = false,
			disableTouchListener = false,
			enterTouchDelay = 700,
			leaveTouchDelay = 1500,
			onOpen,
			onClose,
			style,
			testID,
			id: idProp,
		},
		_ref,
	) => {
		// State management
		const [internalOpen, setInternalOpen] = useState(defaultOpen);
		const [_childIsFocusVisible, setChildIsFocusVisible] = useState(false);
		const [tooltipPosition, setTooltipPosition] = useState<Position>({ top: 0, left: 0 });

		// Refs
		const triggerRef = useRef<HTMLElement>(null);
		const tooltipRef = useRef<HTMLDivElement>(null);
		const ignoreNonTouchEvents = useRef(false);

		// Timeout instances
		const enterTimer = useRef(new Timeout());
		const leaveTimer = useRef(new Timeout());
		const touchTimer = useRef(new Timeout());
		const closeTimer = useRef(new Timeout());

		// ID generation
		const id = idProp || generateId();

		// Controlled vs uncontrolled
		const open = openProp !== undefined ? openProp : internalOpen;

		// Get theme styles
		const getThemeStyles = () => {
			const variantKey = `${variant}-${color}` as const;
			const variantStyles = restyleTheme.components.Tooltip.variants[variantKey] || {};

			const sizeStyles = {
				sm: {
					fontSize: restyleTheme.textVariants.body3.fontSize,
					padding: `${restyleTheme.spacing.xs}px ${restyleTheme.spacing.sm}px`,
				},
				md: {
					fontSize: restyleTheme.textVariants.body2.fontSize,
					padding: `${restyleTheme.spacing.sm}px ${restyleTheme.spacing.md}px`,
				},
				lg: {
					fontSize: restyleTheme.textVariants.body1.fontSize,
					padding: `${restyleTheme.spacing.md}px ${restyleTheme.spacing.lg}px`,
				},
			};

			return {
				...variantStyles,
				...sizeStyles[size],
			};
		};

		// Update tooltip position
		const updateTooltipPosition = () => {
			if (!triggerRef.current || !tooltipRef.current) return;

			const position = calculatePosition(
				triggerRef.current,
				tooltipRef.current,
				placement,
				followCursor,
			);
			setTooltipPosition(position);
		};

		// Event handlers
		const handleOpen = (event: React.SyntheticEvent) => {
			hystersisTimer.clear();
			hystersisOpen = true;

			if (openProp === undefined) {
				setInternalOpen(true);
			}

			if (onOpen && !open) {
				onOpen(event);
			}
		};

		const handleClose = (event: React.SyntheticEvent | Event) => {
			hystersisTimer.start(800 + leaveDelay, () => {
				hystersisOpen = false;
			});

			if (openProp === undefined) {
				setInternalOpen(false);
			}

			if (onClose && open) {
				onClose(event);
			}

			closeTimer.current.start(150, () => {
				ignoreNonTouchEvents.current = false;
			});
		};

		const handleMouseOver = (event: React.SyntheticEvent) => {
			if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
				return;
			}

			enterTimer.current.clear();
			leaveTimer.current.clear();

			if (enterDelay || (hystersisOpen && 0)) {
				enterTimer.current.start(hystersisOpen ? 0 : enterDelay, () => {
					handleOpen(event);
				});
			} else {
				handleOpen(event);
			}
		};

		const handleMouseLeave = (event: React.SyntheticEvent) => {
			enterTimer.current.clear();
			leaveTimer.current.start(leaveDelay, () => {
				handleClose(event);
			});
		};

		const handleFocus = (event: React.FocusEvent) => {
			if (isFocusVisible(event.target as Element)) {
				setChildIsFocusVisible(true);
				handleMouseOver(event);
			}
		};

		const handleBlur = (event: React.FocusEvent) => {
			if (!isFocusVisible(event.target as Element)) {
				setChildIsFocusVisible(false);
				handleMouseLeave(event);
			}
		};

		const handleTouchStart = (event: React.TouchEvent) => {
			ignoreNonTouchEvents.current = true;
			leaveTimer.current.clear();
			closeTimer.current.clear();

			touchTimer.current.start(enterTouchDelay, () => {
				handleMouseOver(event as any);
			});
		};

		const handleTouchEnd = (event: React.TouchEvent) => {
			touchTimer.current.clear();
			leaveTimer.current.start(leaveTouchDelay, () => {
				handleClose(event);
			});
		};

		const handleMouseMove = (event: React.MouseEvent) => {
			cursorPosition = { x: event.clientX, y: event.clientY };
			if (followCursor && open) {
				updateTooltipPosition();
			}
		};

		// Keyboard escape handler
		useEffect(() => {
			if (!open) return;

			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Escape") {
					handleClose(event);
				}
			};

			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [open, handleClose]);

		// Update position when open changes
		useEffect(() => {
			if (open) {
				updateTooltipPosition();
			}
		}, [open, updateTooltipPosition]);

		// Cleanup timers on unmount
		useEffect(() => {
			return () => {
				enterTimer.current.clear();
				leaveTimer.current.clear();
				touchTimer.current.clear();
				closeTimer.current.clear();
				hystersisTimer.clear();
			};
		}, []);

		// Portal for tooltip
		const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

		useEffect(() => {
			if (typeof document !== "undefined") {
				let container = document.getElementById("bgui-tooltip-portal");
				if (!container) {
					container = document.createElement("div");
					container.id = "bgui-tooltip-portal";
					document.body.appendChild(container);
				}
				setPortalContainer(container);
			}
		}, []);

		// Build tooltip styles
		const themeStyles = getThemeStyles();
		const tooltipStyles: React.CSSProperties = {
			position: "fixed",
			top: tooltipPosition.top,
			left: tooltipPosition.left,
			zIndex: 9999,
			borderRadius: restyleTheme.borderRadii.sm,
			fontFamily: restyleTheme.textVariants.body2.fontFamily,
			fontWeight: restyleTheme.textVariants.body2.fontWeight,
			lineHeight: restyleTheme.textVariants.body2.lineHeight,
			maxWidth: 300,
			wordWrap: "break-word",
			pointerEvents: disableInteractive ? "none" : "auto",
			...themeStyles,
			...style,
		};

		// Add animation classes
		if (open) {
			tooltipStyles.animation = "bgui-tooltip-fade-in 0.2s ease-out";
		}

		// Compose event handlers with existing child props
		const childElement = children as React.ReactElement;
		const childProps: any = {
			ref: triggerRef,
			...childElement.props,
		};

		// Add event listeners based on props
		if (!disableHoverListener) {
			childProps.onMouseEnter = composeEventHandler(
				handleMouseOver,
				childElement.props.onMouseEnter,
			);
			childProps.onMouseLeave = composeEventHandler(
				handleMouseLeave,
				childElement.props.onMouseLeave,
			);
			if (followCursor) {
				childProps.onMouseMove = composeEventHandler(
					handleMouseMove,
					childElement.props.onMouseMove,
				);
			}
		}

		if (!disableFocusListener) {
			childProps.onFocus = composeEventHandler(handleFocus, childElement.props.onFocus);
			childProps.onBlur = composeEventHandler(handleBlur, childElement.props.onBlur);
		}

		if (!disableTouchListener) {
			childProps.onTouchStart = composeEventHandler(
				handleTouchStart,
				childElement.props.onTouchStart,
			);
			childProps.onTouchEnd = composeEventHandler(handleTouchEnd, childElement.props.onTouchEnd);
		}

		// ARIA attributes
		childProps["aria-describedby"] = open ? id : undefined;

		// Don't render if title is empty
		if (!title) return React.cloneElement(childElement, childProps);

		// Render tooltip
		const renderTooltip = () => {
			if (!open || !portalContainer) return null;

			const tooltip = (
				<div
					ref={tooltipRef}
					id={id}
					role="tooltip"
					style={tooltipStyles}
					data-testid={testID}
					onMouseEnter={!disableInteractive ? handleMouseOver : undefined}
					onMouseLeave={!disableInteractive ? handleMouseLeave : undefined}
				>
					{title}
					{arrow && (
						<div
							style={calculateArrowPosition(
								placement,
								(themeStyles.backgroundColor as string) || restyleTheme.colors.surface,
							)}
						>
							{/* Arrow styling handled by border styles */}
						</div>
					)}
				</div>
			);

			// Use portal to render tooltip at document body level
			return portalContainer ? React.createPortal(tooltip, portalContainer) : tooltip;
		};

		return (
			<>
				{React.cloneElement(childElement, childProps)}
				{renderTooltip()}
			</>
		);
	},
);

TooltipComponent.displayName = "Tooltip";

export const Tooltip = TooltipComponent;
