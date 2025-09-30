import { fireEvent, render, screen } from "@testing-library/react";
import { GlowingLogo } from "./GlowingLogo";

describe("GlowingLogo", () => {
	it("renders with default content", () => {
		render(<GlowingLogo testID="logo" />);
		expect(screen.getByTestId("logo")).toBeInTheDocument();
	});

	it("renders provided children", () => {
		render(
			<GlowingLogo>
				<span>Custom Logo</span>
			</GlowingLogo>,
		);
		expect(screen.getByText("Custom Logo")).toBeInTheDocument();
	});

	it("handles press interactions", () => {
		const handlePress = jest.fn();
		render(<GlowingLogo onPress={handlePress} aria-label="Brand" />);
		fireEvent.click(screen.getByRole("button", { name: "Brand" }));
		expect(handlePress).toHaveBeenCalledTimes(1);
	});
});
