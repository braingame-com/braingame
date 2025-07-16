import type { MenuActions as BaseMenuActions } from "@mui/base/Menu";
import type { OverridableStringUnion, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type MenuListSlot = "root";

export interface MenuListSlots {
	/**
	 * The component that renders the root.
	 * @default 'ul'
	 */
	root?: React.ElementType;
}

export type MenuListSlotsAndSlotProps = CreateSlotsAndSlotProps<
	MenuListSlots,
	{
		root: SlotProps<"ul", {}, MenuListOwnerState>;
	}
>;

export type MenuListPropsSizeOverrides = {};
export type MenuListPropsColorOverrides = {};
export type MenuListPropsVariantOverrides = {};

export interface MenuListTypeMap<P = {}, D extends React.ElementType = "ul"> {
	props: P & {
		/**
		 * A ref with imperative actions.
		 * It allows to select the first or last menu item.
		 */
		actions?: React.Ref<BaseMenuActions>;
		/**
		 * The color of the component. It supports those theme colors that make sense for this component.
		 * @default 'neutral'
		 */
		color?: OverridableStringUnion<ColorPaletteProp, MenuListPropsColorOverrides>;
		/**
		 * Function called when the items displayed in the menu change.
		 */
		onItemsChange?: (items: string[]) => void;
		/**
		 * The size of the component (affect other nested list* components because the `Menu` inherits `List`).
		 * @default 'md'
		 */
		size?: OverridableStringUnion<"sm" | "md" | "lg", MenuListPropsSizeOverrides>;
		/**
		 * The system prop that allows defining system overrides as well as additional CSS styles.
		 */
		sx?: SxProps;
		/**
		 * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
		 * @default 'outlined'
		 */
		variant?: OverridableStringUnion<VariantProp, MenuListPropsVariantOverrides>;
	} & MenuListSlotsAndSlotProps;
	defaultComponent: D;
}

export type MenuListProps<
	D extends React.ElementType = MenuListTypeMap["defaultComponent"],
	P = {
		component?: React.ElementType;
	},
> = OverrideProps<MenuListTypeMap<P, D>, D>;

export interface MenuListOwnerState extends ApplyColorInversion<MenuListProps> {}
