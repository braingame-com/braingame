import type { ReactNode } from "react";
import { styles } from "@/constants/styles";
import { View } from "./View";
import { Tokens } from "@/constants/Tokens";
import { SafeAreaView, ScrollView } from "react-native";

export const PageWrapper = ({ children }: { children: ReactNode }) => (
	<SafeAreaView style={{ flex: 1 }}>
		<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
			<View
				style={{
					...styles.flexTop,
					padding: Tokens.xxl,
				}}
			>
				{children}
			</View>
		</ScrollView>
	</SafeAreaView>
);
