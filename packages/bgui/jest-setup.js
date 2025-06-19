// Set up globals
global.__DEV__ = true;

// Silence console warnings during tests
const originalConsole = console;
global.console = {
	...originalConsole,
	warn: jest.fn(),
	error: jest.fn(),
	log: originalConsole.log,
	info: originalConsole.info,
	debug: originalConsole.debug,
};
