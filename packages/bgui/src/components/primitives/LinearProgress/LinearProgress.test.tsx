import { render, screen } from "@testing-library/react";
import { LinearProgress } from "./LinearProgress";

describe("LinearProgress", () => {
	it("renders determinate progress", () => {
		render(<LinearProgress determinate value={60} testID="progress" />);
		const progressbar = screen.getByRole("progressbar");
		expect(progressbar).toHaveAttribute("aria-valuenow", "60");
		expect(screen.getByTestId("progress-indicator")).toBeInTheDocument();
	});

	it("renders indeterminate progress without aria-valuenow", () => {
		render(<LinearProgress testID="progress" />);
		const progressbar = screen.getByRole("progressbar");
		expect(progressbar).not.toHaveAttribute("aria-valuenow");
	});

	it("renders children inside the track", () => {
		render(
			<LinearProgress determinate value={40}>
				<span>Loading</span>
			</LinearProgress>,
		);
		expect(screen.getByText("Loading")).toBeInTheDocument();
	});
});
