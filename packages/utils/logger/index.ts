export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LoggerConfig {
	level?: LogLevel;
	enabled?: boolean;
	prefix?: string;
}

export interface Logger {
	debug: (message: string, ...args: unknown[]) => void;
	info: (message: string, ...args: unknown[]) => void;
	warn: (message: string, ...args: unknown[]) => void;
	error: (message: string, ...args: unknown[]) => void;
	log: (level: LogLevel, message: string, ...args: unknown[]) => void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

class LoggerService implements Logger {
	private level: LogLevel;
	private enabled: boolean;
	private prefix?: string;

	constructor(config: LoggerConfig = {}) {
		this.level = config.level || "info";
		this.enabled = config.enabled ?? true;
		this.prefix = config.prefix;
	}

	private shouldLog(level: LogLevel): boolean {
		if (!this.enabled) return false;
		return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
	}

	private formatMessage(level: LogLevel, message: string): string {
		const timestamp = new Date().toISOString();
		const prefix = this.prefix ? `[${this.prefix}] ` : "";
		return `[${timestamp}] [${level.toUpperCase()}] ${prefix}${message}`;
	}

	log(level: LogLevel, message: string, ...args: unknown[]): void {
		if (!this.shouldLog(level)) return;

		const formattedMessage = this.formatMessage(level, message);

		switch (level) {
			case "debug":
				console.log(formattedMessage, ...args);
				break;
			case "info":
				console.info(formattedMessage, ...args);
				break;
			case "warn":
				console.warn(formattedMessage, ...args);
				break;
			case "error":
				console.error(formattedMessage, ...args);
				break;
		}
	}

	debug(message: string, ...args: unknown[]): void {
		this.log("debug", message, ...args);
	}

	info(message: string, ...args: unknown[]): void {
		this.log("info", message, ...args);
	}

	warn(message: string, ...args: unknown[]): void {
		this.log("warn", message, ...args);
	}

	error(message: string, ...args: unknown[]): void {
		this.log("error", message, ...args);
	}
}

// Factory function to create logger instances
export function createLogger(config?: LoggerConfig): Logger {
	return new LoggerService(config);
}

// Default logger instance
export const logger = createLogger({
	level: "debug",
	enabled: true,
});

// Export for convenience
export default logger;
