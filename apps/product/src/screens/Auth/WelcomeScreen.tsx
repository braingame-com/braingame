import { Typography } from "@braingame/bgui";
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
					<Typography style={authStyles.logo}>🧠</Typography>
					<Typography style={authStyles.brandName}>BrainGame</Typography>
					<Typography style={authStyles.tagline}>Unlock your potential with daily mindset training</Typography>
				</View>

				{/* Buttons Section */}
				<View style={authStyles.buttonSection}>
					<TouchableOpacity
						style={[authStyles.button, authStyles.primaryButton]}
						onPress={() => navigation.navigate("Login")}
					>
						<Typography style={authStyles.primaryButtonText}>Sign In</Typography>
					</TouchableOpacity>

					<TouchableOpacity
						style={[authStyles.button, authStyles.secondaryButton]}
						onPress={() => navigation.navigate("Register")}
					>
						<Typography style={authStyles.secondaryButtonText}>Create Account</Typography>
					</TouchableOpacity>

					<TouchableOpacity
						style={authStyles.skipButton}
						onPress={() => {
							// In a real app, this would sign in as guest
							// Guest authentication functionality not yet implemented
						}}
					>
						<Typography style={authStyles.skipButtonText}>Continue as Guest</Typography>
					</TouchableOpacity>
				</View>

				{/* Footer */}
				<View style={authStyles.footer}>
					<Typography style={authStyles.footerText}>
						By continuing, you agree to our <Typography style={authStyles.footerLink}>Terms</Typography> and{" "}
						<Typography style={authStyles.footerLink}>Privacy Policy</Typography>
					</Typography>
				</View>
			</View>
		</SafeAreaView>
	);
};
