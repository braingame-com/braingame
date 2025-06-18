import { type ComponentRef, forwardRef, memo, useCallback, useMemo } from "react";
import { Platform, Pressable } from "react-native";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Icon } from "../../../Icon";
import { Text } from "../../../Text";
import type { ActionListItemProps } from "./types";

const ActionListItemComponent = forwardRef<ComponentRef<typeof Pressable>, ActionListItemProps>(
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
		const backgroundHovered = useThemeColor("buttonHovered");
		const background = selected ? backgroundHovered : "transparent";

		const handlePress = useCallback(() => {
			onPress?.();
			if (selectable) {
				onSelect?.();
			}
		}, [onPress, selectable, onSelect]);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
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
			},
			[handlePress, onArrowNext, onArrowPrev],
		);

		// Determine the appropriate role based on selectable state
		const role = selectable ? "option" : "menuitem";

		const itemStyle = useMemo(
			() => ({
				flexDirection: "row" as const,
				alignItems: "center" as const,
				padding: 8,
				backgroundColor: background,
				opacity: disabled ? 0.5 : 1,
				...(Platform.OS === "web" ? { cursor: (disabled ? "not-allowed" : "pointer") as any } : {}),
			}),
			[background, disabled],
		);

		const iconStyle = useMemo(() => ({ marginRight: 8 }), []);
		const checkIconStyle = useMemo(() => ({ marginLeft: "auto" as const }), []);

		return (
			<Pressable
				ref={ref}
				accessibilityRole={selectable ? "radio" : "menuitem"}
				role={role}
				aria-selected={selectable ? selected : undefined}
				aria-disabled={disabled}
				aria-checked={selectable ? selected : undefined}
				tabIndex={disabled ? -1 : 0}
				onPress={handlePress}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				style={itemStyle}
				{...rest}
			>
				{icon && <Icon name={icon} style={iconStyle} aria-hidden="true" />}
				<Text>{children}</Text>
				{selectable && selected && (
					<Icon name="check" style={checkIconStyle} aria-label="Selected" />
				)}
			</Pressable>
		);
	},
);

ActionListItemComponent.displayName = "ActionListItem";

// Wrap with memo for optimal performance
export const ActionListItem = memo(ActionListItemComponent);
