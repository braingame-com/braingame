import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from '../styles';
import { PERFORMANCE_CHECKBOXES, PERFORMANCE_TEXT_INPUTS, FIREBASE_FUNCTION_URL } from '../constants';

interface PerformanceProps {
	onComplete: () => void;
	completed: boolean;
}

interface PerformanceMetric {
	key: string;
	value: string | boolean;
	isCheckbox: boolean;
}

/**
 * Performance Tracking Component
 * Daily metrics and habit tracking system
 * 3 checkboxes + 9 text inputs for comprehensive life tracking
 * Ported from dev-dil React to React Native
 */
export const Performance: React.FC<PerformanceProps> = ({ onComplete, completed }) => {
	// Initialize metrics with checkboxes and text inputs
	const [metrics, setMetrics] = useState<PerformanceMetric[]>([
		...PERFORMANCE_CHECKBOXES.map(item => ({
			key: item,
			value: false,
			isCheckbox: true,
		})),
		...PERFORMANCE_TEXT_INPUTS.map(item => ({
			key: item,
			value: '',
			isCheckbox: false,
		})),
	]);

	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Update metric value
	 */
	const updateMetric = (key: string, value: string | boolean) => {
		setMetrics(prev =>
			prev.map(metric =>
				metric.key === key ? { ...metric, value } : metric
			)
		);
	};

	/**
	 * Toggle checkbox value
	 */
	const toggleCheckbox = (key: string) => {
		setMetrics(prev =>
			prev.map(metric =>
				metric.key === key ? { ...metric, value: !metric.value } : metric
			)
		);
	};

	/**
	 * Validate all metrics are completed
	 */
	const isFormValid = () => {
		return metrics.every(metric =>
			metric.isCheckbox
				? typeof metric.value === 'boolean'
				: typeof metric.value === 'string' && metric.value.trim().length > 0
		);
	};

	/**
	 * Submit performance data to Google Sheets via Firebase Function
	 */
	const handleSubmit = async () => {
		if (!isFormValid()) {
			Alert.alert('Incomplete', 'Please complete all fields!');
			return;
		}

		setIsSubmitting(true);

		try {
			// Format data for backend (same as dev-dil structure)
			const formattedData = metrics.map(metric => ({
				key: metric.key,
				value: metric.value,
			}));

			const response = await fetch(`${FIREBASE_FUNCTION_URL}?sheetName=Performance`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formattedData),
			});

			if (response.ok) {
				Alert.alert('Success', 'Performance data saved successfully!');
				onComplete();
				// Reset form after successful submission
				setMetrics([
					...PERFORMANCE_CHECKBOXES.map(item => ({
						key: item,
						value: false,
						isCheckbox: true,
					})),
					...PERFORMANCE_TEXT_INPUTS.map(item => ({
						key: item,
						value: '',
						isCheckbox: false,
					})),
				]);
			} else {
				throw new Error('Failed to save performance data');
			}
		} catch (error) {
			console.error('Performance submission error:', error);
			Alert.alert('Error', 'Failed to save performance data. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	/**
	 * Get placeholder text for text inputs
	 */
	const getPlaceholder = (key: string) => {
		const placeholders: Record<string, string> = {
			'Wake Time': '7:00 AM',
			'Sleep Score': '1-10',
			'Bed Time': '10:30 PM',
			'Workout Time': '45 min',
			'Workout Score': '1-10',
			'Learning Time': '2 hours',
			'Learning Score': '1-10',
			'Weight (lbs)': '185',
			'Diet Score': '1-10',
		};
		return placeholders[key] || 'Enter value...';
	};

	/**
	 * Get emoji for each metric
	 */
	const getMetricEmoji = (key: string) => {
		const emojis: Record<string, string> = {
			'Dev-Dil (AM)': '🌅',
			'Dev-Dil (PM)': '🌙',
			'Supplements': '💊',
			'Wake Time': '⏰',
			'Sleep Score': '😴',
			'Bed Time': '🛏️',
			'Workout Time': '💪',
			'Workout Score': '🏋️',
			'Learning Time': '📚',
			'Learning Score': '🧠',
			'Weight (lbs)': '⚖️',
			'Diet Score': '🥗',
		};
		return emojis[key] || '📊';
	};

	// Calculate completion stats
	const completedCount = metrics.filter(metric =>
		metric.isCheckbox ? metric.value === true : (metric.value as string).trim().length > 0
	).length;

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					📊 Performance
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
				Daily metrics and habit tracking for life optimization
			</Text>

			{/* Progress Overview */}
			<View style={{
				backgroundColor: '#1a1a2e',
				borderRadius: 12,
				padding: 16,
				marginBottom: 24,
				borderWidth: 1,
				borderColor: '#333',
			}}>
				<Text style={{
					fontSize: 16,
					color: '#fff',
					fontWeight: '600',
					fontFamily: 'LexendSemiBold',
					marginBottom: 8,
				}}>
					Progress: {completedCount} / {metrics.length} metrics completed
				</Text>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 4,
				}}>
					{metrics.map((metric, index) => (
						<View
							key={metric.key}
							style={{
								flex: 1,
								height: 4,
								borderRadius: 2,
								backgroundColor: (metric.isCheckbox ? metric.value === true : (metric.value as string).trim().length > 0)
									? '#00a550'
									: '#333',
							}}
						/>
					))}
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Habit Checkboxes Section */}
				<Text style={{
					fontSize: 18,
					color: '#fff',
					fontWeight: '600',
					fontFamily: 'LexendSemiBold',
					marginBottom: 16,
				}}>
					Daily Habits
				</Text>

				<View style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					marginBottom: 32,
					gap: 12,
				}}>
					{metrics.filter(m => m.isCheckbox).map((metric) => (
						<TouchableOpacity
							key={metric.key}
							onPress={() => toggleCheckbox(metric.key)}
							style={{
								flex: 1,
								minWidth: '30%',
								backgroundColor: metric.value ? '#1f4a1f' : '#1a1a2e',
								borderRadius: 12,
								padding: 16,
								borderWidth: 1,
								borderColor: metric.value ? '#00a550' : '#333',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 24, marginBottom: 4 }}>
								{getMetricEmoji(metric.key)}
							</Text>
							<Text style={{
								fontSize: 14,
								color: metric.value ? '#00a550' : '#fff',
								textAlign: 'center',
								fontFamily: 'LexendRegular',
								fontWeight: metric.value ? '600' : '400',
							}}>
								{metric.key}
							</Text>
							{metric.value && (
								<Text style={{
									fontSize: 16,
									color: '#00a550',
									marginTop: 4,
								}}>
									✓
								</Text>
							)}
						</TouchableOpacity>
					))}
				</View>

				{/* Metrics Input Section */}
				<Text style={{
					fontSize: 18,
					color: '#fff',
					fontWeight: '600',
					fontFamily: 'LexendSemiBold',
					marginBottom: 16,
				}}>
					Daily Metrics
				</Text>

				<View style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: 12,
					marginBottom: 24,
				}}>
					{metrics.filter(m => !m.isCheckbox).map((metric) => (
						<View
							key={metric.key}
							style={{
								width: '47%',
								marginBottom: 16,
							}}
						>
							{/* Label */}
							<View style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 8,
							}}>
								<Text style={{ fontSize: 20, marginRight: 6 }}>
									{getMetricEmoji(metric.key)}
								</Text>
								<Text style={{
									fontSize: 14,
									color: '#fff',
									fontWeight: '500',
									fontFamily: 'LexendMedium',
								}}>
									{metric.key}
								</Text>
							</View>

							{/* Input */}
							<View style={{
								backgroundColor: '#1a1a2e',
								borderRadius: 8,
								borderWidth: 1,
								borderColor: (metric.value as string).length > 0 ? '#007fff' : '#333',
								paddingHorizontal: 12,
								paddingVertical: 10,
							}}>
								<TextInput
									value={metric.value as string}
									onChangeText={(text) => updateMetric(metric.key, text)}
									placeholder={getPlaceholder(metric.key)}
									placeholderTextColor="#666"
									style={{
										color: '#fff',
										fontSize: 16,
										fontFamily: 'LexendRegular',
									}}
								/>
							</View>
						</View>
					))}
				</View>

				{/* Validation Message */}
				{!isFormValid() && completedCount > 0 && (
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
							Please complete all fields before submitting
						</Text>
					</View>
				)}

				{/* Submit Button */}
				<TouchableOpacity
					onPress={handleSubmit}
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
						{isSubmitting ? '⏳ Saving...' : isFormValid() ? '✓ Save Performance Data' : '📊 Complete All Metrics'}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};