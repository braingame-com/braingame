"use client";

import { Button } from "@braingame/bgui";
import type { ButtonProps } from "@braingame/bgui/src/components/Button/types";
import { useAnalytics } from "../hooks/useAnalytics";

interface TrackingButtonProps extends ButtonProps {
	trackingEvent?: string;
	trackingCategory?: string;
	trackingMetadata?: Record<string, unknown>;
}

/**
 * Button component that automatically tracks clicks
 */
export const TrackingButton = ({
	trackingEvent,
	trackingCategory = "button",
	trackingMetadata,
	onPress,
	...props
}: TrackingButtonProps) => {
	const { trackClick } = useAnalytics();

	const handlePress = () => {
		// Track the click
		if (trackingEvent) {
			trackClick(trackingEvent, {
				category: trackingCategory,
				...trackingMetadata,
			});
		}

		// Call original onPress
		onPress?.();
	};

	return <Button {...props} onPress={handlePress} />;
};

TrackingButton.displayName = "TrackingButton";
