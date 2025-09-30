import { fireEvent, render } from "@testing-library/react-native";
import { Badge } from "./Badge";

describe("Badge", () => {
	it("renders child content", () => {
		const { getByText } = render(
			<Badge>
				<span>Inbox</span>
			</Badge>,
		);

		expect(getByText("Inbox")).toBeTruthy();
	});

	it("renders badge content", () => {
		const { getByText } = render(
			<Badge badgeContent="5">
				<span>Inbox</span>
			</Badge>,
		);

		expect(getByText("5")).toBeTruthy();
	});

	it("caps numeric content at max", () => {
		const { getByText } = render(
			<Badge badgeContent={120} max={99}>
				<span>Inbox</span>
			</Badge>,
		);

		expect(getByText("99+")).toBeTruthy();
	});

	it("hides badge when invisible", () => {
		const { queryByText } = render(
			<Badge badgeContent="5" invisible>
				<span>Inbox</span>
			</Badge>,
		);

		expect(queryByText("5")).toBeNull();
	});

	it("does not render text in dot mode", () => {
		const { queryByText } = render(
			<Badge dot badgeContent="5">
				<span>Inbox</span>
			</Badge>,
		);

		expect(queryByText("5")).toBeNull();
	});

	it("supports dismiss action", () => {
		const handleDismiss = jest.fn();
		const { getByLabelText } = render(
			<Badge badgeContent="Tip" onDismiss={handleDismiss} dismissLabel="Dismiss badge">
				<span>Inbox</span>
			</Badge>,
		);

		fireEvent.press(getByLabelText("Dismiss badge"));

		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	it("applies accessibility label", () => {
		const { getByLabelText } = render(
			<Badge badgeContent={3} aria-label="3 unread notifications">
				<span>Inbox</span>
			</Badge>,
		);

		expect(getByLabelText("3 unread notifications")).toBeTruthy();
	});
});
