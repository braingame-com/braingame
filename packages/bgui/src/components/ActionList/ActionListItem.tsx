import { type ComponentRef, type KeyboardEvent, forwardRef } from "react";
import { Pressable } from "react-native";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Icon } from "../../../Icon";
import { Text } from "../../../Text";
import type { ActionListItemProps } from "./types";

export const ActionListItem = forwardRef<ComponentRef<typeof Pressable>, ActionListItemProps>(
	(
		{
			icon,
			children,
			onPress,
			disabled,
			selectable,
			selected,
			onSelect,
			onArrowNext,
			onArrowPrev,
			...rest
		},
		ref,
	) => {
		const background = selected ? useThemeColor("buttonHovered") : "transparent";

		const handlePress = () => {
			onPress?.();
			if (selectable) {
				onSelect?.();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const evt = e as unknown as {
				nativeEvent?: { key?: string };
				key?: string;
				preventDefault?: () => void;
			};
			const key = evt.nativeEvent?.key || evt.key;
			if (key === "Enter" || key === " ") {
				evt.preventDefault?.();
				handlePress();
			} else if (key === "ArrowDown") {
				evt.preventDefault?.();
				onArrowNext?.();
			} else if (key === "ArrowUp") {
				evt.preventDefault?.();
				onArrowPrev?.();
			}
		};

		return (
			<Pressable
				ref={ref}
				accessibilityRole="menuitem"
				role="menuitem"
				aria-selected={selectable ? selected : undefined}
				aria-disabled={disabled}
				tabIndex={0}
				onKeyDown={handleKeyDown}
				onPress={handlePress}
				disabled={disabled}
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 8,
					backgroundColor: background,
					opacity: disabled ? 0.5 : 1,
				}}
				{...rest}
			>
				{icon && <Icon name={icon} style={{ marginRight: 8 }} />}
				<Text>{children}</Text>
			</Pressable>
		);
	},
);

ActionListItem.displayName = "ActionListItem";
