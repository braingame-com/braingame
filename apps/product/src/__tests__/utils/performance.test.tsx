import { render } from "@testing-library/react-native";
import { InteractionManager, Text } from "react-native";
import {
	animationOptimizations,
	imageOptimizations,
	listOptimizations,
	withMemo,
} from "../../utils/performance";

// Mock React Native modules
jest.mock("react-native", () => ({
	...jest.requireActual("react-native"),
	InteractionManager: {
		runAfterInteractions: jest.fn((callback) => {
			callback();
			return { cancel: jest.fn() };
		}),
	},
}));

describe("Performance Utils", () => {
	describe("withMemo", () => {
		it("memoizes a component", () => {
			const TestComponent = ({ text }: { text: string }) => <Text>{text}</Text>;
			const MemoizedComponent = withMemo(TestComponent);

			render(<MemoizedComponent text="Hello" />);

			// Component should be memoized
			expect(MemoizedComponent).toBeDefined();
			expect(typeof MemoizedComponent).toBe("object");
		});

		it("preserves display name", () => {
			const TestComponent = ({ text }: { text: string }) => <Text>{text}</Text>;
			TestComponent.displayName = "TestComponent";

			const MemoizedComponent = withMemo(TestComponent);
			expect(MemoizedComponent.displayName).toBe("TestComponent");
		});

		it("uses custom display name when provided", () => {
			const TestComponent = ({ text }: { text: string }) => <Text>{text}</Text>;

			const MemoizedComponent = withMemo(TestComponent, "CustomMemoized");
			expect(MemoizedComponent.displayName).toBe("CustomMemoized");
		});

		it("falls back to component name", () => {
			const NamedComponent = ({ text }: { text: string }) => <Text>{text}</Text>;

			const MemoizedComponent = withMemo(NamedComponent);
			expect(MemoizedComponent.displayName).toBe("NamedComponent");
		});
	});

	describe("listOptimizations", () => {
		it("provides key extractor for items with id", () => {
			const item = { id: "123", name: "Test" };
			expect(listOptimizations.keyExtractor(item)).toBe("123");

			const numericItem = { id: 456, name: "Test" };
			expect(listOptimizations.keyExtractor(numericItem)).toBe("456");
		});

		it("provides performance config with correct values", () => {
			expect(listOptimizations.performanceConfig).toEqual({
				removeClippedSubviews: true,
				maxToRenderPerBatch: 10,
				updateCellsBatchingPeriod: 50,
				initialNumToRender: 10,
				windowSize: 10,
			});
		});

		it("calculates item layout correctly", () => {
			const getLayout = listOptimizations.getItemLayout(50);

			expect(getLayout(null, 0)).toEqual({
				length: 50,
				offset: 0,
				index: 0,
			});

			expect(getLayout(null, 5)).toEqual({
				length: 50,
				offset: 250,
				index: 5,
			});
		});
	});

	describe("imageOptimizations", () => {
		it("provides default placeholder", () => {
			expect(imageOptimizations.defaultPlaceholder).toBeDefined();
		});

		it("provides cache control setting", () => {
			expect(imageOptimizations.cacheControl).toBe("immutable");
		});

		it("provides priority levels", () => {
			expect(imageOptimizations.priority).toEqual({
				low: "low",
				normal: "normal",
				high: "high",
			});
		});
	});

	describe("animationOptimizations", () => {
		it("provides native driver config", () => {
			expect(animationOptimizations.nativeDriver).toEqual({
				useNativeDriver: true,
			});
		});

		it("wraps InteractionManager correctly", () => {
			const callback = jest.fn();

			animationOptimizations.runAfterInteractions(callback);

			expect(InteractionManager.runAfterInteractions).toHaveBeenCalledWith(callback);
			expect(callback).toHaveBeenCalled();
		});
	});
});
