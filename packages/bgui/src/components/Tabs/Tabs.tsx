import type { ReactElement } from "react";
import { ContextErrorBoundary } from "../ErrorBoundary";
import { TabsContext } from "./context";
import { List } from "./List";
import { Panel } from "./Panel";
import { Panels } from "./Panels";
import { Tab } from "./Tab";
import type { TabsProps } from "./types";

/**
 * Tabs component for organizing content into switchable panels.
 * Provides accessible navigation between related content sections.
 *
 * @example
 * ```tsx
 * // Basic tabs
 * <Tabs activeTab="overview" onValueChange={setActiveTab}>
 *   <Tabs.List>
 *     <Tabs.Tab value="overview">Overview</Tabs.Tab>
 *     <Tabs.Tab value="features">Features</Tabs.Tab>
 *     <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="overview">Overview content...</Tabs.Panel>
 *     <Tabs.Panel value="features">Features content...</Tabs.Panel>
 *     <Tabs.Panel value="pricing">Pricing content...</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 *
 * // Pills variant with scrollable tabs
 * <Tabs
 *   activeTab={currentTab}
 *   onValueChange={setCurrentTab}
 *   variant="pills"
 *   scrollable
 * >
 *   <Tabs.List>
 *     {categories.map(cat => (
 *       <Tabs.Tab key={cat.id} value={cat.id}>{cat.name}</Tabs.Tab>
 *     ))}
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     {categories.map(cat => (
 *       <Tabs.Panel key={cat.id} value={cat.id}>
 *         <CategoryContent data={cat} />
 *       </Tabs.Panel>
 *     ))}
 *   </Tabs.Panels>
 * </Tabs>
 *
 * // Enclosed variant with disabled tab
 * <Tabs activeTab="general" onValueChange={setTab} variant="enclosed">
 *   <Tabs.List>
 *     <Tabs.Tab value="general">General</Tabs.Tab>
 *     <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
 *     <Tabs.Tab value="experimental" disabled>Experimental</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="general">General settings...</Tabs.Panel>
 *     <Tabs.Panel value="advanced">Advanced settings...</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 * ```
 *
 * @component
 */
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
