jest.mock("@testing-library/react-native", () => {
	const actual = jest.requireActual("@testing-library/react-native");
	const React = require("react");
	const { BGUIThemeProvider } = require("./src/theme");
	const render = actual.render;

	return {
		...actual,
		render: (ui, options) =>
			render(
				React.createElement(
					BGUIThemeProvider,
					{ forceTheme: "light" },
					ui,
				),
				options,
			),
	};
});

if (typeof window === "undefined") {
	global.window = {
		addEventListener: () => {},
		removeEventListener: () => {},
		innerWidth: 1024,
		document: { documentElement: { clientWidth: 1024 } },
	};
} else {
	window.addEventListener = window.addEventListener ?? (() => {});
	window.removeEventListener = window.removeEventListener ?? (() => {});
}

if (typeof document === "undefined") {
	global.document = {
		body: { style: {}, appendChild: () => {}, removeChild: () => {} },
		documentElement: { clientWidth: 1024 },
		createElement: () => ({ style: {} }),
		addEventListener: () => {},
		removeEventListener: () => {},
	};
}
