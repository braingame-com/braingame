// Jest setup for Reassure performance tests
import { resetToDefaults } from "reassure";

// Reset Reassure configuration before each test
beforeEach(() => {
	resetToDefaults();
});

// Mock console methods to reduce noise in performance tests
global.console = {
	...console,
	log: jest.fn(),
	debug: jest.fn(),
	info: jest.fn(),
	warn: jest.fn(),
	error: jest.fn(),
};
