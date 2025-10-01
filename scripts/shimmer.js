#!/usr/bin/env node

const baseText = process.argv[2] ?? "Checking...";

const stream = process.stderr;

if (!stream.isTTY) {
	process.exit(0);
}

const RESET = "\x1b[0m";
const DEFAULT = "\x1b[39m";
const FAINT = "\x1b[2m";
const BOLD = "\x1b[1m";

const STEP_MS = 60;
const PAUSE_MS = 1000;
const totalFrames = baseText.length + 1;
let timer;
const startTime = Date.now();

function formatDuration(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	if (minutes > 0) {
		return `${minutes}m ${seconds}s`;
	}
	return `${seconds}s`;
}

function getHighlightIndices(frame) {
	const indices = new Set();
	if (frame <= 0 || frame >= totalFrames) {
		return indices;
	}

	if (frame === 1) {
		indices.add(0);
		return indices;
	}
	if (frame === 2) {
		indices.add(0);
		indices.add(1);
		return indices;
	}

	const mainStart = 3;
	const mainEnd = totalFrames - 2;
	if (frame >= mainStart && frame <= mainEnd) {
		const start = frame - mainStart;
		indices.add(start);
		indices.add(start + 1);
		indices.add(start + 2);
		return indices;
	}

	if (frame === totalFrames - 1) {
		const last = baseText.length - 1;
		indices.add(last - 1);
		indices.add(last);
		return indices;
	}
	if (frame === totalFrames) {
		indices.add(baseText.length - 1);
	}

	return indices;
}

function getMiddleIndex(frame) {
	if (frame <= 0 || frame >= totalFrames) {
		return undefined;
	}

	if (frame === 2) {
		return 0;
	}

	const mainStart = 3;
	const mainEnd = totalFrames - 2;
	if (frame >= mainStart && frame <= mainEnd) {
		return frame - mainStart + 1;
	}

	if (frame === totalFrames - 1) {
		return baseText.length - 1;
	}

	return undefined;
}

function buildLine(frame) {
	const indices = getHighlightIndices(frame);
	const middle = getMiddleIndex(frame);
	let out = "\r";
	for (let j = 0; j < baseText.length; j++) {
		const ch = baseText[j];
		if (middle === j) {
			out += `${BOLD}${DEFAULT}${ch}${RESET}`;
		} else if (indices.has(j)) {
			out += `${DEFAULT}${ch}${RESET}`;
		} else {
			out += `${FAINT}${DEFAULT}${ch}${RESET}`;
		}
	}
	const elapsed = Date.now() - startTime;
	const suffix = ` ${FAINT}${DEFAULT}(${formatDuration(elapsed)})${RESET}`;
	return out + suffix;
}

function clearLine() {
	const elapsed = Date.now() - startTime;
	const suffixLength = formatDuration(elapsed).length + 3;
	const totalLength = baseText.length + suffixLength;
	stream.write("\r" + " ".repeat(totalLength) + "\r");
}

let currentFrame = 0;

function tick() {
	const now = Date.now();
	const elapsed = now - startTime;
	const cycleDuration = totalFrames * STEP_MS + PAUSE_MS;
	const phase = elapsed % cycleDuration;

	if (phase >= totalFrames * STEP_MS) {
		stream.write(buildLine(0));
		timer = setTimeout(tick, STEP_MS);
		return;
	}

	currentFrame = Math.floor(phase / STEP_MS) + 1;
	stream.write(buildLine(currentFrame));
	timer = setTimeout(tick, STEP_MS);
}

function stop() {
	if (timer) {
		clearTimeout(timer);
	}
	clearLine();
}

process.on("SIGINT", () => {
	stop();
	process.exit(0);
});

process.on("SIGTERM", () => {
	stop();
	process.exit(0);
});

process.on("exit", stop);

tick();
