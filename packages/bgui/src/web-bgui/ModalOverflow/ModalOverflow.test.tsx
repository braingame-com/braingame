import { createRenderer } from "@mui/internal-test-utils";
import ModalOverflow, { modalOverflowClasses as classes } from "@mui/joy/ModalOverflow";
import { ThemeProvider } from "@mui/joy/styles";
import describeConformance from "../../test/describeConformance";

describe("<ModalOverflow />", () => {
	const { render } = createRenderer();

	describeConformance(<ModalOverflow />, () => ({
		classes,
		inheritComponent: "div",
		render,
		ThemeProvider,
		muiName: "JoyModalOverflow",
		refInstanceof: window.HTMLDivElement,
		testComponentPropWith: "header",
		skip: ["classesRoot", "componentsProp", "themeVariants"],
		slots: {
			root: {
				expectedClassName: classes.root,
			},
		},
	}));
});
