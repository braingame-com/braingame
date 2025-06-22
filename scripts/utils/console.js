const { default: chalk } = require("chalk");

/**
 * Console utilities for consistent colored output across scripts
 */

const success = (message) => {
	console.log(chalk.green("✓"), message);
};

const error = (message) => {
	console.error(chalk.red("✗"), message);
};

const warning = (message) => {
	console.warn(chalk.yellow("⚠"), message);
};

const info = (message) => {
	console.log(chalk.blue("ℹ"), message);
};

const status = (message) => {
	console.log(chalk.blue("[STATUS]"), message);
};

const highlight = {
	success: (text) => chalk.green(text),
	error: (text) => chalk.red(text),
	warning: (text) => chalk.yellow(text),
	info: (text) => chalk.blue(text),
	bold: (text) => chalk.bold(text),
	dim: (text) => chalk.dim(text),
};

module.exports = {
	success,
	error,
	warning,
	info,
	status,
	highlight,
	chalk, // Export chalk itself for advanced usage
};
