/**
 * Custom Tab Bar
 * Advanced tab bar with animations and dynamic styling
 */

import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@braingame/bgui';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { tabBarStyles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

interface TabConfig {
  name: string;
  icon: string;
  activeIcon: string;
  label: string;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  Dashboard: {
    name: 'Dashboard',
    icon: '📊',
    activeIcon: '📈',
    label: 'Dashboard',
  },
  Videos: {
    name: 'Videos',
    icon: '🎥',
    activeIcon: '▶️',
    label: 'Videos',
  },
  Analytics: {
    name: 'Analytics',
    icon: '📉',
    activeIcon: '📊',
    label: 'Analytics',
  },
  Settings: {
    name: 'Settings',
    icon: '⚙️',
    activeIcon: '🔧',
    label: 'Settings',
  },
};

export const TabBar: React.FC<BottomTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation 
}) => {
  const indicatorPosition = useSharedValue(0);
  const tabWidth = screenWidth / state.routes.length;

  React.useEffect(() => {
    indicatorPosition.value = withSpring(state.index * tabWidth, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const handleTabPress = (route: any, index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={tabBarStyles.container}>
      {/* Animated Indicator */}
      <Animated.View 
        style={[
          tabBarStyles.indicator,
          { width: tabWidth },
          indicatorStyle,
        ]} 
      />
      
      {/* Tab Items */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name];

        if (!config) return null;

        return (
          <TabItem
            key={route.key}
            config={config}
            isFocused={isFocused}
            onPress={() => handleTabPress(route, index)}
            width={tabWidth}
          />
        );
      })}
    </View>
  );
};

interface TabItemProps {
  config: TabConfig;
  isFocused: boolean;
  onPress: () => void;
  width: number;
}

const TabItem: React.FC<TabItemProps> = ({ 
  config, 
  isFocused, 
  onPress, 
  width 
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(isFocused ? 1 : 0.6);

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, {
      damping: 15,
      stiffness: 200,
    });
    
    opacity.value = withSpring(isFocused ? 1 : 0.6, {
      damping: 20,
      stiffness: 150,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      scale.value,
      [1, 1.1],
      [0, 360]
    );
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tabBarStyles.tabItem, { width }]}
      activeOpacity={0.8}
    >
      <Animated.View style={[tabBarStyles.tabContent, animatedStyle]}>
        <Animated.View style={[tabBarStyles.iconContainer, iconAnimatedStyle]}>
          <Text style={[
            tabBarStyles.icon,
            isFocused && tabBarStyles.iconActive
          ]}>
            {isFocused ? config.activeIcon : config.icon}
          </Text>
        </Animated.View>
        
        <Text style={[
          tabBarStyles.label,
          isFocused && tabBarStyles.labelActive
        ]}>
          {config.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};