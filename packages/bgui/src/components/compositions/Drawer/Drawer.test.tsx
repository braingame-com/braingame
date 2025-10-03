import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Typography } from "../../primitives/Typography";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
	it("renders children when open", () => {
		const { getByText } = renderWithTheme(
			<Drawer open disablePortal ariaLabel="Menu">
				<Typography>Test Content</Typography>
			</Drawer>,
		);

		expect(getByText("Test Content")).toBeTruthy();
	});

	it("does not render content when closed with keepMounted false", () => {
		const openRender = renderWithTheme(
			<Drawer open disablePortal keepMounted={false} ariaLabel="Menu">
				<Typography>Hidden Content</Typography>
			</Drawer>,
		);

		expect(openRender.queryByText("Hidden Content")).toBeTruthy();

		const closedRender = renderWithTheme(
			<Drawer open={false} disablePortal keepMounted={false} ariaLabel="Menu">
				<Typography>Hidden Content</Typography>
			</Drawer>,
		);

		expect(closedRender.queryByText("Hidden Content")).toBeNull();
	});
});
