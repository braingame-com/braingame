"use client";
import { createContainer } from "@mui/system";
import type { OverridableComponent } from "@mui/types";
import PropTypes from "prop-types";
import { useThemeProps } from "../styles";
import styled from "../styles/styled";
import type { Theme } from "../styles/types/theme";
import type { ContainerTypeMap } from "./ContainerProps";

const Container = createContainer<Theme>({
	createStyledComponent: styled("div", {
		name: "JoyContainer",
		slot: "Root",
		overridesResolver: (_props, styles) => styles.root,
	}),
	useThemeProps: (inProps) => useThemeProps({ props: inProps, name: "JoyContainer" }),
}) as OverridableComponent<ContainerTypeMap>;

Container.propTypes /* remove-proptypes */ = {
	// ┌────────────────────────────── Warning ──────────────────────────────┐
	// │ These PropTypes are generated from the TypeScript type definitions. │
	// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
	// └─────────────────────────────────────────────────────────────────────┘
	/**
	 * @ignore
	 */
	children: PropTypes.node,
	/**
	 * The component used for the root node.
	 * Either a string to use a HTML element or a component.
	 */
	component: PropTypes.elementType,
	/**
	 * If `true`, the left and right padding is removed.
	 * @default false
	 */
	disableGutters: PropTypes.bool,
	/**
	 * Set the max-width to match the min-width of the current breakpoint.
	 * This is useful if you'd prefer to design for a fixed set of sizes
	 * instead of trying to accommodate a fully fluid viewport.
	 * It's fluid by default.
	 * @default false
	 */
	fixed: PropTypes.bool,
	/**
	 * Determine the max-width of the container.
	 * The container width grows with the size of the screen.
	 * Set to `false` to disable `maxWidth`.
	 * @default 'lg'
	 */
	maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
		PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
		PropTypes.string,
	]),
	/**
	 * The system prop that allows defining system overrides as well as additional CSS styles.
	 */
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
} as any;

export default Container;
