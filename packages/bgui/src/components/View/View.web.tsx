"use client";

import React from "react";
import type { ViewProps } from "./types";

export function View({ children, style, ...props }: ViewProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				boxSizing: "border-box",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}