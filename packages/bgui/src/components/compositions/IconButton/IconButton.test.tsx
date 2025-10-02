import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Icon } from "../../primitives/Icon";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
	it("renders an icon provided through children", () => {
		const { getByLabelText } = renderWithTheme(
			<IconButton aria-label="Toggle favorites">
				<Icon name="favorite" accessibilityLabel="Favorite icon" />
			</IconButton>,
		);

		expect(getByLabelText("Favorite icon")).toBeTruthy();
	});

	it("supports click interactions", () => {
		const handleClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<IconButton iconName="menu" aria-label="Open menu" onClick={handleClick} />,
		);

		fireEvent.press(getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("hides the decorator while showing a centered loading indicator", () => {
		const { queryByLabelText } = renderWithTheme(
			<IconButton aria-label="Submitting" loading iconName="upload" loadingPosition="center">
				<Icon name="upload" accessibilityLabel="Upload icon" />
			</IconButton>,
		);

		expect(queryByLabelText("Upload icon")).toBeNull();
	});
});
