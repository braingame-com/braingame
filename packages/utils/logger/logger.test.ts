import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createLogger } from "./index";

describe("Logger", () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;
	let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
	let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
		consoleInfoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
		consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create a logger instance", () => {
		const logger = createLogger();
		expect(logger).toBeDefined();
		expect(logger.debug).toBeDefined();
		expect(logger.info).toBeDefined();
		expect(logger.warn).toBeDefined();
		expect(logger.error).toBeDefined();
	});

	it("should log messages with correct format", () => {
		const logger = createLogger({ level: "debug" });

		logger.debug("Debug message");
		expect(consoleLogSpy).toHaveBeenCalled();
		const [message] = consoleLogSpy.mock.calls[0];
		expect(message).toMatch(
			/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[DEBUG\] Debug message/,
		);
	});

	it("should respect log levels", () => {
		const logger = createLogger({ level: "warn" });

		logger.debug("Debug message");
		logger.info("Info message");
		logger.warn("Warn message");
		logger.error("Error message");

		expect(consoleLogSpy).not.toHaveBeenCalled();
		expect(consoleInfoSpy).not.toHaveBeenCalled();
		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
	});

	it("should include prefix when provided", () => {
		const logger = createLogger({ prefix: "TestModule", level: "debug" });

		logger.info("Test message");
		expect(consoleInfoSpy).toHaveBeenCalled();
		const [message] = consoleInfoSpy.mock.calls[0];
		expect(message).toMatch(/\[TestModule\] Test message/);
	});

	it("should pass additional arguments", () => {
		const logger = createLogger({ level: "debug" });
		const obj = { key: "value" };

		logger.info("Message with object", obj);
		expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringMatching(/Message with object/), obj);
	});

	it("should respect enabled flag", () => {
		const logger = createLogger({ enabled: false, level: "debug" });

		logger.debug("Debug message");
		logger.info("Info message");
		logger.warn("Warn message");
		logger.error("Error message");

		expect(consoleLogSpy).not.toHaveBeenCalled();
		expect(consoleInfoSpy).not.toHaveBeenCalled();
		expect(consoleWarnSpy).not.toHaveBeenCalled();
		expect(consoleErrorSpy).not.toHaveBeenCalled();
	});
});
