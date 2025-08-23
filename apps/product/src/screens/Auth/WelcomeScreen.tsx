import { Text } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { AuthStackScreenProps } from "../../navigation/types";
import { authStyles } from "./styles";

type Props = AuthStackScreenProps<"Welcome">;

export const WelcomeScreen: React.FC<Props> = () => {
	const navigation = useNavigation<Props["navigation"]>();

	return (
		<SafeAreaView style={authStyles.container}>
			<View style={authStyles.content}>
				{/* Logo/Brand Section */}
				<View style={authStyles.brandSection}>
					<Text style={authStyles.logo}>🧠</Text>
					<Text style={authStyles.brandName}>BrainGame</Text>
					<Text style={authStyles.tagline}>Unlock your potential with daily mindset training</Text>
				</View>

				{/* Buttons Section */}
				<View style={authStyles.buttonSection}>
					<TouchableOpacity
						style={[authStyles.button, authStyles.primaryButton]}
						onClick={() => navigation.navigate("Login")}
					>
						<Text style={authStyles.primaryButtonText}>Sign In</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[authStyles.button, authStyles.secondaryButton]}
						onClick={() => navigation.navigate("Register")}
					>
						<Text style={authStyles.secondaryButtonText}>Create Account</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={authStyles.skipButton}
						onClick={() => {
							// In a real app, this would sign in as guest
							// Guest authentication functionality not yet implemented
						}}
					>
						<Text style={authStyles.skipButtonText}>Continue as Guest</Text>
					</TouchableOpacity>
				</View>

				{/* Footer */}
				<View style={authStyles.footer}>
					<Text style={authStyles.footerText}>
						By continuing, you agree to our <Text style={authStyles.footerLink}>Terms</Text> and{" "}
						<Text style={authStyles.footerLink}>Privacy Policy</Text>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};
