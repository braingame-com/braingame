// Simple test to verify Jest is working
describe("Simple Test Suite", () => {
	it("should perform basic math", () => {
		expect(2 + 2).toBe(4);
	});

	it("should handle strings", () => {
		expect("hello" + " " + "world").toBe("hello world");
	});

	it("should work with arrays", () => {
		const arr = [1, 2, 3];
		expect(arr.length).toBe(3);
		expect(arr[0]).toBe(1);
	});

	it("should work with objects", () => {
		const obj = { name: "test", value: 42 };
		expect(obj.name).toBe("test");
		expect(obj.value).toBe(42);
	});
});
