import type { Metadata } from "next";

export const homePageMetadata: Metadata = {
	title: "Brain Game - Join the Waitlist",
	description:
		"Be among the first to experience Brain Game's revolutionary personal development platform. Join our exclusive waitlist for early access and special launch benefits.",
	alternates: {
		canonical: "https://braingame.dev",
	},
};

export function generateStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Brain Game",
		description: "The future of personal development technology",
		url: "https://braingame.dev",
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: "https://braingame.dev/search?q={search_term_string}",
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "Brain Game",
			logo: {
				"@type": "ImageObject",
				url: "https://braingame.dev/logo.png",
				width: 600,
				height: 60,
			},
		},
		sameAs: [
			"https://twitter.com/braingame",
			"https://github.com/braingame-com/braingame",
			"https://linkedin.com/company/braingame",
		],
	};
}

export function generateWaitlistStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: "Brain Game Early Access Launch",
		description: "Join the waitlist for early access to Brain Game's personal development platform",
		startDate: "2024-12-01T00:00:00Z",
		endDate: "2025-12-31T23:59:59Z",
		eventStatus: "https://schema.org/EventScheduled",
		eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
		location: {
			"@type": "VirtualLocation",
			url: "https://braingame.dev",
		},
		organizer: {
			"@type": "Organization",
			name: "Brain Game",
			url: "https://braingame.dev",
		},
		offers: {
			"@type": "Offer",
			url: "https://braingame.dev",
			price: "0",
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
			validFrom: "2024-01-01T00:00:00Z",
			validThrough: "2025-12-31T23:59:59Z",
		},
	};
}
