import type { NextFunction, Request, Response } from "express";
import { config } from "../config";

const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
} as const;

type LogLevel = keyof typeof logLevels;

class Logger {
	private level: LogLevel;
	private isProduction: boolean;

	constructor(level: LogLevel = "info", isProduction = false) {
		this.level = level;
		this.isProduction = isProduction;
	}

	private shouldLog(level: LogLevel): boolean {
		return logLevels[level] <= logLevels[this.level];
	}

	private log(level: LogLevel, message: string, data: Record<string, unknown> = {}) {
		if (!this.shouldLog(level)) {
			return;
		}

		if (this.isProduction) {
			console.log(
				JSON.stringify({
					severity: level.toUpperCase(),
					message,
					...data,
					timestamp: new Date().toISOString(),
				}),
			);
		} else {
			const colorMap = {
				error: "\x1b[31m", // red
				warn: "\x1b[33m", // yellow
				info: "\x1b[32m", // green
				debug: "\x1b[34m", // blue
			};
			const resetColor = "\x1b[0m";
			const color = colorMap[level] || resetColor;

			console.log(
				`${color}[${level.toUpperCase()}]${resetColor} ${new Date().toISOString()} ${message}`,
				...Object.values(data),
			);
		}
	}

	error(message: string, data?: Record<string, unknown>) {
		this.log("error", message, data);
	}

	warn(message: string, data?: Record<string, unknown>) {
		this.log("warn", message, data);
	}

	info(message: string, data?: Record<string, unknown>) {
		this.log("info", message, data);
	}

	debug(message: string, data?: Record<string, unknown>) {
		this.log("debug", message, data);
	}
}

export const appLogger = new Logger(config.LOG_LEVEL, config.NODE_ENV === "production");

export const logger = (req: Request, res: Response, next: NextFunction) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		const { method, originalUrl, ip } = req;
		const { statusCode } = res;

		const message = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
		const data = {
			httpRequest: {
				requestMethod: method,
				requestUrl: originalUrl,
				status: statusCode,
				latency: `${duration}ms`,
				remoteIp: ip,
				userAgent: req.get("user-agent"),
			},
		};

		if (statusCode >= 500) {
			appLogger.error(message, data);
		} else if (statusCode >= 400) {
			appLogger.warn(message, data);
		} else {
			appLogger.info(message, data);
		}
	});

	next();
};
