/**
 * Theme Context Provider
 * Provides theme values and theme switching functionality throughout the application.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import {
  ThemeContextType,
  ThemeMode,
  animation,
  borderRadius,
  colors,
  layout,
  shadows,
  spacing,
  typography,
} from '@/constants/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Component
 * Wraps the application and provides theme context to all child components.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemColorScheme || 'light');

  // Update theme when system theme changes
  useEffect(() => {
    if (systemColorScheme) {
      setMode(systemColorScheme as ThemeMode);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    layout,
    animation,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to use theme values in components
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Helper function to get color based on theme mode
 */
export function getThemeColor(colorKey: keyof typeof colors, mode: ThemeMode) {
  const color = colors[colorKey];
  if (typeof color === 'string') return color;
  return color[mode];
}

/**
 * Helper function to get shadow based on theme mode
 */
export function getThemeShadow(shadowKey: keyof typeof shadows, mode: ThemeMode) {
  return shadows[shadowKey];
} 