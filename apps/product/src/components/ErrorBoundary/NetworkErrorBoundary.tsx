import NetInfo from "@react-native-community/netinfo";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { captureMessage } from "../../services/ErrorService";
import {
	AccessibleThemedButton,
	AccessibleThemedText,
} from "../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../theme/ThemeContext";

export interface NetworkErrorBoundaryProps {
	children: React.ReactNode;
	onRetry?: () => void;
	showOfflineUI?: boolean;
	offlineFallback?: React.ReactNode;
}

export const NetworkErrorBoundary: React.FC<NetworkErrorBoundaryProps> = ({
	children,
	onRetry,
	showOfflineUI = true,
	offlineFallback,
}) => {
	const { theme } = useTheme();
	const { announce } = useAccessibility();
	const [isConnected, setIsConnected] = useState(true);
	const [isInternetReachable, setIsInternetReachable] = useState(true);
	const [connectionType, setConnectionType] = useState<string>("unknown");

	useEffect(() => {
		// Subscribe to network state updates
		const unsubscribe = NetInfo.addEventListener((state) => {
			const wasConnected = isConnected;
			const connected = state.isConnected ?? false;
			const reachable = state.isInternetReachable ?? false;

			setIsConnected(connected);
			setIsInternetReachable(reachable);
			setConnectionType(state.type);

			// Announce connection changes
			if (!wasConnected && connected) {
				announce("Internet connection restored");
				captureMessage("Network connection restored", "info", {
					connectionType: state.type,
					details: state.details,
				});
			} else if (wasConnected && !connected) {
				announce("Internet connection lost");
				captureMessage("Network connection lost", "warning", {
					connectionType: state.type,
					details: state.details,
				});
			}
		});

		// Check connection on mount
		NetInfo.fetch().then((state) => {
			setIsConnected(state.isConnected ?? false);
			setIsInternetReachable(state.isInternetReachable ?? false);
			setConnectionType(state.type);
		});

		return () => unsubscribe();
	}, [isConnected, announce]);

	const handleRetry = useCallback(() => {
		announce("Checking connection");
		NetInfo.fetch().then((state) => {
			if (state.isConnected && state.isInternetReachable) {
				announce("Connection available, retrying");
				onRetry?.();
			} else {
				announce("Still offline, please check your connection");
			}
		});
	}, [onRetry, announce]);

	// If connected and reachable, render children
	if (isConnected && isInternetReachable) {
		return <>{children}</>;
	}

	// If offline and custom fallback provided, use it
	if (offlineFallback) {
		return <>{offlineFallback}</>;
	}

	// If offline and showOfflineUI is false, still render children (for offline-capable features)
	if (!showOfflineUI) {
		return <>{children}</>;
	}

	// Default offline UI
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 20,
				backgroundColor: theme.colors.background,
			}}
		>
			<View style={{ alignItems: "center", maxWidth: 300 }}>
				{/* Offline icon/image placeholder */}
				<View
					style={{
						width: 120,
						height: 120,
						borderRadius: 60,
						backgroundColor: theme.colors.surface,
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 20,
					}}
				>
					<AccessibleThemedText variant="secondary" size="4xl">
						📡
					</AccessibleThemedText>
				</View>

				<AccessibleThemedText
					variant="primary"
					size="2xl"
					weight="semibold"
					style={{ marginBottom: 10, textAlign: "center" }}
					isHeading
				>
					No Internet Connection
				</AccessibleThemedText>

				<AccessibleThemedText
					variant="secondary"
					size="md"
					style={{ marginBottom: 20, textAlign: "center" }}
				>
					{!isConnected
						? "You're offline. Please check your internet connection."
						: "Internet is not reachable. Please check your connection quality."}
				</AccessibleThemedText>

				{connectionType !== "unknown" && (
					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginBottom: 20, textAlign: "center" }}
					>
						Connection type: {connectionType}
					</AccessibleThemedText>
				)}

				<AccessibleThemedButton
					variant="primary"
					size="medium"
					onPress={handleRetry}
					accessibilityLabel="Try Again"
					accessibilityHint="Check internet connection and retry"
					fullWidth
				>
					Try Again
				</AccessibleThemedButton>

				<View
					style={{
						marginTop: 30,
						padding: 15,
						backgroundColor: theme.colors.surface,
						borderRadius: 8,
						width: "100%",
					}}
				>
					<AccessibleThemedText variant="secondary" size="sm" style={{ textAlign: "center" }}>
						Some features may be available offline
					</AccessibleThemedText>
				</View>
			</View>
		</View>
	);
};

/**
 * Hook to monitor network status
 */
export const useNetworkStatus = () => {
	const [networkState, setNetworkState] = useState({
		isConnected: true,
		isInternetReachable: true,
		type: "unknown",
		isWifi: false,
		isCellular: false,
		details: null as unknown,
	});

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setNetworkState({
				isConnected: state.isConnected ?? false,
				isInternetReachable: state.isInternetReachable ?? false,
				type: state.type,
				isWifi: state.type === "wifi",
				isCellular: state.type === "cellular",
				details: state.details,
			});
		});

		// Initial fetch
		NetInfo.fetch().then((state) => {
			setNetworkState({
				isConnected: state.isConnected ?? false,
				isInternetReachable: state.isInternetReachable ?? false,
				type: state.type,
				isWifi: state.type === "wifi",
				isCellular: state.type === "cellular",
				details: state.details,
			});
		});

		return () => unsubscribe();
	}, []);

	return networkState;
};

/**
 * Higher-order component for network-aware components
 */
export function withNetworkAwareness<P extends object>(
	Component: React.ComponentType<P & { isOnline: boolean; networkType: string }>,
) {
	return (props: P) => {
		const { isConnected, isInternetReachable, type } = useNetworkStatus();
		const isOnline = isConnected && isInternetReachable;

		return <Component {...props} isOnline={isOnline} networkType={type} />;
	};
}
