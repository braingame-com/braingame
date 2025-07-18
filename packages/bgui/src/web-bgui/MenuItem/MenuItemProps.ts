import type { OverridableComponent, OverridableTypeMap, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ListItemButtonProps } from "../ListItemButton/ListItemButtonProps";
import type { ApplyColorInversion } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type MenuItemSlot = "root";

export interface MenuItemSlots {
	/**
	 * The component that renders the root.
	 * @default 'div'
	 */
	root?: React.ElementType;
}

export type MenuItemSlotsAndSlotProps = CreateSlotsAndSlotProps<
	MenuItemSlots,
	{
		root: SlotProps<"div", {}, MenuItemOwnerState>;
	}
>;

export type MenuItemPropsVariantOverrides = {};
export type MenuItemPropsColorOverrides = {};

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = "div"> {
	props: P & Omit<ListItemButtonProps, "slots" | "slotProps"> & MenuItemSlotsAndSlotProps;
	defaultComponent: D;
}

export interface ExtendMenuItemTypeMap<M extends OverridableTypeMap> {
	props: M["props"] & MenuItemTypeMap["props"];
	defaultComponent: M["defaultComponent"];
}

export type MenuItemProps<
	D extends React.ElementType = MenuItemTypeMap["defaultComponent"],
	P = {
		component?: React.ElementType;
	},
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export interface MenuItemOwnerState extends ApplyColorInversion<MenuItemProps> {
	/**
	 * If `true`, the element's focus is visible.
	 */
	focusVisible?: boolean;
}

export type ExtendMenuItem<M extends OverridableTypeMap> = ((
	props: OverrideProps<ExtendMenuItemTypeMap<M>, "a">,
) => React.JSX.Element) &
	OverridableComponent<ExtendMenuItemTypeMap<M>>;
