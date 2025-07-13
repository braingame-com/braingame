import { render } from "@testing-library/react-native";
import { Divider } from "./Divider";

describe("Divider", () => {
	it("renders horizontal divider by default", () => {
		const { getByRole } = render(<Divider />);
		const divider = getByRole("separator");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					height: 1,
					width: "100%",
				}),
			]),
		);
	});

	it("renders vertical divider", () => {
		const { getByRole } = render(<Divider orientation="vertical" />);
		const divider = getByRole("separator");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					width: 1,
					height: "100%",
				}),
			]),
		);
	});

	it("applies thickness", () => {
		const { getByRole } = render(<Divider thickness={2} />);
		const divider = getByRole("separator");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					height: 2,
				}),
			]),
		);
	});

	it("applies color", () => {
		const { getByRole } = render(<Divider color="#ff0000" />);
		const divider = getByRole("separator");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					backgroundColor: "#ff0000",
				}),
			]),
		);
	});

	it("applies variant styles", () => {
		const variants = ["solid", "dashed"] as const;
		for (const variant of variants) {
			const { getByRole } = render(<Divider variant={variant} />);
			const divider = getByRole("separator");
			expect(divider.props.style).toBeDefined();
		}
	});

	it("sets correct accessibility role", () => {
		const { getByRole } = render(<Divider />);
		expect(getByRole("separator")).toBeTruthy();
	});

	it("applies aria-orientation for horizontal", () => {
		const { getByRole } = render(<Divider />);
		const divider = getByRole("separator");
		expect(divider.props["aria-orientation"]).toBe("horizontal");
	});

	it("applies aria-orientation for vertical", () => {
		const { getByRole } = render(<Divider orientation="vertical" />);
		const divider = getByRole("separator");
		expect(divider.props["aria-orientation"]).toBe("vertical");
	});

	it("applies custom styles", () => {
		const customStyle = { opacity: 0.5 };
		const { getByRole } = render(<Divider style={customStyle} />);
		const divider = getByRole("separator");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});
});
