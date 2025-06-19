// Mock for @expo/vector-icons
const React = require("react");

const MockIcon = (props) => {
	const { testID, accessibilityLabel, name, size, color, ...otherProps } = props;
	return React.createElement(
		"span",
		{
			testID: testID || accessibilityLabel || name,
			"data-icon": name,
			"data-size": size,
			"data-color": color,
			...otherProps,
		},
		name,
	);
};

MockIcon.displayName = "Icon";

module.exports = {
	AntDesign: MockIcon,
	Entypo: MockIcon,
	EvilIcons: MockIcon,
	Feather: MockIcon,
	FontAwesome: MockIcon,
	FontAwesome5: MockIcon,
	FontAwesome6: MockIcon,
	Foundation: MockIcon,
	Ionicons: MockIcon,
	MaterialIcons: MockIcon,
	MaterialCommunityIcons: MockIcon,
	Octicons: MockIcon,
	Zocial: MockIcon,
	SimpleLineIcons: MockIcon,
	createIconSet: () => MockIcon,
	createIconSetFromFontello: () => MockIcon,
	createIconSetFromIcoMoon: () => MockIcon,
};
