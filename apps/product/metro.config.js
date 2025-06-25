const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

const config = getDefaultConfig(__dirname);

// Add TypeScript extensions
config.resolver.sourceExts.push("ts", "tsx");

// Add node_modules from workspace root
config.resolver.nodeModulesPaths = [
	path.resolve(__dirname, "node_modules"),
	path.resolve(__dirname, "../../node_modules"),
];

// Watch all workspace packages
config.watchFolders = [path.resolve(__dirname, "../..")];

// Force React to be resolved from the app's node_modules to avoid multiple instances
config.resolver.alias = {
	react: path.resolve(__dirname, "node_modules/react"),
	"react-dom": path.resolve(__dirname, "node_modules/react-dom"),
	"react-native": path.resolve(__dirname, "node_modules/react-native"),
	"react-native-web": path.resolve(__dirname, "node_modules/react-native-web"),
};

// Add explicit platform extensions and ensure React resolution
config.resolver.platforms = ["web", "ios", "android", "native"];

// Web-specific resolver config to force React deduplication
if (process.env.EXPO_PLATFORM === "web") {
	config.resolver.resolverMainFields = ["browser", "main"];
	config.resolver.conditionNames = ["browser", "require"];
}

// Bundle optimization settings
config.transformer = {
	...config.transformer,
	// Enable asset inlining for smaller images (< 8KB)
	inlineRequires: true,
	// Enable minification
	minifierConfig: {
		keep_fnames: false,
		mangle: {
			keep_fnames: false,
		},
		output: {
			comments: false,
		},
	},
};

// Asset optimization
config.resolver.assetExts = [
	...config.resolver.assetExts,
	// Remove unused asset extensions to reduce bundle scanning
].filter(ext => !['gif', 'bmp', 'tiff'].includes(ext));

module.exports = config;