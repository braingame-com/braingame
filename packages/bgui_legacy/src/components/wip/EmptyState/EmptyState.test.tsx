import { fireEvent, render, screen } from "@testing-library/react-native";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
	it("renders with title only", () => {
		render(<EmptyState title="No items found" />);

		expect(screen.getByText("No items found")).toBeTruthy();
	});

	it("renders with title and description", () => {
		render(
			<EmptyState
				title="No visions yet"
				description="Start by setting your vision for each life area"
			/>,
		);

		expect(screen.getByText("No visions yet")).toBeTruthy();
		expect(screen.getByText("Start by setting your vision for each life area")).toBeTruthy();
	});

	it("renders with icon when provided", () => {
		render(<EmptyState icon="inbox" title="Empty inbox" />);

		expect(screen.getByText("Empty inbox")).toBeTruthy();
		// Icon rendering is handled by the Icon component
	});

	it("renders action button when provided", () => {
		const mockAction = jest.fn();

		render(
			<EmptyState
				title="No data"
				action={{
					label: "Add data",
					onPress: mockAction,
				}}
			/>,
		);

		const button = screen.getByText("Add data");
		expect(button).toBeTruthy();

		fireEvent.press(button);
		expect(mockAction).toHaveBeenCalledTimes(1);
	});

	it("renders complete empty state", () => {
		const mockAction = jest.fn();

		render(
			<EmptyState
				icon="folder"
				title="No documents"
				description="Upload your first document to get started"
				action={{
					label: "Upload document",
					onPress: mockAction,
				}}
			/>,
		);

		expect(screen.getByText("No documents")).toBeTruthy();
		expect(screen.getByText("Upload your first document to get started")).toBeTruthy();
		expect(screen.getByText("Upload document")).toBeTruthy();
	});
});
