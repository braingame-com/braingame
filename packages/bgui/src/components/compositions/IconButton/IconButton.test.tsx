import { fireEvent, render } from "@testing-library/react";
import { Icon } from "../../primitives/Icon";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
	it("renders an icon provided through children", () => {
		const { getByLabelText } = render(
			<IconButton aria-label="Toggle favorites">
				<Icon name="favorite" accessibilityLabel="Favorite icon" />
			</IconButton>,
		);

		expect(getByLabelText("Favorite icon")).toBeInTheDocument();
	});

	it("supports click interactions", () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<IconButton iconName="menu" aria-label="Open menu" onClick={handleClick} />,
		);

		fireEvent.click(getByRole("button", { name: "Open menu" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("hides the decorator while showing a centered loading indicator", () => {
		const { queryByLabelText } = render(
			<IconButton aria-label="Submitting" loading iconName="upload" loadingPosition="center">
				<Icon name="upload" accessibilityLabel="Upload icon" />
			</IconButton>,
		);

		expect(queryByLabelText("Upload icon")).toBeNull();
	});
});
