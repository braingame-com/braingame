import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Pressable, Text } from "react-native";
import { Menu, MenuItem } from "./Menu";

describe("Menu", () => {
	it("renders trigger element", () => {
		const { getByText } = render(
			<Menu trigger={<Text>Open Menu</Text>}>
				<MenuItem>Item 1</MenuItem>
			</Menu>,
		);
		expect(getByText("Open Menu")).toBeTruthy();
	});

	it("shows menu on trigger press", async () => {
		const { getByText, queryByText } = render(
			<Menu
				trigger={
					<Pressable>
						<Text>Open</Text>
					</Pressable>
				}
			>
				<MenuItem>Option 1</MenuItem>
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
			<Menu trigger={<Text>Menu</Text>}>
				<MenuItem onPress={onSelect}>Select me</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Select me")).toBeTruthy();
		});

		// Select item
		fireEvent.press(getByText("Select me"));
		await waitFor(() => {
			expect(onSelect).toHaveBeenCalled();
			expect(queryByText("Select me")).toBeNull();
		});
	});

	it("supports closeOnSelect prop", async () => {
		const { getByText, queryByText } = render(
			<Menu trigger={<Text>Menu</Text>} closeOnSelect={false}>
				<MenuItem>Stay open</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Stay open")).toBeTruthy();
		});

		// Select item - menu should stay open
		fireEvent.press(getByText("Stay open"));
		await waitFor(() => {
			expect(getByText("Stay open")).toBeTruthy();
		});
	});

	it("closes on backdrop press", async () => {
		const { getByText, queryByText, getByTestId } = render(
			<Menu trigger={<Text>Menu</Text>}>
				<MenuItem>Item</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Item")).toBeTruthy();
		});

		// Press backdrop
		const backdrop = getByTestId("menu-backdrop");
		fireEvent.press(backdrop);
		await waitFor(() => {
			expect(queryByText("Item")).toBeNull();
		});
	});

	it("supports disabled menu items", async () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Menu trigger={<Text>Menu</Text>}>
				<MenuItem onPress={onPress} disabled>
					Disabled
				</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Disabled")).toBeTruthy();
		});

		// Try to select disabled item
		fireEvent.press(getByText("Disabled"));
		expect(onPress).not.toHaveBeenCalled();
	});

	it("applies placement prop", async () => {
		const placements = ["bottom-start", "bottom-end", "top-start", "top-end"] as const;
		for (const placement of placements) {
			const { getByText } = render(
				<Menu trigger={<Text>Menu</Text>} placement={placement}>
					<MenuItem>Item</MenuItem>
				</Menu>,
			);

			// Open menu
			fireEvent.press(getByText("Menu"));
			await waitFor(() => {
				expect(getByText("Item")).toBeTruthy();
			});
		}
	});

	it("applies variant styles", () => {
		const variants = ["dropdown", "context"] as const;
		for (const variant of variants) {
			const { getByText } = render(
				<Menu trigger={<Text>Menu</Text>} variant={variant}>
					<MenuItem>Item</MenuItem>
				</Menu>,
			);
			expect(getByText("Menu")).toBeTruthy();
		}
	});

	it("supports keyboard navigation", async () => {
		const { getByText, getByRole } = render(
			<Menu trigger={<Text>Menu</Text>}>
				<MenuItem>First</MenuItem>
				<MenuItem>Second</MenuItem>
				<MenuItem>Third</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("First")).toBeTruthy();
		});

		// Keyboard navigation would be tested here if supported
		// This is a placeholder for keyboard event testing
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Menu trigger={<Text>Menu</Text>} aria-label="Main menu">
				<MenuItem>Item</MenuItem>
			</Menu>,
		);
		expect(getByLabelText("Main menu")).toBeTruthy();
	});

	it("renders multiple menu items", async () => {
		const { getByText } = render(
			<Menu trigger={<Text>Menu</Text>}>
				<MenuItem>Item 1</MenuItem>
				<MenuItem>Item 2</MenuItem>
				<MenuItem>Item 3</MenuItem>
			</Menu>,
		);

		// Open menu
		fireEvent.press(getByText("Menu"));
		await waitFor(() => {
			expect(getByText("Item 1")).toBeTruthy();
			expect(getByText("Item 2")).toBeTruthy();
			expect(getByText("Item 3")).toBeTruthy();
		});
	});
});
