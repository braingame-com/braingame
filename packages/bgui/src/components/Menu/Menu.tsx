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
import { Tokens } from "../../../../utils/constants/Tokens";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Text } from "../../../Text";
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
	placement = "bottom-start",
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
		};

		document.addEventListener("keydown", handleKeyDown);
		(first || menu).focus();

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [close, visible]);

	const backgroundColor = useThemeColor("card");

	const triggerElement = React.isValidElement(trigger)
		? cloneElement(trigger as React.ReactElement, {
				onPress: variant === "dropdown" ? open : undefined,
				onContextMenu: variant === "context" ? open : undefined,
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
					accessibilityLabel={ariaLabel}
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

const styles = StyleSheet.create({
	menu: {
		minWidth: 160,
		borderRadius: Tokens.xs,
		paddingVertical: Tokens.xs,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	item: {
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
	},
});
