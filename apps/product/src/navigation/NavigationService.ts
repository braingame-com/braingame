import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export const isReadyRef = { current: false };

export function navigate(name: keyof RootStackParamList, params?: unknown) {
	if (isReadyRef.current && navigationRef.current) {
		// @ts-ignore - navigation typing issue
		navigationRef.current.navigate(name, params);
	}
}

export function goBack() {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.goBack();
	}
}

export function reset(state: unknown) {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.reset(state);
	}
}

export function getCurrentRoute() {
	if (isReadyRef.current && navigationRef.current) {
		return navigationRef.current.getCurrentRoute();
	}
	return null;
}
