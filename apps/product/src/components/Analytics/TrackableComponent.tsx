import type React from 'react';
import { useEffect, useRef } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useAnalyticsEvent } from '../../hooks/useAnalytics';
import { type EventName, type EventProperties, trackEvent } from '../../services/AnalyticsService';

interface TrackableProps {
  eventName: EventName;
  eventProperties?: EventProperties;
  trackOnMount?: boolean;
  trackOnUnmount?: boolean;
  trackInteractions?: boolean;
  trackVisibility?: boolean;
  visibilityThreshold?: number; // 0-1, percentage of component visible
  children: React.ReactNode;
  style?: any;
}

/**
 * Wrapper component that automatically tracks analytics events
 */
export const Trackable: React.FC<TrackableProps> = ({
  eventName,
  eventProperties,
  trackOnMount = false,
  trackOnUnmount = false,
  trackInteractions = true,
  trackVisibility = false,
  visibilityThreshold = 0.5,
  children,
  style,
}) => {
  const { track } = useAnalyticsEvent();
  const mountTime = useRef<number>(Date.now());
  const hasTrackedVisibility = useRef<boolean>(false);

  // Track mount
  useEffect(() => {
    if (trackOnMount) {
      track(eventName, {
        ...eventProperties,
        action: 'mount',
      });
    }

    return () => {
      if (trackOnUnmount) {
        const timeSpent = Date.now() - mountTime.current;
        track(eventName, {
          ...eventProperties,
          action: 'unmount',
          time_spent: timeSpent,
        });
      }
    };
  }, []);

  const handleInteraction = () => {
    if (trackInteractions) {
      track(eventName, {
        ...eventProperties,
        action: 'interact',
      });
    }
  };

  // TODO: Implement visibility tracking with IntersectionObserver equivalent
  // This would require react-native-intersection-observer or similar

  return (
    <View style={style} onTouchEnd={handleInteraction}>
      {children}
    </View>
  );
};

interface TrackableTouchableProps extends Omit<TouchableOpacity['props'], 'onPress'> {
  eventName?: EventName;
  eventProperties?: EventProperties;
  onPress?: () => void;
  children: React.ReactNode;
}

/**
 * Touchable component that automatically tracks press events
 */
export const TrackableTouchable: React.FC<TrackableTouchableProps> = ({
  eventName = 'button_click',
  eventProperties,
  onPress,
  children,
  ...props
}) => {
  const { track } = useAnalyticsEvent();

  const handlePress = () => {
    track(eventName, eventProperties);
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

interface TrackableScrollViewProps extends ScrollView['props'] {
  trackScroll?: boolean;
  scrollEventName?: EventName;
  scrollEventProperties?: EventProperties;
  scrollDebounceMs?: number;
}

/**
 * ScrollView that tracks scroll events
 */
export const TrackableScrollView: React.FC<TrackableScrollViewProps> = ({
  trackScroll = true,
  scrollEventName = 'scroll',
  scrollEventProperties,
  scrollDebounceMs = 1000,
  onScroll,
  children,
  ...props
}) => {
  const { track } = useAnalyticsEvent();
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const scrollStartY = useRef<number>(0);
  const maxScroll = useRef<number>(0);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentY = contentOffset.y;
    
    // Track max scroll depth
    if (currentY > maxScroll.current) {
      maxScroll.current = currentY;
    }

    // Debounced scroll tracking
    if (trackScroll) {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      scrollTimer.current = setTimeout(() => {
        const scrollPercentage = (maxScroll.current / (contentSize.height - layoutMeasurement.height)) * 100;
        
        track(scrollEventName, {
          ...scrollEventProperties,
          scroll_depth: Math.round(scrollPercentage),
          max_scroll_y: maxScroll.current,
        });
      }, scrollDebounceMs);
    }

    onScroll?.(event);
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16} {...props}>
      {children}
    </ScrollView>
  );
};

interface TrackableFlatListProps<T> extends Omit<FlatList<T>['props'], 'onViewableItemsChanged'> {
  trackItemsViewed?: boolean;
  viewabilityConfig?: any;
  onViewableItemsChanged?: (info: any) => void;
}

/**
 * FlatList that tracks which items are viewed
 */
export function TrackableFlatList<T>({
  trackItemsViewed = true,
  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 1000,
  },
  onViewableItemsChanged,
  ...props
}: TrackableFlatListProps<T>) {
  const { track } = useAnalyticsEvent();
  const viewedItems = useRef<Set<string>>(new Set());

  const handleViewableItemsChanged = (info: any) => {
    if (trackItemsViewed) {
      info.viewableItems.forEach((item: any) => {
        const itemKey = item.key || item.index?.toString();
        if (itemKey && !viewedItems.current.has(itemKey)) {
          viewedItems.current.add(itemKey);
          
          track('content_view', {
            content_type: 'list_item',
            content_id: itemKey,
            list_position: item.index,
          });
        }
      });
    }

    onViewableItemsChanged?.(info);
  };

  return (
    <FlatList<T>
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={handleViewableItemsChanged}
      {...props}
    />
  );
}