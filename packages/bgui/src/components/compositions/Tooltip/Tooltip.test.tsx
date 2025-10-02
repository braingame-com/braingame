import { act, fireEvent } from "@testing-library/react-native";
import { Platform } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Box } from "../../primitives/Box";
import { Tooltip } from "./Tooltip";
import type { TooltipProps } from "./Tooltip.types";

describe("Tooltip", () => {
	const originalPlatform = Platform.OS;

	afterEach(() => {
		jest.useRealTimers();
		Object.defineProperty(Platform, "OS", {
			configurable: true,
			writable: true,
			value: originalPlatform,
		});
	});

	const renderTooltip = (props: Partial<TooltipProps> = {}) =>
		renderWithTheme(
			<Tooltip title="Helpful hint" {...props}>
				<Box testID="trigger">Trigger</Box>
			</Tooltip>,
		);

	it("renders trigger content without showing tooltip initially", () => {
		const { getByTestId, queryByText } = renderTooltip();

		expect(getByTestId("trigger")).toBeTruthy();
		expect(queryByText("Helpful hint")).toBeNull();
	});

	it("opens on focus and wires accessibility descriptors", () => {
		const { getByTestId, getByText } = renderTooltip();

		fireEvent(getByTestId("trigger"), "focus", { nativeEvent: {}, defaultPrevented: false });

		expect(getByText("Helpful hint")).toBeTruthy();
		expect(getByTestId("trigger").props.accessibilityDescribedBy).toBeTruthy();
	});

	it("closes on blur", () => {
		const { getByTestId, queryByText } = renderTooltip();

		fireEvent(getByTestId("trigger"), "focus", { nativeEvent: {}, defaultPrevented: false });
		fireEvent(getByTestId("trigger"), "blur", { nativeEvent: {}, defaultPrevented: false });

		expect(queryByText("Helpful hint")).toBeNull();
	});

	it("honors controlled open prop", () => {
		const initial = renderTooltip({ open: false });
		expect(initial.queryByText("Helpful hint")).toBeNull();
		initial.unmount();

		const reopened = renderTooltip({ open: true });
		expect(reopened.queryByText("Helpful hint")).toBeTruthy();
		reopened.unmount();
	});

	it("supports press interactions with touch delays", () => {
		jest.useFakeTimers();
		const onOpen = jest.fn();
		const onClose = jest.fn();
		const { getByTestId, queryByText } = renderTooltip({
			enterTouchDelay: 200,
			leaveTouchDelay: 0,
			onOpen,
			onClose,
		});

		act(() => {
			fireEvent(getByTestId("trigger"), "pressIn", { defaultPrevented: false, nativeEvent: {} });
		});
		act(() => {
			jest.advanceTimersByTime(200);
		});

		expect(queryByText("Helpful hint")).toBeTruthy();
		expect(onOpen).toHaveBeenCalled();

		act(() => {
			fireEvent(getByTestId("trigger"), "pressOut", { defaultPrevented: false, nativeEvent: {} });
			jest.runOnlyPendingTimers();
		});

		expect(onClose).toHaveBeenCalled();
		expect(queryByText("Helpful hint")).toBeNull();
	});

	it("applies hover listeners on web", () => {
		Object.defineProperty(Platform, "OS", { configurable: true, writable: true, value: "web" });

		const { getByTestId, queryByText } = renderTooltip();

		fireEvent(getByTestId("trigger"), "mouseEnter", { nativeEvent: {}, defaultPrevented: false });
		expect(queryByText("Helpful hint")).toBeTruthy();

		fireEvent(getByTestId("trigger"), "mouseLeave", { nativeEvent: {}, defaultPrevented: false });
		expect(queryByText("Helpful hint")).toBeNull();
	});
});
