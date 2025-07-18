import { createRenderer } from "@mui/internal-test-utils";
import CardContent, { cardContentClasses as classes } from "@mui/joy/CardContent";
import { ThemeProvider } from "@mui/joy/styles";
import describeConformance from "../../test/describeConformance";

describe("<CardContent />", () => {
	const { render } = createRenderer();

	describeConformance(<CardContent />, () => ({
		classes,
		inheritComponent: "div",
		render,
		ThemeProvider,
		muiName: "JoyCardContent",
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
