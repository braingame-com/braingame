import { render } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
	it("renders children correctly", () => {
		const { getByText } = render(
			<Container>
				<div>Test Content</div>
			</Container>,
		);

		expect(getByText("Test Content")).toBeTruthy();
	});

	it("applies test ID", () => {
		const { getByTestId } = render(
			<Container testID="test-container">
				<div>Content</div>
			</Container>,
		);

		expect(getByTestId("test-container")).toBeTruthy();
	});

	it("centers content with auto margins", () => {
		const { getByTestId } = render(
			<Container testID="test-container">
				<div>Content</div>
			</Container>,
		);

		const container = getByTestId("test-container");
		const styles = window.getComputedStyle(container);

		expect(styles.marginLeft).toBe("auto");
		expect(styles.marginRight).toBe("auto");
	});

	it("applies max-width constraint", () => {
		const { getByTestId } = render(
			<Container testID="test-container" maxWidth="md">
				<div>Content</div>
			</Container>,
		);

		const container = getByTestId("test-container");
		const styles = window.getComputedStyle(container);

		// Check that max-width is set
		expect(styles.maxWidth).toBeTruthy();
	});

	it("removes padding when disableGutters is true", () => {
		const { getByTestId } = render(
			<Container testID="test-container" disableGutters>
				<div>Content</div>
			</Container>,
		);

		const container = getByTestId("test-container");
		const styles = window.getComputedStyle(container);

		expect(styles.paddingLeft).toBe("0px");
		expect(styles.paddingRight).toBe("0px");
	});

	it("handles false maxWidth", () => {
		const { getByTestId } = render(
			<Container testID="test-container" maxWidth={false}>
				<div>Content</div>
			</Container>,
		);

		const container = getByTestId("test-container");
		const styles = window.getComputedStyle(container);

		// When maxWidth is false, no max-width constraint should be applied
		expect(styles.maxWidth).toBe("none");
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "red" };
		const { getByTestId } = render(
			<Container testID="test-container" style={customStyle}>
				<div>Content</div>
			</Container>,
		);

		const container = getByTestId("test-container");
		const styles = window.getComputedStyle(container);

		expect(styles.backgroundColor).toBe("red");
	});
});
