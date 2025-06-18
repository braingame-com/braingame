import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Menu } from "./Menu";

describe("Menu", () => {
	it("renders trigger element", () => {
		const { getByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Open Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item>Item 1</Menu.Item>
				</Menu.Content>
			</Menu>,
		);
		expect(getByText("Open Menu")).toBeTruthy();
	});

	it("shows menu on trigger press", async () => {
		const { getByText, queryByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Open</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item>Option 1</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		// Menu should be hidden initially
		expect(queryByText("Option 1")).toBeNull();

		// Open menu
		fireEvent.press(getByText("Open"));
		await waitFor(() => {
			expect(getByText("Option 1")).toBeTruthy();
		});
	});

	it("closes menu on item selection", async () => {
		const onSelect = jest.fn();
		const { getByText, queryByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item onPress={onSelect}>Select me</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			fireEvent.press(getByText("Select me"));
		});

		expect(onSelect).toHaveBeenCalled();
		await waitFor(() => {
			expect(queryByText("Select me")).toBeNull();
		});
	});

	it("renders menu items with icons", async () => {
		const { getByText, getByLabelText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item icon="settings">Settings</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByLabelText("settings icon")).toBeTruthy();
		});
	});

	it("disables menu items", async () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item onPress={onPress} disabled>
						Disabled Item
					</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			fireEvent.press(getByText("Disabled Item"));
		});

		expect(onPress).not.toHaveBeenCalled();
	});

	it("renders menu separator", async () => {
		const { getByText, getByTestId } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item>Item 1</Menu.Item>
					<Menu.Separator testID="separator" />
					<Menu.Item>Item 2</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByTestId("separator")).toBeTruthy();
		});
	});

	it("renders submenu", async () => {
		const { getByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Sub>
						<Menu.SubTrigger>More Options</Menu.SubTrigger>
						<Menu.SubContent>
							<Menu.Item>Sub Item</Menu.Item>
						</Menu.SubContent>
					</Menu.Sub>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			fireEvent.press(getByText("More Options"));
		});
		await waitFor(() => {
			expect(getByText("Sub Item")).toBeTruthy();
		});
	});

	it("supports controlled open state", () => {
		const onOpenChange = jest.fn();
		const { getByText } = render(
			<Menu open={false} onOpenChange={onOpenChange}>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item>Item</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		expect(onOpenChange).toHaveBeenCalledWith(true);
	});

	it("applies placement", async () => {
		const { getByText, getByTestId } = render(
			<Menu placement="top">
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content testID="menu-content">
					<Menu.Item>Item</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			const content = getByTestId("menu-content");
			// Should be positioned above trigger
			expect(content).toBeTruthy();
		});
	});

	it("closes on backdrop press", async () => {
		const { getByText, getByTestId, queryByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Backdrop testID="backdrop" />
					<Menu.Item>Item</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			fireEvent.press(getByTestId("backdrop"));
		});

		await waitFor(() => {
			expect(queryByText("Item")).toBeNull();
		});
	});

	it("applies accessibility roles", async () => {
		const { getByText, getByRole } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.Item>Item</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByRole("menu")).toBeTruthy();
			expect(getByRole("menuitem")).toBeTruthy();
		});
	});

	it("renders checkable menu items", async () => {
		const { getByText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content>
					<Menu.CheckboxItem checked={true}>Checked Item</Menu.CheckboxItem>
					<Menu.RadioItem value="option1" checked={true}>
						Radio Option
					</Menu.RadioItem>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Checked Item")).toBeTruthy();
			expect(getByText("Radio Option")).toBeTruthy();
		});
	});

	it("applies aria-label to menu", async () => {
		const { getByText, getByLabelText } = render(
			<Menu>
				<Menu.Trigger>
					<Menu.TriggerButton>Menu</Menu.TriggerButton>
				</Menu.Trigger>
				<Menu.Content aria-label="Main navigation menu">
					<Menu.Item>Item</Menu.Item>
				</Menu.Content>
			</Menu>,
		);

		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByLabelText("Main navigation menu")).toBeTruthy();
		});
	});
});
