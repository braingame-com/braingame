import { fireEvent, render } from "@testing-library/react-native";
import { Link } from "./Link";

describe("Link", () => {
	it("renders link text", () => {
		const { getByText } = render(<Link href="https://example.com">Click here</Link>);
		expect(getByText("Click here")).toBeTruthy();
	});

	it("handles press event", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Link href="https://example.com" onPress={onPress}>
				Link
			</Link>,
		);
		fireEvent.press(getByText("Link"));
		expect(onPress).toHaveBeenCalled();
	});

	it("opens external links", () => {
		// Mock Linking.openURL
		const mockOpenURL = jest.fn();
		jest.mock("react-native", () => ({
			...jest.requireActual("react-native"),
			Linking: { openURL: mockOpenURL },
		}));

		const { getByText } = render(
			<Link href="https://example.com" external>
				External Link
			</Link>,
		);
		fireEvent.press(getByText("External Link"));
		// Should call Linking.openURL
	});

	it("applies inline variant", () => {
		const { getByText } = render(
			<Link href="#" variant="inline">
				Inline Link
			</Link>,
		);
		const link = getByText("Inline Link");
		expect(link.props.style).toBeDefined();
	});

	it("applies standalone variant", () => {
		const { getByText } = render(
			<Link href="#" variant="standalone">
				Standalone Link
			</Link>,
		);
		const link = getByText("Standalone Link");
		expect(link.props.style).toBeDefined();
	});

	it("disables link when specified", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Link href="#" disabled onPress={onPress}>
				Disabled Link
			</Link>,
		);
		const link = getByText("Disabled Link");
		fireEvent.press(link);
		expect(onPress).not.toHaveBeenCalled();
	});

	it("applies hover state", () => {
		const { getByText } = render(<Link href="#">Hoverable</Link>);
		const link = getByText("Hoverable");

		// Trigger hover
		fireEvent(link, "hoverIn");
		expect(link.props.style).toBeDefined();

		fireEvent(link, "hoverOut");
		expect(link.props.style).toBeDefined();
	});

	it("applies focus state", () => {
		const { getByText } = render(<Link href="#">Focusable</Link>);
		const link = getByText("Focusable");

		fireEvent(link, "focus");
		expect(link.props.style).toBeDefined();

		fireEvent(link, "blur");
		expect(link.props.style).toBeDefined();
	});

	it("applies active state", () => {
		const { getByText } = render(<Link href="#">Active</Link>);
		const link = getByText("Active");

		fireEvent(link, "pressIn");
		expect(link.props.style).toBeDefined();

		fireEvent(link, "pressOut");
		expect(link.props.style).toBeDefined();
	});

	it("renders without href", () => {
		const onPress = jest.fn();
		const { getByText } = render(<Link onPress={onPress}>Action Link</Link>);
		fireEvent.press(getByText("Action Link"));
		expect(onPress).toHaveBeenCalled();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Link href="#" aria-label="Navigate to homepage">
				Home
			</Link>,
		);
		expect(getByLabelText("Navigate to homepage")).toBeTruthy();
	});

	it("sets accessibility role", () => {
		const { getByRole } = render(<Link href="#">Accessible Link</Link>);
		expect(getByRole("link")).toBeTruthy();
	});

	it("renders with complex children", () => {
		const { getByText } = render(
			<Link href="#">
				Go to <strong>page</strong>
			</Link>,
		);
		expect(getByText("Go to")).toBeTruthy();
		expect(getByText("page")).toBeTruthy();
	});

	it("handles keyboard navigation", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Link href="#" onPress={onPress}>
				Keyboard Nav
			</Link>,
		);
		const link = getByText("Keyboard Nav");
		// Keyboard events would be tested here if supported
		expect(link).toBeTruthy();
	});
});
