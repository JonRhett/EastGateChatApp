/**
 * EastGate Church App Theme System
 * This is the central configuration for all theming aspects of the application.
 * Changes here will affect the entire application's appearance.
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color System
export const colors = {
  primary: {
    main: '#2C3E50', // Deep blue-gray - represents stability and trust
    light: '#34495E',
    dark: '#1A252F',
  },
  secondary: {
    main: '#C0392B', // Deep red - represents warmth and community
    light: '#E74C3C',
    dark: '#922B21',
  },
  accent: {
    main: '#D4AF37', // Gold - represents reverence and tradition
    light: '#F1C40F',
    dark: '#B7950B',
  },
  background: {
    light: '#F5F6FA',
    dark: '#1A1A1A',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#2D2D2D',
  },
  text: {
    light: '#2C3E50',
    dark: '#ECF0F1',
  },
  status: {
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F',
    info: '#3498DB',
  },
  border: {
    light: '#E1E8ED',
    dark: '#404040',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
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