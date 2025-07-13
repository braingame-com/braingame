"use client";

import { useEffect } from "react";

interface PerformanceMetrics {
	FCP?: number; // First Contentful Paint
	LCP?: number; // Largest Contentful Paint
	FID?: number; // First Input Delay
	CLS?: number; // Cumulative Layout Shift
	TTFB?: number; // Time to First Byte
}

/**
 * Hook to monitor web vitals and performance metrics
 */
export function usePerformanceMonitor(onReport?: (metrics: PerformanceMetrics) => void) {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const metrics: PerformanceMetrics = {};

		// Observe performance entries
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === "largest-contentful-paint") {
					metrics.LCP = Math.round(entry.startTime);
				}

				if (entry.entryType === "first-input" && "processingStart" in entry) {
					const firstInput = entry as PerformanceEventTiming;
					metrics.FID = Math.round(firstInput.processingStart - firstInput.startTime);
				}

				if (entry.entryType === "layout-shift") {
					const layoutShift = entry as PerformanceEntry & {
						hadRecentInput?: boolean;
						value?: number;
					};
					if (!layoutShift.hadRecentInput && layoutShift.value) {
						metrics.CLS = (metrics.CLS || 0) + layoutShift.value;
					}
				}
			}

			onReport?.(metrics);
		});

		// Observe the metrics we care about
		observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] });

		// Get navigation timing data
		const navigationTiming = performance.getEntriesByType(
			"navigation",
		)[0] as PerformanceNavigationTiming;
		if (navigationTiming) {
			metrics.TTFB = Math.round(navigationTiming.responseStart - navigationTiming.requestStart);
		}

		// Get First Contentful Paint
		const paintEntries = performance.getEntriesByType("paint");
		const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint");
		if (fcpEntry) {
			metrics.FCP = Math.round(fcpEntry.startTime);
		}

		// Report initial metrics
		if (Object.keys(metrics).length > 0) {
			onReport?.(metrics);
		}

		// Cleanup
		return () => {
			observer.disconnect();
		};
	}, [onReport]);
}

/**
 * Utility to measure component render performance
 */
export function measurePerformance(componentName: string) {
	if (typeof window === "undefined" || !window.performance) return;

	const startMark = `${componentName}-start`;
	const endMark = `${componentName}-end`;
	const measureName = `${componentName}-render`;

	performance.mark(startMark);

	return () => {
		performance.mark(endMark);
		performance.measure(measureName, startMark, endMark);

		const measure = performance.getEntriesByName(measureName)[0];
		if (measure && process.env.NODE_ENV === "development") {
			console.log(`[Performance] ${componentName} rendered in ${measure.duration.toFixed(2)}ms`);
		}

		// Cleanup marks and measures
		performance.clearMarks(startMark);
		performance.clearMarks(endMark);
		performance.clearMeasures(measureName);
	};
}
