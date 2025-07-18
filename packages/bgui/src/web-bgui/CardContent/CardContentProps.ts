import type { OverrideProps } from "@mui/types";
import type * as React from "react";
import type { SxProps } from "../styles/types";
import type { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export type CardContentSlot = "root";

export interface CardContentSlots {
	/**
	 * The component that renders the root.
	 * @default 'div'
	 */
	root?: React.ElementType;
}

export type CardContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
	CardContentSlots,
	{
		root: SlotProps<"div", {}, CardContentOwnerState>;
	}
>;

export interface CardContentTypeMap<P = {}, D extends React.ElementType = "div"> {
	props: P & {
		/**
		 * Used to render icon or text elements inside the CardContent if `src` is not set.
		 * This can be an element, or just a string.
		 */
		children?: React.ReactNode;
		/**
		 * The component orientation.
		 * @default 'vertical'
		 */
		orientation?: "horizontal" | "vertical";
		/**
		 * The system prop that allows defining system overrides as well as additional CSS styles.
		 */
		sx?: SxProps;
	} & CardContentSlotsAndSlotProps;
	defaultComponent: D;
}

export type CardContentProps<
	D extends React.ElementType = CardContentTypeMap["defaultComponent"],
	P = { component?: React.ElementType },
> = OverrideProps<CardContentTypeMap<P, D>, D>;

export interface CardContentOwnerState extends CardContentProps {}
