/**
 * Navigation Types
 * Type definitions for advanced navigation patterns
 */

import type { StackScreenProps } from '@react-navigation/stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack Navigator
export type RootStackParamList = {
  Main: undefined;
  VideoPlayer: { videoId: string; title?: string };
  Auth: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Dashboard: undefined;
  Videos: undefined;
  Analytics: undefined;
  Settings: undefined;
};

// Dashboard Stack
export type DashboardStackParamList = {
  DashboardHome: undefined;
  TaskDetails: { taskId: string };
};

// Videos Stack
export type VideosStackParamList = {
  VideosList: undefined;
  VideoDetails: { videoId: string };
};

// Analytics Stack
export type AnalyticsStackParamList = {
  AnalyticsHome: undefined;
  AnalyticsDetails: { metricType: string };
};

// Settings Stack
export type SettingsStackParamList = {
  SettingsHome: undefined;
  CloudSettings: undefined;
  PrivacySettings: undefined;
  AccountSettings: undefined;
};

// Authentication Stack
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<DashboardStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type VideosStackScreenProps<T extends keyof VideosStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<VideosStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type AnalyticsStackScreenProps<T extends keyof AnalyticsStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<AnalyticsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<SettingsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Navigation State
export interface NavigationState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Deep Link Types
export type DeepLinkParams = {
  screen: string;
  params?: Record<string, any>;
};

// Animation Types
export type NavigationAnimation = 'slide' | 'fade' | 'modal' | 'none';

export interface NavigationOptions {
  animation?: NavigationAnimation;
  gestureEnabled?: boolean;
  headerShown?: boolean;
  presentation?: 'card' | 'modal' | 'transparentModal';
}