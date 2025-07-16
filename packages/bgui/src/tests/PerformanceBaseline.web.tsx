import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Box } from "../components/Box";
import { Container } from "../components/Container";
import { Divider } from "../components/Divider";
import { Stack } from "../components/Stack";
import { Text } from "../components/Text";

/**
 * Web version of performance baseline component
 * Uses browser Performance API to measure render times
 */

interface ComponentPerfResult {
	componentName: string;
	avgRenderTime: number;
	minRenderTime: number;
	maxRenderTime: number;
	samples: number;
	measurements: number[];
}

interface PerfComponentProps {
	componentName: string;
	onRender?: () => void;
	children: React.ReactNode;
}

const measurements = new Map<string, number[]>();

const PerfComponent: React.FC<PerfComponentProps> = ({ componentName, onRender, children }) => {
	const instanceId = useRef(`${Date.now()}-${Math.random()}`).current;

	useEffect(() => {
		const startMark = `${componentName}-${instanceId}-start`;
		const endMark = `${componentName}-${instanceId}-end`;
		const measureName = `${componentName}-${instanceId}`;

		performance.mark(startMark);

		// Use RAF to ensure the component has been painted
		requestAnimationFrame(() => {
			performance.mark(endMark);
			performance.measure(measureName, startMark, endMark);

			const entries = performance.getEntriesByName(measureName);
			if (entries.length > 0) {
				const duration = entries[entries.length - 1].duration;

				if (!measurements.has(componentName)) {
					measurements.set(componentName, []);
				}
				measurements.get(componentName)!.push(duration);
			}

			performance.clearMarks(startMark);
			performance.clearMarks(endMark);
			performance.clearMeasures(measureName);

			onRender?.();
		});
	});

	return <>{children}</>;
};

const generateReport = (): string => {
	const results: ComponentPerfResult[] = [];

	for (const [componentName, values] of measurements) {
		if (values.length === 0) continue;

		const sum = values.reduce((a, b) => a + b, 0);
		const avg = sum / values.length;
		const min = Math.min(...values);
		const max = Math.max(...values);

		results.push({
			componentName,
			avgRenderTime: avg,
			minRenderTime: min,
			maxRenderTime: max,
			samples: values.length,
			measurements: [...values],
		});
	}

	let report = "# BGUI Component Performance Baseline (Web)\n\n";
	report += `Generated on: ${new Date().toISOString()}\n\n`;
	report += "## Component Render Times (in milliseconds)\n\n";
	report += "| Component | Avg | Min | Max | Samples |\n";
	report += "|-----------|-----|-----|-----|---------|\\n";

	for (const result of results) {
		report += `| ${result.componentName} | ${result.avgRenderTime.toFixed(2)} | ${result.minRenderTime.toFixed(2)} | ${result.maxRenderTime.toFixed(2)} | ${result.samples} |\n`;
	}

	report += "\n## Detailed Measurements\n\n";

	for (const result of results) {
		report += `### ${result.componentName}\n`;
		report += `- Average: ${result.avgRenderTime.toFixed(2)}ms\n`;
		report += `- Min: ${result.minRenderTime.toFixed(2)}ms\n`;
		report += `- Max: ${result.maxRenderTime.toFixed(2)}ms\n`;
		report += `- Samples: ${result.samples}\n`;
		report += `- All measurements: [${result.measurements.map((m) => m.toFixed(2)).join(", ")}]\n\n`;
	}

	return report;
};

export const PerformanceBaseline: React.FC = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [report, setReport] = useState<string>("");
	const [progress, setProgress] = useState(0);
	const [renderCount, setRenderCount] = useState(0);

	const runPerformanceTests = async () => {
		setIsRunning(true);
		setCompleted(false);
		setProgress(0);
		measurements.clear();

		const totalTests = 50; // Number of samples per component

		// Trigger re-renders to collect measurements
		for (let i = 0; i < totalTests; i++) {
			await new Promise<void>((resolve) => {
				setRenderCount(i);
				setProgress((i / totalTests) * 100);
				setTimeout(resolve, 50); // Small delay between tests
			});
		}

		// Generate report
		const perfReport = generateReport();
		setReport(perfReport);
		setCompleted(true);
		setIsRunning(false);
	};

	return (
		<div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
			<div style={{ marginBottom: "20px" }}>
				<h1>BGUI Performance Baseline (Web)</h1>
				<p>
					This will measure render times for Box, Text, Stack, Divider, and Container components.
				</p>

				<button
					onClick={runPerformanceTests}
					disabled={isRunning}
					style={{
						padding: "10px 20px",
						fontSize: "16px",
						backgroundColor: isRunning ? "#ccc" : "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: isRunning ? "not-allowed" : "pointer",
					}}
				>
					{isRunning ? "Running..." : "Run Performance Tests"}
				</button>

				{isRunning && (
					<div style={{ marginTop: "10px" }}>
						<p>Progress: {progress.toFixed(0)}%</p>
					</div>
				)}
			</div>

			{/* Test Components - rendered multiple times during test */}
			{isRunning && (
				<div style={{ opacity: 0.3 }} key={renderCount}>
					<PerfComponent componentName="Box">
						<Box padding="md" backgroundColor="surface">
							<div>Box Component Test</div>
						</Box>
					</PerfComponent>

					<PerfComponent componentName="Text">
						<Text variant="h2">Text Component Test</Text>
					</PerfComponent>

					<PerfComponent componentName="Stack">
						<Stack spacing="md">
							<div>Stack Item 1</div>
							<div>Stack Item 2</div>
							<div>Stack Item 3</div>
						</Stack>
					</PerfComponent>

					<PerfComponent componentName="Divider">
						<Divider />
					</PerfComponent>

					<PerfComponent componentName="Container">
						<Container maxWidth="md">
							<div>Container Content</div>
						</Container>
					</PerfComponent>
				</div>
			)}

			{/* Results */}
			{completed && report && (
				<div style={{ marginTop: "20px" }}>
					<h2>Performance Report:</h2>
					<pre
						style={{
							backgroundColor: "#f5f5f5",
							padding: "15px",
							borderRadius: "5px",
							overflow: "auto",
							fontSize: "12px",
							fontFamily: "monospace",
						}}
					>
						{report}
					</pre>
				</div>
			)}
		</div>
	);
};
