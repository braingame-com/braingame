import { Tokens, useThemeColor } from "@braingame/utils";
import type React from "react";
import { useEffect, useRef } from "react";
import { Platform, Pressable, Modal as RNModal, StyleSheet, View } from "react-native";
import type { ModalProps } from "./types";

const FOCUSABLE_SELECTOR =
	'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

export const Modal = ({
	visible,
	onClose,
	children,
	size = "md",
	variant = "center",
	closable = true,
	backdrop = true,
	"aria-label": ariaLabel,
}: ModalProps) => {
	const contentRef = useRef<View>(null);
	const backdropColor = useThemeColor("background");

	useFocusTrap(visible, contentRef, onClose);

	if (!visible) return null;

	return (
		<RNModal
			transparent
			visible={visible}
			onRequestClose={onClose}
			animationType="fade"
			hardwareAccelerated
		>
			<Pressable
				style={[styles.backdrop, { backgroundColor: backdrop ? "rgba(0,0,0,0.5)" : "transparent" }]}
				onPress={backdrop && closable ? onClose : undefined}
			>
				<View
					ref={contentRef}
					style={[
						styles.content,
						variant === "center" ? styles.center : styles.bottomSheet,
						sizes[size],
						{ backgroundColor: backdropColor },
					]}
					accessibilityLabel={ariaLabel}
					accessibilityRole="none"
					{...(Platform.OS === "web"
						? {
								role: "dialog",
								"aria-modal": true,
								"aria-label": ariaLabel,
							}
						: {})}
				>
					{children}
				</View>
			</Pressable>
		</RNModal>
	);
};

const useFocusTrap = (active: boolean, ref: React.RefObject<View>, onClose: () => void) => {
	useEffect(() => {
		if (!active || Platform.OS !== "web") return;

		const node = ref.current as unknown as HTMLElement | null;
		if (!node) return;
		const previouslyFocused = document.activeElement as HTMLElement | null;
		const focusable = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
				return;
			}
			if (e.key !== "Tab") return;
			if (focusable.length === 0) {
				e.preventDefault();
				return;
			}
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					(last || first).focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					(first || last).focus();
				}
			}
		};

		first?.focus();
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			previouslyFocused?.focus();
		};
	}, [active, onClose, ref]);
};

const sizes = StyleSheet.create({
	sm: { width: 300 },
	md: { width: 480 },
	lg: { width: 720 },
	fullscreen: { flex: 1, width: "100%" },
});

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		borderRadius: Tokens.m,
		padding: Tokens.m,
		maxHeight: "90%",
	},
	center: {
		alignSelf: "center",
	},
	bottomSheet: {
		marginTop: "auto",
		width: "100%",
		borderTopLeftRadius: Tokens.m,
		borderTopRightRadius: Tokens.m,
	},
});
