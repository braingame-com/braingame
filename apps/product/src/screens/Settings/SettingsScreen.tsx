import React, { useState } from 'react';
import { 
	View, 
	ScrollView, 
	SafeAreaView, 
	TouchableOpacity,
	Alert,
	Switch
} from 'react-native';
import { Text } from '@braingame/bgui';
import { CloudStatus } from '../../components/CloudStatus';
import { useCloudFunctions } from '../../hooks/useCloudFunctions';
import { LoadingText } from '../../components/LoadingAnimations';
import { settingsScreenStyles } from './styles';

/**
 * Settings Screen
 * Cloud integration management and configuration
 * Advanced settings for data synchronization and analytics
 */
export const SettingsScreen: React.FC = () => {
	const { 
		loading, 
		error, 
		saveMindsetData, 
		saveAnalyticsData, 
		trackEvent,
		testConnection,
		batchOperations,
		getConfig,
		clearError 
	} = useCloudFunctions();

	const [settings, setSettings] = useState({
		autoSync: true,
		analyticsEnabled: true,
		cloudBackup: true,
		offlineMode: false,
		dataCompression: true,
		realTimeSync: false,
	});

	/**
	 * Toggle setting
	 */
	const toggleSetting = (key: keyof typeof settings) => {
		setSettings(prev => ({
			...prev,
			[key]: !prev[key],
		}));

		// Track setting change
		trackEvent('setting_changed', {
			setting: key,
			value: !settings[key],
		});
	};

	/**
	 * Test data sync
	 */
	const testDataSync = async () => {
		Alert.alert(
			'Test Data Sync',
			'This will send test data to the cloud. Continue?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ 
					text: 'Test', 
					onPress: async () => {
						const testData = [
							{ key: 'test_timestamp', value: new Date().toISOString() },
							{ key: 'test_type', value: 'settings_screen_test' },
							{ key: 'test_user', value: 'test_user_123' },
						];

						await saveMindsetData('performance', testData, true);
					}
				},
			]
		);
	};

	/**
	 * Export all data
	 */
	const exportData = async () => {
		Alert.alert(
			'Export Data',
			'This will export all your data to the cloud. This may take a moment.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ 
					text: 'Export', 
					onPress: async () => {
						const operations = [
							{
								type: 'mindset' as const,
								data: {
									export_timestamp: new Date().toISOString(),
									export_type: 'full_export',
									user_id: 'user_123',
								},
							},
							{
								type: 'analytics' as const,
								data: {
									mindsetScore: 85,
									videoTime: 120,
									streakCount: 15,
									completionRate: 0.94,
								},
							},
						];

						await batchOperations(operations);
					}
				},
			]
		);
	};

	/**
	 * Clear all data
	 */
	const clearAllData = () => {
		Alert.alert(
			'Clear All Data',
			'This will clear all local data. Cloud data will remain intact. This action cannot be undone.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ 
					text: 'Clear', 
					style: 'destructive',
					onPress: () => {
						// In a real app, this would clear AsyncStorage/SQLite
						Alert.alert('Success', 'Local data cleared successfully!');
						trackEvent('data_cleared', { source: 'settings_screen' });
					}
				},
			]
		);
	};

	/**
	 * Get sync status text
	 */
	const getSyncStatusText = () => {
		if (loading) return 'Syncing...';
		if (error) return 'Sync Error';
		return 'Sync Active';
	};

	/**
	 * Get sync status color
	 */
	const getSyncStatusColor = () => {
		if (loading) return '#ff9500';
		if (error) return '#ff6b35';
		return '#00a550';
	};

	const config = getConfig();

	return (
		<SafeAreaView style={settingsScreenStyles.container}>
			<ScrollView 
				style={settingsScreenStyles.scrollView}
				contentContainerStyle={settingsScreenStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={settingsScreenStyles.header}>
					<Text style={settingsScreenStyles.headerTitle}>
						⚙️ Settings
					</Text>
					<Text style={settingsScreenStyles.headerSubtitle}>
						Cloud integration and data management
					</Text>
				</View>

				{/* Cloud Status Section */}
				<View style={settingsScreenStyles.section}>
					<Text style={settingsScreenStyles.sectionTitle}>
						☁️ Cloud Status
					</Text>
					<CloudStatus showDetails={true} autoTest={true} />
				</View>

				{/* Sync Settings */}
				<View style={settingsScreenStyles.section}>
					<Text style={settingsScreenStyles.sectionTitle}>
						🔄 Synchronization
					</Text>

					<View style={settingsScreenStyles.settingItem}>
						<View style={settingsScreenStyles.settingInfo}>
							<Text style={settingsScreenStyles.settingName}>Auto Sync</Text>
							<Text style={settingsScreenStyles.settingDescription}>
								Automatically sync data to the cloud
							</Text>
						</View>
						<Switch
							value={settings.autoSync}
							onValueChange={() => toggleSetting('autoSync')}
							trackColor={{ false: '#333', true: '#007fff40' }}
							thumbColor={settings.autoSync ? '#007fff' : '#666'}
						/>
					</View>

					<View style={settingsScreenStyles.settingItem}>
						<View style={settingsScreenStyles.settingInfo}>
							<Text style={settingsScreenStyles.settingName}>Real-time Sync</Text>
							<Text style={settingsScreenStyles.settingDescription}>
								Sync data immediately after changes
							</Text>
						</View>
						<Switch
							value={settings.realTimeSync}
							onValueChange={() => toggleSetting('realTimeSync')}
							trackColor={{ false: '#333', true: '#007fff40' }}
							thumbColor={settings.realTimeSync ? '#007fff' : '#666'}
						/>
					</View>

					<View style={settingsScreenStyles.settingItem}>
						<View style={settingsScreenStyles.settingInfo}>
							<Text style={settingsScreenStyles.settingName}>Cloud Backup</Text>
							<Text style={settingsScreenStyles.settingDescription}>
								Backup all data to secure cloud storage
							</Text>
						</View>
						<Switch
							value={settings.cloudBackup}
							onValueChange={() => toggleSetting('cloudBackup')}
							trackColor={{ false: '#333', true: '#007fff40' }}
							thumbColor={settings.cloudBackup ? '#007fff' : '#666'}
						/>
					</View>
				</View>

				{/* Privacy Settings */}
				<View style={settingsScreenStyles.section}>
					<Text style={settingsScreenStyles.sectionTitle}>
						🔒 Privacy & Analytics
					</Text>

					<View style={settingsScreenStyles.settingItem}>
						<View style={settingsScreenStyles.settingInfo}>
							<Text style={settingsScreenStyles.settingName}>Analytics</Text>
							<Text style={settingsScreenStyles.settingDescription}>
								Help improve the app with usage analytics
							</Text>
						</View>
						<Switch
							value={settings.analyticsEnabled}
							onValueChange={() => toggleSetting('analyticsEnabled')}
							trackColor={{ false: '#333', true: '#007fff40' }}
							thumbColor={settings.analyticsEnabled ? '#007fff' : '#666'}
						/>
					</View>

					<View style={settingsScreenStyles.settingItem}>
						<View style={settingsScreenStyles.settingInfo}>
							<Text style={settingsScreenStyles.settingName}>Data Compression</Text>
							<Text style={settingsScreenStyles.settingDescription}>
								Compress data to reduce bandwidth usage
							</Text>
						</View>
						<Switch
							value={settings.dataCompression}
							onValueChange={() => toggleSetting('dataCompression')}
							trackColor={{ false: '#333', true: '#007fff40' }}
							thumbColor={settings.dataCompression ? '#007fff' : '#666'}
						/>
					</View>
				</View>

				{/* Sync Status */}
				<View style={settingsScreenStyles.section}>
					<Text style={settingsScreenStyles.sectionTitle}>
						📊 Sync Status
					</Text>
					
					<View style={settingsScreenStyles.statusCard}>
						<View style={settingsScreenStyles.statusHeader}>
							<Text style={[
								settingsScreenStyles.statusText,
								{ color: getSyncStatusColor() }
							]}>
								{getSyncStatusText()}
							</Text>
							{loading && <LoadingText text="" dotCount={3} color="#ff9500" />}
						</View>

						<View style={settingsScreenStyles.statusDetails}>
							<Text style={settingsScreenStyles.statusDetailText}>
								Environment: {config.projectId.includes('dev') ? 'Development' : 'Production'}
							</Text>
							<Text style={settingsScreenStyles.statusDetailText}>
								Session: {config.sessionId.slice(-8)}
							</Text>
						</View>

						{error && (
							<View style={settingsScreenStyles.errorCard}>
								<Text style={settingsScreenStyles.errorText}>{error}</Text>
								<TouchableOpacity onPress={clearError} style={settingsScreenStyles.clearErrorButton}>
									<Text style={settingsScreenStyles.clearErrorText}>Clear Error</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>

				{/* Actions */}
				<View style={settingsScreenStyles.section}>
					<Text style={settingsScreenStyles.sectionTitle}>
						⚡ Actions
					</Text>

					<TouchableOpacity
						onPress={testConnection}
						style={settingsScreenStyles.actionButton}
						disabled={loading}
					>
						<Text style={settingsScreenStyles.actionButtonText}>
							🔍 Test Connection
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={testDataSync}
						style={settingsScreenStyles.actionButton}
						disabled={loading}
					>
						<Text style={settingsScreenStyles.actionButtonText}>
							🧪 Test Data Sync
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={exportData}
						style={settingsScreenStyles.actionButton}
						disabled={loading}
					>
						<Text style={settingsScreenStyles.actionButtonText}>
							📤 Export Data
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={clearAllData}
						style={[settingsScreenStyles.actionButton, settingsScreenStyles.destructiveButton]}
					>
						<Text style={[settingsScreenStyles.actionButtonText, settingsScreenStyles.destructiveButtonText]}>
							🗑️ Clear Local Data
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};