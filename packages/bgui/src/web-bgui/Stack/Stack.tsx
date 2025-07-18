"use client";
import { createStack } from "@mui/system";
import type { OverridableComponent } from "@mui/types";
import PropTypes from "prop-types";
import { useThemeProps } from "../styles";
import styled from "../styles/styled";
import type { StackTypeMap } from "./StackProps";

/**
 *
 * Demos:
 *
 * - [Stack](https://mui.com/joy-ui/react-stack/)
 *
 * API:
 *
 * - [Stack API](https://mui.com/joy-ui/api/stack/)
 */
const Stack = createStack({
	createStyledComponent: styled("div", {
		name: "JoyStack",
		slot: "Root",
		overridesResolver: (_props, styles) => styles.root,
	}),
	useThemeProps: (inProps) => useThemeProps({ props: inProps, name: "JoyStack" }),
}) as OverridableComponent<StackTypeMap>;

Stack.propTypes /* remove-proptypes */ = {
	// ┌────────────────────────────── Warning ──────────────────────────────┐
	// │ These PropTypes are generated from the TypeScript type definitions. │
	// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
	// └─────────────────────────────────────────────────────────────────────┘
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * The component used for the root node.
	 * Either a string to use a HTML element or a component.
	 */
	component: PropTypes.elementType,
	/**
	 * Defines the `flex-direction` style property.
	 * It is applied for all screen sizes.
	 * @default 'column'
	 */
	direction: PropTypes.oneOfType([
		PropTypes.oneOf(["column-reverse", "column", "row-reverse", "row"]),
		PropTypes.arrayOf(PropTypes.oneOf(["column-reverse", "column", "row-reverse", "row"])),
		PropTypes.object,
	]),
	/**
	 * Add an element between each child.
	 */
	divider: PropTypes.node,
	/**
	 * Defines the space between immediate children.
	 * @default 0
	 */
	spacing: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
		PropTypes.number,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * The system prop, which allows defining system overrides as well as additional CSS styles.
	 */
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
	/**
	 * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
	 *
	 * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
	 * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
	 *
	 * To enable this flag globally, follow the [theme's default props](https://mui.com/joy-ui/customization/themed-components/#default-props) configuration.
	 * @default false
	 */
	useFlexGap: PropTypes.bool,
} as any;

export default Stack;
