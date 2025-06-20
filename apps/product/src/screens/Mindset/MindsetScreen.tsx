import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from './styles';
import { VisionGoals } from './components/VisionGoals';
import { Affirmations } from './components/Affirmations';
import type { CompletionState } from './types';

/**
 * Main Mindset Training Screen
 * Container for all mindset training components
 * Ported from dev-dil single-page React app to React Native
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
	 * Calculate completion progress
	 */
	const completedCount = Object.values(completionState).filter(Boolean).length;
	const totalCount = Object.keys(completionState).length;
	const isAllComplete = completedCount === totalCount;
	
	/**
	 * Handle section completion
	 */
	const handleSectionComplete = (section: keyof CompletionState) => {
		setCompletionState(prev => ({
			...prev,
			[section]: true
		}));
	};
	
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#101020' }}>
			<ScrollView 
				style={mindsetStyles.container}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				<View style={mindsetStyles.pageWidth}>
					{/* Header */}
					<View style={{ marginBottom: 32 }}>
						<Text variant="displayTitle" style={{ textAlign: 'center', marginBottom: 8 }}>
							🧠 Mindset Training
						</Text>
						
						{/* Completion Counter */}
						<Text style={mindsetStyles.completionCounter}>
							{isAllComplete ? '✅ All Complete!' : `${completedCount}/${totalCount} Completed`}
						</Text>
						
						<Text variant="subtitle" style={{ 
							textAlign: 'center', 
							color: '#aaa',
							marginBottom: 16 
						}}>
							Daily practices for mindset mastery and personal excellence
						</Text>
					</View>
					
					{/* Vision & Goals Section */}
					<VisionGoals
						onComplete={() => handleSectionComplete('vision')}
						completed={completionState.vision}
					/>
					
					{/* Affirmations Section */}
					<Affirmations
						onComplete={() => handleSectionComplete('affirmations')}
						completed={completionState.affirmations}
					/>
					
					<View style={mindsetStyles.card}>
						<Text variant="title" style={mindsetStyles.cardTitle}>
							💭 Reminders  
						</Text>
						<Text style={mindsetStyles.cardDescription}>
							Coming next: 9 core philosophical principles
						</Text>
					</View>
					
					<View style={mindsetStyles.card}>
						<Text variant="title" style={mindsetStyles.cardTitle}>
							🖼️ Visual Inspiration
						</Text>
						<Text style={mindsetStyles.cardDescription}>
							Coming next: 75+ motivational images slideshow
						</Text>
					</View>
					
					<View style={mindsetStyles.card}>
						<Text variant="title" style={mindsetStyles.cardTitle}>
							📝 Journal
						</Text>
						<Text style={mindsetStyles.cardDescription}>
							Coming next: Dreams and after action reports
						</Text>
					</View>
					
					<View style={mindsetStyles.card}>
						<Text variant="title" style={mindsetStyles.cardTitle}>
							📊 Performance
						</Text>
						<Text style={mindsetStyles.cardDescription}>
							Coming next: Daily metrics and habit tracking
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};