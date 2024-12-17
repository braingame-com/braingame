import type { ReactNode } from "react";
import { styles } from "@/constants/styles";
import { View } from "./View";
import { Tokens } from "@/constants/Tokens";

export const PageWrapper = ({ children }: { children: ReactNode }) => (
	<View style={{ ...styles.flexTop, padding: Tokens.xxl }}>{children}</View>
);
