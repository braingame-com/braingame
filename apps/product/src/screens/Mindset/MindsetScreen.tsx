import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from './styles';
import { VisionGoals } from './components/VisionGoals';
import { Affirmations } from './components/Affirmations';
import { Reminders } from './components/Reminders';
import { VisualInspiration } from './components/VisualInspiration';
import { Journal } from './components/Journal';
import { Performance } from './components/Performance';
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
					
					{/* Philosophical Reminders Section */}
					<Reminders
						onComplete={() => handleSectionComplete('reminders')}
						completed={completionState.reminders}
					/>
					
					{/* Visual Inspiration Section */}
					<VisualInspiration
						onComplete={() => handleSectionComplete('images')}
						completed={completionState.images}
					/>
					
					{/* Journal Section */}
					<Journal
						onComplete={() => handleSectionComplete('journal')}
						completed={completionState.journal}
					/>
					
					{/* Performance Section */}
					<Performance
						onComplete={() => handleSectionComplete('performance')}
						completed={completionState.performance}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};