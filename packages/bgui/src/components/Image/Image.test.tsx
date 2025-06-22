import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { vi } from "vitest";
import { Image } from "./Image";

describe("Image", () => {
	it("renders with src and alt", () => {
		const { getByLabelText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" />,
		);
		expect(getByLabelText("Test image")).toBeTruthy();
	});

	it("shows placeholder while loading", () => {
		const placeholder = <Text>Loading...</Text>;
		const { getByText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" placeholder={placeholder} />,
		);
		expect(getByText("Loading...")).toBeTruthy();
	});

	it("calls onLoad when image loads", async () => {
		const onLoad = vi.fn();
		const { getByLabelText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" onLoad={onLoad} />,
		);

		const image = getByLabelText("Test image");
		fireEvent(image, "load");

		await waitFor(() => {
			expect(onLoad).toHaveBeenCalled();
		});
	});

	it("shows error state on load failure", async () => {
		const { getByLabelText, getByText } = render(
			<Image src="https://example.com/broken.jpg" alt="Broken image" />,
		);

		const image = getByLabelText("Broken image");
		fireEvent(image, "error");

		await waitFor(() => {
			expect(getByText("Failed to load image")).toBeTruthy();
			expect(getByLabelText("Failed to load image: Broken image")).toBeTruthy();
		});
	});

	it("renders custom fallback on error", async () => {
		const fallback = <Text>Custom error</Text>;
		const { getByLabelText, getByText } = render(
			<Image src="https://example.com/broken.jpg" alt="Broken image" fallback={fallback} />,
		);

		const image = getByLabelText("Broken image");
		fireEvent(image, "error");

		await waitFor(() => {
			expect(getByText("Custom error")).toBeTruthy();
		});
	});

	it("calls onError when image fails", async () => {
		const onError = vi.fn();
		const { getByLabelText } = render(
			<Image src="https://example.com/broken.jpg" alt="Broken image" onError={onError} />,
		);

		const image = getByLabelText("Broken image");
		fireEvent(image, "error");

		await waitFor(() => {
			expect(onError).toHaveBeenCalled();
		});
	});

	it("applies aspect ratio", () => {
		const { getByLabelText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" aspectRatio={16 / 9} />,
		);

		const container = getByLabelText("Test image").parent;
		expect(container?.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ aspectRatio: 16 / 9 })]),
		);
	});

	it("supports different object fit values", () => {
		const { getByLabelText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" objectFit="contain" />,
		);

		const image = getByLabelText("Test image");
		expect(image.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ objectFit: "contain" })]),
		);
	});

	it("applies responsive variant styles", () => {
		const { getByLabelText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" variant="responsive" />,
		);

		const container = getByLabelText("Test image").parent;
		expect(container?.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ width: "100%" })]),
		);
	});

	it("validates required props", () => {
		console.error = vi.fn();

		// Missing src
		expect(() => {
			render(<Image src="" alt="Test" />);
		}).toThrow();

		// Missing alt
		expect(() => {
			render(<Image src="https://example.com/image.jpg" alt="" />);
		}).toThrow();
	});

	it("hides placeholder after load", async () => {
		const placeholder = <Text>Loading...</Text>;
		const { getByLabelText, queryByText } = render(
			<Image src="https://example.com/image.jpg" alt="Test image" placeholder={placeholder} />,
		);

		const image = getByLabelText("Test image");
		fireEvent(image, "load");

		await waitFor(() => {
			expect(queryByText("Loading...")).toBeNull();
		});
	});
});
