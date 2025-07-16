/**
 * Generate component variants for theme
 * Each component gets 4 variants × 5 colors = 20 total variants
 */

export function generateComponentVariants() {
	const variants: any = {};

	const colors = ["primary", "neutral", "danger", "success", "warning"];

	// Plain variants
	colors.forEach((color) => {
		variants[`plain-${color}`] = {
			backgroundColor: "transparent" as const,
			color: color === "neutral" ? "onSurface" : color,
		};
	});

	// Outlined variants
	colors.forEach((color) => {
		variants[`outlined-${color}`] = {
			backgroundColor: "surface",
			borderColor: color === "neutral" ? "outline" : color,
			borderWidth: 1,
			color: color === "neutral" ? "onSurface" : color,
		};
	});

	// Soft variants
	colors.forEach((color) => {
		const containerMap: Record<string, { bg: string; color: string }> = {
			primary: { bg: "primaryContainer", color: "onPrimaryContainer" },
			neutral: { bg: "surfaceVariant", color: "onSurfaceVariant" },
			danger: { bg: "errorContainer", color: "onErrorContainer" },
			success: { bg: "successContainer", color: "onSuccessContainer" },
			warning: { bg: "warningContainer", color: "onWarningContainer" },
		};
		variants[`soft-${color}`] = {
			backgroundColor: containerMap[color].bg,
			color: containerMap[color].color,
		};
	});

	// Solid variants
	colors.forEach((color) => {
		const solidMap: Record<string, { bg: string; color: string }> = {
			primary: { bg: "primary", color: "onPrimary" },
			neutral: { bg: "surface", color: "onSurface" },
			danger: { bg: "error", color: "onError" },
			success: { bg: "success", color: "onSuccess" },
			warning: { bg: "warning", color: "onWarning" },
		};
		variants[`solid-${color}`] = {
			backgroundColor: solidMap[color].bg,
			color: solidMap[color].color,
		};
	});

	return variants;
}
