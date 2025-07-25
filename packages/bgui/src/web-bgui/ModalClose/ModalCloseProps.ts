import type { OverridableStringUnion, OverrideProps } from "@mui/types";
import type * as React from "react";
import type { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type ModalCloseSlot = "root";

export interface ModalCloseSlots {
	/**
	 * The component that renders the root.
	 * @default 'button'
	 */
	root?: React.ElementType;
}

export type ModalCloseSlotsAndSlotProps = CreateSlotsAndSlotProps<
	ModalCloseSlots,
	{
		root: SlotProps<"button", {}, ModalCloseOwnerState>;
	}
>;

export type ModalClosePropsColorOverrides = {};
export type ModalClosePropsVariantOverrides = {};
export type ModalClosePropsSizeOverrides = {};

export interface ModalCloseTypeMap<P = {}, D extends React.ElementType = "button"> {
	props: P & {
		/**
		 * The color of the component. It supports those theme colors that make sense for this component.
		 * @default 'neutral'
		 */
		color?: OverridableStringUnion<ColorPaletteProp, ModalClosePropsColorOverrides>;
		/**
		 * The size of the component.
		 * @default 'md'
		 */
		size?: OverridableStringUnion<"sm" | "md" | "lg", ModalClosePropsSizeOverrides>;
		/**
		 * The system prop that allows defining system overrides as well as additional CSS styles.
		 */
		sx?: SxProps;
		/**
		 * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
		 * @default 'plain'
		 */
		variant?: OverridableStringUnion<VariantProp, ModalClosePropsVariantOverrides>;
	} & ModalCloseSlotsAndSlotProps;
	defaultComponent: D;
}

export type ModalCloseProps<
	D extends React.ElementType = ModalCloseTypeMap["defaultComponent"],
	P = { component?: React.ElementType },
> = OverrideProps<ModalCloseTypeMap<P, D>, D>;

export interface ModalCloseOwnerState extends ApplyColorInversion<ModalCloseProps> {
	focusVisible?: boolean;
}
