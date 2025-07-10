"use client";

import { useEffect, useState } from "react";
import {
	getNetworkStatus,
	type NetworkStatus,
	subscribeToNetworkChanges,
} from "../lib/networkStatus";

/**
 * Hook to monitor network status
 */
export function useNetworkStatus(): NetworkStatus {
	const [status, setStatus] = useState<NetworkStatus>(getNetworkStatus);

	useEffect(() => {
		// Update status on mount
		setStatus(getNetworkStatus());

		// Subscribe to changes
		const unsubscribe = subscribeToNetworkChanges((newStatus) => {
			setStatus(newStatus);
		});

		return unsubscribe;
	}, []);

	return status;
}
