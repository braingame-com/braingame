import { commonSchemas, isValidObjectId, sanitizeInput } from "./security";

describe("Security Utils", () => {
	describe("sanitizeInput", () => {
		it("should remove MongoDB operators from objects", () => {
			const maliciousInput = {
				username: "john",
				$ne: null,
				password: { $regex: ".*" },
			};

			const sanitized = sanitizeInput(maliciousInput);

			expect(sanitized).toEqual({
				username: "john",
				password: {},
			});
			expect(sanitized.$ne).toBeUndefined();
		});

		it("should recursively sanitize nested objects", () => {
			const input = {
				user: {
					name: "john",
					$where: "malicious code",
					profile: {
						age: 30,
						$gt: 100,
					},
				},
			};

			const sanitized = sanitizeInput(input);

			expect(sanitized).toEqual({
				user: {
					name: "john",
					profile: {
						age: 30,
					},
				},
			});
		});

		it("should handle arrays correctly", () => {
			const input = {
				tags: ["tag1", "$malicious", "tag2"],
				items: [{ name: "item1", $bad: true }, { name: "item2" }],
			};

			const sanitized = sanitizeInput(input);

			expect(sanitized.tags).toEqual(["tag1", "$malicious", "tag2"]);
			expect(sanitized.items).toEqual([{ name: "item1" }, { name: "item2" }]);
		});

		it("should return non-object inputs unchanged", () => {
			expect(sanitizeInput("string")).toBe("string");
			expect(sanitizeInput(123)).toBe(123);
			expect(sanitizeInput(null)).toBe(null);
			expect(sanitizeInput(true)).toBe(true);
		});
	});

	describe("isValidObjectId", () => {
		it("should validate correct ObjectId format", () => {
			expect(isValidObjectId("507f1f77bcf86cd799439011")).toBe(true);
			expect(isValidObjectId("507F1F77BCF86CD799439011")).toBe(true);
		});

		it("should reject invalid ObjectId format", () => {
			expect(isValidObjectId("invalid")).toBe(false);
			expect(isValidObjectId("507f1f77bcf86cd79943901")).toBe(false); // Too short
			expect(isValidObjectId("507f1f77bcf86cd7994390111")).toBe(false); // Too long
			expect(isValidObjectId("507f1f77bcf86cd79943901g")).toBe(false); // Invalid character
		});
	});

	describe("commonSchemas", () => {
		it("should validate email correctly", () => {
			expect(() => commonSchemas.email.parse("user@example.com")).not.toThrow();
			expect(() => commonSchemas.email.parse("invalid-email")).toThrow();
		});

		it("should validate username correctly", () => {
			expect(() => commonSchemas.username.parse("user123")).not.toThrow();
			expect(() => commonSchemas.username.parse("user-name_123")).not.toThrow();
			expect(() => commonSchemas.username.parse("us")).toThrow(); // Too short
			expect(() => commonSchemas.username.parse("user@name")).toThrow(); // Invalid character
		});

		it("should validate password correctly", () => {
			expect(() => commonSchemas.password.parse("password123")).not.toThrow();
			expect(() => commonSchemas.password.parse("short")).toThrow(); // Too short
		});

		it("should validate pagination correctly", () => {
			const result = commonSchemas.pagination.parse({});
			expect(result).toEqual({ page: 1, limit: 20 });

			const custom = commonSchemas.pagination.parse({ page: 5, limit: 50 });
			expect(custom).toEqual({ page: 5, limit: 50 });

			expect(() => commonSchemas.pagination.parse({ limit: 150 })).toThrow(); // Exceeds max
		});
	});
});
