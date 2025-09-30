import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Animated,
	BackHandler,
	type GestureResponderEvent,
	Platform,
	Pressable,
	Modal as RNModal,
	type StyleProp,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import type { ModalProps } from "./Modal.types";

let createPortal: typeof import("react-dom").createPortal | undefined;
if (Platform.OS === "web") {
	const reactDom = require("react-dom") as typeof import("react-dom");
	createPortal = reactDom.createPortal;
}

const FOCUSABLE_SELECTORS = [
	"button:not([disabled])",
	"[href]",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable="true"]',
];

type FocusTrapOptions = {
	disableAutoFocus: boolean;
	disableEnforceFocus: boolean;
	disableRestoreFocus: boolean;
};

type FocusTrapRefs = {
	containerRef: React.RefObject<HTMLElement | null>;
};

const useFocusTrapWeb = (
	open: boolean,
	{ containerRef }: FocusTrapRefs,
	{ disableAutoFocus, disableEnforceFocus, disableRestoreFocus }: FocusTrapOptions,
) => {
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);

	const getFocusableElements = useCallback((container: HTMLElement) => {
		return Array.from(
			container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(", ")),
		).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
	}, []);

	const trapFocus = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== "Tab" || disableEnforceFocus) {
				return;
			}

			const container = containerRef.current;
			if (!container) {
				return;
			}

			const focusableElements = getFocusableElements(container);
			if (focusableElements.length === 0) {
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];
			const activeElement = container.ownerDocument.activeElement;

			if (event.shiftKey) {
				if (activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				}
			} else if (activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		},
		[containerRef, disableEnforceFocus, getFocusableElements],
	);

	useEffect(() => {
		if (Platform.OS !== "web") {
			return;
		}

		const container = containerRef.current;
		const doc = container?.ownerDocument ?? document;

		if (open) {
			lastFocusedElementRef.current = doc.activeElement as HTMLElement | null;

			if (!disableAutoFocus) {
				const focusableElements = container ? getFocusableElements(container) : [];

				if (focusableElements.length > 0) {
					focusableElements[0].focus();
				} else {
					container?.focus();
				}
			}

			doc.addEventListener("keydown", trapFocus);
			return () => {
				doc.removeEventListener("keydown", trapFocus);
			};
		}

		if (!disableRestoreFocus) {
			lastFocusedElementRef.current?.focus();
		}
	}, [open, containerRef, disableAutoFocus, disableRestoreFocus, getFocusableElements, trapFocus]);
};

const useScrollLockWeb = (open: boolean, disabled: boolean) => {
	useEffect(() => {
		if (Platform.OS !== "web") {
			return;
		}

		if (!open || disabled) {
			return;
		}

		const { body, documentElement } = document;
		const originalOverflow = body.style.overflow;
		const originalPaddingRight = body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

		body.style.overflow = "hidden";
		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			body.style.overflow = originalOverflow;
			body.style.paddingRight = originalPaddingRight;
		};
	}, [open, disabled]);
};

const flattenWebStyle = (style: ModalProps["style"]): React.CSSProperties | undefined => {
	if (!style) {
		return undefined;
	}

	if (Array.isArray(style)) {
		const merged: Record<string, unknown> = {};
		for (const item of style) {
			if (item && typeof item === "object") {
				for (const [key, value] of Object.entries(item as Record<string, unknown>)) {
					merged[key] = value;
				}
			}
		}
		return merged;
	}

	if (typeof style === "object") {
		return style as React.CSSProperties;
	}

	return undefined;
};

const ModalWeb: React.FC<ModalProps> = ({
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
	role: _role = "dialog",
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	"aria-labelledby": ariaLabelledBy,
	...rest
}) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(false);
	const [portalContainer, setPortalContainer] = useState<Element | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (typeof container === "function") {
			setPortalContainer(container() ?? null);
		} else if (container) {
			setPortalContainer(container);
		} else {
			setPortalContainer(document.body);
		}
	}, [container]);

	useFocusTrapWeb(
		open,
		{ containerRef: rootRef },
		{
			disableAutoFocus,
			disableEnforceFocus,
			disableRestoreFocus,
		},
	);

	useScrollLockWeb(open, disableScrollLock);

	useEffect(() => {
		if (!open || disableEscapeKeyDown) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose?.(event, "escapeKeyDown");
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open, disableEscapeKeyDown, onClose]);

	const handleBackdropClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (event.target === backdropRef.current) {
				onClose?.(event, "backdropClick");
			}
		},
		[onClose],
	);

	if (!mounted) {
		return null;
	}

	if (!keepMounted && !open) {
		return null;
	}

	const resolvedStyle = flattenWebStyle(style);

	const resolvedRole = _role ?? "dialog";
	const ariaAttributes: Record<string, string> = {
		role: resolvedRole,
	};

	if (ariaLabel) {
		ariaAttributes["aria-label"] = ariaLabel;
	}

	if (ariaDescribedBy) {
		ariaAttributes["aria-describedby"] = ariaDescribedBy;
	}

	if (ariaLabelledBy) {
		ariaAttributes["aria-labelledby"] = ariaLabelledBy;
	}

	if (resolvedRole === "dialog" || resolvedRole === "alertdialog") {
		ariaAttributes["aria-modal"] = "true";
	}

	const rootStyles: React.CSSProperties = {
		position: "fixed",
		inset: 0,
		zIndex: 1300,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		...(open ? {} : { visibility: "hidden" }),
		...resolvedStyle,
	};

	const backdropStyles: React.CSSProperties = {
		position: "fixed",
		inset: 0,
		zIndex: -1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		WebkitTapHighlightColor: "transparent",
		backdropFilter: "blur(8px)",
		opacity: open ? 1 : 0,
		transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
	};

	const contentWrapperStyles: React.CSSProperties = {
		outline: "none",
	};

	const child = React.isValidElement(children)
		? React.cloneElement(children, {
				tabIndex: (children.props as { tabIndex?: number | string }).tabIndex ?? -1,
			} as Record<string, unknown>)
		: children;

	const modalContent = (
		<div
			ref={rootRef}
			style={rootStyles}
			data-testid={testID}
			{...ariaAttributes}
			data-state={open ? "open" : "closed"}
			{...rest}
		>
			{!hideBackdrop && (
				<div
					ref={backdropRef}
					style={backdropStyles}
					onMouseDown={handleBackdropClick}
					data-testid="bgui-modal-backdrop"
					aria-hidden="true"
				/>
			)}
			<div style={contentWrapperStyles} tabIndex={-1}>
				{child}
			</div>
		</div>
	);

	if (disablePortal || !createPortal) {
		return modalContent;
	}

	const targetContainer = portalContainer ?? document.body;
	return createPortal(modalContent, targetContainer);
};

const ModalNative: React.FC<ModalProps> = ({
	children,
	open,
	onClose,
	disableEscapeKeyDown = false,
	hideBackdrop = false,
	keepMounted = false,
	style,
	testID,
	role: _role = "dialog",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledBy,
}) => {
	const fadeAnim = useRef(new Animated.Value(open ? 1 : 0)).current;
	const scaleAnim = useRef(new Animated.Value(open ? 1 : 0.9)).current;
	const [visible, setVisible] = useState(open);

	useEffect(() => {
		if (open) {
			setVisible(true);
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 150,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 0.9,
					duration: 150,
					useNativeDriver: true,
				}),
			]).start(() => {
				if (!keepMounted) {
					setVisible(false);
				}
			});
		}
	}, [open, fadeAnim, scaleAnim, keepMounted]);

	useEffect(() => {
		if (!open || disableEscapeKeyDown) {
			return;
		}

		const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
			onClose?.(null, "escapeKeyDown");
			return true;
		});

		return () => subscription.remove();
	}, [open, disableEscapeKeyDown, onClose]);

	const handleBackdropPress = useCallback(
		(event: GestureResponderEvent) => {
			onClose?.(event, "backdropClick");
		},
		[onClose],
	);

	const handleRequestClose = useCallback(() => {
		onClose?.(null, "escapeKeyDown");
	}, [onClose]);

	const shouldRender = visible || keepMounted;
	if (!shouldRender) {
		return null;
	}

	return (
		<RNModal
			visible={visible}
			transparent={true}
			animationType="none"
			onRequestClose={handleRequestClose}
			statusBarTranslucent={true}
			hardwareAccelerated={true}
		>
			<View style={styles.container}>
				{!hideBackdrop && (
					<Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
						<Pressable
							style={styles.backdropPressable}
							onPress={handleBackdropPress}
							accessibilityRole="none"
							accessible={false}
							testID="bgui-modal-backdrop"
						/>
					</Animated.View>
				)}

				<Animated.View
					style={[
						styles.modalContent,
						style as StyleProp<ViewStyle>,
						{
							opacity: fadeAnim,
							transform: [{ scale: scaleAnim }],
						},
					]}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityLabelledBy={ariaLabelledBy}
					accessibilityViewIsModal={true}
				>
					{children}
				</Animated.View>
			</View>
		</RNModal>
	);
};

export const Modal: React.FC<ModalProps> = (props) => {
	if (Platform.OS === "web") {
		return <ModalWeb {...props} />;
	}

	return <ModalNative {...props} />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	backdropPressable: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	modalContent: {
		maxWidth: 400,
		width: "90%",
		borderRadius: 12,
		padding: 20,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
