import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { NotificationSettingsModal } from "../screens/Modals/NotificationSettingsModal";
import { OnboardingModal } from "../screens/Modals/OnboardingModal";
import { PaymentModal } from "../screens/Modals/PaymentModal";
import { DrawerNavigator } from "./DrawerNavigator";

export type ModalStackParamList = {
	MainApp: undefined;
	Payment: { planId: string; price: number };
	Onboarding: { step?: number };
	NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<ModalStackParamList>();

export const ModalNavigator: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				presentation: "modal",
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="MainApp"
				component={DrawerNavigator}
				options={{
					presentation: "card",
				}}
			/>
			<Stack.Screen
				name="Payment"
				component={PaymentModal}
				options={{
					presentation: "fullScreenModal",
					animation: "slide_from_bottom",
				}}
			/>
			<Stack.Screen
				name="Onboarding"
				component={OnboardingModal}
				options={{
					presentation: "fullScreenModal",
					gestureEnabled: false, // Prevent swipe to dismiss
				}}
			/>
			<Stack.Screen
				name="NotificationSettings"
				component={NotificationSettingsModal}
				options={{
					presentation: "modal",
					animation: "fade",
				}}
			/>
		</Stack.Navigator>
	);
};
