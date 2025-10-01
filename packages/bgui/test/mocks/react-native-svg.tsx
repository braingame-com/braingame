import React, { forwardRef } from "react";

type ElementTag = "svg" | "path" | "circle" | "defs" | "linearGradient" | "stop";

type ElementProps<T extends ElementTag> = React.ComponentPropsWithoutRef<T>;

type ElementComponent<T extends ElementTag> = React.ForwardRefExoticComponent<ElementProps<T> & React.RefAttributes<SVGElement>>;

function createMockElement<T extends ElementTag>(tag: T): ElementComponent<T> {
	return forwardRef<SVGElement, ElementProps<T>>((props, ref) => {
		const { children, ...rest } = props;
		return React.createElement(tag, { ref, ...rest }, children);
	});
}

export const Svg = createMockElement("svg");
export const Path = createMockElement("path");
export const Circle = createMockElement("circle");
export const Defs = createMockElement("defs");
export const LinearGradient = createMockElement("linearGradient");
export const Stop = createMockElement("stop");

const MockSvg = Object.assign(Svg, { Path, Circle, Defs, LinearGradient, Stop });

export default MockSvg;
