/**
 * Get divider styles based on orientation and properties
 */
export const getDividerStyle = (
	orientation: "horizontal" | "vertical",
	color: string,
	thickness: number,
	variant: "solid" | "dashed" | "dotted",
) => {
	return orientation === "horizontal"
		? {
				borderBottomColor: color,
				borderBottomWidth: thickness,
				borderStyle: variant,
				width: "100%" as const,
			}
		: {
				borderRightColor: color,
				borderRightWidth: thickness,
				borderStyle: variant,
				height: "100%" as const,
			};
};
