import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export const isReadyRef = { current: false };

export function navigate<T extends keyof RootStackParamList>(
	name: T,
	params?: RootStackParamList[T],
) {
	if (isReadyRef.current && navigationRef.current) {
		// @ts-expect-error - navigation typing issue with params
		navigationRef.current.navigate(name, params);
	}
}

export function goBack() {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.goBack();
	}
}

export function reset(state: {
	index: number;
	routes: Array<{ name: keyof RootStackParamList; params?: object | undefined }>;
}) {
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
