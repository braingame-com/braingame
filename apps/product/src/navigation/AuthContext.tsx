/**
 * Authentication Context
 * Manages authentication state and navigation flow
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, NavigationState } from './types';

interface AuthContextType extends NavigationState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = '@braingame_auth';
const USER_STORAGE_KEY = '@braingame_user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<NavigationState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // Load auth state on app start
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [authToken, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(USER_STORAGE_KEY),
      ]);

      if (authToken && userData) {
        const user = JSON.parse(userData);
        setState({
          isAuthenticated: true,
          isLoading: false,
          user,
        });
      } else {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: 'user_123',
        email,
        displayName: email.split('@')[0],
        photoURL: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=007fff&color=fff`,
      };

      // Store auth data
      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, 'mock_token_123'),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)),
      ]);

      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock successful registration
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: `https://ui-avatars.com/api/?name=${displayName || email.split('@')[0]}&background=007fff&color=fff`,
      };

      // Store auth data
      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, `mock_token_${Date.now()}`),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)),
      ]);

      setState({
        isAuthenticated: true,
        isLoading: false,
        user,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Clear storage
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(USER_STORAGE_KEY),
      ]);

      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful password reset
      console.log('Password reset email sent to:', email);
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return;

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const updatedUser = { ...state.user, ...updates };
      
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        user: updatedUser,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Profile update failed');
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };