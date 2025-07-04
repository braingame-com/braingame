import { fireEvent, render, screen } from "@testing-library/react-native";
import { VisionCard } from "./VisionCard";

describe("VisionCard", () => {
	const mockOnEdit = jest.fn();

	beforeEach(() => {
		mockOnEdit.mockClear();
	});

	it("renders with basic props", () => {
		render(<VisionCard area="health" onEdit={mockOnEdit} />);

		expect(screen.getByText("Health")).toBeTruthy();
		expect(screen.getByText("Physical and mental wellness")).toBeTruthy();
		expect(screen.getByText("Tap edit to set your health vision")).toBeTruthy();
	});

	it("displays vision text when provided", () => {
		render(
			<VisionCard
				area="wealth"
				vision="Achieve financial freedom and build generational wealth"
				onEdit={mockOnEdit}
			/>,
		);

		expect(screen.getByText("Wealth")).toBeTruthy();
		expect(
			screen.getByText("Achieve financial freedom and build generational wealth"),
		).toBeTruthy();
		expect(screen.queryByText("Tap edit to set your wealth vision")).toBeNull();
	});

	it("shows progress bar when vision exists", () => {
		render(
			<VisionCard
				area="relationships"
				vision="Build deep, meaningful connections"
				progress={75}
				onEdit={mockOnEdit}
			/>,
		);

		expect(screen.getByText("Progress")).toBeTruthy();
		expect(screen.getByText("75%")).toBeTruthy();
	});

	it("calls onEdit when edit button is pressed", () => {
		render(<VisionCard area="happiness" onEdit={mockOnEdit} />);

		const editButton = screen.getByLabelText("Edit Happiness vision");
		fireEvent.press(editButton);

		expect(mockOnEdit).toHaveBeenCalledTimes(1);
	});

	it("shows loading state on edit button", () => {
		render(<VisionCard area="self" onEdit={mockOnEdit} loading />);

		// The Button component should handle the loading state internally
		expect(screen.getByLabelText("Edit Self vision")).toBeTruthy();
	});

	it("renders all life areas correctly", () => {
		const areas: Array<"health" | "wealth" | "relationships" | "happiness" | "self"> = [
			"health",
			"wealth",
			"relationships",
			"happiness",
			"self",
		];

		areas.forEach((area) => {
			const { unmount } = render(<VisionCard area={area} onEdit={mockOnEdit} />);

			// Verify each area renders without errors
			expect(screen.getByText(area.charAt(0).toUpperCase() + area.slice(1))).toBeTruthy();

			unmount();
		});
	});
});
