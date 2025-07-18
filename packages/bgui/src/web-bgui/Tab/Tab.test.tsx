import type { TabsProps } from "@mui/base/Tabs";
import { TabsProvider as BaseTabsProvider, useTabs } from "@mui/base/useTabs";
import { TabsListProvider as BaseTabsListProvider, useTabsList } from "@mui/base/useTabsList";
import { createRenderer, screen } from "@mui/internal-test-utils";
import { ThemeProvider } from "@mui/joy/styles";
import Tab, { tabClasses as classes } from "@mui/joy/Tab";
import { expect } from "chai";
import type * as React from "react";
import describeConformance from "../../test/describeConformance";

function TabsListProvider({ children }: React.PropsWithChildren<{}>) {
	const { contextValue: tabsListContextValue } = useTabsList({
		rootRef: { current: null },
	});
	return <BaseTabsListProvider value={tabsListContextValue}>{children}</BaseTabsListProvider>;
}

function TabsProvider({ children, ...props }: TabsProps) {
	const { contextValue: tabsContextValue } = useTabs(props);

	return (
		<BaseTabsProvider value={tabsContextValue}>
			<TabsListProvider>{children}</TabsListProvider>
		</BaseTabsProvider>
	);
}

describe("Joy <Tab />", () => {
	const { render } = createRenderer();

	describeConformance(<Tab />, () => ({
		classes,
		inheritComponent: "button",
		render: (node) => render(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
		ThemeProvider,
		muiName: "JoyTab",
		refInstanceof: window.HTMLButtonElement,
		testVariantProps: { variant: "solid" },
		testCustomVariant: true,
		skip: ["componentsProp", "classesRoot"],
		slots: {
			root: {
				expectedClassName: classes.root,
			},
		},
	}));

	it("prop: variant", () => {
		render(
			<TabsProvider>
				<Tab variant="outlined" />
			</TabsProvider>,
		);
		expect(screen.getByRole("tab")).to.have.class(classes.variantOutlined);
	});

	it("prop: color", () => {
		render(
			<TabsProvider>
				<Tab color="primary" />
			</TabsProvider>,
		);
		expect(screen.getByRole("tab")).to.have.class(classes.colorPrimary);
	});

	it("prop: disabled", () => {
		render(
			<TabsProvider>
				<Tab disabled />
			</TabsProvider>,
		);
		expect(screen.getByRole("tab")).to.have.class(classes.disabled);
		expect(screen.getByRole("tab")).to.have.attribute("aria-disabled");
	});
});
