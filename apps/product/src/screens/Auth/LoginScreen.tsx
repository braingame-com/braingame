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
						<Typography style={authStyles.formTitle}>Welcome back</Typography>
						<Typography style={authStyles.formSubtitle}>Sign in to continue your journey</Typography>

						{/* Email Input */}
						<View style={authStyles.inputContainer}>
							<Typography style={authStyles.inputLabel}>Email</Typography>
							<TextInput
								style={[authStyles.input, errors.email && authStyles.inputError]}
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
							/>
							{errors.email && <Typography style={authStyles.errorText}>{errors.email}</Typography>}
						</View>

						{/* Password Input */}
						<View style={authStyles.inputContainer}>
							<Typography style={authStyles.inputLabel}>Password</Typography>
							<TextInput
								style={[authStyles.input, errors.password && authStyles.inputError]}
								value={password}
								onChangeText={setPassword}
								placeholder="Enter your password"
								secureTextEntry
								autoCapitalize="none"
							/>
							{errors.password && <Typography style={authStyles.errorText}>{errors.password}</Typography>}
						</View>

						{/* Forgot Password */}
						<TouchableOpacity
							style={authStyles.forgotPassword}
							onPress={() => navigation.navigate("ForgotPassword")}
						>
							<Typography style={authStyles.forgotPasswordText}>Forgot password?</Typography>
						</TouchableOpacity>

						{/* Login Button */}
						<TouchableOpacity
							style={[authStyles.button, authStyles.primaryButton]}
							onPress={handleLogin}
							disabled={loading}
						>
							<Typography style={authStyles.primaryButtonText}>
								{loading ? "Signing in..." : "Sign In"}
							</Typography>
						</TouchableOpacity>

						{/* Divider */}
						<View style={authStyles.divider}>
							<View style={authStyles.dividerLine} />
							<Typography style={authStyles.dividerText}>or</Typography>
							<View style={authStyles.dividerLine} />
						</View>

						{/* Social Login */}
						<TouchableOpacity style={authStyles.socialButton}>
							<Typography style={authStyles.socialIcon}>🍎</Typography>
							<Typography style={authStyles.socialButtonText}>Continue with Apple</Typography>
						</TouchableOpacity>

						<TouchableOpacity style={authStyles.socialButton}>
							<Typography style={authStyles.socialIcon}>📧</Typography>
							<Typography style={authStyles.socialButtonText}>Continue with Google</Typography>
						</TouchableOpacity>

						{/* Sign Up Link */}
						<View style={{ marginTop: 32, alignItems: "center" }}>
							<Typography style={authStyles.footerText}>
								Don't have an account?{" "}
								<Link
									style={authStyles.footerLink}
									onClick={() => navigation.navigate("Register")}
								>
									Sign up
								</Link>
							</Typography>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
