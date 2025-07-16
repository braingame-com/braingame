import type { MenuActions } from "@mui/base/Menu";
import type { PopperProps } from "@mui/base/Popper";
import type { OverridableStringUnion, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type MenuSlot = "root";

export interface MenuSlots {
	/**
	 * The component that renders the root.
	 * @default 'ul'
	 */
	root?: React.ElementType;
}

export type MenuSlotsAndSlotProps = CreateSlotsAndSlotProps<
	MenuSlots,
	{
		root: SlotProps<"ul", {}, MenuOwnerState>;
	}
>;

export type MenuPropsSizeOverrides = {};
export type MenuPropsColorOverrides = {};
export type MenuPropsVariantOverrides = {};

export type { MenuActions } from "@mui/base/Menu";

export interface MenuTypeMap<P = {}, D extends React.ElementType = "ul"> {
	props: P & {
		/**
		 * A ref with imperative actions.
		 * It allows to select the first or last menu item.
		 */
		actions?: React.Ref<MenuActions>;
		/**
		 * The color of the component. It supports those theme colors that make sense for this component.
		 * @default 'neutral'
		 */
		color?: OverridableStringUnion<ColorPaletteProp, MenuPropsColorOverrides>;
		/**
		 * The component used for the root node.
		 * Either a string to use a HTML element or a component.
		 */
		component?: React.ElementType;
		/**
		 * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
		 * @default false
		 */
		invertedColors?: boolean;
		/**
		 * Triggered when focus leaves the menu and the menu should close.
		 */
		onClose?: () => void;
		/**
		 * Function called when the items displayed in the menu change.
		 */
		onItemsChange?: (items: string[]) => void;
		/**
		 * Controls whether the menu is displayed.
		 * @default false
		 */
		open?: boolean;
		/**
		 * The size of the component (affect other nested list* components because the `Menu` inherits `List`).
		 * @default 'md'
		 */
		size?: OverridableStringUnion<"sm" | "md" | "lg", MenuPropsSizeOverrides>;
		/**
		 * The system prop that allows defining system overrides as well as additional CSS styles.
		 */
		sx?: SxProps;
		/**
		 * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
		 * @default 'outlined'
		 */
		variant?: OverridableStringUnion<VariantProp, MenuPropsVariantOverrides>;
	} & MenuSlotsAndSlotProps &
		Omit<PopperProps, "children" | "open">;
	defaultComponent: D;
}

export type MenuProps<
	D extends React.ElementType = MenuTypeMap["defaultComponent"],
	P = { component?: React.ElementType },
> = OverrideProps<MenuTypeMap<P, D>, D>;

export interface MenuOwnerState extends ApplyColorInversion<MenuProps> {}
