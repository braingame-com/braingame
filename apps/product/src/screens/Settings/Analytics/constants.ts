export interface PrivacyOption {
	id: "minimal" | "balanced" | "full";
	label: string;
	description: string;
	features: string[];
}

export const privacyOptions: PrivacyOption[] = [
	{
		id: "minimal",
		label: "Minimal",
		description: "Only essential data for app functionality",
		features: ["Basic app usage", "Crash reports", "Critical errors"],
	},
	{
		id: "balanced",
		label: "Balanced",
		description: "Help us improve while protecting your privacy",
		features: [
			"All minimal features",
			"Feature usage analytics",
			"Anonymous user journey",
			"Performance metrics",
		],
	},
	{
		id: "full",
		label: "Full",
		description: "Maximum insights to enhance your experience",
		features: [
			"All balanced features",
			"Detailed interaction tracking",
			"A/B testing participation",
			"Personalized recommendations",
		],
	},
];
