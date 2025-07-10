"use client";

import { useEffect } from "react";

/**
 * Hook to register and manage service worker
 */
export function useServiceWorker() {
	useEffect(() => {
		if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
			return;
		}

		// Only register in production
		if (process.env.NODE_ENV !== "production") {
			return;
		}

		const registerServiceWorker = async () => {
			try {
				const registration = await navigator.serviceWorker.register("/sw.js", {
					scope: "/",
				});

				// Log successful registration
				console.log("Service Worker registered successfully:", registration.scope);

				// Check for updates
				registration.addEventListener("updatefound", () => {
					const newWorker = registration.installing;
					if (newWorker) {
						newWorker.addEventListener("statechange", () => {
							if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
								// New content is available
								console.log("New content is available; please refresh.");
							}
						});
					}
				});
			} catch (error) {
				console.error("Service Worker registration failed:", error);
			}
		};

		// Register service worker after page load
		window.addEventListener("load", registerServiceWorker);

		return () => {
			window.removeEventListener("load", registerServiceWorker);
		};
	}, []);
}
