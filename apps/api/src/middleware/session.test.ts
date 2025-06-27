import { requireAuth, requireGuest } from "./session";

describe("Session Middleware", () => {
	describe("requireAuth", () => {
		it("should allow authenticated users", () => {
			const req = { session: { userId: "test-user" } };
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			requireAuth(req, res, next);

			expect(next).toHaveBeenCalled();
			expect(res.status).not.toHaveBeenCalled();
		});

		it("should reject unauthenticated users", () => {
			const req = { session: {} };
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			requireAuth(req, res, next);

			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ error: "Authentication required" });
			expect(next).not.toHaveBeenCalled();
		});

		it("should reject users without session", () => {
			const req = {};
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			requireAuth(req, res, next);

			expect(res.status).toHaveBeenCalledWith(401);
			expect(next).not.toHaveBeenCalled();
		});
	});

	describe("requireGuest", () => {
		it("should allow unauthenticated users", () => {
			const req = { session: {} };
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			requireGuest(req, res, next);

			expect(next).toHaveBeenCalled();
			expect(res.status).not.toHaveBeenCalled();
		});

		it("should reject authenticated users", () => {
			const req = { session: { userId: "test-user" } };
			const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
			const next = jest.fn();

			requireGuest(req, res, next);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: "Already authenticated" });
			expect(next).not.toHaveBeenCalled();
		});
	});
});
