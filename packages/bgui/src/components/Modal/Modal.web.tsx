"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./ModalProps";

/**
 * Web implementation of Modal
 *
 * Based on Joy UI Modal implementation with inline styles using restyleTheme.
 * Features:
 * - Backdrop support with blur effect
 * - Focus trap functionality
 * - Escape key handling
 * - Portal rendering
 * - Accessibility features
 */

// Custom hook for focus trap functionality
const useFocusTrap = (
	isOpen: boolean,
	containerRef: React.RefObject<HTMLElement>,
	disableEnforceFocus = false,
	disableAutoFocus = false,
	disableRestoreFocus = false,
) => {
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);

	const getFocusableElements = useCallback((container: HTMLElement) => {
		const focusableSelectors = [
			"button:not([disabled])",
			"[href]",
			"input:not([disabled])",
			"select:not([disabled])",
			"textarea:not([disabled])",
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable="true"]',
		];

		return Array.from(
			container.querySelectorAll<HTMLElement>(focusableSelectors.join(", ")),
		).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
	}, []);

	const trapFocus = useCallback(
		(e: KeyboardEvent) => {
			if (e.key !== "Tab" || disableEnforceFocus || !containerRef.current) return;

			const focusableElements = getFocusableElements(containerRef.current);
			if (focusableElements.length === 0) return;

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		},
		[containerRef, disableEnforceFocus, getFocusableElements],
	);

	useEffect(() => {
		if (isOpen) {
			// Store the last focused element
			lastFocusedElementRef.current = document.activeElement as HTMLElement;

			// Auto focus first element if enabled
			if (!disableAutoFocus && containerRef.current) {
				const focusableElements = getFocusableElements(containerRef.current);
				if (focusableElements.length > 0) {
					focusableElements[0].focus();
				}
			}

			// Add keyboard event listener
			document.addEventListener("keydown", trapFocus);

			return () => {
				document.removeEventListener("keydown", trapFocus);
			};
		}
		// Restore focus when modal closes
		if (!disableRestoreFocus && lastFocusedElementRef.current) {
			lastFocusedElementRef.current.focus();
		}
	}, [
		isOpen,
		disableAutoFocus,
		disableRestoreFocus,
		trapFocus,
		containerRef,
		getFocusableElements,
	]);
};

// Custom hook for scroll lock
const useScrollLock = (isOpen: boolean, disabled = false) => {
	useEffect(() => {
		if (disabled || !isOpen) return;

		// Store original styles
		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;

		// Calculate scrollbar width
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		// Apply scroll lock
		document.body.style.overflow = "hidden";
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			// Restore original styles
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		};
	}, [isOpen, disabled]);
};

export const Modal: React.FC<ModalProps> = ({
	children,
	open,
	onClose,
	container,
	disableAutoFocus = false,
	disableEnforceFocus = false,
	disableEscapeKeyDown = false,
	disablePortal = false,
	disableRestoreFocus = false,
	disableScrollLock = false,
	hideBackdrop = false,
	keepMounted = false,
	style,
	testID,
	role = "dialog",
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	"aria-labelledby": ariaLabelledBy,
	...props
}) => {
	const [mounted, setMounted] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

	// Only run on client
	useEffect(() => {
		setMounted(true);
	}, []);

	// Focus trap
	useFocusTrap(open, rootRef, disableEnforceFocus, disableAutoFocus, disableRestoreFocus);

	// Scroll lock
	useScrollLock(open, disableScrollLock);

	// Escape key handling
	useEffect(() => {
		if (!open || disableEscapeKeyDown) return;

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && onClose) {
				onClose(event, "escapeKeyDown");
			}
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => document.removeEventListener("keydown", handleEscapeKey);
	}, [open, disableEscapeKeyDown, onClose]);

	// Backdrop click handling
	const handleBackdropClick = useCallback(
		(event: React.MouseEvent) => {
			if (event.target === backdropRef.current && onClose) {
				onClose(event, "backdropClick");
			}
		},
		[onClose],
	);

	// Don't render if not mounted (SSR safety)
	if (!mounted) return null;

	// Don't render if not open and not keeping mounted
	if (!keepMounted && !open) return null;

	// Get target container
	const targetContainer = container || document.body;

	// Root modal styles
	const rootStyles: React.CSSProperties = {
		position: "fixed",
		zIndex: 1300, // High z-index to appear above other content
		right: 0,
		bottom: 0,
		top: 0,
		left: 0,
		...(!open && {
			visibility: "hidden",
		}),
		...style,
	};

	// Backdrop styles
	const backdropStyles: React.CSSProperties = {
		zIndex: -1,
		position: "fixed",
		right: 0,
		bottom: 0,
		top: 0,
		left: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		WebkitTapHighlightColor: "transparent",
		backdropFilter: "blur(8px)",
		opacity: open ? 1 : 0,
		transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
	};

	// Child wrapper styles for accessibility
	const childWrapperStyles: React.CSSProperties = {
		outline: "none",
	};

	const modalContent = (
		<div
			ref={rootRef}
			style={rootStyles}
			data-testid={testID}
			role={role}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-labelledby={ariaLabelledBy}
			aria-modal="true"
			{...props}
		>
			{!hideBackdrop && (
				<div
					ref={backdropRef}
					style={backdropStyles}
					onClick={handleBackdropClick}
					aria-hidden="true"
				/>
			)}
			<div style={childWrapperStyles} tabIndex={-1}>
				{React.isValidElement(children)
					? React.cloneElement(children, {
							...children.props,
							...(children.props.tabIndex === undefined && {
								tabIndex: -1,
							}),
						})
					: children}
			</div>
		</div>
	);

	// Render with or without portal
	if (disablePortal) {
		return modalContent;
	}

	return createPortal(modalContent, targetContainer);
};
