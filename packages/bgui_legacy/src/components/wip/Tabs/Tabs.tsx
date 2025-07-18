import type { ReactElement } from "react";
import { ContextErrorBoundary } from "../ErrorBoundary";
import { TabsContext } from "./context";
import { List } from "./List";
import { Panel } from "./Panel";
import { Panels } from "./Panels";
import { Tab } from "./Tab";
import type { TabsProps } from "./types";

function TabsBase({
	children,
	activeTab,
	onValueChange,
	scrollable,
	variant = "line",
}: TabsProps): ReactElement {
	return (
		<ContextErrorBoundary contextName="Tabs">
			<TabsContext.Provider value={{ activeTab, onValueChange, variant, scrollable }}>
				{children}
			</TabsContext.Provider>
		</ContextErrorBoundary>
	);
}

export const Tabs = Object.assign(TabsBase, {
	List,
	Tab,
	Panels,
	Panel,
});
