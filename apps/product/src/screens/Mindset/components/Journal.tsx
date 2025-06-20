import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from '../styles';
import { JOURNAL_CATEGORIES, FIREBASE_FUNCTION_URL } from '../constants';

interface JournalProps {
	onComplete: () => void;
	completed: boolean;
}

interface JournalEntry {
	key: string;
	value: string;
}

/**
 * Journal Component
 * Two categories: Dreams and After Action Reports
 * Daily reflection and analysis system
 * Ported from dev-dil React to React Native
 */
export const Journal: React.FC<JournalProps> = ({ onComplete, completed }) => {
	const [entries, setEntries] = useState<JournalEntry[]>(
		JOURNAL_CATEGORIES.map(category => ({ key: category, value: '' }))
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Update journal entry value
	 */
	const updateEntry = (key: string, value: string) => {
		setEntries(prev => 
			prev.map(entry => 
				entry.key === key ? { ...entry, value } : entry
			)
		);
	};

	/**
	 * Validate all entries are completed
	 */
	const isFormValid = () => {
		return entries.every(entry => entry.value.trim().length > 0);
	};

	/**
	 * Submit journal entries to Google Sheets via Firebase Function
	 */
	const handleSave = async () => {
		if (!isFormValid()) {
			Alert.alert('Incomplete', 'Please complete all fields!');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(`${FIREBASE_FUNCTION_URL}?sheetName=Journal`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(entries),
			});

			if (response.ok) {
				Alert.alert('Success', 'Journal entries saved successfully!');
				onComplete();
				// Clear form after successful submission
				setEntries(JOURNAL_CATEGORIES.map(category => ({ key: category, value: '' })));
			} else {
				throw new Error('Failed to save journal entries');
			}
		} catch (error) {
			console.error('Journal submission error:', error);
			Alert.alert('Error', 'Failed to save journal entries. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	/**
	 * Get placeholder text for each category
	 */
	const getPlaceholder = (category: string) => {
		switch (category) {
			case 'Dreams':
				return 'Record your dreams, aspirations, and subconscious insights...';
			case 'After Action Report':
				return 'Reflect on your day: What went well? What could be improved? Key learnings?';
			default:
				return 'Enter your thoughts...';
		}
	};

	/**
	 * Get category emoji
	 */
	const getCategoryEmoji = (category: string) => {
		switch (category) {
			case 'Dreams':
				return '💭';
			case 'After Action Report':
				return '📋';
			default:
				return '📝';
		}
	};

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					📝 Journal
				</Text>
				<View style={[
					mindsetStyles.statusBadge,
					completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending
				]}>
					<Text style={mindsetStyles.statusText}>
						{completed ? '✓ Done' : 'To do'}
					</Text>
				</View>
			</View>

			<Text style={mindsetStyles.cardDescription}>
				Daily reflection through dreams and after-action analysis
			</Text>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Journal Entry Fields */}
				{entries.map((entry, index) => (
					<View key={entry.key} style={{ marginBottom: 24 }}>
						{/* Category Header */}
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 12,
						}}>
							<Text style={{
								fontSize: 24,
								marginRight: 8,
							}}>
								{getCategoryEmoji(entry.key)}
							</Text>
							<Text style={{
								fontSize: 18,
								color: '#fff',
								fontWeight: '600',
								fontFamily: 'LexendSemiBold',
							}}>
								{entry.key}
							</Text>
						</View>

						{/* Text Input */}
						<View style={{
							backgroundColor: '#1a1a2e',
							borderRadius: 12,
							borderWidth: 1,
							borderColor: entry.value.length > 0 ? '#007fff' : '#333',
							paddingHorizontal: 16,
							paddingVertical: 12,
							minHeight: 120,
						}}>
							<TextInput
								value={entry.value}
								onChangeText={(text) => updateEntry(entry.key, text)}
								placeholder={getPlaceholder(entry.key)}
								placeholderTextColor="#666"
								multiline
								textAlignVertical="top"
								style={{
									color: '#fff',
									fontSize: 16,
									fontFamily: 'LexendRegular',
									lineHeight: 24,
									minHeight: 96,
								}}
							/>
						</View>

						{/* Character Count */}
						<Text style={{
							fontSize: 12,
							color: '#666',
							textAlign: 'right',
							marginTop: 4,
							fontFamily: 'LexendRegular',
						}}>
							{entry.value.length} characters
						</Text>
					</View>
				))}

				{/* Validation Message */}
				{!isFormValid() && entries.some(entry => entry.value.length > 0) && (
					<View style={{
						backgroundColor: '#4d1a00',
						padding: 12,
						borderRadius: 8,
						marginBottom: 16,
						borderLeftWidth: 4,
						borderLeftColor: '#ff6b35',
					}}>
						<Text style={{
							color: '#ff6b35',
							fontSize: 14,
							fontFamily: 'LexendRegular',
						}}>
							Please complete all fields before saving
						</Text>
					</View>
				)}

				{/* Save Button */}
				<TouchableOpacity
					onPress={handleSave}
					disabled={!isFormValid() || isSubmitting}
					style={[
						mindsetStyles.button,
						{
							backgroundColor: isFormValid() && !isSubmitting ? '#00a550' : '#333',
							opacity: isFormValid() && !isSubmitting ? 1 : 0.6,
						}
					]}
				>
					<Text style={mindsetStyles.buttonText}>
						{isSubmitting ? '⏳ Saving...' : isFormValid() ? '✓ Save Journal' : '📝 Complete All Fields'}
					</Text>
				</TouchableOpacity>

				{/* Progress Indicator */}
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 16,
					gap: 8,
				}}>
					{entries.map((entry, index) => (
						<View
							key={entry.key}
							style={{
								width: 12,
								height: 12,
								borderRadius: 6,
								backgroundColor: entry.value.length > 0 ? '#007fff' : '#333',
							}}
						/>
					))}
					<Text style={{
						color: '#666',
						fontSize: 12,
						marginLeft: 8,
						fontFamily: 'LexendRegular',
					}}>
						{entries.filter(e => e.value.length > 0).length} / {entries.length} completed
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};