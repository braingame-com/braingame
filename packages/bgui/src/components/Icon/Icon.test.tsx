import { render } from "@testing-library/react-native";
import { Icon } from "./Icon";

describe("Icon", () => {
	it("renders with name", () => {
		const { getByLabelText } = render(<Icon name="home" />);
		expect(getByLabelText("home icon")).toBeTruthy();
	});

	it("applies size prop", () => {
		const sizes = ["sm", "md", "lg"] as const;
		for (const size of sizes) {
			const { getByLabelText } = render(<Icon name="settings" size={size} />);
			const icon = getByLabelText("settings icon");
			expect(icon.props.width).toBeDefined();
			expect(icon.props.height).toBeDefined();
		}
	});

	it("applies custom numeric size", () => {
		const { getByLabelText } = render(<Icon name="user" size={32} />);
		const icon = getByLabelText("user icon");
		expect(icon.props.width).toBe(32);
		expect(icon.props.height).toBe(32);
	});

	it("applies theme color", () => {
		const { getByLabelText } = render(<Icon name="star" color="text" />);
		const icon = getByLabelText("star icon");
		expect(icon.props.fill).toBeDefined();
	});

	it("applies theme color variants", () => {
		const colors = [
			"background",
			"card",
			"button",
			"text",
			"textSecondary",
			"border",
			"buttonHovered",
			"tint",
			"icon",
			"tabIconDefault",
			"tabIconSelected",
		] as const;
		for (const color of colors) {
			const { getByLabelText } = render(<Icon name="heart" color={color} />);
			const icon = getByLabelText("heart icon");
			expect(icon.props.fill).toBeDefined();
		}
	});

	it("applies custom styles", () => {
		const customStyle = { opacity: 0.5 };
		const { getByLabelText } = render(<Icon name="check" style={customStyle} />);
		const icon = getByLabelText("check icon");
		expect(icon.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("sets aria-hidden for decorative icons", () => {
		const { getByLabelText } = render(<Icon name="close" decorative />);
		const icon = getByLabelText("close icon");
		expect(icon.props["aria-hidden"]).toBe("true");
	});

	it("applies custom aria-label", () => {
		const { getByLabelText } = render(<Icon name="menu" aria-label="Open menu" />);
		expect(getByLabelText("Open menu")).toBeTruthy();
	});

	it("applies variant", () => {
		const variants = ["solid", "regular", "brands"] as const;
		for (const variant of variants) {
			const { getByLabelText } = render(<Icon name="home" variant={variant} />);
			expect(getByLabelText("home icon")).toBeTruthy();
		}
	});

	it("handles missing icon gracefully", () => {
		const { getByLabelText } = render(<Icon name="non-existent-icon" />);
		// Should render placeholder or default icon
		expect(getByLabelText("non-existent-icon icon")).toBeTruthy();
	});
});
