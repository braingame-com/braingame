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

type Props = AuthStackScreenProps<"Login">;

export const LoginScreen: React.FC<Props> = () => {
	const navigation = useNavigation<Props["navigation"]>();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const validateForm = () => {
		const newErrors: typeof errors = {};

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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async () => {
		if (!validateForm()) return;

		setLoading(true);
		try {
			await login(email, password);
			// Navigation happens automatically via auth state
		} catch (_error) {
			Alert.alert("Login Failed", "Invalid email or password. Please try again.");
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
						<Text style={authStyles.formTitle}>Welcome back</Text>
						<Text style={authStyles.formSubtitle}>Sign in to continue your journey</Text>

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
								placeholder="Enter your password"
								secureTextEntry
								autoCapitalize="none"
							/>
							{errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
						</View>

						{/* Forgot Password */}
						<TouchableOpacity
							style={authStyles.forgotPassword}
							onPress={() => navigation.navigate("ForgotPassword")}
						>
							<Text style={authStyles.forgotPasswordText}>Forgot password?</Text>
						</TouchableOpacity>

						{/* Login Button */}
						<TouchableOpacity
							style={[authStyles.button, authStyles.primaryButton]}
							onPress={handleLogin}
							disabled={loading}
						>
							<Text style={authStyles.primaryButtonText}>
								{loading ? "Signing in..." : "Sign In"}
							</Text>
						</TouchableOpacity>

						{/* Divider */}
						<View style={authStyles.divider}>
							<View style={authStyles.dividerLine} />
							<Text style={authStyles.dividerText}>or</Text>
							<View style={authStyles.dividerLine} />
						</View>

						{/* Social Login */}
						<TouchableOpacity style={authStyles.socialButton}>
							<Text style={authStyles.socialIcon}>🍎</Text>
							<Text style={authStyles.socialButtonText}>Continue with Apple</Text>
						</TouchableOpacity>

						<TouchableOpacity style={authStyles.socialButton}>
							<Text style={authStyles.socialIcon}>📧</Text>
							<Text style={authStyles.socialButtonText}>Continue with Google</Text>
						</TouchableOpacity>

						{/* Sign Up Link */}
						<View style={{ marginTop: 32, alignItems: "center" }}>
							<Text style={authStyles.footerText}>
								Don't have an account?{" "}
								<Text style={authStyles.footerLink} onPress={() => navigation.navigate("Register")}>
									Sign up
								</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
