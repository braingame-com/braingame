import type { TabsProps } from "@mui/base/Tabs";
import { TabsProvider as BaseTabsProvider, useTabs } from "@mui/base/useTabs";
import { createRenderer, screen } from "@mui/internal-test-utils";
import { ThemeProvider } from "@mui/joy/styles";
import TabList, { tabListClasses as classes } from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import { expect } from "chai";
import * as React from "react";
import describeConformance from "../../test/describeConformance";
import RowListContext from "../List/RowListContext";

function TabsProvider({ children, ...props }: TabsProps) {
	const { contextValue } = useTabs(props);
	return <BaseTabsProvider value={contextValue}>{children}</BaseTabsProvider>;
}

describe("Joy <TabList />", () => {
	const { render } = createRenderer();

	describeConformance(<TabList />, () => ({
		classes,
		inheritComponent: "div",
		render: (node) => render(<TabsProvider defaultValue={0}>{node}</TabsProvider>),
		ThemeProvider,
		muiName: "JoyTabList",
		refInstanceof: window.HTMLDivElement,
		testVariantProps: { variant: "solid" },
		skip: ["componentsProp", "classesRoot"],
		slots: {
			root: {
				expectedClassName: classes.root,
			},
		},
	}));

	describe("size", () => {
		it("uses size from Tabs", () => {
			render(
				<Tabs defaultValue={0} size="sm">
					<TabList />
				</Tabs>,
			);
			expect(screen.getByRole("tablist")).to.have.class(classes.sizeSm);
		});

		it("uses prop if provided", () => {
			render(
				<Tabs defaultValue={0} size="sm">
					<TabList size="md" />
				</Tabs>,
			);
			expect(screen.getByRole("tablist")).to.have.class(classes.sizeMd);
		});
	});

	it("prop: variant", () => {
		render(
			<TabsProvider>
				<TabList variant="outlined" />
			</TabsProvider>,
		);
		expect(screen.getByRole("tablist")).to.have.class(classes.variantOutlined);
	});

	it("prop: color", () => {
		render(
			<TabsProvider>
				<TabList color="primary" />
			</TabsProvider>,
		);
		expect(screen.getByRole("tablist")).to.have.class(classes.colorPrimary);
	});

	it("attach data-first-child to the first element", () => {
		// integration with Tab, this can be removed once flexbox `gap` is used.
		render(
			<TabsProvider>
				<TabList color="primary">
					<div role="tab" />
				</TabList>
			</TabsProvider>,
		);
		expect(screen.getByRole("tab")).to.have.attribute("data-first-child");
	});

	it("provides the correct value to RowListContext", () => {
		function TabItem() {
			const row = React.useContext(RowListContext);
			return <div>{row ? "horizontal" : "vertical"}</div>;
		}
		render(
			<Tabs orientation="vertical">
				<TabList>
					<TabItem />
				</TabList>
			</Tabs>,
		);
		expect(screen.getByText("vertical")).toBeVisible();
	});
});
