import { createRenderer } from "@mui/internal-test-utils";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { expect } from "chai";

describe("InitColorSchemeScript", () => {
	const { render } = createRenderer();

	it("should render as expected", () => {
		const { container } = render(<InitColorSchemeScript />);
		expect(container.firstChild).to.have.tagName("script");
	});
});
