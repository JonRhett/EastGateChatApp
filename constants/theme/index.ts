/**
 * Theme configuration for the EastGate Church app
 * Centralizes all theme-related configurations
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color System
export const colors = {
  primary: {
    main: '#2C4251', // Navy blue-gray - represents stability and tradition
    light: '#8B8982', // Warm gray
    dark: '#041B15', // Deep forest green
  },
  secondary: {
    main: '#6B2737', // Deep burgundy - represents warmth and community
    light: '#8B8982', // Warm gray
    dark: '#041B15', // Deep forest green
  },
  accent: {
    main: '#8B8982', // Warm gray - represents warmth and approachability
    light: '#FFFFFF', // Pure white
    dark: '#2C4251', // Navy blue-gray
  },
  background: {
    light: '#FFFFFF',
    dark: '#041B15',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#2C4251',
  },
  text: {
    light: '#2C4251',
    dark: '#FFFFFF',
  },
  status: {
    error: '#6B2737',
    success: '#041B15',
    warning: '#8B8982',
    info: '#2C4251',
  },
  border: {
    light: '#8B8982',
    dark: '#2C4251',
  },
  overlay: {
    light: 'rgba(4, 27, 21, 0.1)',
    dark: 'rgba(4, 27, 21, 0.3)',
  },
  gradients: {
    primary: ['#2C4251', '#041B15'],
    secondary: ['#6B2737', '#041B15'],
    light: ['#FFFFFF', '#8B8982']
  }
} as const;

// Typography System
export const typography = {
  fonts: {
    primary: 'Playfair Display', // Elegant serif for headings
    secondary: 'Inter', // Clean sans-serif for body text
    accent: 'Montserrat', // Modern sans-serif for accents
  },
  sizes: {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    body: 16,
    caption: 14,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 24,
    body: 24,
    caption: 20,
  },
  textStyles: {
    h1: {
      fontFamily: 'Playfair Display',
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Playfair Display',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Playfair Display',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    button: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  }
} as const;

// Spacing System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border Radius System
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
} as const;

// Shadow System
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
} as const;

// Layout System
export const layout = {
  screenWidth: width,
  screenHeight: height,
  maxWidth: 1200,
  headerHeight: 60,
  bottomTabHeight: 60,
  contentPadding: spacing.md,
} as const;

// Animation System
export const animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear',
  },
} as const;

// Theme Types
export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeSpacing = typeof spacing;
export type ThemeBorderRadius = typeof borderRadius;
export type ThemeShadows = typeof shadows;
export type ThemeLayout = typeof layout;
export type ThemeAnimation = typeof animation;

// Theme Mode
export type ThemeMode = 'light' | 'dark';

// Theme Context Type
export interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  layout: ThemeLayout;
  animation: ThemeAnimation;
  toggleTheme: () => void;
} 