import type { NextFunction, Request, Response } from "express";
import { config } from "../config";

const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
} as const;

class Logger {
	private level: keyof typeof logLevels;

	constructor(level: keyof typeof logLevels = "info") {
		this.level = level;
	}

	private shouldLog(level: keyof typeof logLevels): boolean {
		return logLevels[level] <= logLevels[this.level];
	}

	error(message: string, ...args: any[]) {
		if (this.shouldLog("error")) {
			console.error(`[ERROR] ${new Date().toISOString()} ${message}`, ...args);
		}
	}

	warn(message: string, ...args: any[]) {
		if (this.shouldLog("warn")) {
			console.warn(`[WARN] ${new Date().toISOString()} ${message}`, ...args);
		}
	}

	info(message: string, ...args: any[]) {
		if (this.shouldLog("info")) {
			console.info(`[INFO] ${new Date().toISOString()} ${message}`, ...args);
		}
	}

	debug(message: string, ...args: any[]) {
		if (this.shouldLog("debug")) {
			console.debug(`[DEBUG] ${new Date().toISOString()} ${message}`, ...args);
		}
	}
}

export const appLogger = new Logger(config.LOG_LEVEL);

export const logger = (req: Request, res: Response, next: NextFunction) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		const message = `${req.method} ${req.path} ${res.statusCode} ${duration}ms`;

		if (res.statusCode >= 500) {
			appLogger.error(message);
		} else if (res.statusCode >= 400) {
			appLogger.warn(message);
		} else {
			appLogger.info(message);
		}
	});

	next();
};
