import { Text, useMountedState } from "@braingame/bgui";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ModalStackParamList } from "../../navigation/ModalNavigator";

type Props = NativeStackScreenProps<ModalStackParamList, "Payment">;

export const PaymentModal: React.FC = () => {
	const navigation = useNavigation<Props["navigation"]>();
	const route = useRoute<Props["route"]>();
	const { price } = route.params;
	const [selectedMethod, setSelectedMethod] = useState<"card" | "apple" | "google">("card");
	const [processing, setProcessing] = useState(false);
	const isMounted = useMountedState();
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handlePayment = async () => {
		if (isMounted()) {
			setProcessing(true);
		}

		// Simulate payment processing
		timeoutRef.current = setTimeout(() => {
			if (isMounted()) {
				setProcessing(false);
				navigation.goBack();
			}
		}, 2000);
	};

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.closeButton}>✕</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Complete Payment</Text>
				<View style={{ width: 30 }} />
			</View>

			<ScrollView style={styles.content}>
				{/* Plan Details */}
				<View style={styles.planSection}>
					<Text style={styles.planName}>Premium Plan</Text>
					<Text style={styles.planPrice}>${price}/month</Text>
					<Text style={styles.planDescription}>
						Unlock all features and unlimited access to content
					</Text>
				</View>

				{/* Payment Methods */}
				<View style={styles.paymentSection}>
					<Text style={styles.sectionTitle}>Payment Method</Text>

					<TouchableOpacity
						style={[styles.paymentMethod, selectedMethod === "card" && styles.selectedMethod]}
						onPress={() => setSelectedMethod("card")}
					>
						<Text style={styles.methodIcon}>💳</Text>
						<Text style={styles.methodText}>Credit/Debit Card</Text>
						{selectedMethod === "card" && <Text style={styles.checkmark}>✓</Text>}
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.paymentMethod, selectedMethod === "apple" && styles.selectedMethod]}
						onPress={() => setSelectedMethod("apple")}
					>
						<Text style={styles.methodIcon}>🍎</Text>
						<Text style={styles.methodText}>Apple Pay</Text>
						{selectedMethod === "apple" && <Text style={styles.checkmark}>✓</Text>}
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.paymentMethod, selectedMethod === "google" && styles.selectedMethod]}
						onPress={() => setSelectedMethod("google")}
					>
						<Text style={styles.methodIcon}>📱</Text>
						<Text style={styles.methodText}>Google Pay</Text>
						{selectedMethod === "google" && <Text style={styles.checkmark}>✓</Text>}
					</TouchableOpacity>
				</View>

				{/* Terms */}
				<Text style={styles.terms}>
					By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel
					anytime.
				</Text>
			</ScrollView>

			{/* Pay Button */}
			<View style={styles.footer}>
				<TouchableOpacity
					style={[styles.payButton, processing && styles.payButtonDisabled]}
					onPress={handlePayment}
					disabled={processing}
				>
					<Text style={styles.payButtonText}>{processing ? "Processing..." : `Pay $${price}`}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e1e1e1",
	},
	closeButton: {
		fontSize: 24,
		color: "#666",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
	},
	content: {
		flex: 1,
		padding: 20,
	},
	planSection: {
		alignItems: "center",
		paddingVertical: 30,
		borderBottomWidth: 1,
		borderBottomColor: "#e1e1e1",
		marginBottom: 30,
	},
	planName: {
		fontSize: 24,
		fontWeight: "700",
		fontFamily: "Lexend",
		marginBottom: 8,
	},
	planPrice: {
		fontSize: 36,
		fontWeight: "700",
		fontFamily: "Lexend",
		color: "#007fff",
		marginBottom: 12,
	},
	planDescription: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		paddingHorizontal: 40,
	},
	paymentSection: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "Lexend",
		marginBottom: 16,
	},
	paymentMethod: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderWidth: 1,
		borderColor: "#e1e1e1",
		borderRadius: 12,
		marginBottom: 12,
	},
	selectedMethod: {
		borderColor: "#007fff",
		backgroundColor: "#f0f8ff",
	},
	methodIcon: {
		fontSize: 24,
		marginRight: 12,
	},
	methodText: {
		flex: 1,
		fontSize: 16,
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	checkmark: {
		fontSize: 20,
		color: "#007fff",
	},
	terms: {
		fontSize: 12,
		color: "#999",
		textAlign: "center",
		lineHeight: 18,
		paddingHorizontal: 20,
	},
	footer: {
		padding: 20,
		paddingBottom: 30,
		borderTopWidth: 1,
		borderTopColor: "#e1e1e1",
	},
	payButton: {
		backgroundColor: "#007fff",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	payButtonDisabled: {
		opacity: 0.6,
	},
	payButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
	},
});
