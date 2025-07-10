"use client";

import { View } from "@braingame/bgui";
import { createContext, type ReactNode, useContext, useState } from "react";
import { Toast, type ToastProps } from "../components/Toast";

interface ToastItem extends ToastProps {
	id: string;
}

interface ToastContextValue {
	showToast: (props: Omit<ToastProps, "onDismiss">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const showToast = (props: Omit<ToastProps, "onDismiss">) => {
		const id = Math.random().toString(36);
		const newToast: ToastItem = {
			...props,
			id,
		};

		setToasts((prev) => [...prev, newToast]);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					pointerEvents: "none",
				}}
			>
				{toasts.map((toast) => (
					<Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
				))}
			</View>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within ToastProvider");
	}
	return context;
}
