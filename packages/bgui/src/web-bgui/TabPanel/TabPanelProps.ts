import type { TabPanelOwnProps } from "@mui/base/TabPanel";
import type { OverridableStringUnion, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type TabPanelSlot = "root";

export interface TabPanelSlots {
	/**
	 * The component that renders the root.
	 * @default 'div'
	 */
	root?: React.ElementType;
}

export type TabPanelSlotsAndSlotProps = CreateSlotsAndSlotProps<
	TabPanelSlots,
	{
		root: SlotProps<"div", {}, TabPanelOwnerState>;
	}
>;

export type TabPanelPropsColorOverrides = {};

export type TabPanelPropsVariantOverrides = {};

export type TabPanelPropsSizeOverrides = {};

export interface TabPanelTypeMap<P = {}, D extends React.ElementType = "div"> {
	props: P &
		Omit<TabPanelOwnProps, "value" | "slots" | "slotProps"> & {
			/**
			 * The color of the component. It supports those theme colors that make sense for this component.
			 * @default 'neutral'
			 */
			color?: OverridableStringUnion<ColorPaletteProp, TabPanelPropsColorOverrides>;
			/**
			 * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
			 * @default 0
			 */
			value?: number | string;
			/**
			 * The size of the component.
			 */
			size?: OverridableStringUnion<"sm" | "md" | "lg", TabPanelPropsSizeOverrides>;
			/**
			 * The system prop that allows defining system overrides as well as additional CSS styles.
			 */
			sx?: SxProps;
			/**
			 * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
			 * @default 'plain'
			 */
			variant?: OverridableStringUnion<VariantProp, TabPanelPropsVariantOverrides>;
			/**
			 * Always keep the children in the DOM.
			 * @default false
			 */
			keepMounted?: boolean;
		} & TabPanelSlotsAndSlotProps;
	defaultComponent: D;
}

export type TabPanelProps<
	D extends React.ElementType = TabPanelTypeMap["defaultComponent"],
	P = { component?: React.ElementType },
> = OverrideProps<TabPanelTypeMap<P, D>, D>;

export interface TabPanelOwnerState extends ApplyColorInversion<TabPanelProps> {
	/**
	 * If `true`, the element is not visible on the screen.
	 */
	hidden: boolean;
	/**
	 * The orientation of the Tabs.
	 */
	orientation?: "horizontal" | "vertical";
}
