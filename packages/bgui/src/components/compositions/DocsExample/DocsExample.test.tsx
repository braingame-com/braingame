import { act, fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { DocsExample } from "./DocsExample";

describe("DocsExample", () => {
	const originalNavigator = global.navigator;
	const writeText = jest.fn().mockResolvedValue(undefined);

	beforeAll(() => {
		// @ts-expect-error allow test clipboard mock
		global.navigator = { clipboard: { writeText } };
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		// @ts-expect-error restore original navigator
		global.navigator = originalNavigator;
	});

	it("renders preview content", () => {
		const { getByText } = renderWithTheme(
			<DocsExample title="Preview" code="console.log('hi');">
				Example content
			</DocsExample>,
		);

		expect(getByText("Preview")).toBeTruthy();
		expect(getByText("Example content")).toBeTruthy();
	});

	it("toggles code visibility when allowToggle is true", () => {
		const { getByText, queryByText } = renderWithTheme(
			<DocsExample title="Preview" code="console.log('hi');">
				Example content
			</DocsExample>,
		);

		expect(queryByText("console.log('hi');")).toBeNull();

		fireEvent.press(getByText("Show code"));

		expect(getByText("console.log('hi');")).toBeTruthy();
	});

	it("copies code to clipboard", async () => {
		jest.useFakeTimers();
		const { getByText } = renderWithTheme(
			<DocsExample title="Copy test" code="console.log('hi');">
				Example content
			</DocsExample>,
		);

		const copyButton = getByText("Copy code");
		await act(async () => {
			fireEvent.press(copyButton);
		});

		expect(writeText).toHaveBeenCalledWith("console.log('hi');");
		expect(getByText("Copied")).toBeTruthy();

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		expect(getByText("Copy code")).toBeTruthy();
		jest.useRealTimers();
	});
});
