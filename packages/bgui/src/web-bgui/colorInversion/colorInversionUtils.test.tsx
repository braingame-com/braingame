import { createRenderer } from "@mui/internal-test-utils";
import Box from "@mui/joy/Box";
import { applySoftInversion, applySolidInversion } from "@mui/joy/colorInversion";
import { styled } from "@mui/joy/styles";
import { expect } from "chai";

describe("colorInversionUtil", () => {
	const { render } = createRenderer();

	it("should not throw error using sx prop", () => {
		expect(() =>
			render(<Box sx={[applySoftInversion("primary"), applySolidInversion("primary")]} />),
		).not.to.throw();
	});

	it("should not throw error using styled API", () => {
		expect(() => {
			styled("div")(applySoftInversion("primary"), applySolidInversion("primary"));
		}).not.to.throw();
	});
});
