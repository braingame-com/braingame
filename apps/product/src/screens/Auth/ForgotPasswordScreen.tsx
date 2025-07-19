import { Link, Typography } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../navigation/AuthContext";
import type { AuthStackScreenProps } from "../../navigation/types";
import { authStyles } from "./styles";

type Props = AuthStackScreenProps<"ForgotPassword">;

export const ForgotPasswordScreen: React.FC<Props> = () => {
	const navigation = useNavigation<Props["navigation"]>();
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");

	const validateEmail = () => {
		if (!email) {
			setError("Email is required");
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Email is invalid");
			return false;
		}
		setError("");
		return true;
	};

	const handleResetPassword = async () => {
		if (!validateEmail()) return;

		setLoading(true);
		try {
			await resetPassword(email);
			setSent(true);
			Alert.alert("Email Sent!", "Check your email for password reset instructions.", [
				{
					text: "OK",
					onPress: () => navigation.navigate("Login"),
				},
			]);
		} catch (_error) {
			Alert.alert("Error", "Failed to send reset email. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={authStyles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<ScrollView
					style={authStyles.content}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={authStyles.formContainer}>
						<Typography style={authStyles.formTitle}>Reset Password</Typography>
						<Typography style={authStyles.formSubtitle}>
							Enter your email and we'll send you instructions to reset your password
						</Typography>

						{/* Email Input */}
						<View style={authStyles.inputContainer}>
							<Typography style={authStyles.inputLabel}>Email</Typography>
							<TextInput
								style={[authStyles.input, error && authStyles.inputError]}
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								editable={!sent}
							/>
							{error && <Typography style={authStyles.errorText}>{error}</Typography>}
						</View>

						{/* Reset Button */}
						<TouchableOpacity
							style={[authStyles.button, authStyles.primaryButton, { marginTop: 24 }]}
							onPress={handleResetPassword}
							disabled={loading || sent}
						>
							<Typography style={authStyles.primaryButtonText}>
								{loading ? "Sending..." : sent ? "Email Sent" : "Send Reset Email"}
							</Typography>
						</TouchableOpacity>

						{/* Back to Login */}
						<View style={{ marginTop: 32, alignItems: "center" }}>
							<Typography style={authStyles.footerText}>
								Remember your password?{" "}
								<Link
									style={authStyles.footerLink}
									onClick={() => navigation.navigate("Login")}
								>
									Sign in
								</Link>
							</Typography>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
