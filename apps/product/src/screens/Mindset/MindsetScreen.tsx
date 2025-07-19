import { Typography } from "@braingame/bgui";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { listOptimizations, withMemo } from "../../utils/performance";
import { Affirmations } from "./components/Affirmations";
import { Images } from "./components/Images";
import { VisionGoals } from "./components/VisionGoals";
import { mindsetStyles } from "./styles";
import type { CompletionState } from "./types";

interface ComingSoonCard {
	id: string;
	icon: string;
	title: string;
	description: string;
}

// Memoized components
const ComingSoonCardComponent = withMemo<{ item: ComingSoonCard }>(
	({ item }) => (
		<View style={mindsetStyles.card}>
			<Typography level="title" style={mindsetStyles.cardTitle}>
				{item.icon} {item.title}
			</Typography>
			<Typography style={mindsetStyles.cardDescription}>{item.description}</Typography>
		</View>
	),
	"ComingSoonCard",
);

const CompletionHeader = withMemo<{ completedCount: number; totalCount: number }>(
	({ completedCount, totalCount }) => {
		const isAllComplete = completedCount === totalCount;
		return (
			<Typography style={mindsetStyles.completionCounter}>
				{isAllComplete ? "✅ All Complete!" : `${completedCount}/${totalCount} Completed`}
			</Typography>
		);
	},
	"CompletionHeader",
);

const MindsetHeader = withMemo(
	() => (
		<View style={{ marginBottom: 32 }}>
			<Typography level="displayTitle" style={{ textAlign: "center", marginBottom: 8 }}>
				🧠 Mindset Training
			</Typography>
		</View>
	),
	"MindsetHeader",
);

const MindsetSubtitle = withMemo(
	() => (
		<Typography
			level="subtitle"
			style={{
				textAlign: "center",
				color: "#aaa",
				marginBottom: 16,
			}}
		>
			Daily practices for mindset mastery and personal excellence
		</Typography>
	),
	"MindsetSubtitle",
);

/**
 * Main Mindset Training Screen
 * Container for all mindset training components
 * Ported from dev-dil single-page React app to React Native
 * Optimized for performance with FlatList and memoization
 */
export const MindsetScreen: React.FC = () => {
	// Completion state tracking (using useState for now, will be DB later)
	const [completionState, setCompletionState] = useState<CompletionState>({
		vision: false,
		affirmations: false,
		reminders: false,
		images: false,
		journal: false,
		performance: false,
	});

	/**
	 * Calculate completion progress with memoization
	 */
	const { completedCount, totalCount } = useMemo(() => {
		const completed = Object.values(completionState).filter(Boolean).length;
		const total = Object.keys(completionState).length;
		return { completedCount: completed, totalCount: total };
	}, [completionState]);

	/**
	 * Handle section completion with memoized callback
	 */
	const handleSectionComplete = useCallback((section: keyof CompletionState) => {
		setCompletionState((prev) => ({
			...prev,
			[section]: true,
		}));
	}, []);

	// Memoized callbacks for specific sections
	const handleVisionComplete = useCallback(
		() => handleSectionComplete("vision"),
		[handleSectionComplete],
	);
	const handleAffirmationsComplete = useCallback(
		() => handleSectionComplete("affirmations"),
		[handleSectionComplete],
	);
	const handleImagesComplete = useCallback(
		() => handleSectionComplete("images"),
		[handleSectionComplete],
	);

	// Coming soon cards data
	const comingSoonCards = useMemo<ComingSoonCard[]>(
		() => [
			{
				id: "reminders",
				icon: "💭",
				title: "Reminders",
				description: "Coming next: 9 core philosophical principles",
			},
			{
				id: "journal",
				icon: "📝",
				title: "Journal",
				description: "Coming next: Dreams and after action reports",
			},
			{
				id: "performance",
				icon: "📊",
				title: "Performance",
				description: "Coming next: Daily metrics and habit tracking",
			},
		],
		[],
	);

	// Section data for FlatList
	const sections = useMemo(
		() => [
			{ id: "header", type: "header" },
			{ id: "completion", type: "completion" },
			{ id: "subtitle", type: "subtitle" },
			{ id: "vision", type: "vision" },
			{ id: "affirmations", type: "affirmations" },
			{ id: "images", type: "images" },
			{ id: "coming-soon", type: "coming-soon" },
		],
		[],
	);

	// Render functions
	const renderComingSoonCard = useCallback(
		({ item }: { item: ComingSoonCard }) => <ComingSoonCardComponent item={item} />,
		[],
	);

	const renderSection = useCallback(
		({ item }: { item: (typeof sections)[0] }) => {
			switch (item.type) {
				case "header":
					return <MindsetHeader />;
				case "completion":
					return <CompletionHeader completedCount={completedCount} totalCount={totalCount} />;
				case "subtitle":
					return <MindsetSubtitle />;
				case "vision":
					return (
						<VisionGoals onComplete={handleVisionComplete} completed={completionState.vision} />
					);
				case "affirmations":
					return (
						<Affirmations
							onComplete={handleAffirmationsComplete}
							completed={completionState.affirmations}
						/>
					);
				case "images":
					return <Images onComplete={handleImagesComplete} completed={completionState.images} />;
				case "coming-soon":
					return (
						<FlatList
							data={comingSoonCards}
							renderItem={renderComingSoonCard}
							keyExtractor={listOptimizations.keyExtractor}
							scrollEnabled={false}
							{...listOptimizations.performanceConfig}
						/>
					);
				default:
					return null;
			}
		},
		[
			completedCount,
			totalCount,
			completionState.vision,
			completionState.affirmations,
			completionState.images,
			handleVisionComplete,
			handleAffirmationsComplete,
			handleImagesComplete,
			comingSoonCards,
			renderComingSoonCard,
		],
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#101020" }}>
			<FlatList
				data={sections}
				renderItem={renderSection}
				keyExtractor={listOptimizations.keyExtractor}
				contentContainerStyle={{ paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}
				style={mindsetStyles.container}
				{...listOptimizations.performanceConfig}
			/>
		</SafeAreaView>
	);
};
