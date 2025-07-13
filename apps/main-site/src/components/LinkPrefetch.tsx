"use client";

import { useEffect } from "react";

interface LinkPrefetchProps {
	urls: string[];
}

/**
 * Component to prefetch resources for better performance
 */
export function LinkPrefetch({ urls }: LinkPrefetchProps) {
	useEffect(() => {
		const links: HTMLLinkElement[] = [];

		urls.forEach((url) => {
			const link = document.createElement("link");
			link.rel = "prefetch";
			link.href = url;
			link.as = "document";
			document.head.appendChild(link);
			links.push(link);
		});

		return () => {
			links.forEach((link) => {
				document.head.removeChild(link);
			});
		};
	}, [urls]);

	return null;
}
