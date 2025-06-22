// Quick React deduplication test script
const React = require("react");
const ReactDOM = require("react-dom");

console.log("React version:", React.version);
console.log("ReactDOM version:", ReactDOM.version || "No version property");

// Check if there are multiple React instances
const reactPath = require.resolve("react");
const reactDomPath = require.resolve("react-dom");

console.log("React path:", reactPath);
console.log("ReactDOM path:", reactDomPath);

// Try to detect multiple React instances
const originalReact = global.React;
global.React = React;

if (originalReact && originalReact !== React) {
	console.log("❌ MULTIPLE REACT INSTANCES DETECTED!");
	console.log("Original React:", originalReact.version);
	console.log("New React:", React.version);
} else {
	console.log("✅ Single React instance detected");
}

// Check hooks context
try {
	const hooks = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	console.log("React internals available:", !!hooks);
	console.log("Current dispatcher:", !!hooks.ReactCurrentDispatcher.current);
} catch (e) {
	console.log("React internals check failed:", e.message);
}
