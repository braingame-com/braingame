import React from "react";

// Web shim for react-native-safe-area-context
// On web, we don't need safe area handling

export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export const SafeAreaView = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
}) => {
	return <div style={style}>{children}</div>;
};

export const useSafeAreaInsets = () => ({
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
});

export const SafeAreaInsetsContext = React.createContext({
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
});
