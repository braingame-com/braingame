import { fireEvent, render } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("renders initials from children", () => {
		const { getByText } = render(<Avatar>jd</Avatar>);

		expect(getByText("JD")).toBeInTheDocument();
	});

	it("derives initials from accessible label when no children are provided", () => {
		const { getByText } = render(<Avatar aria-label="Luna Lovegood" />);

		expect(getByText("LL")).toBeInTheDocument();
	});

	it("renders an image when a source is provided", () => {
		const { container } = render(
			<Avatar src="https://example.com/avatar.jpg" alt="Example user" />,
		);

		const img = container.querySelector("img");
		expect(img).toBeTruthy();
		expect(img?.getAttribute("src")).toBe("https://example.com/avatar.jpg");
	});

	it("falls back to initials when the image fails to load", () => {
		const { container, getByText } = render(
			<Avatar src="https://example.com/broken.jpg" alt="Broken Avatar">
				JD
			</Avatar>,
		);

		const img = container.querySelector("img");
		expect(img).toBeTruthy();

		if (img) {
			fireEvent.error(img);
		}

		expect(getByText("JD")).toBeInTheDocument();
	});

	it("handles press events when clickable", () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<Avatar onClick={handleClick} aria-label="Pressable avatar">
				AB
			</Avatar>,
		);

		fireEvent.click(getByRole("button", { name: "Pressable avatar" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
