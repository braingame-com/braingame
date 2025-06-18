import { type ComponentRef, forwardRef } from "react";
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

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handlePress();
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				onArrowNext?.();
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				onArrowPrev?.();
			}
		};

		// Determine the appropriate role based on selectable state
		const role = selectable ? "option" : "menuitem";

		return (
			<Pressable
				ref={ref}
				accessibilityRole={role}
				role={role}
				aria-selected={selectable ? selected : undefined}
				aria-disabled={disabled}
				aria-checked={selectable ? selected : undefined}
				tabIndex={disabled ? -1 : 0}
				onPress={handlePress}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 8,
					backgroundColor: background,
					opacity: disabled ? 0.5 : 1,
					cursor: disabled ? "not-allowed" : "pointer",
				}}
				{...rest}
			>
				{icon && <Icon name={icon} style={{ marginRight: 8 }} aria-hidden="true" />}
				<Text>{children}</Text>
				{selectable && selected && (
					<Icon name="check" style={{ marginLeft: "auto" }} aria-label="Selected" />
				)}
			</Pressable>
		);
	},
);

ActionListItem.displayName = "ActionListItem";
