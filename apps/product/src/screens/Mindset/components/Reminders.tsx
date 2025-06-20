import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from '../styles';
import { SAM_OVENS_PRINCIPLES, PERSONAL_REMINDERS, PRINCIPLES_ATTRIBUTION, MASTER_ALGORITHM } from '../constants/reminders';

interface RemindersProps {
	onComplete: () => void;
	completed: boolean;
}

/**
 * Philosophical Reminders Component
 * 9 Core Sam Ovens Principles + Personal Reminders
 * Deep belief system mechanics and reality creation concepts
 * Ported from dev-dil React to React Native
 */
export const Reminders: React.FC<RemindersProps> = ({ onComplete, completed }) => {
	
	/**
	 * Handle marking reminders as complete
	 */
	const handleComplete = () => {
		onComplete();
	};

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					💭 Philosophical Reminders
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
				9 core principles for belief system mechanics and reality creation
			</Text>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Master Algorithm Highlight */}
				<View style={{
					backgroundColor: '#1f0247',
					padding: 16,
					borderRadius: 12,
					marginBottom: 24,
					borderWidth: 1,
					borderColor: '#7712fa',
				}}>
					<Text style={{
						fontSize: 18,
						color: '#7712fa',
						fontWeight: '700',
						fontFamily: 'LexendBold',
						textAlign: 'center',
						marginBottom: 8,
					}}>
						Master Algorithm of Evolution
					</Text>
					<Text style={{
						fontSize: 20,
						color: '#fff',
						fontWeight: '600',
						fontFamily: 'LexendSemiBold',
						textAlign: 'center',
					}}>
						{MASTER_ALGORITHM}
					</Text>
				</View>

				{/* Sam Ovens Principles */}
				<View style={{ marginBottom: 32 }}>
					{/* Opening Quote */}
					<Text style={{
						fontSize: 48,
						color: '#aaa',
						textAlign: 'left',
						lineHeight: 48,
						marginBottom: 16,
					}}>
						"
					</Text>

					{/* Principles List */}
					{SAM_OVENS_PRINCIPLES.map((principle) => (
						<View key={principle.number} style={{ marginBottom: 20 }}>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								{/* Number Circle */}
								<View style={{
									width: 32,
									height: 32,
									borderRadius: 16,
									backgroundColor: '#007fff',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: 16,
									marginTop: 2,
								}}>
									<Text style={{
										fontSize: 16,
										color: '#fff',
										fontWeight: '700',
										fontFamily: 'LexendBold',
									}}>
										{principle.number}
									</Text>
								</View>

								{/* Principle Content */}
								<Text style={{
									flex: 1,
									fontSize: 16,
									color: '#fff',
									lineHeight: 24,
									fontFamily: 'LexendRegular',
								}}>
									{principle.content}
								</Text>
							</View>
						</View>
					))}

					{/* Closing Quote */}
					<Text style={{
						fontSize: 48,
						color: '#aaa',
						textAlign: 'right',
						lineHeight: 48,
						marginBottom: 8,
					}}>
						"
					</Text>

					{/* Attribution */}
					<Text style={{
						fontSize: 14,
						color: '#aaa',
						textAlign: 'right',
						fontFamily: 'LexendRegular',
						marginBottom: 32,
					}}>
						{PRINCIPLES_ATTRIBUTION}
					</Text>
				</View>

				{/* Divider */}
				<View style={mindsetStyles.divider} />

				{/* Personal Reminders */}
				<View style={{ marginTop: 32, marginBottom: 32 }}>
					<Text style={{
						fontSize: 18,
						color: '#fff',
						fontWeight: '600',
						fontFamily: 'LexendSemiBold',
						marginBottom: 16,
					}}>
						Personal Reminders
					</Text>

					{PERSONAL_REMINDERS.map((reminder, index) => (
						<View key={index} style={{ marginBottom: 12 }}>
							<Text style={{
								fontSize: 16,
								color: index === 0 ? '#007fff' : '#fff', // First one highlighted
								lineHeight: 24,
								fontFamily: 'LexendRegular',
								fontWeight: index === 0 ? '700' : '400', // First one bold
							}}>
								• {reminder}
							</Text>
						</View>
					))}
				</View>

				{/* Mark Complete Button */}
				<TouchableOpacity
					onPress={handleComplete}
					style={[mindsetStyles.button, { backgroundColor: '#00a550' }]}
				>
					<Text style={mindsetStyles.buttonText}>
						✓ Mark Complete
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};