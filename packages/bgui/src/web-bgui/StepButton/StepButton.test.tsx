import { createRenderer } from "@mui/internal-test-utils";
import StepButton, { stepButtonClasses as classes } from "@mui/joy/StepButton";
import { ThemeProvider } from "@mui/joy/styles";
import describeConformance from "../../test/describeConformance";

describe("<StepButton />", () => {
	const { render } = createRenderer();

	describeConformance(<StepButton />, () => ({
		classes,
		inheritComponent: "button",
		render,
		ThemeProvider,
		muiName: "JoyStepButton",
		refInstanceof: window.HTMLButtonElement,
		testComponentPropWith: "div",
		skip: ["classesRoot", "componentsProp", "themeVariants"],
		slots: {
			root: {
				expectedClassName: classes.root,
			},
		},
	}));
});
