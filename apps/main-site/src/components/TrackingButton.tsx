"use client";

import type { ButtonProps } from "@braingame/bgui";
import { Button } from "@braingame/bgui";
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
	onClick,
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

		// Call original onClick
		onClick?.();
	};

	return <Button {...props} onClick={handlePress} />;
};

TrackingButton.displayName = "TrackingButton";
