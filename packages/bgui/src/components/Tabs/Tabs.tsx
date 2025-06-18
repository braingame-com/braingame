import type { ReactElement } from "react";
import { TabsContext } from "./context";
import type { TabsProps } from "./types";
import { List } from "./List";
import { Tab } from "./Tab";
import { Panels } from "./Panels";
import { Panel } from "./Panel";

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
