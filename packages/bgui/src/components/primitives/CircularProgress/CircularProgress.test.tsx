import { render } from "@testing-library/react";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
	it("renders provided children", () => {
		const { getByText } = render(<CircularProgress>Loading data</CircularProgress>);

		expect(getByText("Loading data")).toBeInTheDocument();
	});

	it("exposes determinate progress values for assistive tech", () => {
		const { getByRole } = render(
			<CircularProgress determinate value={42} aria-label="Uploading" />,
		);

		const progressbar = getByRole("progressbar", { name: "Uploading" });

		expect(progressbar).toHaveAttribute("aria-valuenow", "42");
		expect(progressbar).toHaveAttribute("aria-valuemin", "0");
		expect(progressbar).toHaveAttribute("aria-valuemax", "100");
	});

	it("omits value attributes when indeterminate", () => {
		const { getByRole } = render(<CircularProgress aria-label="Loading" />);

		const progressbar = getByRole("progressbar", { name: "Loading" });

		expect(progressbar).not.toHaveAttribute("aria-valuenow");
		expect(progressbar).not.toHaveAttribute("aria-valuemin");
		expect(progressbar).not.toHaveAttribute("aria-valuemax");
	});
});
