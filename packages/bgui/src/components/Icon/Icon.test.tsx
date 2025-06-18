import { render } from "@testing-library/react-native";
import React from "react";
import { Icon } from "./Icon";

describe("Icon", () => {
	it("renders with name", () => {
		const { getByLabelText } = render(<Icon name="home" />);
		expect(getByLabelText("home icon")).toBeTruthy();
	});

	it("applies size prop", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
		sizes.forEach((size) => {
			const { getByLabelText } = render(<Icon name="settings" size={size} />);
			const icon = getByLabelText("settings icon");
			expect(icon.props.width).toBeDefined();
			expect(icon.props.height).toBeDefined();
		});
	});

	it("applies custom numeric size", () => {
		const { getByLabelText } = render(<Icon name="user" size={32} />);
		const icon = getByLabelText("user icon");
		expect(icon.props.width).toBe(32);
		expect(icon.props.height).toBe(32);
	});

	it("applies color", () => {
		const { getByLabelText } = render(<Icon name="star" color="#ff0000" />);
		const icon = getByLabelText("star icon");
		expect(icon.props.fill).toBe("#ff0000");
	});

	it("applies theme color", () => {
		const { getByLabelText } = render(<Icon name="heart" color="primary" />);
		const icon = getByLabelText("heart icon");
		// Should apply theme color
		expect(icon.props.fill).toBeDefined();
	});

	it("rotates icon", () => {
		const { getByLabelText } = render(<Icon name="arrow" rotate={90} />);
		const icon = getByLabelText("arrow icon");
		expect(icon.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					transform: [{ rotate: "90deg" }],
				}),
			]),
		);
	});

	it("applies custom styles", () => {
		const customStyle = { opacity: 0.5 };
		const { getByLabelText } = render(<Icon name="check" style={customStyle} />);
		const icon = getByLabelText("check icon");
		expect(icon.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("sets aria-hidden by default", () => {
		const { getByLabelText } = render(<Icon name="close" />);
		const icon = getByLabelText("close icon");
		expect(icon.props["aria-hidden"]).toBe("true");
	});

	it("removes aria-hidden when aria-label provided", () => {
		const { getByLabelText } = render(<Icon name="search" aria-label="Search button" />);
		const icon = getByLabelText("Search button");
		expect(icon.props["aria-hidden"]).toBeUndefined();
	});

	it("applies custom aria-label", () => {
		const { getByLabelText } = render(<Icon name="menu" aria-label="Open menu" />);
		expect(getByLabelText("Open menu")).toBeTruthy();
	});

	it("applies testID", () => {
		const { getByTestId } = render(<Icon name="calendar" testID="calendar-icon" />);
		expect(getByTestId("calendar-icon")).toBeTruthy();
	});

	it("renders different icon sets", () => {
		const iconSets = ["material", "feather", "ionicons"] as const;
		iconSets.forEach((iconSet) => {
			const { getByLabelText } = render(<Icon name="home" iconSet={iconSet} />);
			expect(getByLabelText("home icon")).toBeTruthy();
		});
	});

	it("applies stroke width for outline icons", () => {
		const { getByLabelText } = render(<Icon name="circle" strokeWidth={2} />);
		const icon = getByLabelText("circle icon");
		expect(icon.props.strokeWidth).toBe(2);
	});

	it("renders as button when onPress provided", () => {
		const onPress = jest.fn();
		const { getByRole } = render(<Icon name="add" onPress={onPress} />);
		expect(getByRole("button")).toBeTruthy();
	});

	it("handles missing icon gracefully", () => {
		const { getByLabelText } = render(<Icon name="non-existent-icon" />);
		// Should render placeholder or default icon
		expect(getByLabelText("non-existent-icon icon")).toBeTruthy();
	});
});
