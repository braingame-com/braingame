import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button as RNButton, Text as RNText, ScrollView, View } from "react-native";
import { Box } from "../components/Box";
import { Container } from "../components/Container";
import { Divider } from "../components/Divider";
import { Stack } from "../components/Stack";
import { Text } from "../components/Text";
import { perfMeasurement } from "../utils/performance";

/**
 * Component to establish performance baseline for BGUI components
 * This measures render times for Box, Text, Stack, Divider, and Container
 */

interface PerfComponentProps {
	componentName: string;
	onRender?: () => void;
	children: React.ReactNode;
}

const PerfComponent: React.FC<PerfComponentProps> = ({ componentName, onRender, children }) => {
	const instanceId = useRef(`${Date.now()}-${Math.random()}`).current;

	useEffect(() => {
		perfMeasurement.startMeasure(componentName, instanceId);

		// Use RAF to ensure the component has been painted
		requestAnimationFrame(() => {
			perfMeasurement.endMeasure(componentName, instanceId);
			onRender?.();
		});
	});

	return <>{children}</>;
};

export const PerformanceBaseline: React.FC = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [report, setReport] = useState<string>("");
	const [progress, setProgress] = useState(0);

	const runPerformanceTests = async () => {
		setIsRunning(true);
		setCompleted(false);
		setProgress(0);
		perfMeasurement.clear();

		const totalTests = 50; // Number of samples per component
		const components = ["Box", "Text", "Stack", "Divider", "Container"];
		const totalOperations = totalTests * components.length;
		let currentOperation = 0;

		// Test each component multiple times
		for (let i = 0; i < totalTests; i++) {
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					// Force re-render of test components
					setProgress((currentOperation / totalOperations) * 100);
					currentOperation += components.length;
					resolve();
				}, 100); // Small delay between tests
			});
		}

		// Generate report
		const perfReport = perfMeasurement.generateReport();
		setReport(perfReport);
		setCompleted(true);
		setIsRunning(false);
	};

	return (
		<ScrollView style={{ flex: 1, padding: 20 }}>
			<View style={{ marginBottom: 20 }}>
				<RNText style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
					BGUI Performance Baseline
				</RNText>
				<RNText style={{ marginBottom: 20 }}>
					This will measure render times for Box, Text, Stack, Divider, and Container components.
				</RNText>

				<RNButton
					title={isRunning ? "Running..." : "Run Performance Tests"}
					onPress={runPerformanceTests}
					disabled={isRunning}
				/>

				{isRunning && (
					<View style={{ marginTop: 10 }}>
						<RNText>Progress: {progress.toFixed(0)}%</RNText>
					</View>
				)}
			</View>

			{/* Test Components - rendered multiple times during test */}
			{isRunning && (
				<View style={{ opacity: 0.3 }}>
					<PerfComponent componentName="Box">
						<Box padding="md" backgroundColor="surface">
							<RNText>Box Component Test</RNText>
						</Box>
					</PerfComponent>

					<PerfComponent componentName="Text">
						<Text variant="h2">Text Component Test</Text>
					</PerfComponent>

					<PerfComponent componentName="Stack">
						<Stack spacing="md">
							<RNText>Stack Item 1</RNText>
							<RNText>Stack Item 2</RNText>
							<RNText>Stack Item 3</RNText>
						</Stack>
					</PerfComponent>

					<PerfComponent componentName="Divider">
						<Divider />
					</PerfComponent>

					<PerfComponent componentName="Container">
						<Container maxWidth="md">
							<RNText>Container Content</RNText>
						</Container>
					</PerfComponent>
				</View>
			)}

			{/* Results */}
			{completed && report && (
				<View style={{ marginTop: 20 }}>
					<RNText style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
						Performance Report:
					</RNText>
					<View style={{ backgroundColor: "#f5f5f5", padding: 10, borderRadius: 5 }}>
						<RNText style={{ fontFamily: "monospace", fontSize: 12 }}>{report}</RNText>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
