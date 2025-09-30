"use client";

import type { ButtonProps } from "@braingame/bgui";
import { Button } from "@braingame/bgui";
import { useAnalytics } from "../hooks/useAnalytics";

interface TrackingButtonProps extends ButtonProps {
	trackingEvent?: string;
	trackingCategory?: string;
	trackingMetadata?: Record<string, unknown>;
}

type ButtonClickEvent = Parameters<NonNullable<ButtonProps["onClick"]>>[0];

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

	const handlePress = (event: ButtonClickEvent) => {
		// Track the click
		if (trackingEvent) {
			trackClick(trackingEvent, {
				category: trackingCategory,
				...trackingMetadata,
			});
		}

		// Call original onClick
		onClick?.(event);
	};

	return <Button {...props} onClick={handlePress} />;
};

TrackingButton.displayName = "TrackingButton";
