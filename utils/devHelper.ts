/**
 * Development Helper Utilities
 * Useful utilities for development-specific tasks
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Get the appropriate development URL for redirects
 * This handles different environments like Expo Go, development builds, etc.
 */
export const getDevRedirectUrl = (path: string = 'login'): string => {
  // In production, use the app scheme
  if (!__DEV__) {
    return `eastgatechurchapp://${path}`;
  }
  
  // Get the manifest extra for the Expo dev server URL
  const { expoGo } = Constants.manifest?.extra || {};
  
  // For Expo Go, use the development server URL
  if (expoGo) {
    const hostUri = Constants.expoConfig?.hostUri || '';
    const host = hostUri.split(':')[0];
    
    // Get port from hostUri or use default 8081
    const portMatch = hostUri.match(/:(\d+)/);
    const port = portMatch ? portMatch[1] : '8081';
    
    if (host) {
      return `exp://${host}:${port}/--/${path}`;
    }
  }
  
  // Fallback to a general development URL (with a placeholder for the IP)
  if (Platform.OS === 'ios') {
    return `exp://localhost:8081/--/${path}`;
  } else {
    // Android devices often need the actual IP, not localhost
    return `exp://192.168.1.2:8081/--/${path}`;
  }
};