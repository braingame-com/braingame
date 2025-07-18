/**
 * Performance measurement utilities for BGUI components
 */

// Use browser performance API on web, mock on native
const performance =
	typeof window !== "undefined" && window.performance
		? window.performance
		: {
				now: () => Date.now(),
				mark: () => {},
				measure: () => {},
				getEntriesByName: () => [],
				getEntriesByType: () => [],
				clearMarks: () => {},
				clearMeasures: () => {},
			};

export interface ComponentPerfResult {
	componentName: string;
	avgRenderTime: number;
	minRenderTime: number;
	maxRenderTime: number;
	renderCount: number;
}

class PerformanceMeasurement {
	private measurements: Map<string, number[]> = new Map();

	/**
	 * Start measuring a component render
	 */
	startMeasure(componentName: string, instanceId: string) {
		const markName = `${componentName}-${instanceId}-start`;
		performance.mark(markName);
	}

	/**
	 * End measuring a component render
	 */
	endMeasure(componentName: string, instanceId: string) {
		const startMark = `${componentName}-${instanceId}-start`;
		const endMark = `${componentName}-${instanceId}-end`;
		const measureName = `${componentName}-${instanceId}-render`;

		performance.mark(endMark);
		performance.measure(measureName, startMark, endMark);

		// Get the measure and store it
		const measures = performance.getEntriesByName(measureName);
		if (measures.length > 0) {
			const duration = measures[0].duration;
			if (!this.measurements.has(componentName)) {
				this.measurements.set(componentName, []);
			}
			this.measurements.get(componentName)?.push(duration);
		}

		// Clean up marks
		performance.clearMarks(startMark);
		performance.clearMarks(endMark);
		performance.clearMeasures(measureName);
	}

	/**
	 * Get performance results for a component
	 */
	getResults(componentName: string): ComponentPerfResult | null {
		const times = this.measurements.get(componentName);
		if (!times || times.length === 0) {
			return null;
		}

		const sum = times.reduce((a, b) => a + b, 0);
		const avg = sum / times.length;
		const min = Math.min(...times);
		const max = Math.max(...times);

		return {
			componentName,
			avgRenderTime: avg,
			minRenderTime: min,
			maxRenderTime: max,
			renderCount: times.length,
		};
	}

	/**
	 * Get all results
	 */
	getAllResults(): ComponentPerfResult[] {
		const results: ComponentPerfResult[] = [];

		const entries = Array.from(this.measurements.entries());
		for (const [componentName] of entries) {
			const result = this.getResults(componentName);
			if (result) {
				results.push(result);
			}
		}

		return results;
	}

	/**
	 * Clear all measurements
	 */
	clear() {
		this.measurements.clear();
	}
}

export const perfMeasurement = new PerformanceMeasurement();
