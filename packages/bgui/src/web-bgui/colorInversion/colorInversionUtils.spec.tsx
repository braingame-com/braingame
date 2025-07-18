import Box from "@mui/joy/Box";
import { applySoftInversion, applySolidInversion } from "@mui/joy/colorInversion";
import { styled } from "@mui/joy/styles";

/**
 * sx prop type check
 */
<Box sx={[(_theme) => ({}), applySoftInversion("neutral"), applySoftInversion("primary")]} />;

<Box
	sx={[
		(_theme) => ({}),
		// @ts-expect-error no `unknown` color from theme palette
		applySoftInversion("unknown"),
		// @ts-expect-error no `unknown` color from theme palette
		applySoftInversion("unknown"),
	]}
/>;

/**
 * styled API type check
 */
const _StyledBox = styled("div")(
	({ theme }) => ({
		padding: 32,
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		alignItems: "center",
		rowGap: 16,
		columnGap: 64,
		borderRadius: 8,
		background: `linear-gradient(45deg, ${theme.vars.palette.neutral[800]}, ${theme.vars.palette.neutral[600]})`,
	}),
	applySolidInversion("neutral"),
);

styled("div")(({ theme }) => ({}), applySoftInversion("primary"), applySolidInversion("primary"));

styled("div")(
	({ theme }) => ({}),
	// @ts-expect-error no `unknown` color from theme palette
	applySoftInversion("unknown"),
	// @ts-expect-error no `unknown` color from theme palette
	applySolidInversion("unknown"),
);
