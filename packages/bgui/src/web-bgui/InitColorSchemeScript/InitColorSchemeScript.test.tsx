import { createRenderer } from "@mui/internal-test-utils";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { expect } from "chai";
import * as React from "react";

describe("InitColorSchemeScript", () => {
	const { render } = createRenderer();

	it("should render as expected", () => {
		const { container } = render(<InitColorSchemeScript />);
		expect(container.firstChild).to.have.tagName("script");
	});
});
