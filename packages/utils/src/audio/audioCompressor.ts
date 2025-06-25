import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface CompressionOptions {
	bitrate?: string; // e.g., '64k', '128k'
	format?: "mp3" | "aac" | "ogg";
	sampleRate?: number; // e.g., 44100, 22050
	channels?: 1 | 2; // mono or stereo
	quality?: "low" | "medium" | "high" | "voice";
}

export interface CompressionResult {
	success: boolean;
	originalSize: number;
	compressedSize: number;
	compressionRatio: number;
	outputPath: string;
	duration?: number;
	error?: string;
}

// Quality presets for different use cases
const QUALITY_PRESETS = {
	voice: {
		bitrate: "32k",
		sampleRate: 22050,
		channels: 1,
	},
	low: {
		bitrate: "64k",
		sampleRate: 22050,
		channels: 1,
	},
	medium: {
		bitrate: "96k",
		sampleRate: 44100,
		channels: 2,
	},
	high: {
		bitrate: "128k",
		sampleRate: 44100,
		channels: 2,
	},
};

/**
 * Check if ffmpeg is installed
 */
export async function checkFfmpegInstalled(): Promise<boolean> {
	try {
		await execAsync("ffmpeg -version");
		return true;
	} catch {
		return false;
	}
}

/**
 * Get audio file information
 */
export async function getAudioInfo(inputPath: string): Promise<{
	duration: number;
	bitrate: string;
	format: string;
	size: number;
}> {
	try {
		const stats = await fs.stat(inputPath);
		const { stdout } = await execAsync(
			`ffprobe -v error -show_entries format=duration,bit_rate,format_name -of json "${inputPath}"`,
		);
		const info = JSON.parse(stdout);

		return {
			duration: Number.parseFloat(info.format.duration),
			bitrate: info.format.bit_rate,
			format: info.format.format_name,
			size: stats.size,
		};
	} catch (error) {
		throw new Error(`Failed to get audio info: ${error}`);
	}
}

/**
 * Compress audio file with specified options
 */
export async function compressAudio(
	inputPath: string,
	outputPath: string,
	options: CompressionOptions = {},
): Promise<CompressionResult> {
	try {
		// Check if ffmpeg is installed
		const ffmpegInstalled = await checkFfmpegInstalled();
		if (!ffmpegInstalled) {
			throw new Error("ffmpeg is not installed. Please install ffmpeg to compress audio.");
		}

		// Get original file info
		const originalStats = await fs.stat(inputPath);
		const originalSize = originalStats.size;

		// Apply quality preset if specified
		const preset = options.quality ? QUALITY_PRESETS[options.quality] : {};
		const finalOptions = { ...preset, ...options };

		// Build ffmpeg command
		const command = buildFfmpegCommand(inputPath, outputPath, finalOptions);

		// Execute compression
		console.log(`Compressing audio: ${path.basename(inputPath)}`);
		console.log(`Command: ${command}`);

		const { stderr } = await execAsync(command);

		// Log any warnings (ffmpeg outputs to stderr even on success)
		if (stderr && process.env.NODE_ENV !== "production") {
			console.log("FFmpeg output:", stderr);
		}

		// Get compressed file info
		const compressedStats = await fs.stat(outputPath);
		const compressedSize = compressedStats.size;
		const compressionRatio = (1 - compressedSize / originalSize) * 100;

		// Get duration from compressed file
		let duration: number | undefined;
		try {
			const info = await getAudioInfo(outputPath);
			duration = info.duration;
		} catch {
			// Duration is optional
		}

		return {
			success: true,
			originalSize,
			compressedSize,
			compressionRatio,
			outputPath,
			duration,
		};
	} catch (error) {
		return {
			success: false,
			originalSize: 0,
			compressedSize: 0,
			compressionRatio: 0,
			outputPath: "",
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

/**
 * Build ffmpeg command based on options
 */
function buildFfmpegCommand(
	inputPath: string,
	outputPath: string,
	options: CompressionOptions,
): string {
	const args: string[] = [
		"ffmpeg",
		"-i",
		`"${inputPath}"`,
		"-y", // Overwrite output file
	];

	// Audio codec based on format
	const format = options.format || "mp3";
	switch (format) {
		case "aac":
			args.push("-c:a", "aac");
			break;
		case "ogg":
			args.push("-c:a", "libvorbis");
			break;
		case "mp3":
		default:
			args.push("-c:a", "libmp3lame");
			break;
	}

	// Bitrate
	if (options.bitrate) {
		args.push("-b:a", options.bitrate);
	}

	// Sample rate
	if (options.sampleRate) {
		args.push("-ar", String(options.sampleRate));
	}

	// Channels (mono/stereo)
	if (options.channels) {
		args.push("-ac", String(options.channels));
	}

	// Output file
	args.push(`"${outputPath}"`);

	return args.join(" ");
}

/**
 * Compress audio for different use cases
 */
export const compressionPresets = {
	/**
	 * Compress for meditation/affirmation audio (voice-optimized)
	 */
	async compressForMeditation(inputPath: string, outputPath: string): Promise<CompressionResult> {
		return compressAudio(inputPath, outputPath, {
			quality: "voice",
			format: "mp3",
		});
	},

	/**
	 * Compress for music (balanced quality)
	 */
	async compressForMusic(inputPath: string, outputPath: string): Promise<CompressionResult> {
		return compressAudio(inputPath, outputPath, {
			quality: "medium",
			format: "mp3",
		});
	},

	/**
	 * Compress for storage (maximum compression)
	 */
	async compressForStorage(inputPath: string, outputPath: string): Promise<CompressionResult> {
		return compressAudio(inputPath, outputPath, {
			quality: "low",
			format: "ogg",
		});
	},

	/**
	 * Compress for streaming (adaptive bitrate)
	 */
	async compressForStreaming(inputPath: string, outputPath: string): Promise<CompressionResult> {
		return compressAudio(inputPath, outputPath, {
			bitrate: "96k",
			format: "aac",
			sampleRate: 44100,
		});
	},
};

/**
 * Batch compress multiple audio files
 */
export async function batchCompressAudio(
	files: Array<{ input: string; output: string }>,
	options: CompressionOptions = {},
): Promise<CompressionResult[]> {
	const results: CompressionResult[] = [];

	for (const file of files) {
		const result = await compressAudio(file.input, file.output, options);
		results.push(result);

		if (result.success) {
			console.log(
				`✓ Compressed ${path.basename(file.input)}: ` +
					`${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} ` +
					`(${result.compressionRatio.toFixed(1)}% reduction)`,
			);
		} else {
			console.error(`✗ Failed to compress ${path.basename(file.input)}: ${result.error}`);
		}
	}

	return results;
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Number.parseFloat((bytes / k ** i).toFixed(1)) + " " + sizes[i];
}

/**
 * Estimate compressed size based on options
 */
export function estimateCompressedSize(
	originalSize: number,
	options: CompressionOptions = {},
): number {
	const quality = options.quality || "medium";
	const reductionFactors = {
		voice: 0.1, // ~90% reduction
		low: 0.15, // ~85% reduction
		medium: 0.25, // ~75% reduction
		high: 0.35, // ~65% reduction
	};

	return Math.round(originalSize * reductionFactors[quality]);
}
