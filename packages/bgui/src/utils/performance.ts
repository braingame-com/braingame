import { performance } from 'react-native-performance';

/**
 * Performance measurement utilities for BGUI components
 */

export interface ComponentPerfResult {
  componentName: string;
  avgRenderTime: number;
  minRenderTime: number;
  maxRenderTime: number;
  samples: number;
  measurements: number[];
}

class PerformanceMeasurement {
  private measurements: Map<string, number[]> = new Map();

  /**
   * Start measuring render time for a component
   */
  startMeasure(componentName: string, instanceId: string): void {
    const markName = `${componentName}-${instanceId}-start`;
    performance.mark(markName);
  }

  /**
   * End measuring render time for a component
   */
  endMeasure(componentName: string, instanceId: string): void {
    const startMarkName = `${componentName}-${instanceId}-start`;
    const endMarkName = `${componentName}-${instanceId}-end`;
    const measureName = `${componentName}-${instanceId}`;
    
    performance.mark(endMarkName);
    performance.measure(measureName, startMarkName, endMarkName);
    
    // Get the measurement
    const entries = performance.getEntriesByName(measureName);
    if (entries.length > 0) {
      const duration = entries[entries.length - 1].duration;
      
      // Store the measurement
      if (!this.measurements.has(componentName)) {
        this.measurements.set(componentName, []);
      }
      this.measurements.get(componentName)!.push(duration);
    }
    
    // Clean up marks
    performance.clearMarks(startMarkName);
    performance.clearMarks(endMarkName);
    performance.clearMeasures(measureName);
  }

  /**
   * Get performance results for a component
   */
  getResults(componentName: string): ComponentPerfResult | null {
    const measurements = this.measurements.get(componentName);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const sum = measurements.reduce((a, b) => a + b, 0);
    const avg = sum / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return {
      componentName,
      avgRenderTime: avg,
      minRenderTime: min,
      maxRenderTime: max,
      samples: measurements.length,
      measurements: [...measurements],
    };
  }

  /**
   * Get all results
   */
  getAllResults(): ComponentPerfResult[] {
    const results: ComponentPerfResult[] = [];
    
    for (const [componentName] of this.measurements) {
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
  clear(): void {
    this.measurements.clear();
  }

  /**
   * Generate a performance report
   */
  generateReport(): string {
    const results = this.getAllResults();
    
    if (results.length === 0) {
      return 'No performance measurements recorded.';
    }

    let report = '# BGUI Component Performance Baseline\n\n';
    report += `Generated on: ${new Date().toISOString()}\n\n`;
    report += '## Component Render Times (in milliseconds)\n\n';
    report += '| Component | Avg | Min | Max | Samples |\n';
    report += '|-----------|-----|-----|-----|---------|\\n';
    
    for (const result of results) {
      report += `| ${result.componentName} | ${result.avgRenderTime.toFixed(2)} | ${result.minRenderTime.toFixed(2)} | ${result.maxRenderTime.toFixed(2)} | ${result.samples} |\n`;
    }
    
    report += '\n## Detailed Measurements\n\n';
    
    for (const result of results) {
      report += `### ${result.componentName}\n`;
      report += `- Average: ${result.avgRenderTime.toFixed(2)}ms\n`;
      report += `- Min: ${result.minRenderTime.toFixed(2)}ms\n`;
      report += `- Max: ${result.maxRenderTime.toFixed(2)}ms\n`;
      report += `- Samples: ${result.samples}\n`;
      report += `- All measurements: [${result.measurements.map(m => m.toFixed(2)).join(', ')}]\n\n`;
    }
    
    return report;
  }
}

// Export singleton instance
export const perfMeasurement = new PerformanceMeasurement();