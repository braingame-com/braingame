import { Tokens } from "@/constants/Tokens";
import { styles } from "@/constants/styles";
import type { ReactNode } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { View } from "./View";

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
