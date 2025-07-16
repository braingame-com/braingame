import { createRenderer } from "@mui/internal-test-utils";
import AccordionSummary, { accordionSummaryClasses as classes } from "@mui/joy/AccordionSummary";
import { ThemeProvider } from "@mui/joy/styles";
import * as React from "react";
import describeConformance from "../../test/describeConformance";

describe("<AccordionSummary />", () => {
	const { render } = createRenderer();

	describeConformance(<AccordionSummary />, () => ({
		classes,
		inheritComponent: "div",
		render,
		ThemeProvider,
		muiName: "JoyAccordionSummary",
		refInstanceof: window.HTMLDivElement,
		testComponentPropWith: "span",
		skip: ["classesRoot", "componentsProp", "themeVariants"],
		slots: {
			root: {
				expectedClassName: classes.root,
			},
		},
	}));
});
