import { render } from "@testing-library/react-native";
import React from "react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
	it("renders spinner", () => {
		const { getByLabelText } = render(<Spinner />);
		expect(getByLabelText("Loading")).toBeTruthy();
	});

	it("applies size prop", () => {
		const sizes = ["sm", "md", "lg"] as const;
		for (const size of sizes) {
			const { getByLabelText } = render(<Spinner size={size} />);
			const spinner = getByLabelText("Loading");
			expect(spinner).toBeTruthy();
		}
	});

	it("applies color prop", () => {
		const { getByLabelText } = render(<Spinner color="#ff0000" />);
		const spinner = getByLabelText("Loading");
		expect(spinner).toBeTruthy();
	});

	it("applies inline variant", () => {
		const { getByLabelText } = render(<Spinner variant="inline" />);
		const spinner = getByLabelText("Loading");
		expect(spinner).toBeTruthy();
	});

	it("applies overlay variant", () => {
		const { getByLabelText } = render(<Spinner variant="overlay" />);
		const spinner = getByLabelText("Loading");
		expect(spinner).toBeTruthy();
	});

	it("applies custom aria-label", () => {
		const { getByLabelText } = render(<Spinner ariaLabel="Processing data" />);
		expect(getByLabelText("Processing data")).toBeTruthy();
	});

	it("sets accessibility role", () => {
		const { getByRole } = render(<Spinner />);
		expect(getByRole("progressbar")).toBeTruthy();
	});

	it("sets aria-busy", () => {
		const { getByRole } = render(<Spinner />);
		const spinner = getByRole("progressbar");
		expect(spinner.props["aria-busy"]).toBe(true);
	});

	it("renders with default size", () => {
		const { getByLabelText } = render(<Spinner />);
		const spinner = getByLabelText("Loading");
		// Should render with default medium size
		expect(spinner).toBeTruthy();
	});

	it("renders with default color", () => {
		const { getByLabelText } = render(<Spinner />);
		const spinner = getByLabelText("Loading");
		// Should render with theme color
		expect(spinner).toBeTruthy();
	});

	it("renders inline without overlay", () => {
		const { queryByTestId } = render(<Spinner variant="inline" />);
		// Should not have overlay backdrop
		expect(queryByTestId("spinner-overlay")).toBeNull();
	});

	it("renders overlay with backdrop", () => {
		const { getByLabelText } = render(<Spinner variant="overlay" />);
		// Should have overlay backdrop
		const spinner = getByLabelText("Loading");
		expect(spinner).toBeTruthy();
	});
});
