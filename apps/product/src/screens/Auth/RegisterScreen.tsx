import { Text } from "@braingame/bgui";
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

type Props = AuthStackScreenProps<"Register">;

export const RegisterScreen: React.FC<Props> = () => {
	const navigation = useNavigation<Props["navigation"]>();
	const { register } = useAuth();
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{
		displayName?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const validateForm = () => {
		const newErrors: typeof errors = {};

		if (!displayName) {
			newErrors.displayName = "Name is required";
		}

		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email is invalid";
		}

		if (!password) {
			newErrors.password = "Password is required";
		} else if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleRegister = async () => {
		if (!validateForm()) return;

		setLoading(true);
		try {
			await register(email, password, displayName);
			// Navigation happens automatically via auth state
		} catch (_error) {
			Alert.alert("Registration Failed", "An account with this email may already exist.");
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
						<Text style={authStyles.formTitle}>Create Account</Text>
						<Text style={authStyles.formSubtitle}>Start your journey to peak performance</Text>

						{/* Name Input */}
						<View style={authStyles.inputContainer}>
							<Text style={authStyles.inputLabel}>Name</Text>
							<TextInput
								style={[authStyles.input, errors.displayName && authStyles.inputError]}
								value={displayName}
								onChangeText={setDisplayName}
								placeholder="Enter your name"
								autoCapitalize="words"
							/>
							{errors.displayName && <Text style={authStyles.errorText}>{errors.displayName}</Text>}
						</View>

						{/* Email Input */}
						<View style={authStyles.inputContainer}>
							<Text style={authStyles.inputLabel}>Email</Text>
							<TextInput
								style={[authStyles.input, errors.email && authStyles.inputError]}
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
							/>
							{errors.email && <Text style={authStyles.errorText}>{errors.email}</Text>}
						</View>

						{/* Password Input */}
						<View style={authStyles.inputContainer}>
							<Text style={authStyles.inputLabel}>Password</Text>
							<TextInput
								style={[authStyles.input, errors.password && authStyles.inputError]}
								value={password}
								onChangeText={setPassword}
								placeholder="Create a password"
								secureTextEntry
								autoCapitalize="none"
							/>
							{errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
						</View>

						{/* Confirm Password Input */}
						<View style={authStyles.inputContainer}>
							<Text style={authStyles.inputLabel}>Confirm Password</Text>
							<TextInput
								style={[authStyles.input, errors.confirmPassword && authStyles.inputError]}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Confirm your password"
								secureTextEntry
								autoCapitalize="none"
							/>
							{errors.confirmPassword && (
								<Text style={authStyles.errorText}>{errors.confirmPassword}</Text>
							)}
						</View>

						{/* Register Button */}
						<TouchableOpacity
							style={[authStyles.button, authStyles.primaryButton, { marginTop: 24 }]}
							onClick={handleRegister}
							disabled={loading}
						>
							<Text style={authStyles.primaryButtonText}>
								{loading ? "Creating account..." : "Create Account"}
							</Text>
						</TouchableOpacity>

						{/* Terms */}
						<Text style={[authStyles.footerText, { marginTop: 16, marginBottom: 24 }]}>
							By creating an account, you agree to our{" "}
							<Text style={authStyles.footerLink}>Terms</Text> and{" "}
							<Text style={authStyles.footerLink}>Privacy Policy</Text>
						</Text>

						{/* Sign In Link */}
						<View style={{ alignItems: "center" }}>
							<Text style={authStyles.footerText}>
								Already have an account?{" "}
								<Text style={authStyles.footerLink} onClick={() => navigation.navigate("Login")}>
									Sign in
								</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
