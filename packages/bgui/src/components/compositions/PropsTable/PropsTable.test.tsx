import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { PropsTable } from "./PropsTable";

describe("PropsTable", () => {
	it("renders provided rows", () => {
		const { getByText } = renderWithTheme(
			<PropsTable
				title="Button"
				rows={[
					{
						name: "variant",
						type: '"solid" | "soft"',
						required: false,
						description: "Controls visual style.",
					},
					{ name: "disabled", type: "boolean", defaultValue: "false", required: false },
				]}
			/>,
		);

		expect(getByText("Button")).toBeTruthy();
		expect(getByText("variant")).toBeTruthy();
		expect(getByText('"solid" | "soft"')).toBeTruthy();
		expect(getByText("Default: false")).toBeTruthy();
	});

	it("renders empty state when no rows provided", () => {
		const { getByText } = renderWithTheme(<PropsTable rows={[]} title="Avatar" />);
		expect(getByText("No props exposed for this surface yet.")).toBeTruthy();
	});
});
