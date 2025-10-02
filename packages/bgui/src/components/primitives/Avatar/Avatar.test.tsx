import { fireEvent } from "@testing-library/react-native";
import { Platform } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	const originalPlatform = Platform.OS;

	afterEach(() => {
		Platform.OS = originalPlatform;
	});

	it("renders initials from children", () => {
		const { getByText } = renderWithTheme(<Avatar>jd</Avatar>);

		expect(getByText("JD")).toBeTruthy();
	});

	it("derives initials from accessible label when no children are provided", () => {
		const { getByText } = renderWithTheme(<Avatar aria-label="Luna Lovegood" />);

		expect(getByText("LL")).toBeTruthy();
	});

	it("renders an image when a source is provided", () => {
		Platform.OS = "web";
		const { getAllByLabelText } = renderWithTheme(
			<Avatar src="https://example.com/avatar.jpg" alt="Example user" />,
		);
		const elements = getAllByLabelText("Example user");
		const image = elements.find((element) => typeof element.props?.onError === "function");
		expect(image).toBeTruthy();
	});

	it("falls back to initials when the image fails to load", () => {
		Platform.OS = "web";
		const { getAllByLabelText, getByText } = renderWithTheme(
			<Avatar src="https://example.com/broken.jpg" alt="Broken Avatar">
				JD
			</Avatar>,
		);
		const elements = getAllByLabelText("Broken Avatar");
		const image = elements.find((element) => typeof element.props?.onError === "function");
		expect(image).toBeTruthy();
		fireEvent(image!, "error", { nativeEvent: {} });
		expect(getByText("JD")).toBeTruthy();
	});

	it("handles press events when clickable", () => {
		const handleClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<Avatar onClick={handleClick} aria-label="Pressable avatar">
				AB
			</Avatar>,
		);

		fireEvent.press(getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
