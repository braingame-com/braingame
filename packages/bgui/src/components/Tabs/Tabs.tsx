import type { ReactElement } from "react";
import { List } from "./List";
import { Panel } from "./Panel";
import { Panels } from "./Panels";
import { Tab } from "./Tab";
import { TabsContext } from "./context";
import type { TabsProps } from "./types";

function TabsBase({
	children,
	activeTab,
	onValueChange,
	scrollable,
	variant = "line",
}: TabsProps): ReactElement {
	return (
		<TabsContext.Provider value={{ activeTab, onValueChange, variant, scrollable }}>
			{children}
		</TabsContext.Provider>
	);
}

export const Tabs = Object.assign(TabsBase, {
	List,
	Tab,
	Panels,
	Panel,
});
