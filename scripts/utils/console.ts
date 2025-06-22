import chalk from "chalk";

/**
 * Console utilities for consistent colored output across scripts
 */

export const success = (message: string): void => {
	console.log(chalk.green("✓"), message);
};

export const error = (message: string): void => {
	console.error(chalk.red("✗"), message);
};

export const warning = (message: string): void => {
	console.warn(chalk.yellow("⚠"), message);
};

export const info = (message: string): void => {
	console.log(chalk.blue("ℹ"), message);
};

export const status = (message: string): void => {
	console.log(chalk.blue("[STATUS]"), message);
};

export const highlight = {
	success: (text: string) => chalk.green(text),
	error: (text: string) => chalk.red(text),
	warning: (text: string) => chalk.yellow(text),
	info: (text: string) => chalk.blue(text),
	bold: (text: string) => chalk.bold(text),
	dim: (text: string) => chalk.dim(text),
};

// Export chalk itself for advanced usage
export { chalk };
