import type { TabsOwnProps } from "@mui/base/Tabs";
import type { OverridableStringUnion, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type TabsSlot = "root";

export interface TabsSlots {
	/**
	 * The component that renders the root.
	 * @default 'div'
	 */
	root?: React.ElementType;
}

export type TabsSlotsAndSlotProps = CreateSlotsAndSlotProps<
	TabsSlots,
	{
		root: SlotProps<"div", {}, TabsOwnerState>;
	}
>;

export type TabsPropsColorOverrides = {};
export type TabsPropsVariantOverrides = {};
export type TabsPropsSizeOverrides = {};

export interface TabsTypeMap<P = {}, D extends React.ElementType = "div"> {
	props: P &
		Omit<TabsOwnProps, "slots" | "slotProps"> & {
			/**
			 * The color of the component. It supports those theme colors that make sense for this component.
			 * @default 'neutral'
			 */
			color?: OverridableStringUnion<ColorPaletteProp, TabsPropsColorOverrides>;
			/**
			 * The size of the component.
			 * @default 'md'
			 */
			size?: OverridableStringUnion<"sm" | "md" | "lg", TabsPropsSizeOverrides>;
			/**
			 * The system prop that allows defining system overrides as well as additional CSS styles.
			 */
			sx?: SxProps;
			/**
			 * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
			 * @default 'plain'
			 */
			variant?: OverridableStringUnion<VariantProp, TabsPropsVariantOverrides>;
		} & TabsSlotsAndSlotProps;
	defaultComponent: D;
}

export type TabsProps<
	D extends React.ElementType = TabsTypeMap["defaultComponent"],
	P = { component?: React.ElementType },
> = OverrideProps<TabsTypeMap<P, D>, D>;

export interface TabsOwnerState extends ApplyColorInversion<TabsProps> {}
