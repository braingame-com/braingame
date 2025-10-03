import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { CodeSnippet } from "./CodeSnippet";

describe("CodeSnippet", () => {
	it("renders code and caption", () => {
		const { getByText } = renderWithTheme(
			<CodeSnippet
				code={"console.log('hello');"}
				caption="Example"
				language="ts"
				testID="snippet"
			/>,
		);

		expect(getByText("Example")).toBeTruthy();
		expect(getByText("console.log('hello');")).toBeTruthy();
	});
});
