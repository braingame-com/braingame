import type { ExpoConfig } from "expo/config";
import path from "node:path";

const brandAsset = (file: string) =>
	path.join("..", "..", "assets", "branding", file).replace(/\\/g, "/");

const config: ExpoConfig = {
	name: "Brain Game",
	slug: "braingame",
	version: "1.0.0",
	orientation: "portrait",
	icon: brandAsset("icon.png"),
	scheme: "braingame",
	userInterfaceStyle: "automatic",
	newArchEnabled: true,
	owner: "braingame",
	description:
		"Master mindfulness through science-backed techniques and personalized brain training exercises",
	privacy: "public",
	primaryColor: "#3B82F6",
	backgroundColor: "#000000",
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.braingame.app",
		buildNumber: "1",
		icon: brandAsset("icon.png"),
		infoPlist: {
			NSCameraUsageDescription:
				"This app uses the camera for mindfulness exercises and progress tracking.",
			NSMicrophoneUsageDescription:
				"This app uses the microphone for guided meditation sessions.",
			NSLocationWhenInUseUsageDescription:
				"This app uses your location to provide localized content and recommendations.",
			ITSAppUsesNonExemptEncryption: false,
			LSApplicationQueriesSchemes: ["mailto", "tel", "sms"],
		},
		config: {
			usesNonExemptEncryption: false,
		},
		associatedDomains: ["applinks:braingame.dev"],
		usesAppleSignIn: false,
		userInterfaceStyle: "automatic",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: brandAsset("adaptive-icon.png"),
			backgroundColor: "#000000",
		},
		package: "com.braingame.app",
		versionCode: 1,
		permissions: [
			"CAMERA",
			"RECORD_AUDIO",
			"ACCESS_COARSE_LOCATION",
			"ACCESS_FINE_LOCATION",
			"VIBRATE",
		],
		intentFilters: [
			{
				action: "VIEW",
				autoVerify: true,
				data: [
					{
						scheme: "https",
						host: "braingame.dev",
						pathPrefix: "/",
					},
				],
				category: ["BROWSABLE", "DEFAULT"],
			},
		],
		icon: brandAsset("icon.png"),
		userInterfaceStyle: "automatic",
	},
	web: {
		bundler: "metro",
		output: "static",
		favicon: brandAsset("favicon.png"),
		name: "Brain Game",
		shortName: "BrainGame",
		description: "Master mindfulness through science-backed techniques",
		backgroundColor: "#000000",
		themeColor: "#3B82F6",
		lang: "en",
		orientation: "portrait",
		preferRelatedApplications: true,
	},
	plugins: [
		"expo-router",
		[
			"expo-splash-screen",
			{
				image: brandAsset("splash-icon.png"),
				imageWidth: 200,
				resizeMode: "contain",
				backgroundColor: "#000000",
			},
		],
		"expo-font",
		"expo-haptics",
		[
			"expo-clipboard",
			{
				ios: {
					NSPhotoLibraryUsageDescription:
						"Allow access to save mindfulness progress images.",
				},
			},
		],
		[
			"@react-native-community/netinfo",
			{
				ios: {
					NSLocalNetworkUsageDescription:
						"This app uses the local network to sync your progress across devices.",
				},
			},
		],
	],
	experiments: {
		typedRoutes: true,
	},
	developer: {
		tool: null,
	},
	extra: {
		eas: {
			projectId: "your-project-id-here",
		},
	},
	updates: {
		enabled: true,
		checkAutomatically: "ON_LOAD",
		fallbackToCacheTimeout: 30000,
	},
	assetBundlePatterns: ["**/*"],
	locales: {
		en: {
			name: "Brain Game",
			description:
				"Master mindfulness through science-backed techniques and personalized brain training exercises",
		},
	},
	notification: {
		icon: brandAsset("icon.png"),
		color: "#3B82F6",
		androidMode: "default",
		androidCollapsedTitle: "Brain Game",
	},
};

export default config;
