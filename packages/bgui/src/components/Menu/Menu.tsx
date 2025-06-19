import React, {
	Children,
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Text } from "../../../Text";
import { styles } from "./styles";
import type { MenuItemProps, MenuProps } from "./types";

interface MenuContextValue {
	closeMenu: () => void;
	closeOnSelect: boolean;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export const MenuItem = ({ children, onPress, disabled }: MenuItemProps) => {
	const ctx = useContext(MenuContext);

	const handlePress = () => {
		onPress?.();
		if (ctx?.closeOnSelect) {
			ctx.closeMenu();
		}
	};

	return (
		<Pressable
			accessibilityRole="menuitem"
			role="menuitem"
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled}
			onPress={handlePress}
			disabled={disabled}
			style={styles.item}
		>
			{typeof children === "string" ? <Text>{children}</Text> : children}
		</Pressable>
	);
};

export const Menu = ({
	trigger,
	children,
	placement: _placement = "bottom-start",
	variant = "dropdown",
	closeOnSelect = true,
	"aria-label": ariaLabel,
}: MenuProps) => {
	const [visible, setVisible] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const menuRef = useRef<View>(null);

	const open = (event?: React.MouseEvent<HTMLElement>) => {
		if (variant === "context" && Platform.OS === "web" && event) {
			event.preventDefault();
			setPosition({ x: event.clientX, y: event.clientY });
		}
		setVisible(true);
	};

	const close = React.useCallback(() => setVisible(false), []);

	useEffect(() => {
		if (!visible || Platform.OS !== "web") {
			return;
		}

		const menu = menuRef.current as unknown as HTMLElement | null;
		if (!menu) {
			return;
		}

		const focusable = menu.querySelectorAll<HTMLElement>(
			"button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])",
		);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				close();
			}
			if (e.key === "Tab") {
				if (focusable.length === 0) {
					return;
				}
				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first.focus();
					}
				}
			}
			// Add arrow key navigation
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				const currentIndex = Array.from(focusable).indexOf(document.activeElement as HTMLElement);
				if (currentIndex === -1) {
					first.focus();
				} else {
					const nextIndex =
						e.key === "ArrowDown"
							? (currentIndex + 1) % focusable.length
							: (currentIndex - 1 + focusable.length) % focusable.length;
					focusable[nextIndex].focus();
				}
			}
			// Home and End key navigation
			if (e.key === "Home") {
				e.preventDefault();
				first.focus();
			}
			if (e.key === "End") {
				e.preventDefault();
				last.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		(first || menu).focus();

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [close, visible]);

	const backgroundColor = useThemeColor("card");

	const triggerId = useRef(`menu-trigger-${Math.random().toString(36).slice(2)}`).current;
	const menuId = useRef(`menu-${Math.random().toString(36).slice(2)}`).current;

	const triggerElement = React.isValidElement(trigger)
		? cloneElement(trigger as React.ReactElement<any>, {
				onPress: variant === "dropdown" ? open : undefined,
				onContextMenu: variant === "context" ? open : undefined,
				"aria-haspopup": "menu",
				"aria-expanded": visible,
				"aria-controls": menuId,
				id: triggerId,
			})
		: null;

	return (
		<>
			{triggerElement}
			<Modal transparent visible={visible} onRequestClose={close} animationType="fade">
				<Pressable style={StyleSheet.absoluteFill} onPress={close} />
				<View
					ref={menuRef}
					accessibilityRole="menu"
					role="menu"
					accessibilityLabel={ariaLabel}
					aria-label={ariaLabel}
					aria-labelledby={triggerId}
					id={menuId}
					style={[
						styles.menu,
						{ backgroundColor },
						variant === "context" && { position: "absolute", left: position.x, top: position.y },
					]}
				>
					<MenuContext.Provider value={{ closeMenu: close, closeOnSelect }}>
						{Children.map(children, (child) => child)}
					</MenuContext.Provider>
				</View>
			</Modal>
		</>
	);
};
