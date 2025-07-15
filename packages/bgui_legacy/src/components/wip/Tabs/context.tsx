import { createContext, useContext } from "react";
import type { TabsVariant } from "./types";

interface TabsContextValue {
	activeTab: string;
	onValueChange: (value: string) => void;
	variant: TabsVariant;
	scrollable: boolean | undefined;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
	const ctx = useContext(TabsContext);
	if (!ctx) {
		throw new Error("Tabs components must be used within Tabs");
	}
	return ctx;
}
