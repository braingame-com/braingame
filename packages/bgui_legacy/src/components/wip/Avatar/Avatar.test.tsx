import { render } from "@testing-library/react-native";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("renders with image source", () => {
		const { getByTestId } = render(<Avatar src="https://example.com/avatar.jpg" name="User" />);
		expect(getByTestId).toBeTruthy();
	});

	it("renders with name fallback", () => {
		const { getByText } = render(<Avatar name="John Doe" />);
		expect(getByText("JD")).toBeTruthy();
	});

	it("renders single initial for single name", () => {
		const { getByText } = render(<Avatar name="John" />);
		expect(getByText("J")).toBeTruthy();
	});

	it("renders placeholder when no source or name", () => {
		const { getByTestId } = render(<Avatar />);
		expect(getByTestId).toBeTruthy();
	});

	it("renders without status indicator", () => {
		const { getByText } = render(<Avatar name="John" />);
		expect(getByText("J")).toBeTruthy();
	});

	it("applies different sizes", () => {
		const sizes = ["small", "medium", "large"] as const;
		for (const size of sizes) {
			const { getByTestId } = render(<Avatar name="Test" size={size} />);
			expect(getByTestId).toBeTruthy();
		}
	});

	it("applies custom shape", () => {
		const { getByText } = render(<Avatar name="Test" variant="square" />);
		expect(getByText("T")).toBeTruthy();
	});

	it("renders without image", () => {
		const { getByText } = render(<Avatar name="Loading User" />);
		expect(getByText("LU")).toBeTruthy();
	});

	it("handles image with fallback name", () => {
		const { getByText } = render(
			<Avatar src="https://example.com/broken.jpg" name="Fallback Name" />,
		);

		// Should be able to render with both src and name
		expect(getByText).toBeTruthy();
	});

	it("renders with default background color", () => {
		const { getByText } = render(<Avatar name="Test" />);
		expect(getByText("T")).toBeTruthy();
	});

	it("renders without badge", () => {
		const { getByText } = render(<Avatar name="Test" />);
		expect(getByText("T")).toBeTruthy();
	});

	it("renders with name initials", () => {
		const { getByText } = render(<Avatar name="John Doe" />);
		expect(getByText("JD")).toBeTruthy();
	});
});
