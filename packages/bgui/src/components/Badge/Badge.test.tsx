import { render } from "@testing-library/react-native";
import { Badge } from "./Badge";

describe("Badge", () => {
	it("renders with count", () => {
		const { getByText } = render(<Badge count={5} />);
		expect(getByText("5")).toBeTruthy();
	});

	it("renders with text", () => {
		const { getByText } = render(<Badge text="NEW" />);
		expect(getByText("NEW")).toBeTruthy();
	});

	it("renders as dot", () => {
		const { getByLabelText, queryByText } = render(<Badge dot />);
		expect(getByLabelText("Notification indicator")).toBeTruthy();
		// Should not render any text
		expect(queryByText(/.+/)).toBeNull();
	});

	it("applies correct aria-label for count", () => {
		const { getByLabelText } = render(<Badge count={3} />);
		expect(getByLabelText("Count: 3")).toBeTruthy();
	});

	it("applies correct aria-label for notification variant", () => {
		const { getByLabelText } = render(<Badge count={2} variant="notification" />);
		expect(getByLabelText("2 notifications")).toBeTruthy();
	});

	it("uses singular form for single notification", () => {
		const { getByLabelText } = render(<Badge count={1} variant="notification" />);
		expect(getByLabelText("1 notification")).toBeTruthy();
	});

	it("applies status variant aria-label", () => {
		const { getByLabelText } = render(<Badge text="Active" variant="status" />);
		expect(getByLabelText("Status: Active")).toBeTruthy();
	});

	it("uses color as fallback for status aria-label", () => {
		const { getByLabelText } = render(<Badge variant="status" color="success" />);
		expect(getByLabelText("Status: success")).toBeTruthy();
	});

	it("applies different colors", () => {
		const colors = ["primary", "secondary", "success", "danger", "warning"] as const;
		for (const color of colors) {
			const { getByLabelText } = render(<Badge count={1} color={color} />);
			const badge = getByLabelText("Count: 1");
			expect(badge.props.style).toBeDefined();
		}
	});

	it("sets aria-live for notification variant", () => {
		const { getByLabelText } = render(<Badge count={5} variant="notification" />);
		const badge = getByLabelText("5 notifications");
		expect(badge.props["aria-live"]).toBe("polite");
	});

	it("sets aria-atomic", () => {
		const { getByLabelText } = render(<Badge count={5} />);
		const badge = getByLabelText("Count: 5");
		expect(badge.props["aria-atomic"]).toBe("true");
	});

	it("hides text from screen readers", () => {
		const { getByText } = render(<Badge text="NEW" />);
		const text = getByText("NEW");
		// On web, aria-hidden should be true
		if (text.props["aria-hidden"] !== undefined) {
			expect(text.props["aria-hidden"]).toBe(true);
		}
	});

	it("applies custom styles", () => {
		const customStyle = { marginLeft: 10 };
		const { getByLabelText } = render(<Badge count={1} style={customStyle} />);
		const badge = getByLabelText("Count: 1");
		expect(badge.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("renders zero count", () => {
		const { getByText } = render(<Badge count={0} />);
		expect(getByText("0")).toBeTruthy();
	});
});
