import { fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Badge } from "./Badge";

describe("Badge", () => {
	it("renders child content", () => {
		const { getByText } = renderWithTheme(
			<Badge>
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(getByText("Inbox")).toBeTruthy();
	});

	it("renders badge content", () => {
		const { getByText } = renderWithTheme(
			<Badge badgeContent="5">
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(getByText("5")).toBeTruthy();
	});

	it("caps numeric content at max", () => {
		const { getByText } = renderWithTheme(
			<Badge badgeContent={120} max={99}>
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(getByText("99+")).toBeTruthy();
	});

	it("hides badge when invisible", () => {
		const { queryByText } = renderWithTheme(
			<Badge badgeContent="5" invisible>
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(queryByText("5")).toBeNull();
	});

	it("does not render text in dot mode", () => {
		const { queryByText } = renderWithTheme(
			<Badge dot badgeContent="5">
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(queryByText("5")).toBeNull();
	});

	it("supports dismiss action", () => {
		const handleDismiss = jest.fn();
		const { getByLabelText } = renderWithTheme(
			<Badge badgeContent="Tip" onDismiss={handleDismiss} dismissLabel="Dismiss badge">
				<Text>Inbox</Text>
			</Badge>,
		);

		fireEvent.press(getByLabelText("Dismiss badge"), { defaultPrevented: false, nativeEvent: {} });

		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	it("applies accessibility label", () => {
		const { getByLabelText } = renderWithTheme(
			<Badge badgeContent={3} aria-label="3 unread notifications">
				<Text>Inbox</Text>
			</Badge>,
		);

		expect(getByLabelText("3 unread notifications")).toBeTruthy();
	});
});
